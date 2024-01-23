<?php
    require_once 'conexion.php';
    require_once 'notificacion.php';
    require_once '../../plugin_execel/PHPExcel/IOFactory.php';

    class Pagos extends Conexion
    {
        public function savePagos($pagos)
        {
            parent::conectar();
            $carpeta1 = parent::getRutaService() . '/archivo_excel';
            $documento = $pagos['documento'];
            if (file_exists($carpeta1 . "/$documento[nombre]")) {
                unlink($carpeta1 . "/$documento[nombre]");
            }
            $base64_1  = base64_decode(explode(',', $documento['base'])[1]);
            $filepath1 = $carpeta1 . "/$documento[nombre]";
            file_put_contents($filepath1, $base64_1);
            set_time_limit(10);
            $objPHPExcel = PHPExcel_IOFactory::load($filepath1);
            $objPHPExcel->setActiveSheetIndex(0);
            $numRows = $objPHPExcel->setActiveSheetIndex(0)->getHighestRow();
            for ($i=2; $i <= $numRows; $i++) {
                parent::conectar();
                $propiedad =  $objPHPExcel->getActiveSheet()->getCell('B'.$i)->getValue();
                $precio =  $objPHPExcel->getActiveSheet()->getCell('F'.$i)->getValue();
                $fecha =  $objPHPExcel->getActiveSheet()->getCell('G'.$i)->getValue();
                $consultar1 = "SELECT * From cojunto co
                inner join propiedad pro on pro.cojunto_id = co.id
                Where co.id = $pagos[id] and pro.nombre = '$propiedad';";
                $propiedad1 = parent::consultarArreglo($consultar1);
                $data = array(
                    "id" => $propiedad1["id"],
                    "pago" => $precio,
                    "fecha" => $fecha
                );
                $this->updatePagos($data);
            }
            $res = array('status' => 'success', 'message' => 'La pagos se registro', 'data' => $numRows);
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

        public function getAllTipoBanco()
        {
            parent::conectar();
            $consultar1 = "SELECT * FROM tipo_cuenta_bancaria;";
            $lista = parent::consultaTodo($consultar1);
            parent::cerrar();
            $res = array('status' => 'success', 'message' => 'Lista de tipo de pago', 'data' => $lista);
            return $res;
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
            $consultar1 = "SELECT cb.*, tcb.code as code_tipo FROM cuentas_bancarias cb inner join propiedad pr on pr.id = $pagos[propiedad] inner join cojunto c on c.id = pr.cojunto_id and c.id = cb.cojunto_id inner join tipo_cuenta_bancaria tcb on tcb.id = cb.tipo_cuenta_bancaria_id limit 1;";
            /* $consultar1 = "SELECT cb.*, tcb.code as code_tipo FROM cuentas_bancarias cb inner join propiedad pr on pr.id = $pagos[propiedad] inner join cojunto c on c.id = pr.cojunto_id and c.id = cb.cojunto_id inner join tipo_cuenta_bancaria tcb on tcb.id = cb.tipo_cuenta_bancaria_id where cb.code = $pagos[code];"; */
            $consultar2 = "SELECT c.* FROM propiedad pr inner join cojunto c on c.id = pr.cojunto_id where pr.id = $pagos[propiedad]";
            $user = array();
            if ($pagos["optionDatos"] == true || $pagos["optionDatos"] == "true") {
                /* $consultar3 = "SELECT us.* FROM usuario us where us.id = $pagos[user]";
                $user = parent::consultarArreglo($consultar3); */
                $user = array(
                    "tipo_documentacion_id" => $pagos["tipo_identidad"],
                    "numero_documento" => $pagos["numero_identidad"],
                    "nombre" => $pagos["nombre"],
                    "telefono" => $pagos["telefono"],
                    "email" => $pagos["email"],
                );
                $consultar = "UPDATE usuario SET nombre = '$pagos[nombre]', telefono = '$pagos[telefono]', numero_documento = '$pagos[numero_identidad]', tipo_documentacion_id = '$pagos[tipo_identidad]' where id = $pagos[user]";
                parent::query($consultar);
            } else {
                $user = array(
                    "tipo_documentacion_id" => $pagos["tipo_identidad"],
                    "numero_documento" => $pagos["numero_identidad"],
                    "nombre" => $pagos["nombre"],
                    "telefono" => $pagos["telefono"],
                    "email" => $pagos["email"],
                );
            }
            /* print_r($user); */
            $cuentaCojunto = parent::consultarArreglo($consultar1);
            $cojunto = parent::consultarArreglo($consultar2);
            
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
                        'receiverIdentificationType' => $cuentaCojunto["tipo_documentacion_id"],
                        'receiverIdentificationNumber' => (int)$cuentaCojunto["numero_documento"],
                        'receiverNamesLastNames' => $cojunto["nombre"],
                        'receiverEmail' => $cojunto["correo"],
                        'receiverPhone' => (int)$cojunto["telefono"],
                        'receiverBankId' => (int)$cuentaCojunto["code"],
                        'receiverBankAccountTypeId' => $cuentaCojunto["code_tipo"],
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
            if ($responseJson->body->psePaymentURL != 'ERROR') {
                $idPayout = $responseJson->body->idPayout;
                $consultar1 = "UPDATE transaccion SET idPayout = '$idPayout', fecha_pago = current_time, statud = 1 Where id = $pagos[id]";
                parent::query($consultar1);
            }
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

        public function updatePagos($pagos) {
            parent::conectar();
            $prevId = 0;
            $consultar1 = "SELECT * From pagos Where propiedad_id =  $pagos[id]";
            $pago = parent::consultarArreglo($consultar1);
            if ($pago != null) {
                $consultar2 = "UPDATE pagos SET pago = $pagos[pago], dia_corte = '$pagos[fecha]', status = 0 Where id = $pago[id]";
                parent::query($consultar2);
                $prevId = $pago["id"];
            } else {
                $consultar3 = "INSERT INTO pagos(pago, status, dia_corte, current_create, propiedad_id) VALUE($pagos[pago], 0, $pagos[fecha], current_timestamp, $pagos[id])";
                $prevId = parent::queryRegistro($consultar3);
            }
            $prevPago = parent::consultarArreglo("SELECT * From pagos Where id =  $prevId");
            $usua = parent::consultarArreglo("Select us.id, us.email from pagos pa inner join usuario_has_propiedad uhp on uhp.propiedad_id = pa.propiedad_id inner join usuario us on us.id = uhp.usuario_id where pa.id = $prevId");
            parent::cerrar();
            if ($usua != null) {
                $notificacion = new Notificacion();
                $data = array(
                    'mensaje' => "El valor de la renta se a agregado o actulizado por un valor de $pagos[pago] y tiene una fecha de caducidad $pagos[fecha]",
                    'user' => $usua["id"]
                );
                $notificacion->saveNotificacion($data);
                $user = array(
                    "pago" => $prevPago["pago"],
                    "fecha" => $prevPago["dia_corte"],
                    "email" => $usua['email']
                );
                $this->enviarCorreoRegistro($user);
            }
            $res = array('status' => 'success', 'message' => 'Pago exitoso', "data" => $prevPago);
            return $res;
        }

        public function enviarCorreoRegistro($user) {
            parent::conectar();
            $fecha = getdate();
            $html = file_get_contents(parent::getRutaService() . '/html/crear-pago.html');
            $html = str_replace("@pago@", $user['pago'], $html);
            $html = str_replace("@fecha@", $user['fecha'], $html);
            $html = str_replace("@yerd@", $fecha['year'], $html);
            $para      = $user['email'];
            $titulo    = 'Pagos a Admina';
            $mensaje1   = $html;
            /* $titulo    = $json->rango1; */
            $cabeceras  = 'MIME-Version: 1.0' . "\r\n";
            $cabeceras .= 'Content-type: text/html; charset=utf-8' . "\r\n";
            $cabeceras .= 'From: info@admina.com' . "\r\n";
            $dataArray = array("para"=>$para, "titulo"=>$titulo, "mensaje"=>$mensaje1, "cabeceras"=> $cabeceras);
            return parent::mail($dataArray);
        }
    }
    