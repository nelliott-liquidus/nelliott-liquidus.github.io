import dotenv from 'dotenv/config'
import Mongo from '../utils/Mongo'


export default async function (req, res) {

  const M = new Mongo()
  const banners = await M.getBanners()

  res.render('pages/bannerlist', {
    banners: banners
  })

}
