<?php

    include '../cors.php';
    include '../error.php';
    require '../../models/pagos.php';
    $datos = json_decode(file_get_contents("php://input"),TRUE);
    $post = $_POST;
    if ($datos == null) $reques = $post;
    else $reques = $datos;
    $pagos = new Pagos();
    $res = $pagos->updatePagos($reques);
    echo json_encode($res);