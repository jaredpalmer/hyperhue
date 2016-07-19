# HyperHue

A special theme for [HyperTerm](https://hyperterm.org) that changes color
based on your Philips Hue lights.

[Demo Video](https://twitter.com/jaredpalmer/status/755539489242611712)

## Screenshot

![HypeHue Screenshot](https://cloud.githubusercontent.com/assets/4060187/16970018/2a0e67e8-4de7-11e6-9c19-6bec88ce0941.png)

## How to use

1. Install [HyperTerm](https://hyperterm.org) and add `hyperhue`
to `plugins` in `~/.hyperterm.js`.
2. Press the button on your Hue Bridge.
3. In HyperTerm, run `node ~/.hyperterm_plugins/node_modules/hyperhue/init.js` . The script generates a new bridge user on your behalf and stores your hostname and light number in `~/.hyperhue.json`. You can change light numbers by simply editing the file.
4. `CMD+R` or View > Full Reload

### License 
MIT


---
GitHub: <a href="https://github.com/jaredpalmer">@jaredpalmer</a>
Twitter: <a href="https://twitter.com/jaredpalmer">@jaredpalmer</a>
