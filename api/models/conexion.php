<?php
    class Conexion {
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

        function remoteRequest($method, $url, $post_data = "", $timeout = 1000, $headers = array('Content-Type:application/json')){
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
            if ($method != 'GET') {
                curl_setopt($ch, CURLOPT_POST, "1");
                curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($post_data));
                curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method); 
            }
            $file_contents = curl_exec($ch);
            curl_close($ch);
            return ($file_contents) ? $file_contents : false;
        }

        public function loginAWL()
        {
            $data = [
                'userName' => 'he03villa@gmail.com',
                'password' => 'T0l9|1r(C34^'
            ];

            $resp = $this->remoteRequest('POST', 'https://du2qzoaok4.execute-api.us-east-2.amazonaws.com/dev/open/login', $data);
            return $resp;
        }

        public function headerAWL($method, $url, $payload = '')
        {
            $endpoint = $url;

            $respon = $this->loginAWL();
            $resp = json_decode($respon);

            $accessKey = $resp->body->AccessKey;
            $secretKey = $resp->body->SecretKey;
            $securityToken = $resp->body->SessionToken;
            $region = $resp->body->AWSRegion;
            $service = 'execute-api';


            $timestamp = gmdate('Ymd\THis\Z');
            $date = gmdate('Ymd');

            $canonicalHeaders = "host:du2qzoaok4.execute-api.us-east-2.amazonaws.com\nx-amz-date:$timestamp\nx-amz-security-token:$securityToken\n"; // Agrega x-amz-security-token
            $signedHeaders = 'host;x-amz-date;x-amz-security-token'; // Agrega x-amz-security-token aquí también

            /* $payload = ''; */
            if ($payload != '') {
                $payloadEndoce = json_encode($payload);
            }
            $hashedPayload = hash('sha256', $payloadEndoce);
            $urlC = parse_url($endpoint, PHP_URL_PATH);
            $canonicalRequest = "$method\n$urlC\n" . "\n$canonicalHeaders\n$signedHeaders\n$hashedPayload";
            $stringToSign = "AWS4-HMAC-SHA256\n$timestamp\n$date/$region/$service/aws4_request\n" . hash('sha256',$canonicalRequest);

            $hashedCanonicalRequest = hash('sha256', $canonicalRequest, false);
            $signatureKey = $this->getSignatureKey($secretKey, $date, $region, $service);
            $signature = hash_hmac('sha256', $stringToSign, $signatureKey);

            $headers = [
                "Authorization: AWS4-HMAC-SHA256 Credential=$accessKey/$date/$region/$service/aws4_request, SignedHeaders=$signedHeaders, Signature=$signature",
                "x-amz-date: $timestamp",
                "x-amz-security-token: $securityToken",
                'Content-Type:application/json'
            ];

            $respo = $this->remoteRequest($method, $endpoint, $payload, 1000, $headers);

            return $respo;
        }

        function getSignatureKey($secretKey, $date, $region, $service)
        {
            $kSecret = 'AWS4' . $secretKey;
            $kDate = hash_hmac('sha256', $date, $kSecret, true);
            $kRegion = hash_hmac('sha256', $region, $kDate, true);
            $kService = hash_hmac('sha256', $service, $kRegion, true);
            $kSigning = hash_hmac('sha256', 'aws4_request', $kService, true);
            return $kSigning;
        }
    }