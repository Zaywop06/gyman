import { bdConsulta } from "../../lib/js/bdConsulta.js";
import { exportaAHtml } from "../../lib/js/exportaAHtml.js";
import { validaSucursal } from "../modelo/validaSucursal.js";
import { ALMACEN_SUCURSAL, Bd } from "./Bd.js";

/**
 * @param {string} id
 */
export async function sucursalBusca(id) {
  return bdConsulta(
    Bd,
    [ALMACEN_SUCURSAL],
    /**
     * @param {(resultado: import("../modelo/SUCURSAL.js").SUCURSAL|undefined)
     *                                                            => any} resolve
     */
    (transaccion, resolve) => {
      /* Pide el primer objeto de ALMACEN_SUCURSAL que tenga como llave
       * primaria el valor del parámetro id. */
      const consulta = transaccion.objectStore(ALMACEN_SUCURSAL).get(id);

      // onsuccess se invoca solo una vez, devolviendo el objeto solicitado.
      consulta.onsuccess = () => {
        /* Se recupera el objeto solicitado usando
         *  consulta.result
         * Si el objeto no se encuentra se recupera undefined. */
        const objeto = consulta.result;
        if (objeto !== undefined) {
          const modelo = validaSucursal(objeto);
          if (modelo.SUC_ELIMINADA === 0) {
            resolve(modelo);
            return;
          }
        }
        resolve(undefined);
      };
    }
  );
}

exportaAHtml(sucursalBusca);
