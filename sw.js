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
const VERSION = "8.01";

/**
 * Nombre de la carpeta de caché.
 */
const CACHE = "gyman";

/**
 * Archivos requeridos para que la aplicación funcione fuera de
 * línea.
 */
const ARCHIVOS = [
  "favicon.ico",
  "index.html",
  "site.webmanifest",
  "sucursal.html",
  "css/aos.css",
  "css/estilos.css",
  "css/swiper-bundle.min.css",
  "error/errorinterno.html",
  "error/estadoenblanco.html",
  "error/faltaestado.html",
  "error/faltaid.html",
  "error/faltaimagen.html",
  "error/faltaimagenes.html",
  "error/faltanombre.html",
  "error/faltaubicacion.html",
  "error/faltaubicacionlink.html",
  "error/idenblanco.html",
  "error/imagenenblanco.html",
  "error/imagenesenblanco.html",
  "error/nombreenblanco.html",
  "error/resultadonojson.html",
  "error/sucursalnoencontrada.html",
  "error/ubicacionenblanco.html",
  "error/ubicacionlinkenblanco.html",
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
  "js/aos.js",
  "js/registraServiceWorker.js",
  "js/swiper-bundle.min.js",
  "lib/css/material-symbols-outlined.css",
  "lib/css/roboto.css",
  "lib/fonts/MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].ttf",
  "lib/fonts/MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].woff2",
  "lib/fonts/roboto-v32-latin-regular.woff2",
  "lib/js/abreElementoHtml.js",
  "lib/js/cierraElementoHtmo.js",
  "lib/js/consumeJson.js",
  "lib/js/exportaAHtml.js",
  "lib/js/getAttribute.js",
  "lib/js/htmlentities.js",
  "lib/js/muestraError.js",
  "lib/js/muestraObjeto.js",
  "lib/js/muestraTextoDeAyuda.js",
  "lib/js/ProblemDetails.js",
  "lib/js/querySelector.js",
  "lib/js/resaltaSiEstasEn.js",
  "lib/js/submitForm.js",
  "lib/js/const/ES_APPLE.js",
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
  for (const archivo of ARCHIVOS) {
    try {
      await cache.add(archivo);
    } catch (e) {
      console.error("❌ No se pudo cachear:", archivo, e);
    }
  }

  console.log("Cache cargado:", CACHE);
  console.log("Versión:", VERSION);
}

/** @param {FetchEvent} evt */
async function buscaLaRespuestaEnElCache(evt) {
  // Abre el caché.
  const cache = await caches.open(CACHE);
  const request = evt.request;
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
