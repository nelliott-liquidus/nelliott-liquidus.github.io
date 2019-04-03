import dotenv from 'dotenv/config'
import BannerGenerator from '../BannerGenerator/BannerGenerator'
import Mongo from '../utils/Mongo'
import { ErrorHandler } from '../utils/ErrorHandler'

export default async function (req, res) {

    const M = new Mongo()
    const json = await M.getPreset(req.params.pid)
      .catch((err) => ErrorHandler(err) )
    new BannerGenerator(json).generateBannerFile(res)

}
