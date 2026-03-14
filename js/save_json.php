<?php
$myFile = "preguntas_oraculo.json";
$hoy = date("d-m-Y"); // fecha de hoy en formato "dd-mm-YYYY"

// Leer datos existentes
if (file_exists($myFile) && filesize($myFile) > 0) {
    $data = json_decode(file_get_contents($myFile), true);
    $contadorTotal = isset($data['contadorTotal']) ? $data['contadorTotal'] : 0;
    $contadorDiario = isset($data['contadorDiario']) ? $data['contadorDiario'] : [];
} else {
    $contadorTotal = 0;
    $contadorDiario = [];
}

// Incrementar contador total
$contadorTotal++;

// Incrementar contador del día
$found = false;
foreach ($contadorDiario as &$diaData) {
    if ($diaData['dia'] === $hoy) {
        $diaData['numPreguntas']++;
        $found = true;
        break;
    }
}
if (!$found) {
    $contadorDiario[] = ['dia' => $hoy, 'numPreguntas' => 1];
}

// Guardar datos actualizados
file_put_contents($myFile, json_encode([
    'contadorTotal' => $contadorTotal,
    'contadorDiario' => $contadorDiario
], JSON_PRETTY_PRINT));

// Devolver JSON actualizado
echo json_encode([
    'contadorTotal' => $contadorTotal,
    'contadorDiario' => $contadorDiario
]);
?>