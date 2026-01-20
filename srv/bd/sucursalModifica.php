<?php

require_once __DIR__ . "/../../lib/php/validaNombre.php";
require_once __DIR__ . "/../../lib/php/validaUbicacion.php";
require_once __DIR__ . "/../../lib/php/validaEstado.php";
require_once __DIR__ . "/../../lib/php/update.php";
require_once __DIR__ . "/Bd.php";
require_once __DIR__ . "/../modelo/TABLA_SUCURSAL.php";
require_once __DIR__ . "/../modelo/validaId.php";

/**
 * @param array{
 *   SUC_ID: string,
 *   SUC_NOMBRE: string,
 *   SUC_UBICACION: string,
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
    validaEstado($modelo[SUC_ESTADO]);
    update(
        pdo: Bd::pdo(),
        table: SUCURSAL,
        set: $modelo,
        where: [SUC_ID => $modelo[SUC_ID]]
    );
}
