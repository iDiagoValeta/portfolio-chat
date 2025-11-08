# Portfolio Personal con Chat IA

Un portfolio personal moderno y elegante con integración de chat usando la API de Gemini de Google, diseñado para que los reclutadores puedan hacer preguntas sobre tu experiencia y habilidades.

## 🚀 Características

- **Diseño Moderno**: Interfaz limpia y profesional con animaciones suaves
- **Responsive**: Se adapta perfectamente a dispositivos móviles, tablets y escritorio
- **Chat con IA**: Integración con Google Gemini API para responder preguntas sobre tu perfil
- **Secciones Completas**: Sobre mí, habilidades, proyectos y contacto
- **Fácil Personalización**: Todo el contenido es fácil de modificar

## 📋 Requisitos Previos

- Python 3.x (para el servidor proxy)
- Un navegador web moderno
- Una API key de Google Gemini (gratuita)

## 🔧 Configuración

### 1. Obtener API Key de Gemini

1. Ve a [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Inicia sesión con tu cuenta de Google
3. Haz clic en "Create API Key"
4. Copia tu API key

### 2. Configurar el Proyecto

1. Abre el archivo `config.js`
2. Reemplaza `'TU_API_KEY_AQUI'` con tu API key real:

```javascript
export const GEMINI_API_KEY = 'tu-api-key-aqui';
```

3. Personaliza la información en `PORTFOLIO_INFO` con tus datos reales:
   - Nombre
   - Título profesional
   - Experiencia
   - Habilidades
   - Proyectos destacados
   - Cualquier otra información relevante

### 3. Personalizar el Portfolio

Edita el archivo `index.html` para personalizar:
- Tu nombre y título
- Descripción personal
- Estadísticas (años de experiencia, proyectos, etc.)
- Habilidades y tecnologías
- Proyectos destacados
- Enlaces de contacto (email, LinkedIn, GitHub, etc.)

## 🎨 Personalización de Estilos

El archivo `styles.css` contiene todas las variables CSS que puedes modificar fácilmente:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    /* ... más variables */
}
```

## 🚀 Uso

### Servidor Proxy Python (Recomendado y Requerido)

El proyecto incluye un servidor proxy en Python que evita problemas de CORS y mantiene tu API key segura. **Este es el método recomendado y necesario para que el chat funcione correctamente.**

1. **Inicia el servidor proxy:**
```bash
python server.py
```

O si quieres usar un puerto diferente:
```bash
python server.py 8080
```

2. **Abre tu navegador** en `http://localhost:8000` (o el puerto que hayas especificado)

3. **El servidor:**
   - Sirve los archivos estáticos (HTML, CSS, JS)
   - Actúa como proxy para las llamadas a la API de Gemini
   - Lee la API key automáticamente de `config.js`
   - Evita problemas de CORS

### Nota sobre CORS

Si intentas usar un servidor HTTP simple (como `python -m http.server`), el chat **no funcionará** debido a las políticas CORS de la API de Gemini. El servidor proxy (`server.py`) es necesario para que el chat funcione correctamente.

## 📝 Estructura del Proyecto

```
portfolio-chat/
│
├── index.html          # Página principal del portfolio
├── styles.css          # Estilos y diseño
├── app.js              # Lógica del chat y funcionalidades
├── config.js           # Configuración de API key e información personal
├── server.py           # Servidor proxy Python (requerido para el chat)
└── README.md           # Este archivo
```

## 🔒 Seguridad

⚠️ **IMPORTANTE**: No subas tu API key a repositorios públicos.

- El archivo `config.js` contiene tu API key
- Si vas a subir el proyecto a GitHub, agrega `config.js` al `.gitignore`
- El servidor proxy (`server.py`) mantiene la API key en el servidor, no se expone directamente al cliente
- En producción, considera usar variables de entorno o un backend más robusto para manejar la API key de forma segura

## 🎯 Próximos Pasos

- [ ] Personalizar toda la información con tus datos reales
- [ ] Agregar tus proyectos reales con imágenes y enlaces
- [ ] Configurar tus enlaces de redes sociales
- [ ] Ajustar los colores y estilos según tu preferencia
- [ ] Agregar más secciones si lo deseas (certificaciones, educación, etc.)

## 📚 Recursos

- [Documentación de Gemini API](https://ai.google.dev/docs)
- [Google AI Studio](https://makersuite.google.com/)
- [Font Awesome Icons](https://fontawesome.com/icons)

## 🤝 Contribuciones

Este es un proyecto personal, pero siéntete libre de usarlo como base para tu propio portfolio.

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso personal y comercial.

---

¡Buena suerte con tu portfolio! 🎉

