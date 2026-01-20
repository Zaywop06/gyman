import { bdEjecuta } from "../../lib/js/bdEjecuta.js";
import { ALMACEN_SUCURSAL, Bd } from "./Bd.js";

/**
 * Borra el contenido del almacén SUCURSAL y guarda nuevossucursales.
 * @param {import("../modelo/SUCURSAL.js").SUCURSAL[]} nuevossucursales
 */
export async function sucursalesReemplaza(nuevossucursales) {
  return bdEjecuta(Bd, [ALMACEN_SUCURSAL], (transaccion) => {
    const almacenSucursal = transaccion.objectStore(ALMACEN_SUCURSAL);
    almacenSucursal.clear();
    for (const objeto of nuevossucursales) {
      almacenSucursal.add(objeto);
    }
  });
}
