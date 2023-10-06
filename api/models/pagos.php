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
            $url = 'https://du2qzoaok4.execute-api.us-east-2.amazonaws.com/dev/payments/pseBanks';
            return parent::headerAWL($method, $url);
        }
    }
    