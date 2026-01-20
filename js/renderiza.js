import { exportaAHtml } from "../lib/js/exportaAHtml.js";
import { htmlentities } from "../lib/js/htmlentities.js";

/**
 * @param {HTMLUListElement} lista
 * @param {import("./modelo/SUCURSAL.js").SUCURSAL[]} sucursales
 */
export function renderiza(lista, sucursales) {
  let render = "";
  for (const modelo of sucursales) {
    if (modelo.SUC_ID === undefined)
      throw new Error(`Falta SUC_ID de ${modelo.SUC_NOMBRE}.`);
    const nombre = htmlentities(modelo.SUC_NOMBRE);
    const ubicacion = htmlentities(modelo.SUC_UBICACION);
    const estado = htmlentities(modelo.SUC_ESTADO);
    const searchParams = new URLSearchParams([["id", modelo.SUC_ID]]);
    const params = htmlentities(searchParams.toString());
    render +=
      /* html */
      `<li class="md-two-line">
        <p>
          <a href="modifica.html?${params}" style="text-decoration: none;">
            <span class="headline">${nombre}</span>
            <span class="supporting">Ubicación: ${ubicacion}</span>
            <span class="supporting">Estado: ${estado}</span>
          </a>
        </p>
      </li>`;
  }
  lista.innerHTML = render;
}

exportaAHtml(renderiza);
