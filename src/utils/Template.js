import _ from 'lodash'
import fs from 'mz/fs'

async function loadTemplate(path, options) {

  options = options || {}

  const f = await fs.readFile(path, 'utf8')
    .catch((err) => {
      if(err) throw err
    })


  return _.template(f, options)

}

export { loadTemplate }
