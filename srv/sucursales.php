<?php

require_once __DIR__ . "/../lib/php/ejecutaServicio.php";
require_once __DIR__ . "/../lib/php/select.php";
require_once __DIR__ . "/../lib/php/devuelveJson.php";
require_once __DIR__ . "/Bd.php";
require_once __DIR__ . "/TABLA_SUCURSAL.php";

ejecutaServicio(function () {

  $lista = select(pdo: Bd::pdo(), from: SUCURSAL, orderBy: SUC_NOMBRE);

  $render = "";
  foreach ($lista as $modelo) {
    $encodeId = urlencode($modelo[SUC_ID]);
    $id = htmlentities($encodeId);
    $nombre = htmlentities($modelo[SUC_NOMBRE]);
    $ubicacion = htmlentities($modelo[SUC_UBICACION]);
    $imagen = htmlentities($modelo[SUC_IMAGEN]);
    $render .=
      "<article class='branch-card'>
        <img
          src='{$imagen}'
          alt='GYMAN {$nombre}'
        />
        <div class='branch-body'>
          <h3>GYMAN {$nombre}</h3>
          <p>{$ubicacion}</p>
          <a class='btn' href='sucursal.html?id=$id'>Ver gimnasio</a>
        </div>
      </article>";
  }

  devuelveJson(["lista" => ["innerHTML" => $render]]);
});
