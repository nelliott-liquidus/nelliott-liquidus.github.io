import dotenv from 'dotenv/config'
import Mongo from '../../utils/Mongo'

export default async function (req, res) {

  const M = new Mongo()
  const presets = await M.getPresets()

  res.setHeader('Content-Type', 'application/json');
  res.send(presets);

}
