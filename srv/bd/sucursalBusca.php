<?php

require_once __DIR__ . "/../../lib/php/selectFirst.php";
require_once __DIR__ . "/Bd.php";
require_once __DIR__ . "/../modelo/TABLA_SUCURSAL.php";

/**
 * @return false | array{
 *   SUC_ID: string,
 *   SUC_NOMBRE: string,
 *   SUC_UBICACION: string,
 *   SUC_IMAGEN: string,
 *   SUC_ESTADO: string,
 *   SUC_MODIFICACION: int,
 *   SUC_ELIMINADA: int
 *  }
 */
function sucursalBusca(string $id): false|array
{
    return selectFirst(
        pdo: Bd::pdo(),
        from: SUCURSAL,
        where: [SUC_ID => $id]
    );
}
