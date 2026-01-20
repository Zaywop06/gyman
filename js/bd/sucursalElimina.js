import { bdEjecuta } from "../../lib/js/bdEjecuta.js";
import { exportaAHtml } from "../../lib/js/exportaAHtml.js";
import { ALMACEN_SUCURSAL, Bd } from "./Bd.js";
import { sucursalBusca } from "./sucursalBusca.js";

/**
 * @param { string } id
 */
export async function sucursalElimina(id) {
  const modelo = await sucursalBusca(id);
  if (modelo !== undefined) {
    modelo.SUC_MODIFICACION = Date.now();
    modelo.SUC_ELIMINADA = 1;
    return bdEjecuta(Bd, [ALMACEN_SUCURSAL], (transaccion) => {
      const almacenSucursal = transaccion.objectStore(ALMACEN_SUCURSAL);
      almacenSucursal.put(modelo);
    });
  }
}

exportaAHtml(sucursalElimina);
