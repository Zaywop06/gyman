<?php

require_once __DIR__ . "/BAD_REQUEST.php";
require_once __DIR__ . "/ProblemDetails.php";

function validaUbicacion(false|string $ubicacion)
{

    if ($ubicacion === false)
        throw new ProblemDetails(
            status: BAD_REQUEST,
            title: "Falta la ubicación.",
            type: "/error/faltaubicacion.html",
            detail: "La solicitud no tiene el valor de ubicación."
        );

    $trimUbicacion = trim($ubicacion);

    if ($trimUbicacion === "")
        throw new ProblemDetails(
            status: BAD_REQUEST,
            title: "Ubicación en blanco.",
            type: "/error/ubicacionenblanco.html",
            detail: "Pon texto en el campo ubicación.",
        );

    return $trimUbicacion;
}
