# Rediseño del portfolio: evidencia en producción

Fecha: 2026-09-01
Estado: implementado y aprobado el 2026-09-01.

## Problema

La web no está desactualizada, cuenta a otra persona.

Presenta como experiencia profesional principal el programa Inditex Tech Ambassador,
afirma que la etapa en CEU sigue en curso, y no menciona Auro AI en ninguna parte.
El titular publicado es "AI Engineer · Orquestación LLM · Visión por computador";
el del CV vigente es "AI & Back-End Engineer | LLM systems in production".

Consecuencia medible: `config.js`, que es el prompt de sistema del asistente, desinforma
a cualquiera que pregunte por la trayectoria. El chat es la pieza diferencial del sitio
y hoy responde con datos falsos.

Reparto de esfuerzo actual: 390 líneas dedicadas a efectos visuales, 0 líneas dedicadas
al puesto de Technical Lead.

## Objetivo

Que la web sostenga la misma afirmación que el CV: alguien que ha puesto sistemas LLM
en producción y ha impuesto disciplina de ingeniería en un equipo, con 22 años.

## Criterios de verificación

Sin estos, el trabajo no está terminado:

1. Cada dato publicado se corresponde uno a uno con el CV (`resume.pdf`). Ninguna cifra
   ni logro que no esté en él.
2. ~~El contenido es legible con JavaScript desactivado.~~ **Criterio retirado.**
   La experiencia, los proyectos, el stack y la formación se pintan desde `app.js`,
   igual que hacía `renderExp` en la versión anterior. Cumplirlo obligaba a duplicar
   todo el contenido en el HTML y en el diccionario de traducciones, con dos fuentes
   de verdad que se desincronizan. Se mantiene el comportamiento previo: no se mejora,
   pero tampoco se empeora. El `<title>`, la descripción, las Open Graph y el JSON-LD
   sí son estáticos, que es lo que leen los bots que no ejecutan JavaScript.
3. Ningún bucle `requestAnimationFrame` permanente. Los tres usos que quedan en
   `app.js` son de un disparo o con condición de parada, y son aceptables; lo que no
   puede quedar es un bucle que repinte de forma continua.
4. Ninguna regla `cursor: none` en el CSS final.
5. El asistente responde sobre Auro AI e Inditex con el contexto nuevo.
6. `GET /` y los estáticos siguen devolviendo 200 con `server.py` sin modificar.
7. Legible y navegable a 375 px de ancho, con el contenido reordenado y sin
   desbordamiento horizontal. La piel es retro, la usabilidad no.

## Alcance

### Se conserva sin tocar
- `server.py` completo: proxy, rate limiting (60 req/min/IP), timeout 30s, streaming SSE.
- El chat y su historial en `localStorage`.
- Cero dependencias: HTML, CSS y JS vanilla más stdlib de Python.
- Despliegue en Render y `Procfile`.
- Bilingüe ES / EN.
- El teléfono sigue sin publicarse. El sitio actual solo expone el email y esa decisión
  se mantiene: un móvil personal en una página indexada atrae spam automatizado.

### Se elimina
- `fx3d.js` entero, 390 líneas: cursor personalizado, polen 3D con constelaciones,
  tilt con reflejo, parallax del hero, entrada 3D de letras, intro bloom, ripples
  y botones magnéticos.
- La regla `html.cursor-fx, html.cursor-fx * { cursor: none !important; }`
  (`styles.css:1094`), que oculta el cursor del sistema y lo sustituye por un punto
  y un anillo interpolados por JS. Es un cursor con latencia y elimina los cursores
  contextuales de texto y enlace.
- `backdrop-filter: saturate(1.05) blur(7px)` en sus 12 selectores.

### Se reescribe
- `index.html` y `styles.css` completos.
- `config.js`, con prioridad: es la fuente de verdad del asistente.
- De `app.js` se conserva la lógica: `sanitizeHtml`, `mdToHtml`, el historial en
  `localStorage`, `requestGemini` y `sendMsg` con su streaming SSE, `applyDark`,
  `applyLang` y el diccionario `T` de traducciones.
- De `app.js` se elimina la capa ornamental: `startTyped` (efecto de máquina de
  escribir), `observeReveal` (aparición por scroll), `renderSkillTab`,
  `initSkillSlider` y `refreshSkillTabs` (el carrusel de habilidades desaparece con
  las barras de porcentaje) e `initCommandPalette` (un Ctrl+K para navegar por una
  página de scroll único es superficie sin uso).
- `renderExp` se reescribe contra la estructura de datos nueva.

## Dirección visual

Cinco paletas abiertas, elegibles por el visitante y guardadas en su navegador.
Everforest es la predeterminada.

