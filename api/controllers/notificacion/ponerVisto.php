<?php

    include '../cors.php';
    include '../error.php';
    require '../../models/notificacion.php';
    $datos = json_decode(file_get_contents("php://input"),TRUE);
    $post = $_POST;
    if ($datos == null) $reques = $post;
    else $reques = $datos;
    $notificacion = new Notificacion();
    $res = $notificacion->ponerVisto($reques);
    echo json_encode($res);