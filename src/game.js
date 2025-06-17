import OpenAI from 'openai';
import { AI_API_KEY } from './connection.js';

// OpenAI instance
const openai = new OpenAI({ apiKey: AI_API_KEY });

export const runGame = async (req, res) => {
    let { messages, health, inventory } = req.body;
    console.log(messages);
    console.log(health);
    console.log(inventory);
    const newMessage = messages[messages.length-1];

    console.log(newMessage.content);

    let template = {
    role: "system", 
    content: `You are a dungeon master who is going to run a text based adventure RPG for me.
    You will need to setup an adventure for me which will involve having
    me fight random enemy encounters, reward me with loot after killing enemies,
    I have a goal of getting to the final floor and beating the final boss to collect the diamond. 
    I do not know what the final boss is, but you will describe it to them when I reach the final floor.

    When I am fighting enemies, please ask me what choice I want to make, such as
    "Do you want to attack, use an item, or run away?"
    I as the player should input this and you need to describe the outcome with my input.

    During this entire time, please track my health points which will start at 10.

    the adventure should have some of the following
    - the hero must clear out a dungeon from undead enemies
    - the dungeon has 3 levels
    - each level has 1 set of enemies to fight
    - the final level has a boss (this boss is a buff wizard skeleton)
    - the final level has a chest filled with one diamond which will complete the adventure

    Given this scenario, please ask the player for their initial actions.

    YOU SHOULD ALWAYS ASK THE PLAYER FOR HIS NEXT STEPS.
    --------------------
    User is ${health}/10 health points.
    User's inventory: ${inventory}
    ---------------------
    User's NEWEST Message: ${newMessage.content}
    --------------------
    `
}

    let newHistory = [];
    for (let i = 0; i < messages.length; i++) {
      newHistory.push(messages[i]);
    }


    //This uses credits, be careful when sending prompts to the AI
    let aiResponse = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        //stream: true,
        messages: [template, ...newHistory]
    })

    aiResponse = aiResponse.choices[0].message.content.trim();
    if (aiResponse.charAt(0)== '`') {
        aiResponse = aiResponse.substring(7, aiResponse.length-4)
    }
    console.log(aiResponse);

    const completion = await openai.chat.completions.create({
      messages: [
        {
            role: "system",
            content: `You are here to specify the health and inventory of the user. 
            Specifiy how much damage a weapon does, how much defense an armor has, how much health the user has.

            Return a JSON object with the following format:
            {
                "health": <number>,
                "inventory": [string]
            }

            Previously, the user has ${health}/10 health points.
            The user has the following items in their inventory: ${inventory}

            here is the most recent events of the adventure: 
            
            "${aiResponse}"
            
            ONLY GIVE ME JSON OUTPUT`,
        }
      ],
      model: "gpt-4o-mini",
    });

    let summary = completion.choices[0].message.content.trim();

    if (summary.charAt(0)== '`') {
        summary = summary.substring(7, summary.length-4)
    }

    console.log(summary);

    // Parse the JSON string returned by the AI
    const stats = JSON.parse(summary);
    //console.log(stats.health);
    //console.log(stats.inventory);


    res.status(200).json({
        message: aiResponse,
        health: stats.health,
        inventory: stats.inventory
    })
}