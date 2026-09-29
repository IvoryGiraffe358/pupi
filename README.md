# Pupi Sign — Sitio web

Landing page para una empresa de señalización, impresión digital y anuncios luminosos.
Hecha con HTML, CSS y JavaScript puro (sin frameworks ni dependencias).

## Estructura

```
pupi/
├── index.html              # Página principal
├── assets/
│   ├── css/
│   │   └── styles.css      # Estilos (variables de color en :root)
│   ├── js/
│   │   └── main.js         # Contenido dinámico, carrusel, menú, galería
│   └── img/
│       ├── hero/           # Fondos del carrusel principal
│       ├── servicios/      # Imágenes de las tarjetas de servicios
│       ├── aplicaciones/   # Imágenes de aplicaciones
│       ├── galeria/        # Fotos del portafolio
│       ├── clientes/       # Logos de clientes
│       └── iconos/         # Favicon e íconos
├── .editorconfig           # Formato consistente entre editores
├── .gitattributes          # Fin de línea y archivos binarios
├── .gitignore
└── README.md
```

## Cómo verlo

Abre `index.html` en el navegador, o levanta un servidor local:

```bash
npx serve .
# o
python -m http.server 8000
```

## Personalización

- **Colores:** edita las variables `--azul`, `--acento`, etc. al inicio de `assets/css/styles.css`.
- **Servicios, aplicaciones y clientes:** edita los arreglos `servicios`, `apps` y `marcas` en `assets/js/main.js`.
- **Imágenes:** hoy se usan imágenes de muestra de picsum.photos. Coloca tus fotos en `assets/img/<sección>/`
  y cambia la función `img()` en `main.js` (o las URL del carrusel en `index.html`).
- **Datos de contacto:** teléfono, correo y dirección están en `index.html` (barra superior y sección Contacto).

## Convenciones

- Nombres de archivos en minúsculas y con guiones: `letras-3d.webp`.
- Imágenes optimizadas en `.webp` (máx. ~300 KB, 1920 px de ancho para el hero).
- Commits descriptivos en español: `feat: agrega sección de testimonios`, `fix: corrige menú en móvil`.
