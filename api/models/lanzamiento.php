<?php
    require_once 'conexion.php';

    class Lanzamineto extends Conexion {
        public function saveLanzamiento($lanzamiento) {
            parent::conectar();
            $consultar = "INSERT INTO lanzamiento (email, nombre, celular, fecha_creacion) VALUE ('$lanzamiento[email]', '$lanzamiento[nombre]', $lanzamiento[telefono], current_time)";
            $prevID = parent::queryRegistro($consultar);
            if ($prevID > 0) {
                $resul = array('status' => 'success', 'message' => 'Se envio la solicitud');
            } else {
                $resul = array('status' => 'error', 'message' => 'Ocurrio un error en el servidor', 'consulta' => $consultar);
            }
            parent::cerrar();
            return $resul;
        }
    }