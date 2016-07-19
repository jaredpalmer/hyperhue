# HyperHue

A special theme for [HyperTerm](https://hyperterm.org) that changes color
based on your Philips Hue lights.

## How to use

1. Install [HyperTerm](https://hyperterm.org) and add `hyperhue`
to `plugins` in `~/.hyperterm.js`.
2. Press the button on your Hue Bridge.
3. Run the `node ~/.hyperterm_plugins/node_modules/hyperhue/init.js` to link hyperhue. The script generates a new bridge user on your behalf and stores your hostname and light number in `~/.hyperhue.json`. You can change light numbers by simply editing the file.
4. `CMD+R` or View > Full Reload

### License 
MIT
