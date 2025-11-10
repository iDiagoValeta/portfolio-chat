# Portfolio Personal con Chat IA (Gemini 2.5 Flash)

Un portfolio web interactivo, moderno y profesional diseñado para impresionar a reclutadores. Este proyecto no solo muestra tu perfil y proyectos, sino que incluye un **chatbot inteligente** integrado con la API de Google Gemini, capaz de responder preguntas sobre tu experiencia, habilidades y trayectoria.

El proyecto está construido con un diseño *premium* que incluye animaciones avanzadas, efectos de *glassmorphism*, modo oscuro, y una arquitectura segura que protege tu API key.

---

https://portfolio-chat-aouj.onrender.com/

## 🚀 Características Principales

Este proyecto va más allá de un portfolio estático. Estas son sus características clave:

### 💬 Chat Interactivo con IA
* Integración directa con **Google Gemini** (usando el modelo `gemini-2.5-flash-preview-09-2025`)
* El chat se alimenta de un contexto detallado que proporcionas en `config.js`, permitiéndole actuar como tu asistente personal
* **Persistencia del historial:** Las conversaciones se guardan automáticamente en `localStorage` y se restauran al recargar la página
* **Exportación de conversaciones:** Función para descargar el historial del chat como archivo de texto
* **Sanitización de HTML:** Protección contra XSS con sanitización automática de contenido
* **Renderizado de Markdown:** Soporta respuestas en Markdown (negritas, cursivas, listas, tablas, código) y las renderiza automáticamente como HTML

### 🔒 Seguridad y Backend
* **Backend Proxy Seguro:** Servidor proxy en **Python** (`server.py`) que gestiona todas las llamadas a la API de Gemini
* **API Key protegida:** La clave se lee desde una **variable de entorno** del sistema, nunca se expone en el código
* **Rate Limiting:** Protección contra abuso con límite de 60 requests por minuto por IP
* **Timeouts:** Timeout de 30 segundos para requests a la API
* **Validaciones:** Validación de tamaño de request body (máximo 100KB) y validación de JSON
* **Manejo de errores mejorado:** Mensajes de error descriptivos y manejo robusto de timeouts

### 🎨 Diseño y UX
* **Diseño Premium Moderno:** Interfaz limpia y profesional con paleta de colores moderna, tipografía cuidada
* **Modo Oscuro:** Toggle para cambiar entre modo claro y oscuro, con persistencia de preferencia
* **Efectos de Glassmorphism:** En el header y el chat para un look moderno
* **Animaciones Avanzadas:**
    * Efectos de *scroll reveal* que animan las secciones a medida que aparecen
    * Transiciones "ultra-suaves" para la navegación y efectos *hover*
    * Header inteligente que se oculta al hacer scroll hacia abajo y reaparece al subir
* **Indicador de Progreso:** Barra de progreso en la parte superior que muestra el avance del scroll
* **Botón Scroll to Top:** Botón flotante para volver rápidamente al inicio de la página
* **Totalmente Responsive:** Diseño adaptativo que funciona perfectamente en escritorio, tablets y dispositivos móviles

### 🔍 SEO y Accesibilidad
* **Meta Tags SEO:** Meta description, keywords, author y robots configurados
* **Open Graph:** Tags completos para compartir en Facebook, LinkedIn, WhatsApp
* **Twitter Cards:** Configuración para mostrar tarjetas atractivas al compartir en Twitter/X
* **Structured Data (JSON-LD):** Datos estructurados Schema.org para Person/Portfolio
* **Canonical URL:** URL canónica para evitar contenido duplicado
* **Accesibilidad WCAG:** ARIA labels, navegación por teclado, focus visible, alt text descriptivo

### ⚡ Optimizaciones
* **Lazy Loading:** Imágenes con carga diferida para mejorar el rendimiento
* **Preconnect:** Preconexión a fuentes de Google para carga más rápida
* **Validación de entrada:** Sanitización y validación de datos del usuario
* **Scroll automático al inicio:** La página vuelve automáticamente al inicio al recargar

