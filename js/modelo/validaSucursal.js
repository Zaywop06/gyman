/**
 * @param { any } objeto
 * @returns {import("./SUCURSAL.js").SUCURSAL}
 */
export function validaSucursal(objeto) {
  if (typeof objeto.SUC_ID !== "string")
    throw new Error("El id debe ser texto.");

  if (typeof objeto.SUC_NOMBRE !== "string")
    throw new Error("El nombre debe ser texto.");

  if (typeof objeto.SUC_UBICACION !== "string")
    throw new Error("La ubicación debe ser texto.");

  if (typeof objeto.SUC_ESTADO !== "string")
    throw new Error("El estado debe ser texto.");

  if (typeof objeto.SUC_MODIFICACION !== "number")
    throw new Error("El campo modificacion debe ser número.");

  if (typeof objeto.SUC_ELIMINADA !== "number")
    throw new Error("El campo eliminado debe ser número.");

  return objeto;
}
