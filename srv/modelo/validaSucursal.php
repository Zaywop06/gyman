<?php

require_once __DIR__ . "/../../lib/php/BAD_REQUEST.php";
require_once __DIR__ . "/../../lib/php/validaJson.php";
require_once __DIR__ . "/../../lib/php/ProblemDetails.php";
require_once __DIR__ . "/TABLA_SUCURSAL.php";

function validaSucursal($objeto)
{

    $objeto = validaJson($objeto);

    if (!isset($objeto->SUC_ID) || !is_string($objeto->SUC_ID))
        throw new ProblemDetails(
            status: BAD_REQUEST,
            title: "El id debe ser texto.",
            type: "/error/idincorrecto.html",
        );

    if (!isset($objeto->SUC_NOMBRE) || !is_string($objeto->SUC_NOMBRE))
        throw new ProblemDetails(
            status: BAD_REQUEST,
            title: "El nombre debe ser texto.",
            type: "/error/nombreincorrecto.html",
        );

    if (!isset($objeto->SUC_UBICACION) || !is_string($objeto->SUC_UBICACION))
        throw new ProblemDetails(
            status: BAD_REQUEST,
            title: "La ubicación debe ser texto.",
            type: "/error/ubicacionincorrecta.html",
        );

    if (!isset($objeto->SUC_ESTADO) || !is_string($objeto->SUC_ESTADO))
        throw new ProblemDetails(
            status: BAD_REQUEST,
            title: "El estado debe ser texto.",
            type: "/error/estadoincorrecto.html",
        );

    if (!isset($objeto->SUC_MODIFICACION)  || !is_int($objeto->SUC_MODIFICACION))
        throw new ProblemDetails(
            status: BAD_REQUEST,
            title: "La modificacion debe ser número.",
            type: "/error/modificacionincorrecta.html",
        );

    if (!isset($objeto->SUC_ELIMINADA) || !is_int($objeto->SUC_ELIMINADA))
        throw new ProblemDetails(
            status: BAD_REQUEST,
            title: "El campo eliminado debe ser entero.",
            type: "/error/eliminadoincorrecto.html",
        );

    return [
        SUC_ID => $objeto->SUC_ID,
        SUC_NOMBRE => $objeto->SUC_NOMBRE,
        SUC_UBICACION => $objeto->SUC_UBICACION,
        SUC_ESTADO => $objeto->SUC_ESTADO,
        SUC_MODIFICACION => $objeto->SUC_MODIFICACION,
        SUC_ELIMINADA => $objeto->SUC_ELIMINADA
    ];
}
