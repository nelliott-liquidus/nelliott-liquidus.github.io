import dotenv from 'dotenv/config'
import BannerGenerator from '../BannerGenerator/BannerGenerator'
import Mongo from '../utils/Mongo'

export default async function (req, res) {

  const M = new Mongo()

  if(!req.params.bid) {
    let BG = new BannerGenerator().generateBannerFile(res)
  }
  else {
    res.render('pages/bannerpreview', {
      id: req.params.bid,
      id_counter: M.getIdCounter(req.params.bid)
    })
  }

}
