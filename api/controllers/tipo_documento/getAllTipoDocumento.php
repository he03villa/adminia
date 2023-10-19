<?php

    include '../cors.php';
    include '../error.php';
    require '../../models/tipo_documento.php';
    $tipo = new TipoDocumento();
    $res = $tipo->getAllTipoDocumento();
    echo json_encode($res);