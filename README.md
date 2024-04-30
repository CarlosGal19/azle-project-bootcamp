## Pasos para correr el proyecto:

## 1.- Clonar repositorio:

### git clone https://github.com/adrian-d-hidalgo/azle-api-rest-nextjs.git

## 2.- Ingresar al proyecto:

### cd azle-project-bootcamp

## 3.- Instalar dependencias de Node:

### npm install

## 4.- Levantar réplica de ICP (si no lo habían hecho antes o reiniciar o pararon el proceso):

### dfx start --background

## 5.- Crear un archivo llamado .env dentro de la carpeta frontend y pongan este contenido:

# ICP

### NEXT_PUBLIC_API_REST_URL=http://BACKEND_CANISTER_ID.localhost:4943
### NEXT_PUBLIC_INTERNET_IDENTITY_URL=http://II_CANISTER_ID.localhost:4943

## 6.- Sustituir BACKEND_CANISTER_ID y II_CANISTER_ID por los ID's que te da cuando le das deploy, eso pueden hacerlo así:

### dfx deploy backend
### dfx deploy internet-identity

## 7.- Navegar a la carpeta frontend desde la terminal de la siguiente forma:

### cd frontend

## 8.- Y correr el servidor de desarrollo:

### npm run dev
