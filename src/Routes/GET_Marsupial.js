import dotenv from 'dotenv/config'
import Banner from '../Components/Banner/Banner'
import { Components } from '../Components/Components'
import Mongo from '../utils/Mongo'

export default async function (req, res) {
  const JS = `
  var Marsupial;

  (function() {
    // Load the script
    var script = document.createElement("SCRIPT");
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
    script.type = 'text/javascript';
    script.onload = function() {
        var $ = window.jQuery;
        Marsupial = {
          BannerID: liqBanner.bannerID,
          TagName: liqBanner.tag.tagName,
          CacheBuster: Math.round(Math.random() * 1000),
          ClickTags: liqBanner.clickTags,
          expandDirection: liqBanner.expandDirection,
          Ref: escape(document.referrer),
          MediaMacro: liqBanner.mediaMacro,
          init: function() {
            var self = this;
            var scriptTag = document.getElementsByTagName('script');
            scriptTag = scriptTag[scriptTag.length - 1];
            //this.parentTag = scriptTag.parentElement;
            this.parentTag = $('script[src="/marsupial"]').parent('div');
            console.log(this.parentTag)
            if(window.location != window.parent.location){

              parent.$("iframe").each(function(iel, el) {
                if(el.contentWindow === window) {
                  console.log("got it");

                  self.parentTag = el.parentNode;
                  console.log(self.parentTag);
                  console.log($(self.parentTag).find('iframe'))
                }
              });
            }
            self.writeAd();
          },
          writeAd: function(){
            var self = this;
            $(this.parentTag).load('${process.env.APP_BASE_URL}build/banner_' + this.BannerID + '.html', function(d){  // need to update port # to be dynamic based on env
              var bannerlink = liqBanner;
              bannerlink.sessionID = self.createUUID();
              var old_id = 'liq_' + self.BannerID;
              var sesh = 'liq_' + bannerlink.sessionID.replace(/-/g, '');
              var re = new RegExp(old_id, 'g');
              $(self.parentTag).html(d.replace(re, sesh))

              console.log('banner loaded from wombat: ' + self.BannerID)
              //$(self.parentTag).html(d);

              eval(sesh + '_main' + 'Banner.init(bannerlink)');
            })
          },
          createUUID: function(){
              var dt = new Date().getTime();
              var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                  var r = (dt + Math.random()*16)%16 | 0;
                  dt = Math.floor(dt/16);
                  return (c=='x' ? r :(r&0x3|0x8)).toString(16);
              });
              return uuid;
          }
        }
        document.addEventListener('reinit', function(e){
          Marsupial.writeAd();
        })
        Marsupial.init();
    };
    document.getElementsByTagName("head")[0].appendChild(script);

  })();
  `
  res.setHeader('Content-Type', 'application/json');
  res.send(JS);


  res.render('pages/editor', {
    B: B,
    bannerID: B.get('_id'),
    bannerData: JSON.stringify(B.options),
    bannerPath: `${ process.env.APP_BASE_URL }public/build/banner_${B.get('_id')}.html`,
    html: html,
    components: JSON.stringify(Components),
    componentsRaw: Components
  })

}
