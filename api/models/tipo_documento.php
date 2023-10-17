<?php
    require 'conexion.php';

    class TipoDocumento extends Conexion
    {
        public function getAllTipoDocumento()
        {
            parent::conectar();
            $consultar1 = "SELECT * FROM tipo_documentacion";
            $lista = parent::consultaTodo($consultar1);
            parent::cerrar();
            $res = array('status' => 'success', 'message' => 'Lista de tipos de documento', 'data' => $lista);
            return $res;
        }
    }
    