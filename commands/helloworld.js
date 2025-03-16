export default {
    name: "hello",
    run: async (client, ev) => {
        client.chat("Hello!");
    }
}