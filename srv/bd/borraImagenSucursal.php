<?php

/**
 * Borra la imagen física de una sucursal si existe
 */
function borraImagenSucursal(?string $rutaRelativa): void
{
    if (!$rutaRelativa) {
        return;
    }

    // Evitar paths maliciosos
    if (str_contains($rutaRelativa, '..')) {
        return;
    }

    $rutaAbsoluta = __DIR__ . '/../../' . $rutaRelativa;

    if (is_file($rutaAbsoluta)) {
        unlink($rutaAbsoluta);
    }
}
