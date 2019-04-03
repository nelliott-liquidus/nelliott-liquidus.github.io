import { Components } from '../../Components/Components'

export default function (req, res) {

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(Components));

}
