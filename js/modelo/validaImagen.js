/**
 * @param {string} imagen
 */
export function validaImagen(imagen) {
  if (imagen === "") throw new Error("Falta la imagen.");
}
