<?php
header('Content-Type: application/json; charset=utf-8');

$myFile = "calculadora_amor.json";

// ---- Entrada ----
$input = json_decode(file_get_contents("php://input"), true);
$nombre1 = isset($input['nombre1']) ? $input['nombre1'] : '';
$nombre2 = isset($input['nombre2']) ? $input['nombre2'] : '';

// ---- Normalización (idéntica a la del JS de respaldo) ----
function normaliza($s) {
    $s = trim($s);
    $s = function_exists('mb_strtolower') ? mb_strtolower($s, 'UTF-8') : strtolower($s);
    $s = preg_replace('/\s+/u', ' ', $s);        // colapsa espacios internos
    $s = function_exists('mb_substr') ? mb_substr($s, 0, 40, 'UTF-8') : substr($s, 0, 40);
    return $s;
}

$k1 = normaliza($nombre1);
$k2 = normaliza($nombre2);

if ($k1 === '' || $k2 === '') {
    echo json_encode(["error" => "Datos incompletos"]);
    exit;
}

// El orden importa: Paco|Juani != Juani|Paco
$clave = $k1 . '|' . $k2;

// ---- Generación determinista (FNV-1a 32 bit sobre bytes UTF-8) ----
// Debe coincidir byte a byte con la implementación del JS de respaldo.
function fnv1a($str) {
    $hash = 2166136261;                          // 0x811c9dc5
    $len = strlen($str);                         // bytes, no caracteres
    for ($i = 0; $i < $len; $i++) {
        $hash ^= ord($str[$i]);
        $hash = ($hash * 16777619) & 0xFFFFFFFF; // 0x01000193, overflow 32 bit
    }
    return $hash;
}

function valorParametro($clave, $param) {
    return 45 + (fnv1a($clave . '|' . $param) % 55); // rango 45..99
}

$params = ['amor', 'amistad', 'afinidad', 'sexo', 'pasion'];

// ---- Lectura + escritura con bloqueo (evita corrupción en consultas simultáneas) ----
$fp = fopen($myFile, 'c+');
if ($fp === false) {
    // Si no se puede persistir, al menos devolvemos el resultado determinista
    $valores = [];
    foreach ($params as $p) $valores[$p] = valorParametro($clave, $p);
    echo json_encode(["valores" => $valores, "cached" => false], JSON_UNESCAPED_UNICODE);
    exit;
}

flock($fp, LOCK_EX);
$contenido = stream_get_contents($fp);
$data = ($contenido !== '') ? json_decode($contenido, true) : [];
if (!is_array($data)) $data = [];

if (isset($data[$clave]) && isset($data[$clave]['valores'])) {
    // Ya existía: devolvemos lo guardado
    $data[$clave]['consultas'] = (isset($data[$clave]['consultas']) ? $data[$clave]['consultas'] : 1) + 1;
    $registro = $data[$clave];
    $cached = true;
} else {
    // Nueva pareja: generamos, guardamos
    $valores = [];
    foreach ($params as $p) $valores[$p] = valorParametro($clave, $p);
    $registro = [
        "nombre1"   => $k1,
        "nombre2"   => $k2,
        "valores"   => $valores,
        "consultas" => 1,
        "fecha"     => date('c')
    ];
    $data[$clave] = $registro;
    $cached = false;
}

ftruncate($fp, 0);
rewind($fp);
fwrite($fp, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
flock($fp, LOCK_UN);
fclose($fp);

echo json_encode([
    "valores" => $registro['valores'],
    "cached"  => $cached
], JSON_UNESCAPED_UNICODE);
?>