### 🛠️ Fácilmente Personalizable
* Toda la información personal, el contexto de la IA y los enlaces se centralizan en `config.js` y `index.html`
* Variables CSS para personalización rápida de colores y estilos
* Modo oscuro completamente configurable mediante variables CSS

---

## 🏗️ Estructura del Proyecto

```
portfolio-chat/
│
├── index.html          # (HTML) Estructura de todas las secciones, meta tags SEO, Open Graph
├── styles.css          # (CSS) Estilos, animaciones, diseño responsive, modo oscuro, variables CSS
├── app.js              # (JS) Lógica del chat, persistencia, sanitización, animaciones, modo oscuro
├── config.js           # (JS) ¡Archivo crítico! Contiene el prompt/contexto de la IA (La API key NO se guarda aquí)
├── server.py           # (Python) Servidor proxy con rate limiting, timeouts y validaciones de seguridad
├── images/
│   └── foto-perfil.jpg # (Imagen) Tu foto de perfil
│
└── README.md           # (Markdown) Este archivo
```   

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
El chatbot no sabe nada de ti por defecto. Debes "enseñarle" dándole un contexto detallado.

1.  Abre el archivo `config.js`.
2.  Edita la constante `PORTFOLIO_INFO`.
3.  Este es el "cerebro" de tu asistente. Rellena **con el mayor detalle posible**:
    * Resumen ejecutivo profesional
    * Experiencia profesional completa
    * Educación y certificaciones
    * Habilidades técnicas detalladas
    * **Portfolio completo de proyectos en GitHub** (incluye todos tus repositorios con descripciones)
    * Soft skills y competencias profesionales
    * Valores y motivaciones
    * Lo que buscas en tu próxima oportunidad
4.  Cuanto más detallado y profesional sea este contexto, mejores y más precisas serán las respuestas del chat.

### 4. Personalizar el Contenido Web
1.  Abre `index.html`.
2.  Actualiza el contenido estático en las diferentes secciones:
    * **Meta Tags SEO:** Actualiza title, description, keywords, canonical URL
    * **Open Graph:** Actualiza og:title, og:description, og:image, og:url
    * **Twitter Cards:** Actualiza twitter:title, twitter:description, twitter:image
    * **Structured Data (JSON-LD):** Actualiza la información de Person con tus datos
    * `#inicio`: Tu nombre y título profesional completo
    * `#sobre-mi`: Tu descripción profesional y estadísticas (número de proyectos, experiencia, etc.)
    * `#habilidades`: Tus habilidades principales organizadas por categorías
    * `#proyectos`: Tus proyectos destacados con descripciones mejoradas (actualiza los enlaces a GitHub)
    * `#contacto`: Tus enlaces a Email, LinkedIn, GitHub y Teléfono
3.  Reemplaza `images/foto-perfil.jpg` con tu propia foto (recomendado: 800x800px o similar, formato JPG/PNG)

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

Puedes cambiar fácilmente la paleta de colores completa del sitio, incluyendo el modo oscuro.

1.  Abre `styles.css`.
2.  Modifica las **variables CSS** dentro del bloque `:root` al principio del archivo para el modo claro:
    ```css
    :root {
        --primary-color: #0f172a; /* Color de fondo principal (oscuro) */
        --accent-color: #3b82f6;  /* Color de acento (azul) */
        --text-primary: #0f172a;  /* Texto principal sobre fondos claros */
        /* ...y más variables */
    }
    ```
3.  Para personalizar el modo oscuro, busca la sección `.dark-mode` y ajusta las variables correspondientes:
    ```css
    .dark-mode {
        --bg-primary: #0f172a;
        --text-primary: #ffffff;
        /* ...ajusta los colores del modo oscuro */
    }
    ```
4.  El modo oscuro se activa automáticamente según la preferencia del sistema o mediante el toggle en el header.

---

## 🔒 Seguridad ⚠️

**¡IMPORTANTE!** Este proyecto implementa múltiples capas de seguridad:

