<?php
// localhost
$hostname = "HOSTING";
$hostusername = "DATABASE_USERNAME";
$hostpassword = "DATABASE_PASSWORD";
$dbname = "DATABASE_NAME";

try {
    $conn = new PDO("mysql:host=$hostname;dbname=$dbname;charset=utf8", $hostusername, $hostpassword);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    date_default_timezone_set('Asia/Bangkok');
} catch (PDOException $error) {
    echo "Connect database fail" . $error->getMessage();
    exit();
}
