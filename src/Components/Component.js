import _ from 'lodash'
import dotenv from 'dotenv/config'
import Banner from './Banner/Banner'
import { log } from '../utils/Log'
import { loadTemplate } from '../utils/Template'
import { Components } from './Components'

export default class Component {

  constructor(options, banner) {
    this._options = options || { }
    this.banner = banner // WILL ONLY BE SET FOR SUB-COMPONENTS (COVERPAGE, ETC.)...COULD BE CLEANER
  }

  get(k) {
    // GET AN OPTION, FAVORING OPTIONS FROM CONSTRUCTOR OVER DEFAULTS
    return _.get(this._options, k, _.get(this.defaults, k))
  }

  setOption(o, v) {
    // USE THIS INSTEAD OF COMPONENT.OPTIONS.XYZ = 123
    this._options[o] = v
  }

  getSharedDefaults(d) {
    // BANNER WIDTH/HEIGHT IS THE DEFAULT WIDTH/HEIGHT FOR A COMPONENT
    return _.assign(d, Components.Component.defaults)

  }

  get options() {
    // GET ALL OPTIONS WITH THE DEFAULTS OVERRIDDEN BY THOSE RECEIVED IN CONSTRUCTOR
    return _.mapValues(this.defaults, (v, k, o) => {
      return this.get(k)
    })
  }

  get domID() {
    // GENERATES THE UNIQUE DOM ID FOR THE BANNER DIV AND EACH COMPONENT DIV...STATES ARE DONE IN THE BANNER_TEMPLATE FOR NOW
    if(this.banner){ // is a component, a banner can't have a banner
      return `liq_${ this.banner.hash }_S${ this.get('stateID')}_C${ this.get('id') }`
    }
    else { // ID for our one root banner div
      return `liq_${ this.hash }_main`
    }
  }

  async render() {
    let component = await loadTemplate('./src/Components/Component.html')
    let template = await loadTemplate(`./src/Components/${ this.get('name') }/${ this.get('name') }_template.html`)

    this.templateData = template({
      options: this.options,
      stateID: this.get('stateID'),
      B: this.banner,
      domID: this.domID
    })

    this.renderData = component({
      options: this.options,
      B: this.banner,
      domID: this.domID,
      componentHTML: this.templateData
    })

    return this.renderData

  }

}
