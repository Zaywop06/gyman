<?php

require_once __DIR__ . "/BAD_REQUEST.php";
require_once __DIR__ . "/ProblemDetails.php";

function validaUbicacionLink(false|string $ubicacionLink)
{

    if ($ubicacionLink === false)
        throw new ProblemDetails(
            status: BAD_REQUEST,
            title: "Falta el link de la ubicación.",
            type: "/error/faltaubicacionlink.html",
            detail: "La solicitud no tiene el valor del link de la ubicación."
        );

    $trimUbicacionLink = trim($ubicacionLink);

    if ($trimUbicacionLink === "")
        throw new ProblemDetails(
            status: BAD_REQUEST,
            title: "Link de ubicación en blanco.",
            type: "/error/ubicacionlinkenblanco.html",
            detail: "Pon texto en el campo link de la ubicación.",
        );

    return $trimUbicacionLink;
}
