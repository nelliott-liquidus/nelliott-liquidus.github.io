import dotenv from 'dotenv/config'
import Banner from '../Components/Banner/Banner'
import { Components } from '../Components/Components'
import Mongo from '../utils/Mongo'

export default async function (req, res) {

  const M = new Mongo()
  const json = await M.getBanner(req.params.bid)
  const B = new Banner(json)
  const html = await B.render().renderData

  res.render('pages/editor', {
    B: B,
    bannerID: B.get('_id'),
    bannerData: JSON.stringify(B.options),
    bannerPath: `${ process.env.APP_BASE_URL }public/build/banner_${B.get('_id')}.html`,
    html: html,
    components: JSON.stringify(Components),
    componentsRaw: Components,
    payloadPath: process.env.APP_BASE_URL
  })

}
