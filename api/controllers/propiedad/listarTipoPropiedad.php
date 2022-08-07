<?php

    include '../cors.php';
    include '../error.php';
    require '../../models/propiedad.php';
    $popiedad = new Propiedad();
    $res = $popiedad->listarTipoPropiedad();
    echo json_encode($res);