import _ from 'lodash'
import chalk from 'chalk'
import moment from 'moment'

const log = (s) => {
  console.log(
    `[${chalk.rgb(255,255,0)(
      moment().format('YYYY-MM-DD HH:mm:ss')
    )}] ${ s }`
  )
  _.isObject(s) || _.isArray(s) ? console.dir(s): '';

}
export { log }
