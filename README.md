                                Documentación Básica
            Estructura de la Base de Datos
La base de datos incluye las siguientes tablas y sus relaciones, para representar las entidades principales de la aplicación de reservas de vuelos:

Users: Almacena la información de los usuarios, con campos como username, password y roleId.
Roles: Define los roles de usuario (por ejemplo, "Admin", "User") con un campo único nombreRole.
ClaseVuelos: Contiene las clases de vuelo (por ejemplo, "Económica", "Primera Clase") con el campo nombreClase.
Reservas: Almacena las reservas de vuelo, incluyendo codigoReserva, fechaInicio, fechaFinal y estado.
DatosVuelos: Registra detalles del vuelo de cada usuario, como user_id, reserva_id, clasevuelo_id, pasaporte, asiento, numero_vuelo y status.

----Relaciones
Un Usuario puede tener un rol específico mediante roleId.
Una Reserva puede estar vinculada a varios registros en DatosVuelos.
Una ClaseVuelo puede estar asociada a varios registros en DatosVuelos.

Arquitectura de la Aplicación
La aplicación frontend sigue una arquitectura de tipo SPA (Single Page Application), donde la estructura del proyecto se basa en una clara separación de responsabilidades:

Páginas: Ubicadas en la carpeta /pages, cada archivo representa una vista o página de la aplicación (e.g., CrearReservacion, ListarReservas, InfoReserva).

Componentes: La carpeta /components contiene elementos de la interfaz de usuario reutilizables, como Breadcrumb, formularios y modales.

Servicios: En la carpeta /Service se encuentran las funciones que interactúan con la API, gestionando la comunicación con el backend para realizar operaciones como creación, actualización y eliminación de datos.

Rutas: La configuración de las rutas se encuentra en el archivo App.tsx, utilizando React Router para la navegación entre vistas.

Autenticación: La aplicación utiliza JWT para autenticar a los usuarios. Los tokens de acceso se guardan en el almacenamiento local (localStorage) y se usan para proteger rutas y realizar solicitudes autenticadas a la API.

Alertas y Notificaciones: SweetAlert2 es utilizado para mostrar alertas y mensajes de confirmación.
Modo Claro/Oscuro: Implementado a través de estilos condicionales con Tailwind CSS, permitiendo a los usuarios alternar entre el modo claro y oscuro en la interfaz.

----Tecnologías Utilizadas
React con TypeScript: Para la construcción de la interfaz de usuario.

Axios: Para realizar las peticiones HTTP al backend.

React Router: Para gestionar la navegación de la aplicación.

Tailwind CSS: Para el diseño y responsividad.

SweetAlert2: Para alertas interactivas y notificaciones de usuario.

----Enlace al Sitio de Pruebas
El sitio de pruebas del frontend está desplegado en [https://reservuelos.netlify.app/] Para realizar pruebas y explorar la interfaz de usuario, accede a esta URL.
