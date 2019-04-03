import dotenv from 'dotenv/config'
import Component from '../../Components/Component'
import { loadTemplate } from '../../utils/Template'

export default class NAPI extends Component {

  constructor(options, banner) {
    super(options, banner)
  }

  get defaults(){
    return {
      name: 'NAPI',
      baseURL: `${ process.env.NAPI_BASE }`,
      trackingBaseURL: process.env.TRACKING_COFACTOR_BASE,
      postalcode: null,
      promotionid: 12341234,
      sortid: 1,
      brandid: 1,
      promotioncode: null,
      radius: null,
      departmentid: null,
      require: null,
      returnmode: null,
      promotiontypeid: null,
      zipLimit: 1,
      listingLimit: 10,
      storeLimit: 5,
      limit: null,
      previewhash: null
    }
  }

  get trackingMap() {
    return {
      impression: {
        id: 100,
        val: ''
      },
      listingShown: {
        id: 101,
        val: ''
      },
      addressShown: {
        id: 106
      },
      listingClick: {
        id: 102,
        val: ''
      },
      buttonClick: {
        id: 102,
        url: ''
      },
      couponClick: {
        id: 102,
        url: ''
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
