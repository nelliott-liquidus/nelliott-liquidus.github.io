import dotenv from 'dotenv/config'
import Mongo from '../../utils/Mongo'

export default async function (req, res) {

  const M = new Mongo()
  const banner = await M.getBanner(req.params.bid)

  res.setHeader('Content-Type', 'application/json');
  res.send(banner);

}
