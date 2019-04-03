import _ from 'lodash'
import fs from 'mz/fs'
import { minify } from 'html-minifier'

import Banner from '../Components/Banner/Banner'
import { DefaultBanner } from '../schema'
import { log } from '../utils/Log'
import { loadTemplate } from '../utils/Template'
import Mongo from '../utils/Mongo'

export default class BannerGenerator {

  constructor(data) {

    this.data = data || DefaultBanner;

  }

  async generateBannerFile(res) {
    const M = new Mongo()
    const D = this.data
    const newID = await M.insertBanner(this.data)
    this.data._id = newID
    this.data.id = newID
    log(`Created banner id: ${ newID }`)
    const B = new Banner(this.data)
    const renders = await B.render()
    const minified = minify(renders.render, {
      collapseWhiteSpace: true,
      preserveLineBreaks: false
    })
    const path = `./public/build/banner_${B.get('id')}.html`
    await fs.writeFile(path, minified)
    const bannerStats = await fs.stat(path)
    const minifiedBonus = minify(renders.renderBonus, {
      collapseWhiteSpace: true,
      preserveLineBreaks: false
    })
    const bonusPath = `./public/build/banner_${B.get('id')}_bonus.html`
    await fs.writeFile(bonusPath, minifiedBonus)
    const bonusStats = await fs.stat(bonusPath)
    await fs.writeFile(`./public/build/banner_${B.get('id')}.json`, JSON.stringify(D), 'utf8');

    res.render('pages/bannergenerator', {
      time: '',
      B: B,
      minified: minified,
      path: path,
      bannerPath: `${ process.env.APP_BASE_URL }build/banner_${B.get('id')}.html`,
      bonusPath: bonusPath,
      bannerStats: bannerStats,
      bonusStats: bonusStats,
      bannerSize: (bannerStats.size * .001).toFixed(2),
      bonusSize: (bonusStats.size * .001).toFixed(2),
      totalSize: ((bannerStats.size + bonusStats.size)* .001).toFixed(2),
      payloadPath: process.env.APP_BASE_URL
    })

  }

  async regenerate() {

    const M = new Mongo()
    const D = this.data

    const B = new Banner(this.data)
    const renders = await B.render()
    const minified = minify(renders.render, {
      collapseWhiteSpace: true,
      preserveLineBreaks: false
    })
    const path = `./public/build/banner_${B.get('id')}.html`
    await fs.writeFile(path, minified)
    const bannerStats = await fs.stat(path)
    const minifiedBonus = minify(renders.renderBonus, {
      collapseWhiteSpace: true,
      preserveLineBreaks: false
    })
    const bonusPath = `./public/build/banner_${B.get('id')}_bonus.html`
    await fs.writeFile(bonusPath, minifiedBonus)
    const bonusStats = await fs.stat(bonusPath)
    await fs.writeFile(`./public/build/banner_${B.get('id')}.json`, JSON.stringify(D), 'utf8')

  }

}
