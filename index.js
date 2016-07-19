const Hue = require('node-hue-api')
const fs = require('fs')
const path = require('path')

exports.middleware = (store) => (next) => (action) => {
  const homedir = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE
  const configfile = path.join(homedir, '.hyperhue.json')
  try {
    const hueConfig = JSON.parse(fs.readFileSync(configfile, 'utf-8'))
    if ('CONFIG_LOAD' === action.type) {
      const { host, username, light } = hueConfig
      const api = new Hue.HueApi(host, username)
      return api
              .lightStatusWithRGB(1)
              .then(status => {
                const { rgb } = status.state
                return store.dispatch({
                  type: 'UPDATE_HUE',
                  payload: `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
                })
              })
              .catch(e => {
                console.log(e)
                return next(action)
              })
    } else {
      next(action)
    }
  } catch (e) {
    console.log('You need to run HyperHue init.js first. Copy and paste the following into your terminal.')
    console.log('\n')
    console.log(`node ~/.hyperterm_plugins/node_modules/hyperhue/init.js`
    console.log('\n')
    next(action)
  }
}

exports.reduceUI = (state, action) => {
  switch (action.type) {
    case 'UPDATE_HUE':
      console.log(action)
      return state.set('borderColor', action.payload)
                  .set('cursorColor', action.payload)
                  .set('css', `
                    ${state.css || ''}
                    .tabs_nav .tabs_list .tab_text {
                      color: ${action.payload};
                    }
                    .tabs_nav .tabs_title {
                      color: ${action.payload};
                    }
                  `)
  }
  return state;
};
