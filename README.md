## Table of Contents

1. [About the Project](#about-the-project)
2. [Local Development](#local-development-environment-setup)
3. [Current Limitations](#current-limitations)
4. [Future Improvements](#future-improvements)

## About the Project

This repository holds the code written by Mason Sain for Green River College's course SDEV 450's final project in Spring 2025. This is a project about a little dungeon master and user game. 

### Findings

It can achive a basic task as this and did not get completely off track. It kept the same theme of it being undead throughout the entire thing and was able to keep my unique final boss at the end. 
It was funny in some parts. For example, when I was trying to test it's limit and attempted to combine items, it said I could but also attempted to continue the dungeon by introducing the next fight. 

![alt text](https://github.com/sainmas/aiGame/blob/main/images/Example.png "Example of the AI attempting to keep the user on track")

## Local Development Environment Setup

1. Clone the project repository locally.
   `git clone https://github.com/dhysdrn/nursing-chatbot.git`
2. Have the package manager `npm` installed ([npm](https://www.npmjs.com/)).
3. Get an OpenAI key off [OpenAI](https://platform.openai.com/)
4. Create a .env file with this variable using the OpenAI API key you generated: {AI_API_KEY=""}.
5. In the terminal/command line, install all dependencies with `npm install`.
6. Run the project with `npm run dev`.

## Current Limitations

1. Currently the inventory & health system is a little finicky and does not work all the time. 
2. The AI is a little dumb and does not understand that you can tell it things you can't do. For example, if you said you did a critical hit on every target, the AI would take that and say you did a critical hit on everyone when you can normally only hit one enemy.
3. UI is a little bland, does not automatically scroll down and you need to manually do that yourself.

## Future Improvements

1. The inventory/health system. This could be fixed with a better model or better prompt/history.
2. Set up limitations where if you say something you cannot do, you would be unable to do it.
3. Clean up UI, perhaps add some AI generated images for the enemies/items.
