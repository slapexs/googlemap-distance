<?php

include_once('./condb.php');
    $get = "SELECT * FROM `locations` ORDER BY `id` ASC";
    $qget = $conn->prepare($get);
    $qget->execute();
    $list_locations = [];

    while ($rget = $qget->fetch()) {
        array_push($list_locations, [$rget['lat'], $rget['lng'], $rget['title']]);
    }

    $response = [
        'status' => 'OK',
        'data' => $list_locations
    ];

    echo json_encode($response);

