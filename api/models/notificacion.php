<?php
    require_once 'conexion.php';

    class Notificacion extends Conexion
    {
        public function getAllNotificacionUser($notificaicon)
        {
            parent::conectar();
            $consultar = "SELECT * from notificacion where user = $notificaicon[id] order by fecha desc";
            $user = parent::consultaTodo($consultar);
            parent::cerrar();
            return $resul = array('status' => 'success', 'message' => 'Las notificaciones', 'data' => $user);
        }

        public function saveNotificacion($notificaicon) {
            parent::conectar();
            $consultar = "INSERT Into notificacion (mensaje, fecha, visto, user) Value ('$notificaicon[mensaje]', current_timestamp, 0, $notificaicon[user])";
            parent::queryRegistro($consultar);
            parent::cerrar();
            return $resul = array('status' => 'success', 'message' => 'Las notificaciones se envio');
        }

        public function ponerVisto($notificaicon)
        {
            parent::conectar();
            $consultar = "UPDATE notificacion SET visto = 1 where user = $notificaicon[user];";
            parent::query($consultar);
            parent::cerrar();
            return $resul = array('status' => 'success', 'message' => 'Las notificaciones se vieron');
        }
    }