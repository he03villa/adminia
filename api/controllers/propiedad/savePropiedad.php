<?php

    include '../cors.php';
    include '../error.php';
    require '../../models/propiedad.php';
    $datos = json_decode(file_get_contents("php://input"),TRUE);
    $post = $_POST;
    if ($datos == null) $reques = $post;
    else $reques = $datos;
    $popiedad = new Propiedad();
    $res = $popiedad->savePropiedad($reques);
    echo json_encode($res);