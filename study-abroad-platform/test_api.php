<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$rawInput = file_get_contents("php://input");
$data = json_decode($rawInput, true);

echo json_encode([
    "success" => true,
    "message" => "Test endpoint working",
    "received" => [
        "method" => $_SERVER['REQUEST_METHOD'],
        "raw_input" => $rawInput,
        "decoded_data" => $data,
        "post" => $_POST,
        "get" => $_GET
    ]
]);
?>
