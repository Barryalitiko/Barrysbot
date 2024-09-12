# Barry's Bot para iPhone con iSH

Este README está dirigido a usuarios de iPhone que desean ejecutar el bot para WhatsApp utilizando Baileys en la aplicación iSH, un emulador de terminal para iOS.

## Requisitos

Para ejecutar el bot, necesitas tener instalada la aplicación iSH desde la App Store y tener un repositorio de Git y Node.js configurados en iSH.

## Instalación y Configuración en iSH

1. Abre iSH en tu iPhone.

2. Actualiza los paquetes instalados:
    ```bash
    apk update
    ```

3. Instala Node.js y Git:
    ```bash
    apk add nodejs npm git
    ```

4. Clona el repositorio del bot y accede a la carpeta del proyecto:
    ```bash
    git clone https://github.com/Barryalitiko/Barrysbot.git
    cd Barrysbot
    ```

5. Instala las dependencias necesarias para el bot:
    ```bash
    npm install
    ```

6. Configura el archivo de configuración si es necesario. Asegúrate de agregar cualquier clave API o configuración específica al archivo `.env` o similar, según las instrucciones del repositorio.

7. Inicia el bot con Node.js:
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