| Paleta | Fuente de los valores |
|---|---|
| Everforest | `sainnhe/everforest` → `palette.md` |
| Solarized | `ethanschoonover.com/solarized` |
| Nord | `nordtheme.com/docs/colors-and-palettes` |
| Rosé Pine | `rose-pine/palette` → `palette.json` |
| Gruvbox | `morhetz/gruvbox` → `colors/gruvbox.vim` |

Los hexadecimales son los oficiales, sin retocar. Donde el rol "muted" original no
alcanza 4.5:1 para texto pequeño (Everforest, Solarized y Rosé Pine, pensadas para
editores de código y no para prosa), se usa el rol de texto de la propia paleta y la
jerarquía se construye con tamaño. La variable `--em`, que colorea el énfasis dentro de
los párrafos, solo toma el acento en las paletas donde este llega al mínimo; en las
demás el énfasis se hace con peso.

Un intento anterior ajustó los acentos a mano para forzar el contraste. El resultado
fueron colores turbios que ya no eran los de esas paletas. No repetirlo: si un color
oficial no sirve para un uso, se cambia el uso, no el color.

Forma: bordes de un píxel, sombras duras desplazadas, `border-radius: 0` en todo el
documento, densidad compacta. Tipografías locales en `fonts/`: Plus Jakarta Sans para
titulares, Inter para prosa, JetBrains Mono para datos.

Movimiento: solo el indicador de escritura del chat y el reloj (un `setInterval` por
segundo). Ningún bucle `requestAnimationFrame`.

Descartado por el camino: estampado floral, simulación de terminal, neobrutalismo con
acento terracota y Catppuccin.

## Estructura

De siete secciones a esto:

| Bloque | Contenido |
|---|---|
| Cabecera | Nombre, "AI & Back-End Engineer, LLM systems in production", Valencia, línea de estado con el puesto actual y enlaces a LinkedIn, GitHub, Hugging Face y CV |
| Experiencia | Inditex, Auro AI (pieza central con sus cifras), CEU, Museo de Informática, Superprof |
| Proyectos | MonkeyGrab, OCR-to-CRM Automation Pipeline, Dataset Creator |
| Stack | Agrupado como en el CV |
| Formación | UPV y certificaciones, más Inditex Tech Ambassador como reconocimiento |
| Chat | Herramienta de consulta sobre el perfil |
| Contacto | Email directo |

Desaparece "sobre mí" como sección. Se sustituye por una línea de posicionamiento
en la cabecera.

El puesto actual vive solo en la cabecera como línea de estado y como primera entrada
de Experiencia. No hay bloque "Ahora" independiente: sería el mismo dato tres veces.

## Contenido

Fuente única: `resume.pdf` del repositorio `iDiagoValeta/resume`, más los datos
confirmados por Ignacio el 2026-09-01.

### Experiencia

1. **AI Engineer, Inditex.** Graduate program. Incorporación: 14 de septiembre de 2026.
   Puesto actual, primero en la lista.
2. **Technical Lead (Part-time), Auro AI.** Valencia. Jun 2026 a sep 2026.
   Asistente de IA que lee facturas de energía y telecomunicaciones por WhatsApp y
   cambia al usuario a la mejor tarifa de España. Arquitectura back-end de un monorepo
   TypeScript de seis apps (REST API, agente conversacional sobre Mastra y Vertex AI,
   CRM interno) con PostgreSQL, Docker y Google Cloud Platform, desplegado en dos
   servidores con despliegues sin caída y rollback automático. Fijó el estándar de
   ingeniería de un equipo de cuatro: revisión de código obligatoria, rama principal
   protegida y umbral del 80% de cobertura en código nuevo. Más de 280 pull requests
   revisados y fusionados desde junio de 2026.
3. **AI & Back-End Developer, Grupo Educativo CEU.** Valencia. Oct 2025 a jun 2026.
   GPT-CEU, asistente generativo para las tres universidades del grupo, en web y
   WhatsApp, con enrutado por rol para estudiantes, profesorado y personal. Conectó
   modelos de lenguaje a fuentes institucionales mediante Azure Functions y pipelines
   RAG, respondiendo con información académica en tiempo real en producción.
4. **Guía y tallerista técnico, Museo de Informática (UPV).** Feb 2025 a jun 2025.
   Talleres de robótica, criptografía y programación, y visitas guiadas sobre historia
   de la computación.
5. **Profesor particular, Superprof.** Ene 2022 a ene 2025.
   Matemáticas, física y dibujo técnico para secundaria y preuniversitario.

El "(Part-time)" de Auro se mantiene. Suprimirlo infla el puesto y es comprobable.

