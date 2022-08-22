<?php

    include '../cors.php';
    include '../error.php';
    require '../../models/muro.php';
    $datos = json_decode(file_get_contents("php://input"),TRUE);
    $post = $_POST;
    if ($datos == null) $reques = $post;
    else $reques = $datos;
    $muro = new Muro();
    $res = $muro->updateMuro($reques);
    echo json_encode($res);