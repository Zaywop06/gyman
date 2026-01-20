import { enviaJson } from "../lib/js/enviaJson.js";
import { exportaAHtml } from "../lib/js/exportaAHtml.js";
import { muestraError } from "../lib/js/muestraError.js";
import { sucursalConsultaTodos } from "./bd/sucursalConsultaTodos.js";
import { sucursalesReemplaza } from "./bd/sucursalesReemplaza.js";
import { esperaUnPocoYSincroniza } from "./esperaUnPocoYSincroniza.js";
import { validaSucursales } from "./modelo/validaSucursales.js";
import { renderiza } from "./renderiza.js";

/**
 * @param {HTMLUListElement} lista
 */
export async function sincroniza(lista) {
  try {
    if (navigator.onLine) {
      const todos = await sucursalConsultaTodos();
      const respuesta = await enviaJson("srv/sincroniza.php", todos);
      const sucursales = validaSucursales(respuesta.body);
      await sucursalesReemplaza(sucursales);
      renderiza(lista, sucursales);
    }
  } catch (error) {
    muestraError(error);
  }
  esperaUnPocoYSincroniza(lista);
}

exportaAHtml(sincroniza);
