<?php

require_once __DIR__ . "/../lib/php/ejecutaServicio.php";
require_once __DIR__ . "/../lib/php/recuperaJson.php";
require_once __DIR__ . "/../lib/php/devuelveJson.php";
require_once __DIR__ . "/../lib/php/ProblemDetails.php";
require_once __DIR__ . "/../lib/php/devuelveProblemDetails.php";
require_once __DIR__ . "/../lib/php/devuelveErrorInterno.php";
require_once __DIR__ . "/modelo/TABLA_SUCURSAL.php";
require_once __DIR__ . "/modelo/validaSucursal.php";
require_once __DIR__ . "/bd/sucursalAgrega.php";
require_once __DIR__ . "/bd/sucursalBusca.php";
require_once __DIR__ . "/bd/sucursalConsultaNoEliminados.php";
require_once __DIR__ . "/bd/sucursalModifica.php";

ejecutaServicio(function () {

    $lista = recuperaJson();

    if (!is_array($lista)) {
        $lista = [];
    }

    foreach ($lista as $modelo) {
        $modeloEnElCliente = validaSucursal($modelo);
        $modeloEnElServidor = sucursalBusca($modeloEnElCliente[SUC_ID]);

        if ($modeloEnElServidor === false) {

            /* CONFLICTO: El modelo no ha estado en el servidor.
            * AGREGARLO solamente si no está eliminado. */
            if ($modeloEnElCliente[SUC_ELIMINADA] === 0) {
                sucursalAgrega($modeloEnElCliente);
            }
        } elseif (
            $modeloEnElServidor[SUC_ELIMINADA] === 0
            && $modeloEnElCliente[SUC_ELIMINADA] === 1
        ) {

            /* CONFLICTO: El registro está en el servidor, donde no se ha eliminado, pero
            * ha sido eliminado en el cliente.
            * Gana el cliente, porque optamos por no revivir lo eliminado. */
            sucursalModifica($modeloEnElCliente);
        } else if (
            $modeloEnElCliente[SUC_ELIMINADA] === 0
            && $modeloEnElServidor[SUC_ELIMINADA] === 0
        ) {

            /* CONFLICTO: Registros en el servidor y en el cliente. Pueden ser
            * diferentes.
            * GANA FECHA MÁS GRANDE. Cuando gana el servidor, no se hace nada. */
            if (
                $modeloEnElCliente[SUC_MODIFICACION] >
                $modeloEnElServidor[SUC_MODIFICACION]
            ) {
                // La versión del cliente es más nueva y prevalece.
                sucursalModifica($modeloEnElCliente);
            }
        }
    }

    $lista = sucursalConsultaNoEliminados();

    devuelveJson($lista);
});
