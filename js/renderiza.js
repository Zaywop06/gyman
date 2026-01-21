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
    const imagen = htmlentities(modelo.SUC_IMAGEN);
    const searchParams = new URLSearchParams([["id", modelo.SUC_ID]]);
    const params = htmlentities(searchParams.toString());
    render +=
      /* html */
      `<a href="modifica.html?${params}" style="text-decoration: none;">
        <figure>
          <img alt="GYMan ${nombre}" src="${imagen}" />
        </figure>
        <span class="headline" style="text-decoration: none;">${nombre}</span>
        <span class="supporting">${ubicacion}</span>
      </a>`;
  }
  lista.innerHTML = render;
}

exportaAHtml(renderiza);
