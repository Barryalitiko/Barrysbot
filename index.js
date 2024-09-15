const makeWASocket = require('@adiwajshing/baileys').default;
const { DisconnectReason } = require('@adiwajshing/baileys');
const { Boom } = require('@hapi/boom');

let botStarted = false;  // Estado inicial, el bot está apagado
let barryAktive = false;  // Controla si las funciones de moderación están activas
let noLinkActive = false; // Controla si la eliminación de enlaces está activa
let noLegioActive = false; // Controla la eliminación de mensajes largos
let geoTrabaActive = false; // Controla la eliminación de mensajes de ubicación
let commandList = new Map(); // Para almacenar los mensajes repetidos

async function startBarryBot() {
    const sock = makeWASocket();

    // Manejar actualizaciones de conexión
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === 'close') {
            const shouldReconnect = lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('Conexión cerrada. Reintentando...', shouldReconnect);
            if (shouldReconnect) {
                startBarryBot();  // Reintentar si no ha sido desconectado
            }
        } else if (connection === 'open') {
            console.log("Barry's Bot está conectado a WhatsApp");
        }
    });

    // Escuchar mensajes
    sock.ev.on('messages.upsert', async (messageUpdate) => {
        const message = messageUpdate.messages[0];

        // Ignorar si el mensaje es de nuestro propio bot
        if (!message.key.fromMe && message.message) {
            const incomingMessage = message.message.conversation;

            console.log('Mensaje recibido:', incomingMessage);

            // Comando para iniciar el bot
            if (incomingMessage.toLowerCase() === '/start.barry') {
                botStarted = true;
                await sock.sendMessage(message.key.remoteJid, { text: "Barry's Bot está ahora activo." });
            }

            // Comando para apagar el bot
            if (incomingMessage.toLowerCase() === '/end.barry') {
                botStarted = false;
                await sock.sendMessage(message.key.remoteJid, { text: "Barry's Bot ha sido desactivado." });
            }

            // Comando para mostrar la lista de comandos
            if (incomingMessage.toLowerCase() === '/comandos') {
                await sock.sendMessage(message.key.remoteJid, {
                    text: `
Lista de comandos:
1. /start.barry - Activa Barry's Bot.
2. /end.barry - Desactiva Barry's Bot.
3. /comandos - Muestra la lista de comandos.
4. /info - Muestra la información del bot.
5. /out @usuario - Expulsa a un usuario del grupo (solo para administradores).
6. /stiker - Convierte una imagen en un sticker cuando se responde a una foto.
7. /barry.aktive - Activa las funciones de moderación.
8. /barry.deaktive - Desactiva las funciones de moderación.
9. /no.link - Activa la eliminación automática de enlaces.
10. /si.link - Permite el envío de enlaces.
11. /no.legio - Activa la eliminación automática de mensajes largos.
12. /si.legio - Desactiva la eliminación automática de mensajes largos.
13. /geo.traba - Activa la eliminación automática de mensajes de ubicación.
14. /nogeo.traba - Desactiva la eliminación automática de mensajes de ubicación.
15. /i.aktive - Muestra el estado de los comandos activos.
16. /info @usuario - Muestra el número de mensajes enviados por un miembro del grupo.
17. /sticker - Convierte una imagen en un sticker cuando se responde a una foto.
18. /rules - Muestra las reglas del grupo.
19. /welcome [mensaje] - Establece un mensaje de bienvenida para nuevos miembros.
20. /groupinfo - Muestra información sobre el grupo.
21. /secreto - Comando secreto.
                    `
                });
            }

            // Comando para mostrar información del bot
            if (incomingMessage.toLowerCase() === '/info') {
                await sock.sendMessage(message.key.remoteJid, {
                    text: "Información del bot:\nCreador: B de Barry\nVersión: v1.0\nPropósito: Crear un ambiente sano dentro de los grupos de WhatsApp."
                });
            }

            // Comando para activar funciones de moderación
            if (incomingMessage.toLowerCase() === '/barry.aktive') {
                barryAktive = true;
                await sock.sendMessage(message.key.remoteJid, { text: "Las funciones de moderación están activas." });
            }

            // Comando para desactivar funciones de moderación
            if (incomingMessage.toLowerCase() === '/barry.deaktive') {
                barryAktive = false;
                await sock.sendMessage(message.key.remoteJid, { text: "Las funciones de moderación están desactivadas." });
            }

            // Comando para activar el filtro de enlaces
            if (incomingMessage.toLowerCase() === '/no.link') {
                noLinkActive = true;
                await sock.sendMessage(message.key.remoteJid, { text: "El filtro de enlaces está activo." });
            }

            // Comando para desactivar el filtro de enlaces
            if (incomingMessage.toLowerCase() === '/si.link') {
                noLinkActive = false;
                await sock.sendMessage(message.key.remoteJid, { text: "El filtro de enlaces está desactivado." });
            }

            // Comando para activar la eliminación de mensajes largos
            if (incomingMessage.toLowerCase() === '/no.legio') {
                noLegioActive = true;
                await sock.sendMessage(message.key.remoteJid, { text: "La eliminación de mensajes largos está activa." });
            }

            // Comando para desactivar la eliminación de mensajes largos
            if (incomingMessage.toLowerCase() === '/si.legio') {
                noLegioActive = false;
                await sock.sendMessage(message.key.remoteJid, { text: "La eliminación de mensajes largos está desactivada." });
            }

            // Comando para activar la eliminación de mensajes de ubicación
            if (incomingMessage.toLowerCase() === '/geo.traba') {
                geoTrabaActive = true;
                await sock.sendMessage(message.key.remoteJid, { text: "La eliminación de mensajes de ubicación está activa." });
            }

            // Comando para desactivar la eliminación de mensajes de ubicación
            if (incomingMessage.toLowerCase() === '/nogeo.traba') {
                geoTrabaActive = false;
                await sock.sendMessage(message.key.remoteJid, { text: "La eliminación de mensajes de ubicación está desactivada." });
            }

            // Comando para mostrar el estado de los comandos activos
            if (incomingMessage.toLowerCase() === '/i.aktive') {
                let statusMessage = `Estado de los comandos:\n`;
                statusMessage += `- /barry.aktive: ${barryAktive ? '🟢' : '🔴'}\n`;
                statusMessage += `- /no.link: ${noLinkActive ? '🟢' : '🔴'}\n`;
                statusMessage += `- /no.legio: ${noLegioActive ? '🟢' : '🔴'}\n`;
                statusMessage += `- /geo.traba: ${geoTrabaActive ? '🟢' : '🔴'}\n`;
                await sock.sendMessage(message.key.remoteJid, { text: statusMessage });
            }

            // Comando para expulsar un miembro del grupo
            if (incomingMessage.toLowerCase().startsWith('/out @')) {
                if (message.key.remoteJid.startsWith('g')) {  // Asegúrate de que es un grupo
                    const mentionedJid = message.message.extendedTextMessage.contextInfo.mentionedJid[0];
                    const participant = mentionedJid;

                    const isAdmin = (await sock.groupMetadata(message.key.remoteJid)).participants
                        .some(p => p.id === participant && p.admin !== null);

                    if (!isAdmin) {
                        await sock.groupRemove(message.key.remoteJid, [participant]);
                    } else {
                        await sock.sendMessage(message.key.remoteJid, { text: "Barry no permite esta acción." });
                    }
                }
            }

            // Comando para convertir imagen en sticker
            if (message.message.imageMessage && incomingMessage.toLowerCase() === '/stiker') {
                const image = message.message.imageMessage;
                const buffer = await sock.downloadMediaMessage(message);
                await sock.sendMessage(message.key.remoteJid, { sticker: buffer });
            }

            // Comando para eliminar mensajes largos
            if (barryAktive && noLegioActive && incomingMessage.length > 3000) {
                await sock.deleteMessage(message.key.remoteJid, message.key);
            }

            // Comando para eliminar mensajes repetidos
            if (barryAktive) {
                const text = incomingMessage.toLowerCase();
                const userMessages = commandList.get(text) || [];
                userMessages.push(message.key.remoteJid);
                if (userMessages.length >= 15) {
                    await sock.groupRemove(message.key.remoteJid, [message.key.remoteJid]);
                }
                commandList.set(text, userMessages);
            }

            // Comando para mostrar la información del miembro
            if (incomingMessage.toLowerCase().startsWith('/info @')) {
                if (message.key.remoteJid.startsWith('g')) {
                    const mentionedJid = message.message.extendedTextMessage.contextInfo.mentionedJid[0];
                    const participant = (await sock.groupMetadata(message.key.remoteJid)).participants
                        .find(p => p.id === mentionedJid);

                    if (participant) {
                        const messageCount = commandList.get(participant.id) ? commandList.get(participant.id).length : 0;
                        await sock.sendMessage(message.key.remoteJid, { text: `El usuario ${mentionedJid} ha enviado ${messageCount} mensajes.` });
                    } else {
                        await sock.sendMessage(message.key.remoteJid, { text: "No se encontró la información del usuario." });
                    }
                }
            }

            // Comando secreto
            if (incomingMessage.toLowerCase() === '/secreto') {
                await sock.sendMessage(message.key.remoteJid, { text: "¡Comando secreto activado!" });
            }

            // Comando para permitir o eliminar enlaces
            if (barryAktive && noLinkActive && message.message.conversation.includes('https://')) {
                await sock.deleteMessage(message.key.remoteJid, message.key);
            }

            // Comando para activar el control de enlaces
            if (incomingMessage.toLowerCase() === '/no.link') {
                noLinkActive = true;
                await sock.sendMessage(message.key.remoteJid, { text: "La eliminación de enlaces está activa." });
            }

            // Comando para desactivar el control de enlaces
            if (incomingMessage.toLowerCase() === '/si.link') {
                noLinkActive = false;
                await sock.sendMessage(message.key.remoteJid, { text: "La eliminación de enlaces está desactivada." });
            }

            // Comando para manejar mensajes de ubicación
            if (barryAktive && geoTrabaActive) {
                if (message.message.locationMessage || message.message.liveLocationMessage) {
                    await sock.deleteMessage(message.key.remoteJid, message.key);
                }
            }

            // Comando para expulsar mensajes repetidos
            if (barryAktive && incomingMessage.length > 3000) {
                await sock.deleteMessage(message.key.remoteJid, message.key);
            }
        }
    });
}

// Iniciar el bot
startBarryBot();
