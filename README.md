Descripción:


Se decidió usar un micro servicio lector para preprocesar el archivo txt, crear el id necesario para consultar las apis de meli y publicar los id en una queue para que otras
4 instancias de microservicios lectores puedan dividirse el trabajo de consumir las apis y guardad en mongo la información.

Se usó promise all para de forma paralela consultar las ultimas 3 apis de meli.

Se decidio usar mongo ya que la funcionalidad no requiere de relaciones complejas mas que una sola entidad.

para errores en donde el item no se encontró se decidio no guardar el item en mongo, sin embargo si el item si es encontrado en meli y alguno de los siguientes
valores no es encontrado como currency ese valor se guarda en cadena vacia.

Esta solucion es escalable poniendo mas instancias consumidoras o si el archivo es muy muy grande se puede colocar mas instancias lectoras pero asignando que parte del archivo les toca procesar para no leer lo mismo.

Se adjunta logs de prueba con 4 instancias consumidoras.

Se adjunta diagrama de arquitectura.

Colocar en la configuración el formato y el separador del archivo ya no me dió tiempo pero estan en la clase Parser, ahí se podría cambiar para que tome esos valores los tome de la configuración cuando se levanta la app pero por el momento se quedó en duro.

Ejemplo de registros en mongo:

 {
    _id: new ObjectId("64b4d9678af8f9a7686b5ba0"),
    site: 'MLA',
    id: 825232465,
    price: '13805',
    start_time: '2019-11-14T03:02:42.000Z',
    name: 'Libros Físicos',
    __v: 0
  },
  {
    _id: new ObjectId("64b4d9678af8f9a7686b5ba2"),
    site: 'MLA',
    id: 683578568,
    price: '780',
    start_time: '2017-09-17T23:11:35.000Z',
    name: 'Libros Físicos',
    __v: 0
  },
  {
    _id: new ObjectId("64b4d9678af8f9a7686b5ba4"),
    site: 'MLA',
    id: 828102088,
    price: '4693',
    start_time: '2019-11-30T09:27:48.000Z',
    name: 'Libros Físicos',
    __v: 0
  },
  {
    _id: new ObjectId("64b4d9678af8f9a7686b5ba6"),
    site: 'MLA',
    id: 843750782,
    price: '10433.81',
    start_time: '2020-03-14T01:04:33.000Z',
    name: 'Tensores Poly V',
    __v: 0
  },
  {
    _id: new ObjectId("64b4d9678af8f9a7686b5ba8"),
    site: 'MLA',
    id: 843244579,
    price: '2363',
    start_time: '2020-03-11T15:30:56.000Z',
    name: 'Libros Físicos',
    __v: 0
  },
  {
    _id: new ObjectId("64b4d9678af8f9a7686b5baa"),
    site: 'MLA',
    id: 719164013,
    start_time: '2018-04-16T15:41:45.000Z',
    name: 'Para Asientos',
    __v: 0
  }




Para ejecutar el programa:


1 Iniciar las imagenes de docker de rabbitmq y mongo db

docker run -d --hostname my-rabbit6 --name some-rabbit8 -p 5672:5672 rabbitmq:3
export MONGODB_VERSION=6.0-ubi8
docker run --name mongodb3 -d -p 27017:27017 mongodb/mongodb-community-server:$MONGODB_VERSION


2 correr las instancias del proyecto meli con "node index.js"


3 correr la instancia meli_sender con "node index.js" para empezar a publicar.



Prueba teorica:


Procesos, hilos y corrutinas

● Un caso en el que usarías procesos para resolver un problema y por qué.

R= Podría ser un programa que busque en un documento una palabra que le indique.

● Un caso en el que usarías threads para resolver un problema y por qué.

R= Cuando un problema se puede paralelizar y puedo ejecutar tareas al mismo tiempo y no de forma lineal, esto permite que se pueda ejecutar más rapido.

● Un caso en el que usarías corrutinas para resolver un problema y por qué.

R= Cuando requiero hacer tareas de manera independiente y no son dependencientes una de otra, como publicar mensajes en una queue para que otro programa realice algun proceso con ellos.



Optimización de recursos del sistema operativo
Si tuvieras 1.000.000 de elementos y tuvieras que consultar para cada uno de
ellos información en una API HTTP. ¿Cómo lo harías? Explicar.

R= Trataría de dividir el proceso en varios threads y de forma paralela estar procesando los elementos.




Análisis de complejidad
● Dados 4 algoritmos A, B, C y D que cumplen la misma funcionalidad, con
complejidades O(n2), O(n3), O(2n) y O(n log n), respectivamente, ¿Cuál de los
algoritmos favorecerías y cuál descartarías en principio? Explicar por qué.

R= favorecería el D O(n log n), ya que la función crece un poco mas despacio en comparación con las otras 3 complejidades que son exponenciales.
, es decir el número de pasos que tiene que hacer ese algoritmo para finalizar crece mas despacion conforme la entrada de elementos a procesar aumenta.


● Asume que dispones de dos bases de datos para utilizar en diferentes
problemas a resolver. 

La primera llamada AlfaDB tiene una complejidad de O(1)
en consulta y O(n2) en escritura.


La segunda llamada BetaDB que tiene una
complejidad de O(log n) tanto para consulta, como para escritura. ¿Describe en
forma sucinta, qué casos de uso podrías atacar con cada una?


R= AlfaDB puede ser usada para sistemas que requieren una rápida lectura pero sin escritura.
Por ejemplo buscar mensaje en el historial en un sistema de chat.
Consultar si un cliente existe en una empresa
Calcular reportes de ventas o similar
Calculos sobre los datos que tiene la base de datos como modelos de machine learning
Configuracion que requiera leer un sistema para funcionar.

BetaDB
Puede ser utilizada para guardar posicion de geolocalización donde se requiere consultar y actulizar la posición de manera constante.
En sistemas donde hay notificaciones y constantemente se muestra información actualizada que también se requiere actualizar.
