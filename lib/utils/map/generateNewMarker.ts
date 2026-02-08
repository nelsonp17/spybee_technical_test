// NOTA: Originalmente habia hecho el sistema con marcadores de mapbox-gl pero vi que no era lo que buscaba
// según el mockup, consultado la documentación oficial de mapbox-gl encontre que el sistema de puntos
// pero dejo el codigo funcional para crear marcadores comentado

// import { Popup, Marker, Map } from "mapbox-gl";

// export const generateNewMarker = ({
//   lat,
//   lng,
//   map,
// }: {
//   lng: number;
//   lat: number;
//   map: Map;
// }) => {
//   const popUp = new Popup({ closeButton: false, anchor: "left" }).setHTML(
//     `<div class="popup">You click here: <br/>[${lng},  ${lat}]</div>`,
//   );

//   new Marker({ color: "#63df29", scale: 1.5 })
//     .setLngLat([lng, lat])
//     .setPopup(popUp)
//     .addTo(map);
// };

// CODIGO FUNCIONAL PARA CREAR MARCADORES

// Obtener IDs de proyectos actualmente seleccionados
// const currentIds = selectedProjects.map((p) => p._id!);

// A. Eliminar marcadores de proyectos que ya no están seleccionados
// Object.keys(markersRef.current).forEach((id) => {
//   if (!currentIds.includes(id)) {
//     markersRef.current[id].remove();
//     delete markersRef.current[id];
//   }
// });

// B. Agregar marcadores para nuevos proyectos seleccionados
// selectedProjects.forEach((project) => {
//   if (project._id && !markersRef.current[project._id]) {
//     if (project.position?.lng && project.position?.lat) {
//       // Crear el marcador
//       const marker = new Marker({ color: "#f97316" }) // Color naranja para combinar con tu borde
//         .setLngLat([project.position.lng, project.position.lat])
//         .setPopup(
//           new Popup({ offset: 25 }).setHTML(`<h3>${project.title}</h3>`),
//         )
//         .addTo(map);

//       markersRef.current[project._id] = marker;
//     }
//   }
// });
