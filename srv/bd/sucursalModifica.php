<?php

require_once __DIR__ . "/../../lib/php/validaNombre.php";
require_once __DIR__ . "/../../lib/php/validaUbicacion.php";
require_once __DIR__ . "/../../lib/php/validaImagen.php";
require_once __DIR__ . "/../../lib/php/validaEstado.php";
require_once __DIR__ . "/../../lib/php/update.php";
require_once __DIR__ . "/Bd.php";
require_once __DIR__ . "/borraImagenSucursal.php";
require_once __DIR__ . "/guardaImagenSucursal.php";
require_once __DIR__ . "/sucursalBusca.php";
require_once __DIR__ . "/../modelo/TABLA_SUCURSAL.php";
require_once __DIR__ . "/../modelo/validaId.php";

/**
 * @param array{
 *   SUC_ID: string,
 *   SUC_NOMBRE: string,
 *   SUC_UBICACION: string,
 *   SUC_IMAGEN: string,
 *   SUC_ESTADO: string,
 *   SUC_MODIFICACION: int,
 *   SUC_ELIMINADA: int
 *  } $modelo
 */
function sucursalModifica(array $modelo)
{
    validaId($modelo[SUC_ID]);
    validaNombre($modelo[SUC_NOMBRE]);
    validaUbicacion($modelo[SUC_UBICACION]);
    validaImagen($modelo[SUC_IMAGEN]);
    validaEstado($modelo[SUC_ESTADO]);

    if (isset($modelo[SUC_IMAGEN]) && is_string($modelo[SUC_IMAGEN])) {
        if (preg_match('/^data:[^;]+;base64,/', $modelo[SUC_IMAGEN])) {
            $anterior = sucursalBusca($modelo[SUC_ID]);
            if ($anterior && isset($anterior[SUC_IMAGEN])) {
                borraImagenSucursal($anterior[SUC_IMAGEN]);
            }
            $modelo[SUC_IMAGEN] = guardaImagenSucursalDesdeDataUrl($modelo[SUC_ID], $modelo[SUC_IMAGEN]);
        }
    }

    update(
        pdo: Bd::pdo(),
        table: SUCURSAL,
        set: $modelo,
        where: [SUC_ID => $modelo[SUC_ID]]
    );
}
