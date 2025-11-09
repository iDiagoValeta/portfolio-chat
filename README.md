# Portfolio Personal con Chat IA (Gemini 2.5 Flash)

Un portfolio web interactivo, moderno y profesional diseñado para impresionar a reclutadores. Este proyecto no solo muestra tu perfil y proyectos, sino que incluye un **chatbot inteligente** integrado con la API de Google Gemini, capaz de responder preguntas sobre tu experiencia, habilidades y trayectoria.

El proyecto está construido con un diseño *premium* que incluye animaciones avanzadas, efectos de *glassmorphism* y una arquitectura segura que protege tu API key.

---

## 🚀 Características Principales

Este proyecto va más allá de un portfolio estático. Estas son sus características clave:

* **Chat Interactivo con IA:** Integración directa con **Google Gemini** (usando el modelo `gemini-2.5-flash-preview-09-2025`). El chat se alimenta de un contexto detallado que proporcionas en `config.js`, permitiéndole actuar como tu asistente personal.
* **Backend Proxy Seguro:** Incluye un servidor proxy en **Python** (`server.py`) que gestiona todas las llamadas a la API de Gemini. Este servidor lee la API key de forma segura desde una **variable de entorno** del sistema, evitando que se exponga públicamente en el código.
* **Diseño Premium Moderno:** Interfaz limpia y profesional con una paleta de colores moderna, tipografía cuidada, efectos de *glassmorphism* en el header y el chat, y gradientes animados.
* **Animaciones Avanzadas:**
    * Efectos de *scroll reveal* que animan las secciones a medida que aparecen.
    * Transiciones "ultra-suaves" para la navegación y efectos *hover*.
    * Header inteligente que se oculta al hacer scroll hacia abajo y reaparece al subir.
* **Renderizado de Markdown:** El chat soporta respuestas en Markdown (negritas, cursivas, listas, tablas) y las renderiza automáticamente como HTML para una lectura fácil.
* **Fácilmente Personalizable:** Toda la información personal, el contexto de la IA y los enlaces se centralizan en `config.js` y `index.html` para una edición rápida.
* **Totalmente Responsive:** Diseño adaptativo que funciona perfectamente en escritorio, tablets y dispositivos móviles.

---

## 🏗️ Estructura del Proyecto

portfolio-chat/   
│   
├── index.html     # (HTML) La estructura de todas las secciones del portfolio   
├── styles.css     # (CSS) Estilos, animaciones, diseño responsive y variables de color   
├── app.js         # (JS) Lógica del chat, renderizado de markdown, animaciones de scroll   
├── config.js      # (JS) ¡Archivo crítico! Contiene el prompt/contexto de la IA (La API key YA NO se guarda aquí)   
├── server.py      # (Python) Servidor proxy para servir archivos y proteger la API key   
├── images/   
│   └── foto-perfil.jpg # (Imagen) Tu foto de perfil   
│   
└── README.md      # (Markdown) Este archivo   

---

## 🔧 Configuración (Paso a Paso)

Sigue estos 4 pasos para tener el portfolio funcionando con tu información.

