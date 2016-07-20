const Hue = require('node-hue-api')
const fs = require('fs')
const path = require('path')

exports.middleware = (store) => (next) => (action) => {
  if ('CONFIG_LOAD' === action.type || 'CONFIG_RELOAD' === action.type) {
    const homedir = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE
    const configfile = path.join(homedir, '.hyperhue.json')
    try {
      const hueConfig = JSON.parse(fs.readFileSync(configfile, 'utf-8'))
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
    } catch (e) {
      console.log('You need to run HyperHue init.js first. Copy and paste the following into your terminal. Press the link button on your brige BEFORE your run it.')
      console.log('node ~/.hyperterm_plugins/node_modules/hyperhue/init.js')
      next(action)
    }
  } else {
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
                      color: ${action.payload}
                    }
                    .tabs_nav .tabs_title {
                      color: ${action.payload}
                    }
                  `)
  }
  return state;
}
