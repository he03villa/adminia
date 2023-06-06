<?php
    require_once 'conexion.php';
    require_once 'notificacion.php';

    class Propiedad extends Conexion {

        public function listarTipoPropiedad() {
            parent::conectar();
            $consultar1 = "SELECT * From tipo_propiedad";
            $lista = parent::consultaTodo($consultar1);
            parent::cerrar();
            return array('status' => 'success', 'message' => 'El listado de las propiedades', 'data' => $lista);
        }

        public function listarPropiadad($propiedad) {
            parent::conectar();
            $consultar1 = "SELECT p.*, c.telefono, uhp.status From usuario_has_propiedad uhp Inner Join propiedad p on p.id = uhp.propiedad_id inner join cojunto c on c.id = p.cojunto_id where uhp.usuario_id = $propiedad[user] order by p.fecha desc";
            $lista = parent::consultaTodo($consultar1);
            parent::cerrar();
            return array('status' => 'success', 'message' => 'El listado de las propiedades', 'data' => $lista);
        }

        public function savePropiedad($propiedad) {
            $existe = $this->getPropiedadEmail($propiedad['email']);
            if ($existe['data'] != null) {
                $resul = array('status' => 'errorUser', 'message' => 'El usuairo ya existe');
            } else {
                parent::conectar();
                $codigo = "sha1(concat(sha1('$propiedad[email]'), sha1(current_timestamp)))";
                $password = "sha1(concat(sha1('$propiedad[email]'), sha1('$propiedad[password]')))";
                $consultar1 = "INSERT Into cojunto(nombre, direccion, ciudad, departamento, codigo_postal, codigo, tipo_propiedad_id, fecha_creacion, correo, password, telefono) Value ('$propiedad[nombre]', '$propiedad[direccion]', '$propiedad[ciudad]', '$propiedad[departamento]', '$propiedad[codigo_postal]', $codigo, $propiedad[tipo_propiedad_id], current_timestamp, '$propiedad[email]', $password, '$propiedad[telefono]')";
                $preId = parent::queryRegistro($consultar1);
                if ($preId) {
                    if ($propiedad['tipo_propiedad_id'] == '1' || $propiedad['tipo_propiedad_id'] == 1) {
                        $urbanizacion = $propiedad['urbanizacion'];
                        for ($i = 0; $i < $urbanizacion['cantidad_propiedad']; $i++) { 
                            $nombre = $urbanizacion['nombre_nomezclatura'] . ' ' . ($i + $urbanizacion['inicio_nomezclatura']);
                            $consultar2 = "INSERT Into propiedad(nombre, fecha, cojunto_id) Value('$nombre', current_timestamp, $preId)";
                            parent::query($consultar2);
                        }
                    } else if ($propiedad['tipo_propiedad_id'] == '2' || $propiedad['tipo_propiedad_id'] == 2) {
                        $edificion = $propiedad['edificion'];
                        for ($i=0; $i < $edificion['numero_torres']; $i++) {
                            $nombre = 'Torre ' . ($i + 1);
                            $consultar2 = "INSERT Into torre(nombre, fecha, cojunto_id) Value('$nombre', current_timestamp, $preId)";
                            $preTorreId = parent::queryRegistro($consultar2);
                            $element = $edificion['arrayNumeroPiso'][$i];
                            for ($j=0; $j < count($element); $j++) { 
                                $elementi = $element[$j];
                                if ((int)$elementi['piso_inicio'] > 0 && (int)$elementi['cantdad'] > 0) {
                                    $lent = (int)$elementi['piso_inicio'] >= (int)$elementi['piso_fin'] ? 1 : (((int)$elementi['piso_fin'] - (int)$elementi['piso_inicio']) + 1);
                                    for ($m=0; $m < $lent; $m++) {
                                        for ($k=0; $k < (int)$elementi['cantdad']; $k++) { 
                                            $numero = (($m + (int)$elementi['piso_inicio']) * 100) + ($k + 1);
                                            $consultar3 = "INSERT Into propiedad(nombre, fecha, cojunto_id, torre_id) Value('$numero', current_timestamp, $preId, $preTorreId)";
                                            /* echo $consultar3; */
                                            parent::queryRegistro($consultar3);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    $propiedad['id'] = $preId;
                    $this->enviarCorreoRegistro($propiedad);
                    parent::cerrar();
                    /* $consultar3 = "SELECT * from cojunto where id = $preId";
                    $data = parent::consultarArreglo($consultar3); */
                    /* $res = $this->login($propiedad); */
                    $res = array('status' => 'success', 'message' => 'La propiedad se registro');
                } else {
                    $res = array('status' => 'error', 'message' => 'Error en el servidor', 'sql' => $consultar1);
                    parent::cerrar();
                }
            }
            return $res;
        }

        public function login($propiedad)
        {
            parent::conectar();
            $password = "sha1(concat(sha1('$propiedad[email]'), sha1('$propiedad[password]')))";
            $consultar = "SELECT c.*, tp.nombre as nombre_tipo_propiedad from cojunto c inner join tipo_propiedad tp on tp.id = c.tipo_propiedad_id where c.correo = '$propiedad[email]' and c.password = $password";
            $usuario = parent::consultarArreglo($consultar);
            if ($usuario) {
                if ($usuario['status'] == 1 || $usuario['status'] == '1') {
                    unset($usuario['password']);
                    $usuario['conjunto'] = 1;
                    $consultar2 = "SELECT * from cuentas_bancarias where cojunto_id = $usuario[conjunto]";
                    $usuario['cuentas_bancarias'] = parent::consultaTodo($consultar2);
                    $resul = array('status' => 'success', 'message' => 'Datos del usuario', 'data' => $usuario);
                } else {
                    $resul = array('status' => 'errorActivar', 'message' => 'No se ha activado la cuenta');
                }
                
            } else {
                $resul = array('status' => 'errorUser', 'message' => 'Los datos proporcionados estan errados');
            }
            parent::cerrar();
            return $resul;
        }

        public function savePropietario($propiedad) {
            parent::conectar();
            $consultar1 = "SELECT * from usuario_has_propiedad where usuario_id = $propiedad[user] and propiedad_id = $propiedad[propiedad];";
            $lista = parent::consultaTodo($consultar1);
            if (count($lista) == 0) {
                $consultar2 = "INSERT Into usuario_has_propiedad(usuario_id, propiedad_id, status) Value($propiedad[user], $propiedad[propiedad], 0)";
                parent::query($consultar2);
                $res = array('status' => 'success', 'message' => 'El propietario se asigno');
            } else {
                $res = array('status' => 'error', 'message' => 'Esta propiedad esta asignada a este usuario');
            }
            parent::cerrar();
            return $res;
        }

        public function getAllPropietario($propiedad) {
            parent::conectar();
            $consultar2 = "SELECT p.*, uhp.status, us.nombre as nombre_user, us.telefono as telefono_user, us.email as email_user, us.id as id_user from propiedad p left join usuario_has_propiedad uhp on uhp.propiedad_id = p.id left join usuario us on us.id = uhp.usuario_id where p.cojunto_id = $propiedad[id]  order by p.id";
            $consultar3 = "SELECT * from torre t where t.cojunto_id = $propiedad[id]  order by t.id";
            /* echo $consultar2; */
            $lista = parent::consultaTodo($consultar2);
            $listaTorre = parent::consultaTodo($consultar3);
            $res = array('status' => 'success', 'message' => 'El propietario se registro', 'data' => $lista, 'torre' => $listaTorre);
            parent::cerrar();
            return $res;
        }
        
        public function getAllPropietarioPro($propiedad) {
            parent::conectar();
            /* $consultar2 = "SELECT p.nombre, p.id from propiedad p inner join cojunto c on c.id = p.cojunto_id where c.codigo = '$propiedad[token]' order by p.fecha desc"; */
            $consultar2 = "SELECT p.id, IF(t.nombre is null, p.nombre, concat(t.nombre,' - ',p.nombre)) nombre from propiedad p inner join cojunto c on c.id = p.cojunto_id left join torre t on p.torre_id = t.id where c.codigo = '$propiedad[token]' order by p.fecha desc";
            $lista = parent::consultaTodo($consultar2);
            $res = array('status' => 'success', 'message' => 'El propietario se registro', 'data' => $lista);
            parent::cerrar();
            return $res;
        }

        public function getPropiedadEmail($email)
        {
            parent::conectar();
            $consultar = "SELECT * from cojunto where correo = '$email' or id = '$email'";
            $user = parent::consultaTodo($consultar);
            parent::cerrar();
            return $resul = array('status' => 'success', 'message' => 'El usuairo', 'data' => $user);
        }

        public function activarPropiedad($propiedad)
        {
            $existe = $this->getPropiedadEmail($propiedad['id']);
            if (count($existe['data']) == 0) {
                $resul = array('status' => 'errorUser', 'message' => 'La propiedad no existe');
            } else {
                parent::conectar();
                $consultar = "UPDATE cojunto SET status = 1 where id = $propiedad[id]";
                $user = parent::query($consultar);
                parent::cerrar();
            }
            return $resul = array('status' => 'success', 'message' => 'El usuairo se activo');
        }

        public function enviarCorreoRegistro($propiedad) {
            parent::conectar();
            $fecha = getdate();
            $html = file_get_contents(parent::getRutaService() . '/html/registro_propiedad.html');
            $html = str_replace("@id@", $propiedad['id'], $html);
            $html = str_replace("@yerd@", $fecha['year'], $html);
            $para      = $propiedad['email'];
            $titulo    = 'Bienvenido a Admina';
            $mensaje1   = $html;
            /* $titulo    = $json->rango1; */
            $cabeceras  = 'MIME-Version: 1.0' . "\r\n";
            $cabeceras .= 'Content-type: text/html; charset=utf-8' . "\r\n";
            $cabeceras .= 'From: info@admina.com' . "\r\n";
            $dataArray = array("para"=>$para, "titulo"=>$titulo, "mensaje"=>$mensaje1, "cabeceras"=> $cabeceras);
            return parent::mail($dataArray);
        }

        public function activarPropietario($propiedad) {
            parent::conectar();
            $consultar = "UPDATE usuario_has_propiedad SET status = 1 where usuario_id = $propiedad[user] and propiedad_id = $propiedad[propiedad]";
            $user = parent::query($consultar);
            parent::cerrar();
            $notificacion = new Notificacion();
            $data = array('user' => $propiedad['user'], 'mensaje' => 'La propiedad se te activo');
            $notificacion->saveNotificacion($data);
            return $resul = array('status' => 'success', 'message' => 'El propietario se activo');
        }

        public function removerPropietario($propiedad) {
            parent::conectar();
            $consultar = "DELETE from usuario_has_propiedad where usuario_id = $propiedad[user] and propiedad_id = $propiedad[propiedad]";
            $user = parent::query($consultar);
            parent::cerrar();
            $notificacion = new Notificacion();
            $data = array('user' => $propiedad['user'], 'mensaje' => "La propiedad te va removido por este motivo: $propiedad[observacion]");
            $notificacion->saveNotificacion($data);
            return $resul = array('status' => 'success', 'message' => 'El propietario se removió');
        }

        public function updateConjunto($propiedad) {
            parent::conectar();
            $consultar = "UPDATE cojunto SET nombre_propietario = '$propiedad[nombre]', telefono = '$propiedad[telefono]' where id = $propiedad[id]";
            $user = parent::query($consultar);
            parent::cerrar();
            return $resul = array('status' => 'success', 'message' => 'El cojunto se actualizo');
        }

        public function updatePassword($propiedad) {
            $existe = $this->getPropiedadEmail($propiedad['id']);
            if (count($existe['data']) == 0) {
                $resul = array('status' => 'errorUser', 'message' => 'La propiedad no existe');
            } else {
                /* print_r($existe['data']); */
                $email = $existe['data'][0]['correo'];
                $password = "sha1(concat(sha1('$email'), sha1('$propiedad[newPassword]')))";
                parent::conectar();
                $consultar = "UPDATE cojunto SET password = $password where id = $propiedad[id]";
                parent::query($consultar);
                parent::cerrar();
                $resul = array('status' => 'success', 'message' => 'La contraseña se actulizo');
            }
            return $resul;
        }

        public function saveCuentas($propiedad) {
            parent::conectar();
            $resul = array('status' => 'success', 'error' => array(), 'mensaje' => 'Las cuentas se guardo correctamente');
            for ($i=0; $i < count($propiedad['cuentas_bancarias']); $i++) { 
                $element = $propiedad['cuentas_bancarias'][$i];
                $consultar = "SELECT * FROM cuentas_bancarias where cuenta = '$element[cuenta]'";
                $existe = parent::consultarArreglo($consultar);
                if ($existe == null) {
                    if (!isset($element['id'])) {
                        $consultar2 = "INSERT INTO cuentas_bancarias (nombre, cuenta, cojunto_id) VALUE ('$element[nombre]', '$element[cuenta]', $propiedad[cojunto])";
                        parent::queryRegistro($consultar2);
                    } else {
                        $consultar2 = "UPDATE cuentas_bancarias SET nombre = '$element[nombre]', cuenta = '$element[cuenta]' where id = $element[id];";
                        parent::query($consultar2);
                    }
                } else {
                    array_push($resul['error'], $element['cuenta']);
                }
            }
            $consultar3 = "SELECT * FROM cuentas_bancarias where cojunto_id = $propiedad[cojunto]";
            $resul['data'] = parent::consultaTodo($consultar3);
            parent::cerrar();
            return $resul;
        }

        public function deleteCuentas($propiedad) {
            parent::conectar();
            $consultar3 = "DELETE FROM cuentas_bancarias where id = $propiedad[id]";
            parent::query($consultar3);
            parent::cerrar();
            return $resul = array('status' => 'success');
        }
    }