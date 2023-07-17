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
