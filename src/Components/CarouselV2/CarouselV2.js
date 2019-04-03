import Component from '../Component'
import { Components } from '../Components'
import { loadTemplate } from '../../utils/Template'

export default class CarouselV2 extends Component {

  constructor(options, banner) {
    super(options, banner)
  }

  get defaults() {

    return super.getSharedDefaults(Components.CarouselV2.defaults)

  }

  async render() {

    let component = await loadTemplate('./src/Components/Component.html')
    let cardTemplate = await loadTemplate(`./src/Components/CarouselV2/Card_template.html`)
    let template = await loadTemplate(`./src/Components/${ this.get('name') }/${ this.get('name') }_template.html`)

    this.templateData = template({
      options: this.options,
      cardTemplate: cardTemplate,
      stateID: this.get('stateID'),
      B: this.banner,
      domID: this.domID
    })

    this.renderData = component({
      options: this.options,
      cardTemplate: cardTemplate,
      B: this.banner,
      domID: this.domID,
      componentHTML: this.templateData
    })

    return this.renderData

  }

}
