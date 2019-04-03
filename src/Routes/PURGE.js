import _ from 'lodash'
import fs from 'mz/fs'
import Mongo from '../utils/Mongo'
import path from 'path'

export default async function (req, res) {

  const directory = './public/build';
  const M = new Mongo()

  await M.purge()
    .catch((err) => {
      throw err
    })

  await fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      if(path.extname(file) != '.js') {
        fs.unlink(path.join(directory, file), err => {
          if (err) throw err;
        });
      }
    }
  });

  res.render('pages/purge', {})
}
