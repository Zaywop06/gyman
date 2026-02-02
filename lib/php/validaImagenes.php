<?php

require_once __DIR__ . "/BAD_REQUEST.php";
require_once __DIR__ . "/ProblemDetails.php";

function validaImagenes(false|string $imagenes)
{

    if ($imagenes === false)
        throw new ProblemDetails(
            status: BAD_REQUEST,
            title: "Faltan las imagenes.",
            type: "/error/faltaimagenes.html",
            detail: "La solicitud no tiene el valor de imagenes."
        );

    $trimImagenes = trim($imagenes);

    if ($trimImagenes === "")
        throw new ProblemDetails(
            status: BAD_REQUEST,
            title: "Imagenes en blanco.",
            type: "/error/imagenesenblanco.html",
            detail: "Carga varios archivos de imagen en el campo imagenes.",
        );

    return $trimImagenes;
}