### Proyectos

- **MonkeyGrab / Local On-Premises RAG System** (Ollama, ChromaDB, LlamaIndex, Flask,
  React), 2026. RAG multilingüe centrado en privacidad para PDFs, proyecto final de
  grado, sin dependencia de APIs externas. Recuperación híbrida semántica y léxica.
- **OCR-to-CRM Automation Pipeline** (Azure Functions, Document Intelligence, GPT-4,
  RapidFuzz), 2026. Sustituye la digitalización manual externalizada de formularios de
  matrícula manuscritos por un pipeline serverless que escribe directo en el CRM.
  En producción en CEU.
- **Dataset Creator** (Python, procesado de PDF, JSONL, generación de QA), 2026.
  Pipeline local reproducible de datasets supervisados de preguntas y respuestas a
  partir de PDFs, con detección de idioma y controles de calidad.

### Formación y reconocimientos

- **Universitat Politècnica de València.** Ingeniería Informática, especialidad en
  Computación, 2026. Certificaciones en Python para Data Science, fundamentos de Linux,
  SQL y R para análisis de datos, y fundamentos matemáticos para machine learning.
- **Inditex Tech Ambassador**, 2026. Programa universitario de talento STEM con los
  equipos de tecnología global de Inditex. Va en reconocimientos, no en experiencia.

### Stack

Tal y como lo agrupa el CV: IA generativa y LLMs; machine learning; back end, datos y
cloud; front end; lenguajes de programación; idiomas.

### Idiomas

Español nativo, valenciano nativo con certificación GVA, e inglés con **Cambridge B2**.

Se publica el certificado y se retira la etiqueta "full professional proficiency" que
lo acompaña en el CV: B2 no equivale a competencia profesional plena y la contradicción
es visible para cualquier reclutador técnico. Pendiente de que Ignacio confirme si
posee una certificación superior; en ese caso se publica esa.

## Decisiones tomadas

| Decisión | Resolución | Quién |
|---|---|---|
| Alcance | Todo menos el stack | Ignacio |
| Dirección visual | Evidencia en producción | Ignacio |
| `fx3d.js` | Se borra entero | Ignacio |
| Inditex | Se publica, puesto "AI Engineer" | Ignacio |
| Fecha de Inditex | Incorporación explícita el 14/09/2026 en lugar de "trabajando desde septiembre", que sería falso durante trece días | Claude, pendiente de veto |
| Auro | Cerrado con fechas, jun 2026 a sep 2026 | Ignacio |
| Teléfono | No se publica | Claude, heredado del sitio actual |
| Etiqueta de inglés | Solo "Cambridge B2" | Claude, pendiente de confirmación |
| Dirección visual | Simulación de terminal o BBS | Ignacio |
| Alcance de la simulación | Piel retro, esqueleto moderno: responsive y accesible | Ignacio |
| Estructura y contenido | Sobreviven a la decisión anterior sin cambios | Ignacio |
| Fósforo | Ámbar, verde o azul hielo | Pendiente, se decide sobre la maqueta |

## Activos que hay que renovar

Al cerrar la implementación, no antes:

| Activo | Estado | Acción |
|---|---|---|
| `cv_ignacio_diago_en.pdf` (138 KB) | Obsoleto | Sustituir por el `resume.pdf` actual de `iDiagoValeta/resume`. Referenciado en `index.html:96` y `app.js:624` |
| `images/1.png` … `5.png` (7,6 MB) | Obsoletas | Capturas del diseño anterior, usadas en el README. Rehacer tras el rediseño |
| `images/ignaciodiagovaleta.png` (1,7 MB) | A sustituir | Foto de perfil. La nueva la aporta Ignacio; no se puede generar |
| `images/pattern.png` (1,7 MB) | Se elimina | Estampado floral, sin uso en la dirección nueva |
| `images/ignaciodiagovaletaWhite.png` (97 KB) | Se revisa | Logo, depende de la cabecera final |

El repositorio carga hoy unos 11 MB de imágenes. Retirar `pattern.png` y rehacer las
capturas con compresión razonable debería dejarlo muy por debajo.

## Riesgos

- **El chat necesita `DEEPSEEK_API_KEY`.** Sin ella `/api/gemini` devuelve 500 y el
  criterio de verificación 5 no se puede comprobar.
- **Cache-busting manual.** `index.html` versiona `styles.css` con `?v=N` a mano. Al
  reescribir el CSS hay que incrementarlo o Render servirá el antiguo.
- **La ruta `/api/gemini` mantiene el nombre heredado** pese a apuntar a DeepSeek.
  Fuera de alcance: renombrarla obliga a tocar `server.py`, que no se toca.
