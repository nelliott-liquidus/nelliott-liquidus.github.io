import Component from '../Component'
import { Components } from '../Components'
import { loadTemplate } from '../../utils/Template'

export default class SliderV2 extends Component {

  constructor(options, banner) {
    super(options, banner)
  }

  get defaults() {

    return super.getSharedDefaults(Components.SliderV2.defaults)

  }

  async render() {

    let component = await loadTemplate('./src/Components/Component.html')
    let slideTemplate = await loadTemplate(`./src/Components/SliderV2/Slide_template.html`)
    let template = await loadTemplate(`./src/Components/${ this.get('name') }/${ this.get('name') }_template.html`)

    this.templateData = template({
      options: this.options,
      slideTemplate: slideTemplate,
      stateID: this.get('stateID'),
      B: this.banner,
      domID: this.domID
    })

    this.renderData = component({
      options: this.options,
      slideTemplate: slideTemplate,
      B: this.banner,
      domID: this.domID,
      componentHTML: this.templateData
    })

    return this.renderData

  }

}
