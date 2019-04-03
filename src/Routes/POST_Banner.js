import _ from 'lodash'
import BannerGenerator from '../BannerGenerator/BannerGenerator'
import Mongo from '../utils/Mongo'
import { log } from '../utils/Log'

export default async function (req, res) {

    const M = new Mongo()
    const bannerData = await M.updateBanner(req.body, req.params.bid)
    await new BannerGenerator(bannerData).regenerate()
    res.sendStatus(200)

}
