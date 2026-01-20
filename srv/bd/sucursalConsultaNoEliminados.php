<?php

require_once __DIR__ . "/../../lib/php/select.php";
require_once __DIR__ . "/Bd.php";
require_once __DIR__ . "/../modelo/TABLA_SUCURSAL.php";

/**
 * @return array{
 *   SUC_ID: string,
 *   SUC_NOMBRE: string,
 *   SUC_UBICACION: string,
 *   SUC_ESTADO: string,
 *   SUC_MODIFICACION: int,
 *   SUC_ELIMINADA: int
 *  }[]
 */
function sucursalConsultaNoEliminados()
{
    return select(
        pdo: Bd::pdo(),
        from: SUCURSAL,
        where: [SUC_ELIMINADA => 0],
        orderBy: SUC_NOMBRE
    );
}