### 1. Obtener API Key de Gemini
1.  Ve a [Google AI Studio](https://makersuite.google.com/app/apikey).
2.  Inicia sesión con tu cuenta de Google.
3.  Haz clic en "**Create API Key**".
4.  Copia tu API key.

### 2. Configurar la API Key (¡Nuevo método!)
Para proteger tu clave, el servidor `server.py` la lee desde una **variable de entorno** llamada `GEMINI_API_KEY`.

**NO** debes pegar tu clave en `config.js`. El proyecto está diseñado para no hacerlo.

La forma de configurar la variable de entorno se explica en el siguiente paso de "Uso", ya que debes configurarla cada vez que inicies el servidor (o configurarla permanentemente en tu sistema).

### 3. Personalizar el Contexto de la IA (¡El paso más importante!)
El chatbot no sabe nada de ti por defecto. Debes "enseñarle" dándole un contexto.

1.  Abre el archivo `config.js`.
2.  Edita la constante `PORTFOLIO_INFO`.
3.  Este es el "cerebro" de tu asistente. Rellena **con el mayor detalle posible** tu resumen profesional, experiencia, educación, habilidades, proyectos, etc. Cuanto mejor sea este contexto, mejores serán las respuestas del chat.

### 4. Personalizar el Contenido Web
1.  Abre `index.html`.
2.  Actualiza el contenido estático en las diferentes secciones:
    * `#inicio`: Tu nombre y título.
    * `#sobre-mi`: Tu descripción y estadísticas.
    * `#habilidades`: Tus habilidades principales.
    * `#proyectos`: Tus proyectos destacados (actualiza los enlaces a GitHub, etc.).
    * `#contacto`: Tus enlaces a Email, LinkedIn, GitHub y Teléfono.
3.  Reemplaza `images/foto-perfil.jpg` con tu propia foto.

---

## 🚀 Uso (Cómo ejecutar el proyecto)

Este proyecto **no funcionará** simplemente abriendo `index.html` en tu navegador. Requiere el servidor proxy de Python (`server.py`) para gestionar las llamadas a la API de forma segura y evitar problemas de CORS.

1.  Asegúrate de tener **Python 3.x** instalado.
2.  Abre tu terminal o línea de comandos.
3.  Navega hasta la carpeta del proyecto.
4.  **Configura la variable de entorno y ejecuta el servidor:**

    **En macOS / Linux:**
    ```bash
    export GEMINI_API_KEY='TU_API_KEY_AQUI'
    python server.py
    ```

    **En Windows (CMD):**
    ```bash
    set GEMINI_API_KEY=TU_API_KEY_AQUI
    python server.py
    ```

    **En Windows (PowerShell):**
    ```bash
    $env:GEMINI_API_KEY='TU_API_KEY_AQUI'
    python server.py
    ```
5.  Si deseas usar un puerto diferente (por defecto es 8000), puedes especificarlo:
    ```bash
    # Ejemplo en macOS/Linux
    export GEMINI_API_KEY='TU_API_KEY_AQUI'
    python server.py 8080
    ```
6.  ¡Abre tu navegador y ve a `http://localhost:8000`! El chat debería estar funcionando.

---

## 🎨 Personalización de Estilos

Puedes cambiar fácilmente la paleta de colores completa del sitio.

1.  Abre `styles.css`.
2.  Modifica las **variables CSS** dentro del bloque `:root` al principio del archivo.
    ```css
    :root {
        --primary-color: #0f172a; /* Color de fondo principal (oscuro) */
        --accent-color: #3b82f6;  /* Color de acento (azul) */
        --text-primary: #0f172a; /* Texto principal sobre fondos claros */
        /* ...y más variables */
    }
    ```

---

## 🔒 Seguridad ⚠️

**¡IMPORTANTE!** Gracias al uso de variables de entorno, tu API key secreta ya no se escribe en ningún archivo del proyecto.

* El servidor `server.py` la lee directamente de las variables de entorno de tu sistema.
* Esto significa que **es seguro subir `config.js` a un repositorio público (como GitHub)**, ya que ahora solo contiene el texto de tu portfolio (`PORTFOLIO_INFO`) y no tu clave secreta.
* **NUNCA** escribas tu API key directamente en `server.py` o cualquier otro archivo que vayas a subir a un repositorio.

---

## 📚 Tecnologías Utilizadas

* **Google Gemini API:** Para la funcionalidad del chatbot.
* **Python:** Para el servidor proxy de backend (`http.server`).
* **HTML5:** Para la estructura semántica.
* **CSS3:** Para estilos, animaciones, variables CSS y diseño responsive.
* **JavaScript (ES6+):** Para la lógica del chat (Fetch API, async/await), manipulación del DOM y animaciones de scroll.
* **Font Awesome:** Para los iconos.
