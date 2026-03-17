<?php
$myFile = "oraculos_stats.json";

// Recibir datos del JS
$input = json_decode(file_get_contents("php://input"), true);

$name = isset($input['name']) ? $input['name'] : '';
$url = isset($input['url']) ? $input['url'] : '';

if ($name === '' || $url === '') {
    echo json_encode(["error" => "Datos incompletos"]);
    exit;
}

// Leer datos existentes
if (file_exists($myFile) && filesize($myFile) > 0) {
    $data = json_decode(file_get_contents($myFile), true);
} else {
    $data = [];
}

$found = false;

// Buscar si ya existe ese oráculo
foreach ($data as &$oraculo) {
    if ($oraculo['url'] === $url) {
        $oraculo['numPreguntas']++;
        $found = true;
        break;
    }
}

// Si no existe, crearlo
if (!$found) {
    $data[] = [
        "name" => $name,
        "url" => $url,
        "numPreguntas" => 1
    ];
}

// Guardar
file_put_contents($myFile, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

// Respuesta opcional
echo json_encode($data, JSON_UNESCAPED_UNICODE);
?>