import { bdEjecuta } from "../../lib/js/bdEjecuta.js";
import { exportaAHtml } from "../../lib/js/exportaAHtml.js";
import { validaId } from "../modelo/validaId.js";
import { validaNombre } from "../modelo/validaNombre.js";
import { validaUbicacion } from "../modelo/validaUbicacion.js";
import { validaImagen } from "../modelo/validaImagen.js";
import { validaEstado } from "../modelo/validaEstado.js";
import { ALMACEN_SUCURSAL, Bd } from "./Bd.js";
import { sucursalBusca } from "./sucursalBusca.js";

/**
 * @param { import("../modelo/SUCURSAL.js").SUCURSAL } modelo
 */
export async function sucursalModifica(modelo) {
  validaNombre(modelo.SUC_NOMBRE);
  if (modelo.SUC_ID === undefined)
    throw new Error(`Falta SUC_ID de ${modelo.SUC_NOMBRE}.`);
  validaUbicacion(modelo.SUC_UBICACION);
  validaImagen(modelo.SUC_IMAGEN);
  validaEstado(modelo.SUC_ESTADO);
  validaId(modelo.SUC_ID);
  const anterior = await sucursalBusca(modelo.SUC_ID);
  if (anterior !== undefined) {
    modelo.SUC_MODIFICACION = Date.now();
    modelo.SUC_ELIMINADA = 0;
    return bdEjecuta(Bd, [ALMACEN_SUCURSAL], (transaccion) => {
      const almacenSucursal = transaccion.objectStore(ALMACEN_SUCURSAL);
      almacenSucursal.put(modelo);
    });
  }
}

exportaAHtml(sucursalModifica);