### Protección de API Key
* El servidor `server.py` lee la API key desde una **variable de entorno** del sistema
* **NUNCA** escribas tu API key directamente en ningún archivo del proyecto
* **Es seguro subir `config.js` a un repositorio público**, ya que solo contiene el texto de tu portfolio (`PORTFOLIO_INFO`) y no tu clave secreta

### Protecciones del Servidor
* **Rate Limiting:** Límite de 60 requests por minuto por IP para prevenir abuso
* **Timeouts:** Timeout de 30 segundos para requests a la API de Gemini
* **Validación de tamaño:** Máximo 100KB por request body
* **Validación de JSON:** Verificación de formato JSON válido
* **Manejo seguro de errores:** Los errores no exponen información sensible

### Protecciones del Cliente
* **Sanitización de HTML:** Protección contra XSS mediante sanitización automática de contenido
* **Validación de entrada:** Sanitización y validación de mensajes del usuario
* **Timeouts en fetch:** Timeout de 30 segundos en las peticiones del cliente

---

## 📚 Tecnologías Utilizadas

### Frontend
* **HTML5:** Estructura semántica con meta tags SEO, Open Graph y Structured Data
* **CSS3:** Estilos avanzados, animaciones, variables CSS, modo oscuro, glassmorphism, diseño responsive
* **JavaScript (ES6+):** 
    * Módulos ES6 (import/export)
    * Fetch API con async/await
    * localStorage para persistencia
    * Intersection Observer para scroll reveal
    * Manipulación del DOM y animaciones
* **Font Awesome:** Iconos vectoriales

### Backend
* **Python 3.x:** Servidor proxy HTTP con `http.server`
* **Google Gemini API:** Modelo `gemini-2.5-flash-preview-09-2025` para el chatbot

### Características Adicionales
* **localStorage API:** Persistencia del historial del chat
* **Intersection Observer API:** Animaciones de scroll reveal
* **Blob API:** Exportación de conversaciones
* **AbortController API:** Manejo de timeouts en fetch
* **CSS Variables:** Sistema de temas (claro/oscuro)

---

## ✨ Funcionalidades Avanzadas

### Persistencia del Chat
* El historial de conversación se guarda automáticamente en `localStorage`
* Al recargar la página, el historial se restaura automáticamente
* Función de exportación para descargar conversaciones como archivo de texto

### Modo Oscuro
* Toggle en el header para cambiar entre modo claro y oscuro
* La preferencia se guarda en `localStorage` y persiste entre sesiones
* Detección automática de la preferencia del sistema operativo
* Paleta de colores optimizada para legibilidad en ambos modos

### SEO y Compartir en Redes
* Meta tags completos para optimización en buscadores
* Open Graph tags para compartir en Facebook, LinkedIn, WhatsApp
* Twitter Cards para compartir en Twitter/X
* Structured Data (JSON-LD) para rich snippets en Google
* URL canónica para evitar contenido duplicado

### Accesibilidad
* ARIA labels en todos los elementos interactivos
* Navegación completa por teclado
* Focus visible mejorado para usuarios de teclado
* Alt text descriptivo en imágenes
* Contraste optimizado en modo oscuro

---

## 🎯 Casos de Uso

Este portfolio es ideal para:
* **Desarrolladores** que quieren mostrar su trabajo de forma profesional
* **Candidatos técnicos** que buscan destacar en procesos de selección
* **Freelancers** que necesitan un portfolio interactivo
* **Estudiantes** que quieren mostrar proyectos académicos y personales
* **Profesionales** que buscan una forma innovadora de presentar su perfil

---

## 📝 Notas Adicionales

* El proyecto está diseñado para ser fácilmente personalizable sin necesidad de conocimientos avanzados
* Todos los archivos están bien comentados para facilitar la comprensión
* El código sigue buenas prácticas de desarrollo web moderno
* Compatible con navegadores modernos (Chrome, Firefox, Safari, Edge)
* Optimizado para rendimiento y carga rápida
