window.onload = async () => {
    document.getElementById("sendMessage").onclick = sendMessage;
}

async function sendMessage(e) {
    e.preventDefault();
    const messageInput = document.getElementById('userMessage');
    const main = document.getElementById("chat");

    // Get the values of all the input fields
    const newMessage = {
        message: messageInput.value
    };

    const oldMessages = document.getElementById('chat');
    //console.log(oldMessages);

    let allMessages = [];

    // Loop through the existing messages and concatenate them
    for (let i = 0; i < oldMessages.children.length; i++) {
        const message = oldMessages.children[i].children[0].innerHTML;
        const type = oldMessages.children[i].children[0].className;
        allMessages.push({role:`${type}`, content:`${message}`});
    }
    // Append the new message to the existing messages
    allMessages.push({role:"user", content:`${newMessage.message}`});
    console.log(allMessages)
    
    //Add the new message to the chat
    addMessage(newMessage.message, "user", main);

    // Clear the input field
    messageInput.value = "";

    // Get the health and inventory from the UI
    const healthElement = document.getElementById("healthValue");
    const health = parseInt(healthElement.innerHTML.split("/")[0]);
    const inventory = document.getElementById("inventoryCount").innerHTML;
    console.log(health)
    console.log(inventory);
    
    const body = {
        "messages": allMessages,
        "health": health,
        "inventory": inventory
    };


    // Make a post request to the server to send the message
    const result = await fetch("/chat", {
        method: "post",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })


    const aiResponse = await result.json();
    console.log(aiResponse);
    let aiResponseMessage = createNewLines(aiResponse.message);
    addMessage(aiResponseMessage, "system", main);
    updateHealth(aiResponse.health);
    updateInventory(aiResponse.inventory);

}

function addMessage(message, type, main) {
    //create DOM elements
    const section = document.createElement("section");
    const p = document.createElement("p");

    //add properties
    p.innerHTML = message;
    p.className = `${type}`;
    section.className = `${type}-chat-message`;

    //nest elements
    section.appendChild(p);

    main.appendChild(section);
}

function createNewLines(text) {
    // Split the text by new lines and join with <br> tags
    return text.split('\n').join('<br>');
}

function updateInventory(inventory) {
    const inventoryElement = document.getElementById("inventoryCount");
    let inventoryList = "";
    for (let i = 0; i < inventory.length; i++) {
        inventoryList = inventory[i];
    }
    inventoryElement.innerHTML = inventory;
    if (inventory.length === 0) {
        inventoryElement.innerHTML = `Empty`;
    }
}

function updateHealth(health) {
    const healthElement = document.getElementById("healthValue");
    healthElement.innerHTML = `${health}/10`;
    if (health <= 0) {
        healthElement.innerHTML = `0/10 - You have died!`;
        const text = document.getElementById("userMessage");
        text.innerHTML = `You have died! Please refresh the page to start a new game`;
        text.disabled = true;
        const button = document.getElementById("sendMessage");
        button.disabled = true;
    }
}