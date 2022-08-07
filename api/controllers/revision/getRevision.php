<?php

    include '../cors.php';
    include '../error.php';
    require '../../models/revision.php';
    $datos = json_decode(file_get_contents("php://input"),TRUE);
    $post = $_POST;
    if ($datos == null) $reques = $post;
    else $reques = $datos;
    $revision = new Revision();
    $res = $revision->getRevision($reques);
    echo json_encode($res);