# GiveBot
Simple bot used in the Warfarme Discord for automation of giveaways.

To install clone the repo
run `npm install` in the root of the repo.
create an auth.json file one directory up from the main.js file containing
```
{
  "token": "token"
}
```
Run the bot. The first 2 times it will create config's then stop. 3rd time's the charm.

Edit the config.json in the config folder and modify the server, channel and master's id's. these your be your server's id, the giveaways' channel id and your own id respectively.


Commands:
  enter,
  draw,
  clear,
  disable,
  enable,
  count
  
these can be prefixed by "!!", "!", and "/"
for exapmle:
/enter
