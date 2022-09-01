<?php
    require_once 'conexion.php';

    class Muro extends Conexion {
        public function getListPropietario($muro) {
            $pagina = floatval($muro['pagina']);
            $numpagina = 9;
            $hasta = $pagina*$numpagina;
            $desde = ($hasta-$numpagina)+1;
            parent::conectar();
            /* $consultar = "
                SELECT * FROM (
                    SELECT *, (@row_number:=@row_number+1) AS num FROM(
                        SELECT * from muro m
                        where m.cojunto_id = $muro[conjunto]
                        order by m.fecha_creacion desc
                    )as datos
                )AS info
                WHERE info.num BETWEEN '$desde' AND '$hasta';
            "; */
            $consultar = "
                SELECT *, '' as comentario from muro m
                where m.cojunto_id = $muro[conjunto]
                order by m.fecha_creacion desc
            ";
            $consultar2 = "SELECT count(*) as contar from muro where cojunto_id = $muro[conjunto]";
            $muro = parent::consultaTodo($consultar);
            $totalRegisto = parent::consultarArreglo($consultar2);

            for ($i=0; $i < count($muro); $i++) { 
                $id = $muro[$i]['id'];
                $consultar3 = "
                    SELECT * from comentario c
                    where muro_id = $id
                    order by c.fecha_creacion desc;
                ";
                $muro[$i]['comentarios'] = parent::consultaTodo($consultar3);
            }
            parent::cerrar();

            $todoslos = floatval($totalRegisto['contar']);
            $totalpaginas = $todoslos/$numpagina;
            $totalpaginas = ceil($totalpaginas);

            return $resul = array(
                'status' => 'success',
                'message' => 'Lista de los muro',
                'data' => $muro,
                'pagina'=> $pagina,
                'total_paginas'=> $totalpaginas,
            );
        }

        public function saveMuro($muro) {
            parent::conectar();
            $consultar4 = '';
            $key_user = '';
            if ($muro['conjunto'] == 0 || $muro['conjunto'] == '0') {
                $consultar4 = "SELECT nombre from usuario where id = $muro[user]";
                $key_user = 'user';
            } else if ($muro['conjunto'] == 1 || $muro['conjunto'] == '1') {
                $consultar4 = "SELECT nombre_propietario as nombre from cojunto where id = $muro[user]";
                $key_user = 'cojunto';
            }
            $dataU = parent::consultarArreglo($consultar4);
            $consultar = "INSERT INTO muro (descripcion, fecha_creacion, nombre_user, cojunto_id, $key_user) VALUE ('$muro[descripcion]', current_time, '$dataU[nombre]', $muro[cojunto], $muro[user])";
            $prevID = parent::queryRegistro($consultar);
            if ($prevID > 0) {
                $consultar2 = "SELECT * from muro where id = $prevID";
                $data =  parent::consultarArreglo($consultar2);
                $consultar3 = "
                    SELECT * from comentario c
                    where muro_id = $prevID
                    order by c.fecha_creacion desc;
                ";
                $data['comentario'] = parent::consultaTodo($consultar3);
                $resul = array('status' => 'success', 'message' => 'Se ha publicado', 'data' => $data);
            } else {
                $resul = array('status' => 'error', 'message' => 'Ocurrio un error en el servidor');
            }
            parent::cerrar();
            return $resul;
        }

        public function updateMuro($muro) {
            $consultar = "UPDATE muro SET descripcion = '$muro[descripcion]' where id = $muro[id])";
            parent::conectar();
            parent::query($consultar);
            parent::cerrar();
            $resul = array('status' => 'success', 'message' => 'Se actualizó la publicado');
            return $resul;
        }

        public function deleteMuro($muro) {
            $consultar = "DELETE FROM muro where id = $muro[id])";
            parent::conectar();
            parent::query($consultar);
            parent::cerrar();
            $resul = array('status' => 'success', 'message' => 'Se elimino la publicado');
            return $resul;
        }

        public function saveComentario($muro) {
            parent::conectar();
            $consultar4 = '';
            $key_user = '';
            if ($muro['conjunto'] == 0 || $muro['conjunto'] == '0') {
                $consultar4 = "SELECT nombre from usuario where id = $muro[user]";
                $key_user = 'user';
            } else if ($muro['conjunto'] == 1 || $muro['conjunto'] == '1') {
                $consultar4 = "SELECT nombre_propietario as nombre from cojunto where id = $muro[user]";
                $key_user = 'cojunto';
            }
            $dataU = parent::consultarArreglo($consultar4);
            $consultar = "INSERT INTO comentario (comentario, fecha_creacion, nombre_user, muro_id, $key_user) VALUE ('$muro[comentario]', current_time, '$dataU[nombre]', $muro[muro], $muro[user])";
            $prevID = parent::queryRegistro($consultar);
            if ($prevID > 0) {
                $consultar2 = "SELECT * from comentario where id = $prevID";
                $data =  parent::consultarArreglo($consultar2);
                $resul = array('status' => 'success', 'message' => 'Se ha agregado un comentario', 'data' => $data);
            } else {
                $resul = array('status' => 'errorServidor', 'message' => 'Ocurrio un error en el servidor');
            }
            parent::cerrar();
            return $resul;
        }

        public function updateComentario($muro) {
            $consultar = "UPDATE comentario SET comentario = '$muro[comentario]' where id = $muro[id])";
            parent::conectar();
            parent::query($consultar);
            parent::cerrar();
            $resul = array('status' => 'success', 'message' => 'Se actualizó el comentario');
            return $resul;
        }

        public function deleteComentario($muro) {
            $consultar = "DELETE FROM comentario where id = $muro[id])";
            parent::conectar();
            parent::query($consultar);
            parent::cerrar();
            $resul = array('status' => 'success', 'message' => 'Se elimino el comentario');
            return $resul;
        }
    }
    