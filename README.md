# Barry's Bot

Este proyecto es un bot para WhatsApp utilizando Baileys. A continuación, se detallan los pasos para configurar y ejecutar el bot en Termux.

## Requisitos

Para ejecutar el bot, necesitas tener instalados Termux, Node.js y Git en tu dispositivo Android.

## Instalación y Configuración

1. Abre Termux y actualiza los paquetes instalados:
    ```bash
    pkg update
    ```

2. Luego, instala Node.js y Git:
    ```bash
    pkg install nodejs git
    ```

3. Clona el repositorio del bot y accede a la carpeta del proyecto:
    ```bash
    git clone https://github.com/Barryalitiko/Barrysbot.git
    cd Barrysbot
    ```

4. Instala las dependencias necesarias para el bot:
    ```bash
    npm install
    ```

5. Configura el archivo de configuración si es necesario. Asegúrate de agregar cualquier clave API o configuración específica al archivo `.env` o similar, según las instrucciones del repositorio.

6. Inicia el bot con Node.js:
    ```bash
    node bot.js
    ```

## Comandos Disponibles

- `/start.barry`: Activa el bot.
- `/end.barry`: Desactiva el bot.
- `/comandos`: Muestra la lista de comandos disponibles.
- `/info`: Muestra información sobre el bot.
- `/out @usuario`: Expulsa a un usuario del grupo (si el bot es administrador).
- `/stiker`: Convierte una foto en un sticker.
- `/no.link`: Bloquea enlaces de otros grupos.
- `/si.link`: Permite enlaces de otros grupos.
- `/geo.traba`: Bloquea mensajes de ubicación.
- `/nogeo.traba`: Permite mensajes de ubicación.
- `/i.aktive`: Muestra el estado de los comandos activos y desactivados.
- `/info @usuario`: Muestra información sobre un miembro del grupo.

