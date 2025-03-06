# Configurar proyecto utilizando Docker compose


## Variables de Entorno

### `.env` en la raíz del proyecto (junto con el archivo `docker-compose.yml`):

- `BACKEND_PORT`: Puerto disponible
- `FRONTEND_PORT`: Puerto disponible.

### `.env` en la carpeta `backend`:

- `DATABASE_URL`: URL de la base de datos que el backend utilizará.
- `SECRET_KEY`: Clave secreta utilizada para la autenticación o encriptación.
- `PORT`: Puerto en el que el backend escuchará.
- `FRONTEND_URL`: URL del frontend, necesaria para la configuracion del cors.

### `.env` en la carpeta `frontend`:

- `VITE_URL`: URL del backend.

## Docker

El proyecto esta configurado para usarse con Docker y Docker Compose. Los volumenes aseguran que las actualizaciones de archivos se reflejen automaticamente.

### Comandos Docker

Para levantar los contenedores en segundo plano, ejecuta el siguiente comando:

```bash
docker compose up -d
```

Para reiniciar los contenedores

```bash
docker compose restart backend
docker compose restart frontend
docker compose restart #reiniciar ambos