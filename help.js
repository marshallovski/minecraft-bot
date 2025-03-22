import { commands } from '../commandHandler.js';

export default {
    name: "help",
    run: async (client, ev) => {
        const commandNames = Object.values(commands).map(command => command.name);

        client.chat(`Available commands: ${commandNames.join(', ')}`);
    }
}