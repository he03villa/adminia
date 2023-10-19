<?php

    include '../cors.php';
    include '../error.php';
    require '../../models/pagos.php';
    $pagos = new Pagos();
    $res = $pagos->createTransacciones();
    echo $res;