<?php
    require_once 'conexion.php';
    require_once 'notificacion.php';

    class Pagos extends Conexion
    {
        public function savePagos($pagos)
        {
            parent::conectar();
            $respArray = array();
            for ($i=0; $i < count($pagos["propiedades"]); $i++) { 
                $propiedad = $pagos["propiedades"][$i];
                $consultar1 = "SELECT * From pagos Where propiedad_id =  $propiedad[id]";
                $pago = parent::consultarArreglo($consultar1);
                if ($pago != null) {
                    $consultar2 = "UPDATE pagos SET pago = $pagos[valor], status = 0 Where id = $pago[id]";
                    parent::query($consultar2);
                    $pago['pago'] = $pagos['valor'];
                    $pago['status'] = 0;
                    array_push($respArray, $pago);
                } else {
                    $consultar3 = "INSERT INTO pagos(pago, status, fecha, current_create, propiedad_id) VALUE($pagos[valor], 0, '2023-09-1', current_timestamp, $propiedad[id])";
                    $prevId = parent::queryRegistro($consultar3);
                    $prevPago = parent::consultarArreglo("SELECT * From pagos Where id =  $prevId");
                    array_push($respArray, $prevPago);
                }
            }
            parent::cerrar();
            $res = array('status' => 'success', 'message' => 'La pagos se registro', 'data' => $respArray);
            return $res;
        }

        public function updatePagoStatus($pagos)
        {
            parent::conectar();
            $consultar1 = "UPDATE pagos SET status = $pagos[status] Where id = $pagos[id]";
            parent::query($consultar1);
            $consultar2 = "SELECT co.* From pagos pa
            inner join propiedad p on p.id = pa.propiedad_id
            inner join cojunto co on co.id = p.cojunto_id
            Where pa.id = $pagos[id]";
            $cojunto = parent::consultarArreglo($consultar2);
            parent::cerrar();
            $mensaje = '';
            if ($pagos['status'] == '1' || $pagos['status'] == 1) {
                $mensaje = 'El propietario acepto el valor mensual a pago por el arriendo';
            } else {
                $mensaje = "El propietario rechazo el valor mensual a pago por el arriendo por este motivo <b>$pagos[descripcion]</b>";
            }
            $notificacion = new Notificacion();
            $data = array(
                'mensaje' => $mensaje,
                'user' => $cojunto['id']
            );
            $notificacion->saveNotificacion($data);
            $res = array('status' => 'success', 'message' => 'La pagos se registro', 'data' => true);
            return $res;
        }

        public function getPago($pagos)
        {
            parent::conectar();
            $consultar1 = "SELECT * From pagos Where propiedad_id =  $pagos[id]";
            $pago = parent::consultarArreglo($consultar1);
            parent::cerrar();
            $res = array('status' => 'success', 'message' => 'Detalle del pago', 'data' => $pago);
            return $res;
        }

        public function getListBanco()
        {
            parent::conectar();
            $method = 'GET';
            $url = 'https://q7f622c1s0.execute-api.us-east-2.amazonaws.com/prod/payments/pseBanks';
            /* $url = 'https://du2qzoaok4.execute-api.us-east-2.amazonaws.com/dev/payments/pseBanks'; */
            return parent::headerAWL($method, $url);
        }

        public function createTransacciones()
        {
            parent::conectar();
            $consultar1 = "
                SELECT usp.propiedad_id, usp.usuario_id, p.pago, p.status FROM usuario_has_propiedad usp
                inner join pagos p on p.propiedad_id = usp.propiedad_id
                where usp.status = 1 and p.status = 1
            ";
            $lista = parent::consultaTodo($consultar1);
            foreach ($lista as $pago) {
                $consultar2 = "INSERT into transaccion(precio, fecha_creacion, statud, usuario_has_propiedad_usuario_id, usuario_has_propiedad_propiedad_id) Values($pago[pago], current_time, 0, $pago[usuario_id], $pago[propiedad_id])";
                parent::query($consultar2);
            }
            parent::cerrar();
        }

        public function getPagoUserAllPropiedad($pagos)
        {
            parent::conectar();
            $consultar1 = "SELECT t.*, p.nombre, DATE_ADD(t.fecha_creacion, interval 1 month) as fecha_vencimiento from transaccion t inner join propiedad p on p.id = t.usuario_has_propiedad_propiedad_id where t.usuario_has_propiedad_usuario_id = $pagos[id] and t.statud = 0";
            $lista = parent::consultaTodo($consultar1);
            parent::cerrar();
            $res = array('status' => 'success', 'message' => 'Lista de transacciones a pagar', 'data' => $lista);
            return $res;
        }

        public function getPagoUser($pagos)
        {
            parent::conectar();
            $consultar1 = "SELECT t.*, p.nombre, DATE_ADD(t.fecha_creacion, interval 1 month) as fecha_vencimiento from transaccion t inner join propiedad p on p.id = t.usuario_has_propiedad_propiedad_id where t.usuario_has_propiedad_usuario_id = $pagos[id_user] and t.usuario_has_propiedad_propiedad_id = $pagos[id_propiedad]";
            $lista = parent::consultaTodo($consultar1);
            parent::cerrar();
            $res = array('status' => 'success', 'message' => 'Lista de transacciones a pagar', 'data' => $lista);
            return $res;
        }

        public function getPagoAdministrador($pagos)
        {
            parent::conectar();
            $consultar1 = "SELECT t.*, p.nombre, DATE_ADD(t.fecha_creacion, interval 1 month) as fecha_vencimiento from transaccion t inner join propiedad p on p.id = t.usuario_has_propiedad_propiedad_id where p.cojunto_id = $pagos[id]";
            $lista = parent::consultaTodo($consultar1);
            parent::cerrar();
            $res = array('status' => 'success', 'message' => 'Lista de transacciones a pagar', 'data' => $lista);
            return $res;
        }

        public function pay($pagos)
        {
            if (!isset($pagos["id"])) {
                /* echo 'entra'; */
                return false;
            }
            parent::conectar();
            $consultar1 = "SELECT cb.* FROM cuentas_bancarias cb inner join propiedad pr on pr.id = $pagos[propiedad] inner join cojunto c on c.id = pr.cojunto_id and c.id = cb.cojunto_id where cb.code = $pagos[code];";
            $consultar2 = "SELECT c.* FROM propiedad pr inner join cojunto c on c.id = pr.cojunto_id where pr.id = $pagos[propiedad]";
            $consultar3 = "SELECT us.* FROM usuario us where us.id = $pagos[user]";
            $cuentaCojunto = parent::consultarArreglo($consultar1);
            $cojunto = parent::consultarArreglo($consultar2);
            $user = parent::consultarArreglo($consultar3);
            
            $data = array(
                'payerId' => $pagos["id"],
                'bankId' => $pagos["code"],
                'description' => "Pago de prueba api",
                'callback' => "https://admina.com.co/dashboard/pagos?id=$pagos[id]",
                'payerDocumentTypeId' => $user["tipo_documentacion_id"],
                'payerDocumentNumber' => (int)$user["numero_documento"],
                'payerNamesLastnames' => $user["nombre"],
                'payerPhone' => (int)$user["telefono"],
                'payerAddress' => 'Calle lomba',
                'payerEmail' => $user["email"],
                'payouts' => array(
                    array(
                        'payoutId' => $cojunto["id"],
                        'receiverIdentificationType' => $cojunto["tipo_documentacion_id"],
                        'receiverIdentificationNumber' => (int)$cojunto["numero_documento"],
                        'receiverNamesLastNames' => $cojunto["nombre"],
                        'receiverEmail' => $cojunto["correo"],
                        'receiverPhone' => (int)$cojunto["telefono"],
                        'receiverBankId' => (int)$cuentaCojunto["code"],
                        'receiverBankAccountTypeId' => $cuentaCojunto["code"],
                        'receiverBankAccountNumber' => (int)$cuentaCojunto["cuenta"],
                        'receiverAmount' => (int)$pagos["precio"],
                    )
                )
            );
            
            $method = 'POST';
            $url = 'https://q7f622c1s0.execute-api.us-east-2.amazonaws.com/prod/payments/payoutGeneric';
            /* $url = 'https://du2qzoaok4.execute-api.us-east-2.amazonaws.com/dev/payments/payoutGeneric'; */
            $respo = parent::headerAWL($method, $url, $data);
            $responseJson = json_decode($respo);
            $idPayout = $responseJson->body->idPayout;
            $consultar1 = "UPDATE transaccion SET idPayout = '$idPayout', fecha_pago = current_time, statud = 1 Where id = $pagos[id]";
            parent::query($consultar1);
            parent::cerrar();
            return $respo;
        }

        public function pagoSuccess($pagos)
        {
            parent::conectar();
            $consultar1 = "SELECT * FROM transaccion Where statud >= 2 and id = $pagos[id]";
            $transap = parent::consultarArreglo($consultar1);
            if ($transap == null) {
                $consultar2 = "UPDATE transaccion SET statud = 2 Where id = $pagos[id]";
                parent::query($consultar2);
                parent::cerrar();
                $res = array('status' => 'success', 'message' => 'Pago exitoso');
            } else {
                $res = array('status' => 'errorExiste', 'message' => 'El pago ya esta aprobado');
            }
            
            return $res;
        }

        public function getPagoDetalle($pagos)
        {
            parent::conectar();
            $method = 'GET';
            $url = "https://q7f622c1s0.execute-api.us-east-2.amazonaws.com/prod/payments/one/$pagos[businessId]/$pagos[payoutId]";
            /* $url = "https://du2qzoaok4.execute-api.us-east-2.amazonaws.com/dev/payments/one/$pagos[businessId]/$pagos[payoutId]"; */
            return parent::headerAWL($method, $url);
        }
    }
    