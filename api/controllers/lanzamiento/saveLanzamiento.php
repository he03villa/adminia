<?php

    include '../cors.php';
    include '../error.php';
    require '../../models/lanzamiento.php';
    $datos = json_decode(file_get_contents("php://input"),TRUE);
    $post = $_POST;
    if ($datos == null) $reques = $post;
    else $reques = $datos;
    $lanzamiento = new Lanzamineto();
    $res = $lanzamiento->saveLanzamiento($reques);
    echo json_encode($res);