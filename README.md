# minecraft-bot
 Simple Minecraft bot with commands and command handler.
 
 Supported Minecraft versions: **1.7.10-1.24.1** (and possibly newer, depends on a `minecraft-protocol` library).

 # Commands
 Default command prefix is `!`, but you can change it in `config.json` file.
 
 Available commands: `!hello`, `!disconnect`, `!clientSpammer`.
 <br>
 <br>
 <br>
 But, of course, you can write your own commands!

 # Command Example
 Create `command.js` file and place it in `commands` folder.
```js
export default {
    name: "test",
    run: async (client, ev) => {
        client.chat("Yo! A custom command!");
    }
}
```

# Installation
1. Clone this repo: `git clone https://github.com/marshallovski/minecraft-bot`
2. Open your terminal in folder `minecraft-bot`
3. Install packages: `npm i`
4. Execute `npm run test` (for developing purposes; for stable mode: `node .`)
