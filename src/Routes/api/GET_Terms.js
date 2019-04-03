import { Termlist } from '../../Terms/Termlist'

export default async function (req, res) {

  res.setHeader('Content-Type', 'application/json');
  res.send(Termlist);

}
