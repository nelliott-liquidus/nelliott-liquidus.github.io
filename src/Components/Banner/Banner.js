import crypto from 'crypto'
import dotenv from 'dotenv/config'
import { DefaultBanner } from '../../schema'
import Component from '../Component'
import { loadTemplate } from '../../utils/Template'
import { log } from '../../utils/Log'
import { minify } from 'html-minifier'
import Mongo from '../../utils/Mongo'

export default class Banner extends Component{

  constructor(options) {
    super(options)
  }

  get defaults() {
    return ( DefaultBanner )
  }

  async render() {
    const M = new Mongo()
    //this.hash = await crypto.createHash('md5').update((Math.random() * 9999) + JSON.stringify(this.options)).digest('hex')
    this.hash = this.get('_id')
    this.setOption('id_counter', M.getIdCounter(this.get('_id')));
    const doImport = this.doImport
    let renderedComps = []; // Little dirty in here, works but should get a refactor
    let renderedServices = []
    let sCount = 0 // state count
    let cCount = 0 // component count...using these to dynamically assign IDs to each state and component

    for(let service of this.options.services){
      let constr = await doImport(service.name, '../../Services')
      renderedServices.push(new (constr)(service.options, this))
      await renderedServices[renderedServices.length - 1].render()
    }

    // Loop through each state and component, pre-render each component (goes to component.renderData)
    for(let state of this.options.states){
      state.id = sCount
      cCount = 0
      for(let comp of state.components){
        comp.id = cCount
        comp.stateID = state.id
        let constr = await doImport(comp.name)
        renderedComps.push(new (constr)(comp.options, this))
        renderedComps[renderedComps.length - 1].setOption('id', cCount)
        renderedComps[renderedComps.length - 1].setOption('stateID', state.id)
        await renderedComps[renderedComps.length - 1].render()
        cCount++
      }
      sCount++
    }

    // Build strings for the payload and bonus payload
    let returnObj = {}
    let template = await loadTemplate('./src/Components/Banner/Banner_template.html')
    returnObj.render = template({
      options: this.options,
      components: renderedComps,
      services: renderedServices,
      B:this,
      payloadPath: process.env.APP_BASE_URL + 'build/'
    })

    let bonusTemplate = await loadTemplate('./src/Components/Banner/Banner_bonus_template.html')
    returnObj.renderBonus = bonusTemplate({
      options: this.options,
      components: renderedComps,
      B:this
    })

    return returnObj

  }

  async doImport(name, basePath) {
    // Dynamically import a component
    const base = basePath || '..'
    const module = await (
      await import(`${ base }/${ name }/${ name }.js`)
    ).default;

    return module

  }



}
