import dotenv from 'dotenv/config'
import Component from '../../Components/Component'
import { loadTemplate } from '../../utils/Template'

export default class Liquidus extends Component {

  constructor(options, banner) {
    super(options, banner)
  }

  get defaults(){
    return {
      name: 'Liquidus',
      trackingBaseURL: process.env.TRACKING_LIQUIDUS_BASE,
      tagid: ''
    }
  }

  get trackingMap() {
    return {
      listingShown: {
        id: 97
      },
      companyClick: {
        id: 100
      },
      listingClick: {
        id: 100
      },
      clickThru: {
        id: 100
      }
    }
  }

  async render() {

    let service = await loadTemplate(`./src/Services/${ this.get('name') }/${ this.get('name') }_template.html`)
    this.renderData = service({
      options: this.options,
      trackingMap: this.trackingMap,
      B: this.banner,
      html: this.templateData
    })

    return this.renderData

  }

}
