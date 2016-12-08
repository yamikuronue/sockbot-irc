[![Build Status](https://travis-ci.org/yamikuronue/sockbot-irc.svg?branch=master)](https://travis-ci.org/yamikuronue/sockbot-irc)

# sockbot-IRC
IRC Provider for SockBot

## Usage
0. Have [sockbot](https://github.com/SockDrawer/Sockbot) installed
1. install using `npm install -g sockbot-irc`
2. Edit your config.yml file like so:

```
core:
  username: [username goes here]
  password: [password goes here]
  server: [IRC server goes here]
  owner: [your nick here]
  provider: sockbot-irc
  channels:
    - #optional_list
    - #of_channels
    - #to_join
```

3. Add plugins as per the sockbot instructions
4. Start with `sockbot config.yml`
