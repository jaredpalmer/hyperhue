const Hue = require('node-hue-api')
const chalk = require('chalk')
const prompt = require('prompt')
const path = require('path')
const fs = require('fs')

prompt.message = ''

const homedir = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
const configfile = path.join(homedir, '.hyperhue.json');

const displayResult = (result) => {
  console.log(JSON.stringify(result, null, 2))
}

const displayError = (e) => {
  console.error(e)
}

const schema = {
  properties: {
    bridgeNumber: {
      description: 'Select bridge number'
    }
  }
}

const createUser = (host) => {
  const hue = new Hue.HueApi()
  return hue.registerUser(host, 'hyperhue')
            .then(username => {
              console.log('\n')
              const s = JSON.stringify({
                host,
                username,
                light: 1
              }, null, 2);
              fs.writeFileSync(configfile, s + '\n');
              console.log('config file written to `%s`\n', configfile);
              console.log(s);
              console.log('\n')
              console.log(`CMD + R to reload Hyperterm with HyperHue installed`)
          })

}


const init = () => {
  Hue.nupnpSearch().then(bridges => {
    if (bridges.length > 0 ) {
      if (bridges.length  == 1) {
        return bridges[0].ipaddress
      } else {
        console.log('\n')
        console.log(chalk.cyan(`${bridges.length} Hue Bridge(s) Found:\n`))
        bridges.map((b,i) => console.log(chalk.yellow(`${i+1}: ${b.name || ''}  ${b.ipaddress}  \n`)))
        prompt.start()
        return prompt.get(schema, (err, result) => {
          return bridges[result.bridgeNumber - 1].ipaddress
        })
      }
    }
  }).then(host => {
    const hue = new Hue.HueApi()
    return createUser(host)
  }).catch(e => {
    if (e.type === 101) {
      console.log('\n')
      console.log(chalk.red.bold(`Press the link button on your bridge ${chalk.underline('before')} running the script`))
      console.log('\n')
    } else {
      console.log(e)
    }
  }).done();
}


init()
