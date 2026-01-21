<?php
/**
 * Guarda una data URL en img/sucursales/<id>.<ext>
 * Devuelve la ruta relativa (por ejemplo "img/sucursales/ABC.jpg")
 */

function guardaImagenSucursalDesdeDataUrl(string $id, string $dataUrl): string {
    // Detectar mime y extensión
    if (!preg_match('/^data:([^;]+);base64,(.*)$/', $dataUrl, $m)) {
        throw new Exception("Imagen con formato inválido.");
    }
    $mime = $m[1];       // ejemplo: image/jpeg
    $base64 = $m[2];

    // Mapear mime a extensión
    $map = [
        'image/jpeg' => 'jpg',
        'image/jpg'  => 'jpg',
        'image/png'  => 'png',
        'image/gif'  => 'gif',
        // agrega más si lo necesitas
    ];
    if (!isset($map[$mime])) {
        throw new Exception("Tipo de imagen no soportado: $mime");
    }
    $ext = $map[$mime];

    $dir = __DIR__ . '/../../img/sucursales';
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }

    // Normalizar id para nombre de fichero (evitar chars raros)
    $safeId = preg_replace('/[^A-Za-z0-9_\-]/', '_', $id);
    $filename = "$safeId.$ext";
    $path = $dir . '/' . $filename;

    $data = base64_decode($base64);
    if ($data === false) {
        throw new Exception("Base64 inválido.");
    }
    file_put_contents($path, $data);

    // devolver ruta relativa usada por el cliente
    return "img/sucursales/$filename";
}
