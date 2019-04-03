import dotenv from 'dotenv/config'
import Mongo from '../../utils/Mongo'

export default async function (req, res) {

  const M = new Mongo()
  const preset = await M.getPreset(req.params.pid)

  res.setHeader('Content-Type', 'application/json');
  res.send(preset);

}
