
/* complete re-write, 11-30-2016 -Hank */

if (typeof (LiquidLoader === 'undefined')) {
    var LiquidLoader = function () { };
    LiquidLoader.prototype = {
        load: function (src, node, callback) {

            var scriptTotal = src.length;
            var scriptLoaded = 0;

            for (var i = 0; i < src.length; i++) {
                var script = node.ownerDocument.createElement('script');
                script.src = src[i];

                script.onload = script.onreadystatechange = function () {
                    if (!this.readyState || this.readyState == 'complete') {
                        scriptLoaded++;
                        try {
                            script.parentNode.removeChild(script);
                        } catch (e) { }

                        if (scriptLoaded == scriptTotal) {
                            callback();
                        }
                    }
                };
                node.appendChild(script);

            }
        },
        loadJSON: function (path, success, error) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        if (success)
                            success(JSON.parse(xhr.responseText));
                    } else {
                        if (error)
                            error(xhr);
                    }
                }
            };
            xhr.open("GET", path, true);
            xhr.send();
        },
        loadStyleSheet: function (path, complete) {

            var head = document.getElementsByTagName('head')[0] || document.createElement('div');

            var css = document.createElement('link');
            css.rel = 'stylesheet';
            css.type = 'text/css';
            css.href = path;
            css.addEventListener('load', function () { complete(); });

            head.appendChild(css);


        }

    };
}
/***
*
*   LiquidObjects
*   Simnplifying the way we add objects to the page.
*   this class creates an object, styles it and adds a simple show hide funciton to its proto.  this way we can use CoverPage.hide() etc.
*   it currently has a switch where special parameters can be added to an object
*   (for example it will add an image source to an image tag and if there is no src parameter will return null instead of broken images)
*   TODO: Build out switch for other object types
*
***/

    var LiquidObjects = {
        GetObject: function (params) {
            var ele = document.createElement(params.ElementType);
            if (params.hasOwnProperty("id")) {
                ele.id = params.id;
            }
            if (params.hasOwnProperty("class")) {
                ele.className = params.class;
            }

            ele.hide = this.Hide(ele);
            ele.show = this.Show(ele);
            if (params.hasOwnProperty("Style")) {
                for (var key in params.Style) {
                    ele.style[key] = params.Style[key];
                }
            }
            switch (params.ElementType) {
                case "img":
                    if (params.hasOwnProperty('src')) {
                        if (params.src == "" || params.src == null) {
                            this.Log('Error', 'Image source cannot be null');
                        } else {
                            ele.src = params.src;
                        }

                    } else {
                        this.Log('Error', 'Image Source not provided');
                        return;
                    }
                    break;

                case "video":
                    if (params.hasOwnProperty('src')) {
                        if (params.src == "" || params.src == null) {
                            this.Log('Error', 'Video source cannot be null');
                        } else {
                            ele.src = params.src;
                        }

                    } else {
                        this.Log('Error', 'Video Source not provided');
                        return;
                    }
                    break;
                case "div":
                    break;
                default:
                    break;
            }
            return ele;
        },
        Hide: function (a) { return function () { a.style.visibility = 'hidden'; a.style.display = 'none'; } },
        Show: function (a) { return function () { a.style.visibility = ''; a.style.display = ''; } },
        Log: function (type, message) { if (window.console) console.log(type, message); }

    };

