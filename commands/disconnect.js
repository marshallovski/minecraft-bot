export default {
    name: "disconnect",
    run: async (client, ev) => {
        client.end();    
        return console.info(`[commands/disconnect]: disconnected from ${client.socket.remoteAddress}:${client.socket.remotePort}`)
    },
};
