import Component from '../Component'
import { Components } from '../Components'

export default class Map extends Component {

  constructor(options, banner) {
    super(options, banner)
  }

  get defaults() {

    return super.getSharedDefaults(Components.Map.defaults)

  }

}