/***
*   Something cool used to be here...
*   Wombat.js
*
*   © 2015 Liquidus Marketing
*
*   This file prepares templates for placement.
*   It will find a safe place to put the ad and determine if it needs help escaping iFrames or divs it cannot expand in.
*   It is VITAL that you NEVER question why this file is a wombat.
*
*   v 1.0  [07-31-15] - Initial Build
*   v 1.5 [08-10-16]  - Removed parameters from init and main function since they are never used.
*                     - Removed commented out code.
*                     - Changed logging to use Kraken instead of DI.ashx
*
***/
function createUUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}
var LiquidWombat = function () {
    this.Init();
};
LiquidWombat.prototype = {
    /*the following parameters should be considered required..  all other params should be validated using this.hasOwnProperty('paramname').*/
    /*
    BannerID: ÐBannerIDÐ,
    TagName: 'ÐTagIDÐ',
    TemplateID: ÐTemplateIDÐ,
    CacheBuster: 'ÐCacheBusterÐ',
    ClickTag: 'ÐClickTagÐ',
    WombatDomain: 'ÐWombatDomainÐ',
    AppDomain: 'ÐAppDomainÐ',
    CDNDomain: 'ÐCDNDomainÐ',
    LogDomain: 'ÐLogDomainÐ',
    ExpandDirection: ÐExpandDirectionÐ,
    FrameBusterReplacementURL: 'ÐIFrameÐ',
    Language: 'ÐLanguageSuffixÐ',
    Preview: ÐPreviewÐ,
    ZIndex: "ÐZIndexÐ",
    TemplateQuerystring: "ÐQueryStringÐ",
    FailWhaleClick: 'ÐFailWhaleClickÐ',
    TargetFrame: null,
    TemplateDetail: [],
    IsSkeletor: false,
    Ref: escape(document.referrer),
    UsedFrameClimber: false,
    dbod: null,
    SessionID: 'ÐSessionIDÐ',
    MediaMacro: 'ÐMediaMacroÐ',
    PhantomHeight: ÐPhantomHeightÐ,
    ContainerDiv: null,
    */
    BannerID: liqBanner.bannerID,
    TagName: liqBanner.tag.tagName,
    TemplateID: 1,
    CacheBuster: Math.round(Math.random() * 1000),
    ClickTag: liqBanner.clickTag,
    WombatDomain: 'http://localhost:2048',
    AppDomain: 'http://localhost',
    CDNDomain: 'http://localhost',
    LogDomain: 'http://localhost',
    expandDirection: liqBanner.expandDirection,
    FrameBusterReplacementURL: 'ÐIFrameÐ',
    Language: 'en',
    Preview: true,
    ZIndex: "2147483647",
    TemplateQuerystring: "",
    FailWhaleClick: '',
    TargetFrame: null,
    TemplateDetail: [],
    IsSkeletor: false,
    Ref: escape(document.referrer),
    UsedFrameClimber: false,
    dbod: null,
    MediaMacro: liqBanner.mediaMacro,
    PhantomHeight: 300,
    ContainerDiv: null,
    div: null,
    Init: function () {
        /*Instantiate the Kraken*/
        //this.OctoTracker = eval('new LTV_' + this.BannerID + '_' + this.TagName + '_' + this.CacheBuster + '_TRACKING(true)');

        this.ScriptURL = (this.WombatDomain + "js?template=1&{0}")
          .replace('{0}', this.TemplateQuerystring);
        this.JSURL = (this.AppDomain + "js?{0}")
          .replace('{0}', this.TemplateQuerystring);

        this.Loader = new LiquidLoader();
        /*put liquid objects here just in case too..*/
        if (document.body) {
            this.dbod = document.body
        } else {
            this.IsSkeletor = true;
            document.write("<html><head></head><body></body></html>");
            this.dbod = document.body
        }
        this.LoadUI();
    },
    LoadUI: function () {
        this.GetTargetFrame();
        if (this.TargetFrame != null && this.HasClimbed) {
            this.BuildAd();
        } else {
       	    if (!this.UsedFrameClimber) {
	        this.Log('no target error', "build a div");
       	    	var SkeletorDiv = LiquidObjects.GetObject({ 'ElementType': 'div' });
       	    	document.body.appendChild(SkeletorDiv);
       	    	this.TargetFrame = SkeletorDiv;
       	    	this.BuildAd();
       	    }
        }
    },
    BuildAd: function () {

        this.ContainerDiv = LiquidObjects.GetObject({ 'ElementType': 'div' });
		this.ContainerDiv.style.zIndex = '2147483647';

        if (this.ZIndex != null) {
            this.Log('log', 'Adding z-index of' + this.ZIndex);
            this.ContainerDiv.style.position = 'relative';
            this.ContainerDiv.style.zIndex = this.ZIndex;
        }

        this.ContainerDiv.style.lineHeight = 'normal';
        this.ContainerDiv.style.textAlign = 'left';

        this.ContainerDiv.id = "tf_" + this.BannerID + '_' + this.TagName + '_' + this.CacheBuster;
        if (parseInt(this.PhantomHeight) > 0) {
            this.Log("phantom height", "set to " + this.PhantomHeight);
            this.ContainerDiv.style.height = this.PhantomHeight + "px";
        } else {
            this.Log("phantom height", "not set " + +this.PhantomHeight);
        }
        var b = false;
        if (this.HasClimbed) {
            var fc = this.TargetFrame.firstChild;
            if (fc) {
                this.TargetFrame.insertBefore(this.ContainerDiv, fc);
                b = true;
            }
        }
        if (!b) {
            var self = this;
            this.Log("no climbing", "build here");
            //MIGHT BE IMPORTANT
            //this.TargetFrame.appendChild(this.ContainerDiv);
        }
        var scriptList = [];

        if (this.UsedFrameClimber) {
            this.ScriptURL += '&ws=1'
        }

        scriptList.push(this.ScriptURL);

        var a = this;
        if (window.addEventListener) {
            if (window.onpagehide || window.onpagehide === null) {
                window.addEventListener('pagehide', function () {
                    a.cleanUp(a.ContainerDiv);
                }, false);
            } else {
                window.addEventListener('unload', function () {
                    a.cleanUp(a.ContainerDiv);
                }, false);
            }
        } else {
            window.onbeforeunload = window.onunload = this.cleanUp(this.ContainerDiv);
        }
        var self = this;
        var scriptTag = document.getElementsByTagName('script');
        scriptTag = scriptTag[scriptTag.length - 1];
        this.parentTag = scriptTag.parentNode;
        if(window.location != window.parent.location){
          parent.$("iframe").each(function(iel, el) {
            if(el.contentWindow === window) {
              console.log("got it");
              console.log(el.parentNode);
              self.parentTag = el.parentNode;
            }
          });
        }
        this.WriteAd();

    },
    WriteAd() {
      var self = this;
      var script = document.createElement("SCRIPT");
      script.src = 'http://code.jquery.com/jquery-3.3.1.min.js';
      script.type = 'text/javascript';
      script.onload = function() {


          var $ = window.jQuery;
          console.log($)
          console.log(self.parentTag)
          console.log('asdfasdfasdfasdfasdfasdfasdf')
          $(self.parentTag).append('<div id="holder-' + self.BannerID + '"></div>')
          $('#holder-' + self.BannerID).load('http://localhost:2048/build/banner_' + self.BannerID + '.html', function(d){  // need to update port # to be dynamic based on env
            var bannerlink = liqBanner;
            bannerlink.sessionID = createUUID();
            var old_id = 'liq_' + self.BannerID;
            var sesh = 'liq_' + bannerlink.sessionID.replace(/-/g, '');
            var re = new RegExp(old_id, 'g');

            $(self.parentTag).append('<div id="container-' + sesh + '"></div>')
            $('#container-' + sesh).html(d.replace(re, sesh))
            $('#holder-' + self.BannerID).remove();
            console.log('banner loaded from wombat: ' + self.BannerID)
            //$(self.parentTag).html(d);

            eval(sesh + '_main' + 'Banner.init(bannerlink)');
          })
      }
      document.getElementsByTagName("head")[0].appendChild(script);

    },
    GetTargetFrame: function () {
        /*start by putting it next to the script tag.*/
        this.HasClimbed = true;
        if (typeof window.mraid === "undefined" && (window.top !== window.self && (this.ExpandDirection != 7 && this.ExpandDirection != 15) )) {
            this.UsedFrameClimber = true;
            /*if we arent at the top window,  use the  framebuster code to get there.*/
            try {
                this.Log('log', 'iframe first climb');
                this.TargetFrame = this.ClimbFrames();
            }
            catch (e) {

                this.Log('cross domain iframe climb', e);

                this.WombatTracker(91);

                var jsonURL = (this.AppDomain + "TemplateDetail.aspx?BID={0}&TAG={1}&TID={2}&liqurl={3}")
                      .replace('{0}', this.BannerID)
                      .replace('{1}', this.TagName)
                      .replace('{2}', this.TemplateID)
                      .replace('{3}', this.Ref);

                this.Loader.load([jsonURL], window.document.body, (function (a) {
                    return function () {
                        a.DoCrossDomainClimb();
                    };
                })(this));
            }

        }
        else {
            try {
                this.Log('log', 'findscripttag');
                this.TargetFrame = this.FindScriptTag();
            }
            catch (e) {
                this.Log('same domain climb error', e);
            }
        }

        if (this.TargetFrame) {
            if (this.TargetFrame.style.overflow == 'hidden') {
                this.TargetFrame.style.overflow = 'initial';
            }
        }

    },
    DoCrossDomainClimb: function () {
        this.TemplateDetail = TID_ÐBannerIDÐ_ÐTagIDÐ_ÐTemplateIDÐ;
        if (this.TemplateDetail.safeframe && this.HasSafeFrame()) {
            this.Log('framebuster', 'safe frame compliant');
            /*safe frame can just run here normal style*/
            this.TargetFrame = this.FindScriptTag();
            this.WombatTracker(93);
            this.BuildAd();
        }
        else {
            /*framebuster*/
            if (this.TemplateDetail.framebuster) {
                this.Log('framebuster', 'switch domains');
                window.location.replace(this.TemplateDetail.framebusterurl + "#src=" + escape(this.JSURL + "&PH=" + this.TemplateDetail.height));
                return;
            }

            if (this.TemplateDetail.di) {
                this.Log('framebuster', 'divine intervention');
                /* divine intervention for tid 30*/
            }

            if (this.TemplateDetail.nonexpvers) {
                this.Log('framebuster', 'non expand fallback');
                var str = '&ed=' + this.ExpandDirection;
                this.TemplateQuerystring = this.TemplateQuerystring.toUpperCase().replace(str, "&ed=7");
                this.ExpandDirection = 7;
                this.TargetFrame = this.FindScriptTag();
                this.WombatTracker(93);
                this.BuildAd();

            } else {
                this.Log('framebuster', 'FAIL WHALE!');
                this.TargetFrame = this.FindScriptTag();
                this.HasClimbed = false;
                var FailWhale = LiquidObjects.GetObject({ 'ElementType': 'img', 'src': this.WombatDomain + 'fallback?BID=' + this.BannerID + '&TAG=' + this.TagName + '&SID=' + this.SessionID + '&MM=' + this.MediaMacro, "Style": { "cursor" : "pointer" } });
                var obj = this;
                FailWhale.onclick = (function (a) { return function () { console.log("fwc", obj.FailWhaleClick); window.open(obj.FailWhaleClick); } })(this);
                this.TargetFrame.appendChild(FailWhale);

                this.WombatTracker(92);

            }
        }

    },
    HasSafeFrame: function () {
        this.SafeFrameClass = window["$sf"];
        var ext = this.SafeFrameClass && this.SafeFrameClass.ext;
        this.Log('safe frame', 'safe frame api exists? : ', ext);
        return ext;

    },
    Permission: function () {
        this.p = false;
        try {
            if (top.location.href) {
                this.p = true;
            }
        }
        catch (e) {

        }
        return this.p;
    },
    ClimbFrames: function () {
        var lastnode = null;
        var lastParent = self;
        var b = 0;
        while (lastParent !== top && lastParent.parent && b < 5) {
            b++;
            try {
                lastnode = lastParent.frameElement;
                lastParent = lastParent.parent;
                lastnode.style.display = "none";
            } catch (e) {
                /*set the main object to not expand.  we are gonna live here...*/
                this.ExpandDirection = 7;
            }
        }
        return lastnode.parentNode;

    },
    FindScriptTag: function () {
        var t = null;
        if (!this.IsSkeletor) {
            var scrs = document.body.getElementsByTagName('script');
            for (var i = 0; i < scrs.length; i++) {
                if (unescape(scrs[i].src).indexOf(this.BannerID) > -1 && unescape(scrs[i].src).indexOf(this.TagName) > -1 && (unescape(scrs[i].src).indexOf(this.CacheBuster) > -1||unescape(scrs[i].src).indexOf("%n") > -1)) {
                    t = scrs[i].parentNode;
                    break;
                }
            }
        } else {
            t = document.createElement('div');
            document.body.appendChild(t);
        }
        return t;
    },

    GetURLParameter: function getURLParameter(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null
    },

    Log: function (type, message) {
        if (window.console) {
            console.log(type + ' -- ' + message);
        }
    },
    WombatTracker: function (id) {
   /*     var trackURL = this.LogDomain + 'di.ashx?IsJS=1&BID=' + this.BannerID + '&TID=' + this.TemplateID + '&EID=' + id;
        this.Loader.loadJSON(trackURL, (function (a, b) { return function (e) { a.Log('Track', 'Success:' + e.success); }; })(this), (function (a) { return function (e) { a.Log('Wombat Tracker Error', e); }; })(this));*/
        var TrackArgs = {};
        TrackArgs.Value1 = 'Wombat Track EID - ' + id;
        //this.OctoTracker.Track('intentionalfail', TrackArgs);
    },
    cleanUp: function (ContainerDiv) {
        ContainerDiv.parentNode.removeChild(ContainerDiv);
    }
};

var LiquidTemplate = new LiquidWombat();
