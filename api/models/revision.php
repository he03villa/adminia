<?php
    require 'conexion.php';
    require_once '../../html2pdf/vendor/autoload.php';

    use Spipu\Html2Pdf\Html2Pdf;
    use Spipu\Html2Pdf\Exception\Html2PdfException;
    use Spipu\Html2Pdf\Exception\ExceptionFormatter;

    class Revision extends Conexion {
        public function getAllTipoRevision($revicion) {
            parent::conectar();
            $in = '';
            for ($i=0; $i < count($revicion["tipo"]); $i++) { 
                $in = $in.$revicion["tipo"][$i];
                if ($i < (count($revicion["tipo"]) - 1)) {
                    $in = $in.',';
                }
            }
            $consultar = "SELECT * from tipo_revision where id in($in)";
            $lista = parent::consultaTodo($consultar);
            parent::cerrar();
            return array('status' => 'success', 'data' => $lista);
        }

        public function getRevision($revision) {
            parent::conectar();
            $consultar = "SELECT * from revision where propiedad_id = $revision[propiedad] and tipo_revision_id = $revision[tipo_revision]";
            $lista = parent::consultaTodo($consultar);
            parent::cerrar();
            return array('status' => 'success', 'data' => $lista);
        }

        public function getRevisionPropiedad($revision) {
            parent::conectar();
            $consultar = "SELECT r.*, p.nombre nombre_propiedad from propiedad p inner join revision r on r.propiedad_id = p.id where p.cojunto_id = $revision[cojunto] and r.tipo_revision_id = $revision[tipo_revision]";
            $lista = parent::consultaTodo($consultar);
            parent::cerrar();
            return array('status' => 'success', 'data' => $lista);
        }

        public function saveRevicion($revision) {
            parent::conectar();
            $carpeta1 = parent::getRutaService() . '/revicion';
            if (!file_exists($carpeta1)) {
                mkdir($carpeta1, 0777, TRUE);
            }
            $carpeta2 = $carpeta1 . "/$revision[propiedad]";
            if (!file_exists($carpeta2)) {
                mkdir($carpeta2, 0777, TRUE);
            }
            $carpeta3 = $carpeta2 . "/$revision[tipo_revicion]";
            if (!file_exists($carpeta3)) {
                mkdir($carpeta3, 0777, TRUE);
            }
            $documento = $revision['documento'];
            $base64_1  = base64_decode(explode(',', $documento['base64'])[1]);
            $filepath1 = $carpeta3 . "/$documento[nombre].$documento[extencion]";
            $filepath2 = "/revicion/$revision[propiedad]/$revision[tipo_revicion]/$documento[nombre].$documento[extencion]";
            file_put_contents($filepath1, $base64_1);
            $consultar1 = "INSERT into revision (nombre, ruta, fecha, tipo_revision_id, propiedad_id) Value ('$documento[nombre]', '$filepath2', current_time, $revision[tipo_revicion], $revision[propiedad])";
            $preId = parent::queryRegistro($consultar1);
            if ($preId > 0) {
                $consultar2 = "SELECT * from revision where id = $preId";
                $data = parent::consultarArreglo($consultar2);
                $res = array('status' => 'success', 'message' => 'Se registro la revisión correctamente', 'data' => $data);
            } else {
                $res = array('status' => 'error', 'message' => 'Ocurrio un error');
            }
            parent::cerrar();
            return $res;
        }

        public function saveRevicionVisita($revision) {
            try {
                parent::conectar();

                $carpeta1 = parent::getRutaService() . '/revicion';
                if (!file_exists($carpeta1)) {
                    mkdir($carpeta1, 0777, TRUE);
                }
                $carpeta2 = $carpeta1 . "/$revision[propiedad]";
                if (!file_exists($carpeta2)) {
                    mkdir($carpeta2, 0777, TRUE);
                }
                $carpeta3 = $carpeta2 . "/3";
                if (!file_exists($carpeta3)) {
                    mkdir($carpeta3, 0777, TRUE);
                }

                $fecha = getdate();
                $fechaActual = $fecha[0];

                ob_start();
                include parent::getRutaService() . '/html/revicion1.html';
                $content = ob_get_clean();
                $actividad = '';

                $content = str_replace("@hora_inicio@", $revision['horaInicio'], $content);
                $content = str_replace("@hora_fin@", $revision['horaFin'], $content);
                $content = str_replace("@secto@", $revision['sector'], $content);
                $content = str_replace("@objeto@", $revision['observacion_visita'], $content);
                $content = str_replace("@objetico_general@", $revision['observacion_general'], $content);
                for ($i=0; $i < count($revision['anexo']); $i++) { 
                    $element = $revision['anexo'][$i];
                    $x = $i + 1;
                    $actividad = $actividad . "
                        <h3>Actividad $x</h3>
                        <p class='actividad'>$element[observacion]</p>
                    ";
                }
                $content = str_replace("@actividad@", $actividad, $content);
                
                $html2pdf = new Html2Pdf('P', 'A4', 'fr');
                $html2pdf->writeHTML($content);
                $filepath1 = $carpeta3 . "/revicion-$fechaActual.pdf";
                $filepath2 = "/revicion/$revision[propiedad]/3/revicion-$fechaActual.pdf";
                $consultar1 = "INSERT into revision (nombre, ruta, fecha, tipo_revision_id, propiedad_id) Value ('revicion-$fechaActual', '$filepath2', current_time, 3, $revision[propiedad])";
                $preId = parent::queryRegistro($consultar1);
                $html2pdf->output($filepath1, 'F');

                if ($preId > 0) {
                    $consultar2 = "SELECT * from revision where id = $preId";
                    $data = parent::consultarArreglo($consultar2);
                    $res = array('status' => 'success', 'message' => 'Se registro la revisión correctamente', 'data' => $data);
                } else {
                    $res = array('status' => 'error', 'message' => 'Ocurrio un error');
                }
                parent::cerrar();
                return $res;
            } catch (Html2PdfException $e) {
                $html2pdf->clean();
                $formatter = new ExceptionFormatter($e);
                parent::cerrar();
                return $formatter->getHtmlMessage();
            }
        }

        public function saveRevicionVisita2($revision) {
            try {
                parent::conectar();

                $carpeta1 = parent::getRutaService() . '/revicion';
                if (!file_exists($carpeta1)) {
                    mkdir($carpeta1, 0777, TRUE);
                }
                $carpeta2 = $carpeta1 . "/$revision[propiedad]";
                if (!file_exists($carpeta2)) {
                    mkdir($carpeta2, 0777, TRUE);
                }
                $carpeta3 = $carpeta2 . "/3";
                if (!file_exists($carpeta3)) {
                    mkdir($carpeta3, 0777, TRUE);
                }

                $fecha = getdate();
                $fechaActual = $fecha[0];

                ob_start();
                include parent::getRutaService() . '/html/revicion2.html';
                $content = ob_get_clean();
                $actividad = '';

                $content = str_replace("@hora@", $revision['hora'], $content);
                $content = str_replace("@elaboro@", $revision['elaboro'], $content);
                $content = str_replace("@secto@", $revision['sector'], $content);
                $content = str_replace("@dirigido@", $revision['dirigido'], $content);
                $content = str_replace("@asunto@", $revision['asunto'], $content);
                $content = str_replace("@contenido@", $revision['contenido'], $content);
                $content = str_replace("@objetivo_general@", $revision['observacion_general'], $content);
                for ($i=0; $i < count($revision['foto_observacion']); $i++) { 
                    $element = $revision['foto_observacion'][$i];
                    $x = $i + 1;
                    $foto = '';
                    $actividad = $actividad . "
                        <div class='content-foto-observacion'>
                            <p class='objetico_general'>$element[observacion]</p>
                            <div class='content-imagen'>
                                @foto@
                            </div>
                        </div>
                    ";
                    for ($j=0; $j < count($element['foto']); $j++) {
                        $auxFoto = $element['foto'][$j];
                        $pos = strrpos($auxFoto, "base64,");
                        if ($pos) {
                            $carpeta4 = parent::getRutaService() . '/imagen';
                            if (!file_exists($carpeta4)) {
                                mkdir($carpeta4, 0777, TRUE);
                            }
                            $carpeta5 = $carpeta4 . "/$revision[propiedad]";
                            if (!file_exists($carpeta5)) {
                                mkdir($carpeta5, 0777, TRUE);
                            }
                            $carpeta6 = $carpeta5 . "/3";
                            if (!file_exists($carpeta6)) {
                                mkdir($carpeta6, 0777, TRUE);
                            }
                            $base64 = base64_decode(explode(',', $auxFoto)[1]);
                            $filepath3 = $carpeta6 . "/$j.png";
                            $filepath4 = "https://vino.intermediosdigital.com/imagen/$revision[propiedad]/3/$j.png";
                            file_put_contents($filepath3, $base64);
                            $foto = $foto . "<img src='$filepath4'>";
                        }
                    }
                    $actividad = str_replace("@foto@", $foto, $actividad);
                }
                $content = str_replace("@actividad@", $actividad, $content);
                
                $html2pdf = new Html2Pdf('P', 'A4', 'fr');
                $html2pdf->writeHTML($content);
                $filepath1 = $carpeta3 . "/revicion-$fechaActual.pdf";
                $filepath2 = "/revicion/$revision[propiedad]/3/revicion-$fechaActual.pdf";
                $consultar1 = "INSERT into revision (nombre, ruta, fecha, tipo_revision_id, propiedad_id) Value ('revicion-$fechaActual', '$filepath2', current_time, 3, $revision[propiedad])";
                $preId = parent::queryRegistro($consultar1);
                $html2pdf->output($filepath1, 'F');

                if ($preId > 0) {
                    $consultar2 = "SELECT * from revision where id = $preId";
                    $data = parent::consultarArreglo($consultar2);
                    $res = array('status' => 'success', 'message' => 'Se registro la revisión correctamente', 'data' => $data);
                } else {
                    $res = array('status' => 'error', 'message' => 'Ocurrio un error');
                }
                parent::cerrar();
                return $res;
            } catch (Html2PdfException $e) {
                $html2pdf->clean();
                $formatter = new ExceptionFormatter($e);
                parent::cerrar();
                return $formatter->getHtmlMessage();
            }
        }
    }