
```markdown
# Barry's Bot

Este proyecto es un bot para WhatsApp utilizando Baileys. A continuación, se detallan los pasos para configurar y ejecutar el bot en Termux.

## Requisitos

Para ejecutar el bot, necesitas tener instalados Termux, Node.js y Git en tu dispositivo Android.

## Instalación y Configuración

Primero, abre Termux y actualiza los paquetes instalados:
```bash
pkg update
```

Luego, instala Node.js y Git:
```bash
pkg install nodejs git
```

Clona el repositorio del bot y accede a la carpeta del proyecto:
```bash
git clone https://github.com/Barryalitiko/Barrysbot.git
cd Barrysbot
```

Instala las dependencias necesarias para el bot:
```bash
npm install
```

Inicia el bot con Node.js:
```bash
node bot.js
```

## Comandos Disponibles

- **/start.barry**: Activa el bot.
- **/end.barry**: Desactiva el bot.
- **/comandos**: Muestra la lista de comandos disponibles.
- **/info**: Muestra información sobre el bot.
- **/out @usuario**: Expulsa a un usuario del grupo (si el bot es administrador).
- **/stiker**: Convierte una foto en un sticker.
- **/no.link**: Bloquea enlaces de otros grupos.
- **/si.link**: Permite enlaces de otros grupos.
- **/geo.traba**: Bloquea mensajes de ubicación.
- **/nogeo.traba**: Permite mensajes de ubicación.
- **/i.aktive**: Muestra el estado de los comandos activos y desactivados.
- **/info @usuario**: Muestra información sobre un miembro del grupo.