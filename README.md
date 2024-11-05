# EFI-API-FRONTEND

Esta es una app para gestionar un negocio de reparación de dispositivos electrónicos

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/usuario/nombre-del-proyecto.git
   cd EFI-API-FRONTEND

2. Instala dependencias
   ```bash
   npm install

## Ejecución

1. Inicia la aplicación:

   ```bash
   npm run dev

Asegúrece de que el servidor también esta corriendo.

## Iniciar sesión

Puede iniciar sesión con los usuarios creados con los seeaders del proyecto del servidor, los emails son 'admin@admin.com' y 'tecnico@tecnico.com' y la contraseña de ambos es 'password123'. También puede registrar un usuario al tocar boton 'Registrarse' en la página de login.

## Funcionalidades

### Dispositivos

1. Registrar un nuevo dispositivo (solo admin).
2. Crear una orden de reparación para un dispositivo (solo admin).
3. Modificar dispositivo (solo admin).
4. Eliminar dispositivo (solo admin).
5. Ver detalle de dispositivo 

### Ordenes de reparación

1. Modificar orden de reparación (solo admin).
2. Eliminar orden (solo admin).
3. Registrar reparación como iniciada (solo técnico).
4. Ver detalle de orden.

### Reparaciones

1. Eliminar reparación (solo técnico).
2. Marcar reparación como finalizada (solo técnico).
3. Ver detalle de la reparación.
