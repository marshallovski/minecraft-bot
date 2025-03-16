import { readdir } from "node:fs";
import chatMessage from "./utils/chatMessage.js";

import * as _config from "./config.json" with { type: 'json' };
const config = _config.default;

async function commandHandler(client, commandsFolder) {
    const commands = {};

    try {
        const files = await new Promise((resolve, reject) => {
            readdir(commandsFolder, {}, async (err, files) => {
                if (err)
                    reject(err);
                else
                    resolve(files);
            });
        });

        const commandPromises = files.map(async (f) => {
            try {
                const command = await import(`${commandsFolder}/${f}`);
                commands[command?.default?.name] = command?.default;
                console.log(`[commandHandler]: loaded command ${command?.default?.name}`);
            } catch (importErr) {
                console.error(`[commandHandler]: error importing ${f}:`, importErr);
            }
        });

        await Promise.all(commandPromises);

        client.on('playerChat', async (ev) => {
            const message = await chatMessage(client, ev);
            const messageContent = message.content;

            if (messageContent.startsWith(config.commandPrefix)) {
                const commandName = message.content
                    .slice(config.commandPrefix.length) // Remove the prefix
                    .trim(); // Remove extra spaces                

                if (commands[commandName]) {
                    try {
                        await commands[commandName]?.run(client, ev);
                    } catch (e) {
                        return client.chat(`Error executing command '${commandName}': ${e.message}`);
                    }
                } else {
                    return client.chat(`Unknown command: ${commandName}`);
                }
            }

            console.log({ trugie: 'Verified:', false: 'UNVERIFIED:' }[message?.verified] || '', `<${message?.author}> ${messageContent}`);
        });

        return commands;
    } catch (err) {
        console.error(`[commandHandler]: error loading commands: ${err}`);
        return {};
    }
}

export { commandHandler };