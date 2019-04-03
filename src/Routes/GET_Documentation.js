import dotenv from 'dotenv/config'
import { Components } from '../Components/Components'
import Terms from '../Terms/Terms'

export default async function (req, res) {

  res.render('pages/documentation', {
    components: Components
  })

}
