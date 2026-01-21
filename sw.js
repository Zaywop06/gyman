/* Este archivo debe estar colocado en la carpeta raíz del sitio.
 *
 * Cualquier cambio en el contenido de este archivo hace que el service
 * worker se reinstale. */

/**
 * Cambia el número de la versión cuando cambia el contenido de los
 * archivos.
 *
 * El número a la izquierda del punto (.), en este caso <q>1</q>, se
 * conoce como número mayor y se cambia cuando se realizan
 * modificaciones grandes o importantes.
 *
 * El número a la derecha del punto (.), en este caso <q>00</q>, se
 * conoce como número menor y se cambia cuando se realizan
 * modificaciones menores.
 */
const VERSION = "3.00";

/**
 * Nombre de la carpeta de caché.
 */
const CACHE = "gyman";

/**
 * Archivos requeridos para que la aplicación funcione fuera de
 * línea.
 */
const ARCHIVOS = [
  "agrega.html",
  "ayuda.html",
  "favicon.ico",
  "index.html",
  "modifica.html",
  "site.webmanifest",
  "css/dark-hc.css",
  "css/dark-mc.css",
  "css/dark.css",
  "css/estilos.css",
  "css/light-hc.css",
  "css/light-mc.css",
  "css/light.css",
  "css/transicion_pestanas.css",
  "error/datosnojson.html",
  "error/eliminadoincorrecto.html",
  "error/errorinterno.html",
  "error/estadoenblanco.html",
  "error/estadoincorrecto.html",
  "error/faltaestado.html",
  "error/faltaid.html",
  "error/faltaimagen.html",
  "error/faltanombre.html",
  "error/faltaubicacion.html",
  "error/idenblanco.html",
  "error/idincorrecto.html",
  "error/imagenenblanco.html",
  "error/imagenincorrecta.html",
  "error/modificacionincorrecta.html",
  "error/nombreenblanco.html",
  "error/nombreincorrecto.html",
  "error/resultadonojson.html",
  "error/sucursalnoencontrada.html",
  "error/ubicacionenblanco.html",
  "error/ubicacionincorrecta.html",
  "img/icono2048.png",
  "img/maskable_icon.png",
  "img/maskable_icon_x128.png",
  "img/maskable_icon_x192.png",
  "img/maskable_icon_x384.png",
  "img/maskable_icon_x48.png",
  "img/maskable_icon_x512.png",
  "img/maskable_icon_x72.png",
  "img/maskable_icon_x96.png",
  "img/screenshot_horizontal.png",
  "img/screenshot_horizontal_2.png",
  "img/screenshot_horizontal_3.png",
  "img/screenshot_horizontal_4.png",
  "img/screenshot_vertical.png",
  "img/screenshot_vertical_2.png",
  "img/screenshot_vertical_3.png",
  "img/screenshot_vertical_4.png",
  "js/configura.js",
  "js/esperaUnPocoYSincroniza.js",
  "js/nav-tab-fixed.js",
  "js/registraServiceWorker.js",
  "js/renderiza.js",
  "js/sincroniza.js",
  "js/bd/Bd.js",
  "js/bd/sucursalAgrega.js",
  "js/bd/sucursalBusca.js",
  "js/bd/sucursalConsultaNoEliminados.js",
  "js/bd/sucursalConsultaTodos.js",
  "js/bd/sucursalElimina.js",
  "js/bd/sucursalesReemplaza.js",
  "js/bd/sucursalModifica.js",
  "js/modelo/SUCURSAL.js",
  "js/modelo/validaEstado.js",
  "js/modelo/validaId.js",
  "js/modelo/validaImagen.js",
  "js/modelo/validaNombre.js",
  "js/modelo/validaSucursal.js",
  "js/modelo/validaSucursales.js",
  "js/modelo/validaUbicacion.js",
  "lib/css/material-symbols-outlined.css",
  "lib/css/md-cards.css",
  "lib/css/md-fab-primary.css",
  "lib/css/md-filled-text-field.css",
  "lib/css/md-image-preview.css",
  "lib/css/md-list.css",
  "lib/css/md-menu.css",
  "lib/css/md-ripple.css",
  "lib/css/md-segmented-button.css",
  "lib/css/md-standard-icon-button.css",
  "lib/css/md-tab.css",
  "lib/css/md-top-app-bar.css",
  "lib/css/roboto.css",
  "lib/fonts/MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].codepoints",
  "lib/fonts/MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].ttf",
  "lib/fonts/MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].woff2",
  "lib/fonts/roboto-v32-latin-regular.woff2",
  "lib/js/abreElementoHtml.js",
  "lib/js/bdConsulta.js",
  "lib/js/bdEjecuta.js",
  "lib/js/cierraElementoHtml.js",
  "lib/js/consumeJson.js",
  "lib/js/creaIdCliente.js",
  "lib/js/enviaJson.js",
  "lib/js/exportaAHtml.js",
  "lib/js/getAttribute.js",
  "lib/js/htmlentities.js",
  "lib/js/muestraError.js",
  "lib/js/muestraObjeto.js",
  "lib/js/ProblemDetails.js",
  "lib/js/querySelector.js",
  "lib/js/resaltaSiEstasEn.js",
  "lib/js/submitForm.js",
  "lib/js/const/ES_APPLE.js",
  "lib/js/custom/md-overflow-button.js",
  "lib/js/custom/md-overflow-menu.js",
  "lib/js/custom/md-top-app-bar.js",
  "material-tokens/css/baseline.css",
  "material-tokens/css/colors.css",
  "material-tokens/css/elevation.css",
  "material-tokens/css/motion.css",
  "material-tokens/css/palette.css",
  "material-tokens/css/shape.css",
  "material-tokens/css/state.css",
  "material-tokens/css/typography.css",
  "material-tokens/css/theme/dark.css",
  "material-tokens/css/theme/light.css",
  "ungap/custom-elements.js",
  "/",
];

