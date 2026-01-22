<?php

/**
 * Borra la imagen física de una sucursal si existe
 */
function borraImagenSucursal(?string $rutaRelativa): void
{
    if (!$rutaRelativa) {
        return;
    }

    // Seguridad
    if (str_contains($rutaRelativa, '..')) {
        return;
    }

    // Ruta base REAL del proyecto
    $base = realpath(__DIR__ . '/../../');

    if (!$base) {
        return;
    }

    $rutaAbsoluta = $base . '/' . ltrim($rutaRelativa, '/');

    if (is_file($rutaAbsoluta)) {
        unlink($rutaAbsoluta);
    }
}

