import { bdEjecuta } from "../../lib/js/bdEjecuta.js";
import { creaIdCliente } from "../../lib/js/creaIdCliente.js";
import { ALMACEN_SUCURSAL, Bd } from "./Bd.js";
import { validaNombre } from "../modelo/validaNombre.js";
import { validaUbicacion } from "../modelo/validaUbicacion.js";
import { validaEstado } from "../modelo/validaEstado.js";
import { exportaAHtml } from "../../lib/js/exportaAHtml.js";

/**
 * @param {import("../modelo/SUCURSAL.js").SUCURSAL} modelo
 */
export async function sucursalAgrega(modelo) {
  validaNombre(modelo.SUC_NOMBRE);
  validaUbicacion(modelo.SUC_UBICACION);
  validaEstado(modelo.SUC_ESTADO);
  modelo.SUC_MODIFICACION = Date.now();
  modelo.SUC_ELIMINADA = 0;
  // Genera id único en internet.
  modelo.SUC_ID = creaIdCliente(Date.now().toString());
  return bdEjecuta(Bd, [ALMACEN_SUCURSAL], (transaccion) => {
    const almacenSucursal = transaccion.objectStore(ALMACEN_SUCURSAL);
    almacenSucursal.add(modelo);
  });
}

exportaAHtml(sucursalAgrega);