// Verifica si el código corre dentro de un service worker.
if (self instanceof ServiceWorkerGlobalScope) {
  // Evento al empezar a instalar el servide worker,
  self.addEventListener("install", (/** @type {ExtendableEvent} */ evt) => {
    console.log("El service worker se está instalando.");
    evt.waitUntil(llenaElCache());
  });

  // Evento al solicitar información a la red.
  self.addEventListener("fetch", (/** @type {FetchEvent} */ evt) => {
    if (evt.request.method === "GET") {
      evt.respondWith(buscaLaRespuestaEnElCache(evt));
    }
  });

  // Evento cuando el service worker se vuelve activo.
  self.addEventListener("activate", () =>
    console.log("El service worker está activo."),
  );
}

async function llenaElCache() {
  console.log("Intentando cargar caché:", CACHE);
  // Borra todos los cachés.
  const keys = await caches.keys();
  for (const key of keys) {
    await caches.delete(key);
  }
  // Abre el caché de este service worker.
  const cache = await caches.open(CACHE);
  // Carga el listado de ARCHIVOS.
  await cache.addAll(ARCHIVOS);
  console.log("Cache cargado:", CACHE);
  console.log("Versión:", VERSION);
}

/** @param {FetchEvent} evt */
async function buscaLaRespuestaEnElCache(evt) {
  // Abre el caché.
  const cache = await caches.open(CACHE);
  const request = evt.request;
  // Maneja las imágenes de sucursales de forma especial
  if (request.url.includes("/img/sucursales/")) {
    try {
      // Intentar red primero
      const response = await fetch(request)

      // Guardar copia en cache si es válida
      if (response && response.status === 200) {
        cache.put(request, response.clone())
      }

      return response
    } catch (error) {
      // Si no hay red, buscar en cache
      const cached = await cache.match(request)
      if (cached) return cached

      throw error
    }
  }
  /* Busca la respuesta a la solicitud en el contenido del caché, sin
   * tomar en cuenta la parte después del símbolo "?" en la URL. */
  const response = await cache.match(request, { ignoreSearch: true });
  if (response === undefined) {
    /* Si no la encuentra, empieza a descargar de la red y devuelve
     * la promesa. */
    return fetch(request);
  } else {
    // Si la encuentra, devuelve la respuesta encontrada en el caché.
    return response;
  }
}
