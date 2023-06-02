**_Proyecto Final del Curso de Backend: e-commerce - Melina Señoráns Pérez_**

Deploy URL: https://pf-backend-senorans.up.railway.app/

_Aclaración sobre la persistencia:_
La persistencia para Carritos, Productos y Mensajes en entorno de Desarrollo podrá elegirse entre Memoria, Archivo y Mongo Atlas, eligiendo los scripts de inicio del servidor detallados más adelante.
En cambio, la persistencia de Usuarios, Sessions y Órdenes de compra ("shopOrders") será Mongo Atlas y así está dispuesto en la configuración de las variables de entorno en "./configuration/config.js".

**Mongo Atlas:**
*String de conexión: en .env
*Base de datos: "test".
\*Colecciones: "usuarios", "sessions", "carritos", "productos", "mensajes", "ordenes".

**Instrucciones para levantar el servidor:**
--- Para iniciar el servidor con la persistencia en Mongo Atlas para todos los servicios: utilizar el script "dev".
--- Si se desea utiliar la persistencia en Memoria para Carritos, Productos y Mensajes: utilizar el script "devmem".
--- Para utilizar persistencia en Archivo para Carritos, Productos y Mensajes: utilizar el script "devfile".
