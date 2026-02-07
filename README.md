# Prueba técnica Spybee
## Autor: nelson portillo

## Instalación y ejecución

1. Clonar el repositorio.
2. Instalar dependencias: `npm install` o `yarn install`.
3. Configurar variables de entorno (tomar como referencia el archivo `.env.example`).
4. Correr en desarrollo: `npm run dev`
5. Correr en producción: `npm run build` y `npm start`

## Descripción

Esta prueba técnica es una evaluación de habilidades técnicas de frontend. El objetivo es evaluar la capacidad del candidato para diseñar, implementar y probar soluciones a problemas específicos.

## Objetivos

- Diseñar y desarrollar una aplicación web utilizando en nextjs apartir de un mockup.
- Implementar funcionalidades interactivas y responsivas.
- Aplicar mapbox gl js para mostrar mapas interactivos.
- Utilización de data en formato JSON para mostrar información en la aplicación.

## Tecnologías utilizadas

- Next.js
- React.js
- Mapbox GL JS
- JSON
- CSS modules
- Tailwind CSS
- TypeScript

## Referencias

- [Mapbox GL JS](https://docs.mapbox.com/)
- [Custom Markers](https://docs.mapbox.com/help/tutorials/custom-markers-gl-js/)
- [Simple Map](https://docs.mapbox.com/mapbox-gl-js/example/simple-map/)
- [Center feature](https://docs.mapbox.com/mapbox-gl-js/example/center-on-feature/)
- [Tutorial de Mapbox GL JS + React](https://dev.to/franklin030601/mostrando-mapa-de-mapbox-con-react-82k)

Originalmente habia hecho el sistema con marcadores de mapbox-gl pero vi que no era lo que buscaba según el mockup, consultado la documentación oficial de mapbox-gl encontre que el sistema de puntos pero dejo el codigo funcional para crear marcadores comentado

## Puntos importantes
### Consulta de datos

La data proviene de un json ubicado en `data/mock_data.json` y cree una ruta API para consultarla. Deje el cliente de frontend y el backend, para consultarla uso fetch y axios, debo mencionar que en una aplicación nextjs se recomienda importar el archivo route.ts del lado del servidor, pero no lo hice para que simular como seria consultar una api externa a nextjs y agregue `export const dynamic = "force-dynamic";` en `dashboard/page.tsx`

## Carga de imagenes

Para cargar las imagenes de la data json utilice la etiqueta `<img />` en vez de `<Image />` de nextjs porque encontre rutas de imagenes no válidas, aunque pude agregar una validación http preferi no hacerlo para evitar tener que hacer un SafeImage, useEffect u otras practicas que podrian hacer lenta la carga del componente, además al ser una data json no tengo control de los origenes de las imagenes para autorizar los dominios en el archivo de configuración y evitar usar Comodín para permitir cualquier dominio lo cual anula la seguridad de nextjs por otro lado evitor usar Proxy de Imágenes que puede generar latencia por la descarga inicial sumada al procesamiento de optimización (si usas Next.js para redimensionar) añade milisegundos perceptibles.


## Estructura de carpetas

La aplicación sigue la metodología de **Atomic Design** para garantizar componentes reutilizables, escalables y fáciles de mantener:

- **Atoms**: Componentes básicos e indivisibles (botones, inputs, hexágonos).
- **Molecules**: Combinaciones de átomos que forman unidades funcionales (filas de tabla, buscadores, grupos de filtros).
- **Organisms**: Secciones complejas de la interfaz compuestas por moléculas y átomos (DashboardContent, Summary).

Además, se implementó una separación de responsabilidades clara:
- **Hooks**: Lógica extraída para el manejo de Mapbox y estadísticas.
- **Services/HTTP**: Capas de abstracción para el consumo de datos tanto en el cliente como en el servidor.
- **Store**: Gestión de estado global (proyectos, selecciones y vistas).
- **Utils**: Funciones de ayuda específicas para la lógica del tiempo y la inicialización de mapas.
