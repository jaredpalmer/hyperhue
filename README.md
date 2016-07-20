# HyperHue 💡 🌈

A special theme for [HyperTerm](https://hyperterm.org) that changes color
based on your Philips Hue lights.

![HyperHue](https://cloud.githubusercontent.com/assets/4060187/16994601/0df397e2-4e76-11e6-92b5-2bad17a81860.gif)

[Demo Video](https://twitter.com/jaredpalmer/status/755539489242611712)

## How to use

1. Install [HyperTerm](https://hyperterm.org) and add `hyperhue`
to `plugins` in `~/.hyperterm.js`.
2. Press the button on your Hue Bridge.
3. In HyperTerm, run `node ~/.hyperterm_plugins/node_modules/hyperhue/init.js` . The script generates a new bridge user on your behalf and stores your hostname and light number in `~/.hyperhue.json`. You can change light numbers by simply editing the file.
4. `CMD+R` or View > Full Reload

### License 
MIT

Note: This is not an official plugin, and isn't affiliated with Philips Hue.

---
GitHub: <a href="https://github.com/jaredpalmer">@jaredpalmer</a>
Twitter: <a href="https://twitter.com/jaredpalmer">@jaredpalmer</a>
