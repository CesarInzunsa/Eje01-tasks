# API de Tareas

Esta es una API simple para gestionar tareas. Sigue las instrucciones a continuación para configurar y ejecutar el servidor.

## Instalación

1. Clona este repositorio en tu máquina local:
 ```bash
git clone https://github.com/CesarInzunsa/T2-Eje01-tasks.git
 ```

2. Ingresa al directorio del proyecto:
```bash
cd T2-Eje01-tasks
 ```

3. Instala las dependencias utilizando npm:
```bash
npm i
```

## Configuración
1. Crea un archivo llamado .env en el directorio raíz del proyecto.

2. Copia y pega el siguiente contenido en el archivo .env:
```bash
PORT=3000
URL=http://localhost:3000
 ```
Este archivo contiene la configuración básica para el puerto y la URL de la aplicación.

3. Siéntete libre de modificar los valores de PORT y URL según tus necesidades.

4. Asegúrate de que el archivo .env no se incluya en tu repositorio (ya está excluido en el archivo .gitignore por defecto).

## Ejecución
Una vez que hayas instalado las dependencias y configurado el archivo .env, puedes iniciar el servidor con el siguiente comando:
```bash
node index.js
```

Endpoints API
```bash
### CREATE A NEW TASK
POST http://localhost:3000/tasks
Content-Type: application/json

{
  "title": "titulo",
  "description": "descripción"
}

### GET ALL TASKS
GET http://localhost:3000/tasks

### GET A TASK BY ID
GET http://localhost:3000/tasks/1

### UPDATE A TASK BY ID
PUT http://localhost:3000/tasks/1
Content-Type: application/json

{
  "title": "Nuevo titulo",
  "description": "nueva descripción",
  "completed": true
}

### DELETE A TASK BY ID
DELETE http://localhost:3000/tasks/2

### COUNT TASKS
GET http://localhost:3000/tasks/count

### GET RECENT TASK
GET http://localhost:3000/tasks/recent

### GET OLDEST TASK
GET http://localhost:3000/tasks/oldest

### GET TASKS BY STATUS
GET http://localhost:3000/tasks/status
```
