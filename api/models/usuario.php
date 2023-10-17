<?php
    require 'conexion.php';

    class Usuario extends Conexion
    {
        public function saveUser($user)
        {
            $resul;
            $existe = $this->getUserEmail($user['email']);
            if ($existe['data'] != null) {
                $resul = array('status' => 'errorUser', 'message' => 'El usuairo ya existe');
            } else {
                parent::conectar();
                $password = "sha1(concat(sha1('$user[email]'), sha1('$user[password]')))";
                $consultar = "INSERT INTO usuario(nombre, email, fecha_creacion, fecha_nacimeinto, password, telefono) VALUES ('$user[nombre]', '$user[email]', current_timestamp, '$user[fecha]', $password, '$user[telefono]')";
                $preId = parent::queryRegistro($consultar);
                if ($preId > 0) {
                    $user['id'] = $preId;
                    $consultar = "INSERT INTO usuario_has_rol(usuario_id, rol_id) VALUES ($preId, 2)";
                    parent::queryRegistro($consultar);
                    $this->enviarCorreoRegistro($user);
                    /* $resul = $this->login($user); */
                    $resul = array('status' => 'success', 'message' => 'El usuairo se registro');
                } else {
                    $resul = array('status' => 'error', 'message' => 'Ocurrio un error en el servidor');
                    parent::cerrar();
                }
            }
            return $resul;
        }

        public function getUserEmail($email)
        {
            parent::conectar();
            $consultar = "SELECT * from usuario where email = '$email' or id = '$email'";
            $user = parent::consultaTodo($consultar);
            parent::cerrar();
            return $resul = array('status' => 'success', 'message' => 'El usuairo', 'data' => $user);
        }

        public function activarUser($user)
        {
            $existe = $this->getUserEmail($user['id']);
            if (count($existe['data']) == 0) {
                $resul = array('status' => 'errorUser', 'message' => 'El usuairo no existe');
            } else {
                parent::conectar();
                $consultar = "UPDATE usuario SET status = 1 where id = $user[id]";
                $user = parent::query($consultar);
                parent::cerrar();
            }
            return $resul = array('status' => 'success', 'message' => 'El usuairo se activo');
        }

        public function login($user)
        {
            parent::conectar();
            $password = "sha1(concat(sha1('$user[email]'), sha1('$user[password]')))";
            $consultar = "SELECT * from usuario where email = '$user[email]' and password = $password";
            $usuario = parent::consultarArreglo($consultar);
            if ($usuario) {
                if ($usuario['status'] == 1 || $usuario['status'] == '1') {
                    unset($usuario['password']);
                    $usuario['conjunto'] = 0;
                    $consultar1 = "SELECT * from usuario_has_rol where usuario_id = $usuario[id] and $user[rol]";
                    $existe = parent::consultaTodo($consultar1);
                    if (count($existe) == 0) {
                        $consultar = "INSERT INTO usuario_has_rol(usuario_id, rol_id) VALUES ($usuario[id], $user[rol])";
                        parent::queryRegistro($consultar);
                    }
                    $consultar1 = "SELECT * from usuario_has_rol where usuario_id = $usuario[id]";
                    $usuario['rol'] = parent::consultaTodo($consultar1);
                    $consultar2 = "SELECT * from cuentas_bancarias where usuario_id = $usuario[id]";
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

        public function enviarCorreoRegistro($user) {
            parent::conectar();
            $fecha = getdate();
            $html = file_get_contents(parent::getRutaService() . '/html/registro_propietario.html');
            $html = str_replace("@id@", $user['id'], $html);
            $html = str_replace("@yerd@", $fecha['year'], $html);
            $para      = $user['email'];
            $titulo    = 'Bienvenido a Admina';
            $mensaje1   = $html;
            /* $titulo    = $json->rango1; */
            $cabeceras  = 'MIME-Version: 1.0' . "\r\n";
            $cabeceras .= 'Content-type: text/html; charset=utf-8' . "\r\n";
            $cabeceras .= 'From: info@admina.com' . "\r\n";
            $dataArray = array("para"=>$para, "titulo"=>$titulo, "mensaje"=>$mensaje1, "cabeceras"=> $cabeceras);
            return parent::mail($dataArray);
        }

        public function updateUser($user) {
            parent::conectar();
            $consultar = "UPDATE usuario SET nombre = '$user[nombre]', telefono = '$user[telefono]', numero_documento = '$user[numero_documento]', tipo_documentacion_id = '$user[tipo_documento]' where id = $user[id]";
            $user = parent::query($consultar);
            parent::cerrar();
            return $resul = array('status' => 'success', 'message' => 'El usuario se actualizo');
        }

        public function updatePassword($user) {
            $existe = $this->getUserEmail($user['id']);
            if (count($existe['data']) == 0) {
                $resul = array('status' => 'errorUser', 'message' => 'La propiedad no existe');
            } else {
                $email = $existe['data'][0]['email'];
                $password = "sha1(concat(sha1('$email'), sha1('$user[newPassword]')))";
                parent::conectar();
                $consultar = "UPDATE usuario SET password = $password where id = $user[id]";
                parent::query($consultar);
                parent::cerrar();
                $resul = array('status' => 'success', 'message' => 'La contraseña se actulizo');
            }
            return $resul;
        }
    }
    