import { ObjectId } from 'mongodb'
import moment from 'moment'
import Terms from '../../Terms/Terms'
import _ from 'lodash'

const helpers = {
  getExpandableSpan: function(B){
    if(B.initWidth < B.width) {
      return '<span class="bannerlist-expandable">EXPANDABLE</span>'
    }
  },

  isExpandable: function(B){
    if(B.initWidth < B.width) {
      return true
    }
  },


  getMongoTimestamp: function(id) {
    return moment(ObjectId(id).getTimestamp()).format('M/DD/YYYY h:mm a')
  },

  options: function(o, d) {
    console.log(_.assign(o, d))
    return _.assign(o, d)
  },

  getImagePreviews: function(d) {

    let images = []

    function deep(dd){
      _.each(_.keys(dd), (k) => {
        if(_.isObject(dd[k]) || _.isArray(dd[k])) {
          deep(dd[k])
        }
        else {
          if(k === 'imgUrl'){
            images.push(dd[k]);
          }
        }
      })
    }

    deep(d)

    let str = ''
    let count = 0;
    _.each(images, (i) => {
      if(count < 10){
        str += '<img src="' + i + '" />'
        count++;
      }
    })

    return str;

  },

  get: function(component, key) {
    return component.get(key)
  },

  counter: function(i) {
    return i++
  },

  getTerm: function(t) {
    return Terms(t)
  }
}

export { helpers }
