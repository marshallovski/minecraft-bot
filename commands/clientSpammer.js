import mc from 'minecraft-protocol';
import mcProtocolForge from 'minecraft-protocol-forge'; // Import as default
import randomId from 'random-id';

import config from '../config.json' with { type: 'json' };

const { autoVersionForge } = mcProtocolForge; // Extract autoVersionForge

const { host, port, usernamePattern, usernameLength, staticUsername } = config;

export default {
    name: "clientSpammer",
    run: async (client, ev) => {
        setInterval(async () => {
            const username = randomId(usernameLength, usernamePattern);

            const mcClient = mc.createClient({
                host,
                port,
                username,
                auth: 'offline',
                profilesFolder: './profiles/'
            });

            autoVersionForge(mcClient);

            mcClient.on('login', async () => console.log(`[commands/clientSpammer]: spawned client "${mcClient.username}" (UUID: ${mcClient.uuid})`));
        }, 500);
    }
}