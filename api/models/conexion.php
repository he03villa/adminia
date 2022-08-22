<?php
    class Conexion{
        private $conexion;
        private $usuario='u322424575_zabiro';
        private $clave='Sawadatsunayoshi1';
        private $server='localhost';
        private $db='u322424575_Adminabq';
        private $rutaService = '';
        /* private $usuario='root';
        private $clave='';
        private $server='localhost';
        private $db='admina'; */
        
        public function conectar(){
            $this->conexion = new mysqli($this->server,$this->usuario,$this->clave,$this->db);
            if($this->conexion->connect_errno) echo'Falla al conectar con MySQL: '.$this->conexion->connect_error;
            $this->rutaService = $_SERVER['DOCUMENT_ROOT'];
        }

        public function getRutaService() {
            return $this->rutaService;
        }
        
        public function query($consulta){
            $this->conexion->set_charset("utf8");
            return $this->conexion->query($consulta);
        }

        public function queryRegistro($consulta){
            $this->conexion->set_charset("utf8");
            $this->conexion->query($consulta);
            return $this->conexion->insert_id;
        }
        
        public function verificarRegistros($consulta){
            return $verificarRegistros = mysqli_num_rows($this->conexion->query($consulta));
        }
        
        public function consultarArreglo($consulta){
            $this->conexion->set_charset("utf8");
            return mysqli_fetch_array($this->conexion->query($consulta),MYSQLI_ASSOC);
        }
        
        public function consultaTodo($consulta){
            $this->conexion->set_charset("utf8");
            return mysqli_fetch_all($this->conexion->query($consulta),MYSQLI_ASSOC);
        }
        public function cerrar(){
            $this->conexion->close();
            $this->rutaService = '';
        }
        
        public function salvar($des){
            $string = $this->conexion->real_escape_string($des);
            return $string;
        }
        
        public function filtra($string){
            $res = $this->salvar($string);
            $buscar = array('á', 'é', 'í', 'ó', 'ú', 'Á', 'É', 'Í', 'Ó', 'Ú', 'ñ', 'Ñ');
            $reemplazar = array('&aacute','&eacute', '&iacute', '&oacute', '&uacute', '&Aacute', '&Eacute', '&Iacute', '&Oacute', '&Uacute', '&ntilde', '&Ntilde');
            $res = str_replace($buscar,$reemplazar,$string);
            $res = strtolower($res);
            $res = trim($res);
            return $res;
        }
        
        public function recartar($string){
            $buscar = array('&aacute','&eacute', '&iacute', '&oacute', '&uacute', '&Aacute', '&Eacute', '&Iacute', '&Oacute', '&Uacute', '&ntilde', '&Ntilde');
            $reemplazar = array('á', 'é', 'í', 'ó', 'ú', 'Á', 'É', 'Í', 'Ó', 'Ú', 'ñ', 'Ñ');
            $res = str_replace($buscar,$reemplazar,$string);
            return $res;
        }

        public function mail($data) {
            if(mail($data['para'], $data['titulo'], $data['mensaje'], $data['cabeceras'])) return array('status' => 'success', 'message' => 'Se a registrado con exito', 'data' => $data);
            else return array('status' => 'error','mensaje' => 'Error el servidor');
        }
    }