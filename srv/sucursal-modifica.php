<?php

require_once __DIR__ . "/../lib/php/ejecutaServicio.php";
require_once __DIR__ . "/../lib/php/recuperaIdEntero.php";
require_once __DIR__ . "/../lib/php/recuperaTexto.php";
require_once __DIR__ . "/../lib/php/validaNombre.php";
require_once __DIR__ . "/../lib/php/validaUbicacion.php";
require_once __DIR__ . "/../lib/php/validaUbicacionLink.php";
require_once __DIR__ . "/../lib/php/validaImagen.php";
require_once __DIR__ . "/../lib/php/validaImagenes.php";
require_once __DIR__ . "/../lib/php/validaEstado.php";
require_once __DIR__ . "/../lib/php/update.php";
require_once __DIR__ . "/../lib/php/devuelveJson.php";
require_once __DIR__ . "/Bd.php";
require_once __DIR__ . "/TABLA_SUCURSAL.php";

ejecutaServicio(function () {

    $id = recuperaIdEntero("id");
    $nombre = recuperaTexto("nombre");
    $ubicacion = recuperaTexto("ubicacion");
    $ubicacionLink = recuperaTexto("ubicacionLink");
    $imagen = recuperaTexto("imagen");
    $imagenes = recuperaTexto("imagenes");
    $estado = recuperaTexto("estado");

    $nombre = validaNombre($nombre);
    $ubicacion = validaUbicacion($ubicacion);
    $ubicacionLink = validaUbicacionLink($ubicacionLink);
    $imagen = validaImagen($imagen);
    $imagenes = validaImagenes($imagenes);
    $estado = validaEstado($estado);

    update(
        pdo: Bd::pdo(),
        table: SUCURSAL,
        set: [SUC_NOMBRE => $nombre, SUC_UBICACION => $ubicacion, SUC_UBICACION_LINK => $ubicacionLink, SUC_IMAGEN => $imagen, SUC_IMAGENES => $imagenes, SUC_ESTADO => $estado],
        where: [SUC_ID => $id]
    );

    devuelveJson([
        "id" => ["value" => $id],
        "nombre" => ["value" => $nombre],
        "ubicacion" => ["value" => $ubicacion],
        "ubicacionLink" => ["value" => $ubicacionLink],
        "imagen" => ["value" => $imagen],
        "imagenes" => ["value" => $imagenes],
        "estado" => ["value" => $estado],
    ]);
});
