import _ from 'lodash'
import Mongo from '../utils/Mongo'
import { log } from '../utils/Log'

export default async function (req, res) {

    const M = new Mongo()

    await M.deletePreset(req.params.pid)
    res.redirect('/presets')

}
