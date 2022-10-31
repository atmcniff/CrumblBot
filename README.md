# CrumblBot

<!-- ABOUT THE PROJECT -->
## About The Project

A Discord bot that displays the new rotation of cookies being sold by [Crumbl Cookies](https://crumblcookies.com/).

### [Click here to add the official bot to your server](https://discord.com/api/oauth2/authorize?client_id=1031345549514903633&permissions=10240&scope=bot)

### Features:
* Displays cookies in a text channel via picture, video, or embedded message with their descriptions
* Automatically announces when the site is updated with the new cookies for the week, across all membered servers in the first text channel labelled "#general"
* Deletes user-sent commands and bot responses after a maximum of 5 minutes to avoid clutter.

See all commands using .help, .?, or .commands

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```
* Register a Discord bot and setup with the correct intents via https://discord.com/developers/applications
    
    1. Name your bot: go to Applications > New Application
    
    2. Give your bot "life": Bot > Add Bot
    
    3. Enable "Message Content Intent" under "Privileged Gateway Intents"

* Create a your own Discord server to test

* Invite your new bot to your Discord server

    1. Create Redirect: OAUTH2 > General > Add Redirect > Add any link you want, using "https://github.com/atmcniff/CrumblBot" is an excellent choice > Save changes

    2. Generate URL with the necessary permissions: OAUTH2 > URL Generator > select "bot" under SCOPES > select "Send Messages" and "Manage Messages" under BOT PERMISSIONS

    3. Copy your generated url at the bottom and paste into a new browser window.

    4. Add to Server > _your test server_ > Continue

    5. Authorize


### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/atmcniff/CrumblBot.git
   ```

2. Install NPM packages
   ```sh
   npm install
   ```

3. Create a ".env" file in the root directory and copy and paste your bot's token (Revealing your bot's token can be dnoe by going to https://discord.com/developers/applications, _select your bot_ > Bot > Reset Token)
Example .env file with token:
   ```js
   TOKEN=OTOS898hhosdijfdt439hOHoijds892h82;
   ```

4. Save changes

5. Run in terminal
    ```js
   nodemon
   ```

6. Start using commands in any text channel the bot has access to (Use _.help_ for all commands)
<p align="right">(<a href="#readme-top">back to top</a>)</p>
