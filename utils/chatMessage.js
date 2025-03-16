async function chatMessage(client, ev) {
    let content;

    try {
        if (ev.formattedMessage) {
            content = JSON.parse(ev.formattedMessage);
        } else if (ev.unsignedContent) {
            content = JSON.parse(ev.unsignedContent);
        } else {
            content = { text: ev.plainMessage };
        }
    } catch (e) {
        throw e;
    }  

    return {
        verified: ev.verified,
        author: content.with[0].insertion,
        content: content.with[1].text,
    };
}

export default chatMessage;