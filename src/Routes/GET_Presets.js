import dotenv from 'dotenv/config'
import fs from 'mz/fs'
import _ from 'lodash'

import { log } from '../utils/Log'
import Mongo from '../utils/Mongo'
import { loadTemplate } from '../utils/Template'

export default async function (req, res) {

  const M = new Mongo()
  const presets = await M.getPresets()

  res.render('pages/presets', {
    presets: presets,
    sizes: _.uniq(_.map(presets, (p) => {
      return p.width + 'x' + p.height;
    }))
  })

}
