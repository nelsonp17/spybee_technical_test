# Prueba técnica Spybee
## Autor: nelson portillo

## Instalación y ejecución

1. Clonar el repositorio.
2. Instalar dependencias: `npm install` o `yarn install`.
3. Configurar variables de entorno (tomar como referencia el archivo `.env.example`).
4. Es requerido tener una base de datos PostgreSQL configurada y accesible.
5. Correr en desarrollo: `npm run dev`
6. Correr en producción: `npm run build` y `npm start`

## Descripción

Esta prueba técnica es una evaluación de habilidades técnicas de frontend. El objetivo es evaluar la capacidad del candidato para diseñar, implementar y probar soluciones a problemas específicos.

## Objetivos

- Diseñar y desarrollar una aplicación web utilizando en nextjs apartir de un mockup.
- Implementar funcionalidades interactivas y responsivas.
- Aplicar mapbox gl js para mostrar mapas interactivos.
- Utilización de data en formato JSON para mostrar información en la aplicación.
- Diseño responsive
- Se ve bien en temas oscuro y claro siguiente el mockup sin romper el diseño original
- Sistema de autenticación
- Manejo de errores y validaciones de formularios
- Rutas protegidas con Proxy
- Manejo de Prisma y Postgres
- Pagina de error 404

## Tecnologías utilizadas

### **Core Stack**
* **Next.js (App Router)** - Framework de React para producción con renderizado híbrido.
* **TypeScript** - Desarrollo robusto con tipado estático.
* **PostgreSQL** - Base de datos relacional para la persistencia de datos.
* **Prisma ORM** - Modelado de datos y comunicación eficiente con la base de datos.

### **Estado y Formularios**
* **Zustand** - Gestión de estado global ligera y escalable.
* **React Hook Form** - Manejo optimizado de formularios y validaciones de cliente.

### **Interfaz y Visualización**
* **Mapbox GL JS** - Integración de mapas interactivos y manejo de datos geoespaciales.
* **Tailwind CSS** - Estilizado basado en utilidades para un diseño moderno y responsivo.
* **CSS Modules** - Estilos encapsulados para componentes específicos.

### **Infraestructura**
* **Vercel** - Plataforma de despliegue y hosting de la base de datos (Vercel Postgres).

## Referencias

- [Mapbox GL JS](https://docs.mapbox.com/)
- [Custom Markers](https://docs.mapbox.com/help/tutorials/custom-markers-gl-js/)
- [Simple Map](https://docs.mapbox.com/mapbox-gl-js/example/simple-map/)
- [Center feature](https://docs.mapbox.com/mapbox-gl-js/example/center-on-feature/)
- [Tutorial de Mapbox GL JS + React](https://dev.to/franklin030601/mostrando-mapa-de-mapbox-con-react-82k)

Originalmente habia hecho el sistema con marcadores de mapbox-gl pero vi que no era lo que buscaba según el mockup, consultado la documentación oficial de mapbox-gl encontre que el sistema de puntos pero dejo el codigo funcional para crear marcadores comentado

## Puntos importantes
### Consulta de datos

La data proviene de un json ubicado en `data/mock_data.json` y la consulto desde un servicio o un action desde un serve component

### Carga de imagenes

Para cargar las imagenes de la data json utilice la etiqueta `<img />` en vez de `<Image />` de nextjs porque encontre rutas de imagenes no válidas, aunque pude agregar una validación http preferi no hacerlo para evitar tener que hacer un SafeImage, useEffect u otras practicas que podrian hacer lenta la carga del componente, además al ser una data json no tengo control de los origenes de las imagenes para autorizar los dominios en el archivo de configuración y evitar usar Comodín para permitir cualquier dominio lo cual anula la seguridad de nextjs por otro lado evitor usar Proxy de Imágenes que puede generar latencia por la descarga inicial sumada al procesamiento de optimización (si usas Next.js para redimensionar) añade milisegundos perceptibles.


### Algunas consideraciones

- Considero que los datos vistos en "Resumen" sobre incidencias, RFI y tareas son de todos los proyectos del usuario
- En plan dentro de la tabla solo tenemos Pequeño y Grande que son los únicos que vienen de la data json proporcionada, pero en el mockup tenemos Premium, Pequeño y Avanzado solo deje la mencion de Premium y Avanzado.
- El icono de nubes de lluvias y la franja de color naranja asumo que son para indicar que un proyecto ha sido seleccionado.
- Puedes tener varios proyectos seleccionados, pero solo el último seleccionado es a donde te llevara el mapa
- Agregue una inicial en el boton para ordenar A para alfabéticamente, T para tareas, R para RFI, I para incidencias. Esto es a modo de feedback para el usuario saber la ordenación actual.
- Use la libreria de iconos de lucide-react quizas no sean los mismos del mockup pero desconozco cuales son los que usan en el mockup.
- La imagen de error cuando un proyecto no tiene imagen disponible la cargo desde `https://cdn-icons-png.flaticon.com/512/9672/9672290.png` pero en realidad puede ser cualquier imagen de error que se desee. Use esa porque no tenia la del mockup
- La vista de cuadrícula no esta definida en el mockup
- Solución del tipico error bigInt con BigInt.prototype.toJSON()
- Se necesita configurar el archivo .env con las variables de entorno necesarias para la conexión a la base de datos y el servidor y las secrets.

La implementación de las capas de seguridad (rutas protegidas), manejo de errores (404) y persistencia con Prisma fue empleada con recursos preexistentes de mi flujo de trabajo habitual para el manejo de formularios, errores y configuración de base de datos. Esta reutilización de código garantiza estabilidad y rapidez en el despliegue de funcionalidades transversales.

## Estructura de carpetas

La aplicación sigue la metodología de **Atomic Design** para garantizar componentes reutilizables, escalables y fáciles de mantener:

- **Atoms**: Componentes básicos e indivisibles (botones, inputs, hexágonos).
- **Molecules**: Combinaciones de átomos que forman unidades funcionales (filas de tabla, buscadores, grupos de filtros).
- **Organisms**: Secciones complejas de la interfaz compuestas por moléculas y átomos (DashboardContent, Summary).
- **Layout**: Plantillas para la estructura de páginas y componentes.

Además, se implementó una separación de responsabilidades clara:
- **Hooks**: Lógica extraída para el manejo de Mapbox y estadísticas.
- **Services/HTTP**: Capas de abstracción para el consumo de datos tanto en el cliente como en el servidor.
- **Store**: Gestión de estado global (proyectos, selecciones y vistas).
- **Utils**: Funciones de ayuda específicas para la lógica del tiempo y la inicialización de mapas.
- **Contexts**: Contextos globales para compartir datos entre componentes.
- **Types**: Tipos de datos y interfaces para la aplicación.
