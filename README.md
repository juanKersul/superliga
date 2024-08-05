# Superliga

## Descripción

Este proyecto incluye un frontend y un backend para la aplicación Superliga. A continuación, se detallan las instrucciones para ejecutar la aplicación en entornos de desarrollo y producción, así como una descripción de los componentes y funcionalidades principales.

## Entorno de Desarrollo

### Frontend

Para iniciar el frontend en el entorno de desarrollo, sigue estos pasos:

1. Navega al directorio del frontend:

    cd frontend

2. Instala las dependencias:

    npm install

3. Inicia el servidor de desarrollo:

    npm run dev

    Esto iniciará el servidor de desarrollo de Vite y la aplicación estará disponible en `http://localhost:3000`.

### Backend

Para iniciar el backend en el entorno de desarrollo utilizando Docker, sigue estos pasos:

1. Navega al directorio del backend:

    cd backend

2. Inicia los contenedores con Docker Compose:

    docker-compose up

    Esto levantará los contenedores necesarios para el backend y la base de datos. El backend estará disponible en `http://localhost:8000`.

3. Probar la API del Backend

    Puedes consultar y probar la API del backend utilizando Swagger en la siguiente URL:

    [http://localhost:8000/docs/](http://localhost:8000/docs/)

## API

La API del backend consta de dos endpoints principales:

1. **Endpoint para Subir Archivos**:
   - **Descripción**: Permite subir archivos CSV. Utiliza streams con `fast-csv` para procesar los datos y un conversor a UTF-8 para guardarlos en PostgreSQL.
   - **Funcionalidad**: Convierte los datos del archivo a un formato adecuado y los almacena en la base de datos.

2. **Endpoint RESTful para Consultas Dinámicas**:
   - **Descripción**: Permite realizar consultas dinámicas a la base de datos usando parámetros de consulta. Las consultas se parsean y se utiliza TypeORM para obtener los datos de la base de datos en modo solo select.
   - **Funcionalidad**: Permite realizar una amplia variedad de consultas sin necesidad de agregar más código, haciendo el sistema extensible y flexible.

## Mejoras Futuras

- **Formulario de Consultas Dinámicas**: Implementar un formulario en el frontend que permita realizar consultas dinámicas a la base de datos.
- **Operaciones CRUD**: Agregar funcionalidades CRUD para gestionar diferentes archivos CSV en la base de datos.
- **Seguridad**: Mover URLs, contraseñas y otras configuraciones sensibles a variables de entorno para mejorar la seguridad.
- **Despliegue en AWS**: Montar el proyecto en AWS para aprovechar la infraestructura en la nube y mejorar la disponibilidad y escalabilidad.

## Producción

Para ejecutar la aplicación en un entorno de producción, sigue estos pasos:

1. Navega al directorio raíz del proyecto:

    cd /home/juan/Desktop/superliga

2. Inicia los contenedores con Docker Compose:

    docker-compose up
    (si ya levantaste los contenedores de desarrollo del backend recuerda hacer docker compose down antes)

    Esto levantará los contenedores configurados para el entorno de producción. La aplicación estará disponible en `http://localhost/3000`.

## Optimización

- Los Dockerfiles para producción están optimizados para ser lo más ligeros posible, utilizando imágenes base ligeras y eliminando archivos innecesarios.

## Frontend

El frontend incluye un data provider que realiza consultas al endpoint del backend y proporciona los datos a otros componentes a través de contexto. Esto permite una integración fluida y eficiente de los datos en la aplicación.

## Tecnologías

- **Backend**: Node.js, TypeScript, PostgreSQL
- **Frontend**: React, JavaScript, TypeScript
- **Despliegue**: Docker, Docker Compose

El proyecto está diseñado para ser extensible, permitiendo realizar muchas otras consultas gracias al endpoint con parámetros que soporta una amplia gama de consultas sin necesidad de modificar el código.

## Notas

- Asegúrate de tener Docker y Docker Compose instalados y funcionando en tu sistema.