<?php

    include '../cors.php';
    include '../error.php';
    require '../../models/usuario.php';
    $datos = json_decode(file_get_contents("php://input"),TRUE);
    $post = $_POST;
    if ($datos == null) $reques = $post;
    else $reques = $datos;
    $user = new Usuario();
    $res = $user->login($reques);
    echo json_encode($res);