import { validaSucursal } from "./validaSucursal.js";

/**
 * @param { any } objetos
 * @returns {import("./SUCURSAL.js").SUCURSAL[]}
 */
export function validaSucursales(objetos) {
  if (!Array.isArray(objetos)) throw new Error("no se recibió un arreglo.");
  /**
   * @type {import("./SUCURSAL.js").SUCURSAL[]}
   */
  const arreglo = [];
  for (const objeto of objetos) {
    arreglo.push(validaSucursal(objeto));
  }
  return arreglo;
}
