import mc from 'minecraft-protocol';
import mcProtocolForge from 'minecraft-protocol-forge'; // Import as default
import randomId from 'random-id';
import { commandHandler } from './commandHandler.js';
import config from './config.json' with { type: 'json' };

const { autoVersionForge } = mcProtocolForge; // Extract autoVersionForge

const { host, port, usernamePattern, usernameLength, staticUsername } = config;

const username = staticUsername || randomId(usernameLength, usernamePattern);
const client = mc.createClient({
    host,
    port,
    username,
    auth: 'offline',
    profilesFolder: './profiles/'
});

await commandHandler(client, './commands');
autoVersionForge(client);

client.on('connect', async () => {
    console.log(`Connected to ${host}:${port} (version: ${client.version})`);
});

client.on('login', async () => console.log(`Logged in as "${client.username}" (UUID: ${client.uuid})`));

client.on('error', (e) => console.error(`Error: ${e}`));
client.on('end', (e) => console.log(`Connection lost (${e})`));
client.on('close', (e) => console.log(`Connection closed (${e})`));
client.on('disconnect', (packet) => console.log(`Disconnected from server: ${JSON.parse(packet.reason)?.translate ?? packet.reason}`));