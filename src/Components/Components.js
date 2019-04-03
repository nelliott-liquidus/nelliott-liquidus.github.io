const Components = {
  Banner: {
    name: 'Banner',
    description: '',
    defaults: {
      width: 300,
      height: 250,
      initWidth: 300,
      initHeight: 250,
      companyUrl: 'https://liquidus.net',
      fallbackUrl: ''
    },
    quickSettings: [],
    editableParameters:{
      width: {
        type: 'int'
      },
      height: {
        type: 'int'
      },
      initWidth: {
        type: 'int'
      },
      initHeight: {
        type: 'int'
      },
      companyUrl: {
        type: 'url'
      },
      fallbackImage: {
        type: 'url'
      },
      backgroundColor: {
        type: 'color'
      },
      campaignID: {
        type: 'string'
      },
      description: {
        type: 'string'
      },
      name: {
        type: 'string'
      }
    }
  },
  State: {
    name: 'State',
    description: 'Container of multiple components',
    defaults: {
      name: 'State',
      preview: false,
      transitions: null
    },
    editableParameters: {
      components: {
        type: 'array'
      },
      transitions: {
        type: 'object'
      }
    }
  },
  Component: {
    name: 'Component',
    description: 'Root component object that all other components extend from.',
    defaults: { // all other components have these shared props
      id: 0,
      stateID: 0,
      x: 0,
      y: 0,
      width: 300,
      height: 250,
      backgroundColor: 'rgba(0,0,0,0)',
      backgroundImage: '',
      clickAction: '',
      clickThruURL: '',
      rolloverAction: '',
      rolloutAction: ''
    },
    editableParameters: {
      x: {
        type: 'int'
      },
      y: {
        type: 'int'
      },
      width: {
        type: 'int'
      },
      height: {
        type: 'int'
      },
      backgroundColor: {
        type: 'color'
      },
      backgroundImage: {
        type: 'url'
      },
      clickAction: {
        type: 'action',
        options: [
          'nextState',
          'prevState',
          'reloadState',
          'clickThru'
        ]
      },
      rolloverAction: {
        type: 'action',
        options: [
          'nextState',
          'prevState',
          'reloadState',
          'clickThru'
        ]
      },
      rolloutAction: {
        type: 'action',
        options: [
          'nextState',
          'prevState',
          'reloadState',
          'clickThru'
        ]
      },
      clickThruURL: {
        type: 'url'
      }
    }
  },
  Address: {
    name: 'Address',
    defaults: {
      name: 'Address',
      font: '12px bold Arial',
      color: '#000',
      shadow: 'none',
      userSelect: 'none',
      alignment: 'left'
    },
    quickSettings: [
      'font',
      'color'
    ],
    editableParameters: {
      font: {
        type: 'font'
      },
      color: {
        type: 'color'
      },
      shadow: {
        type: 'shadow'
      },
      userSelect: {
        type: 'userSelect',
        options: [
          'none',
          'all'
        ]
      },
      alignment: {
        type: 'alignment',
        options: [
          'left',
          'center',
          'right'
        ]
      }
    }
  },
  Button: {
    name: 'Button',
    defaults: { // unique params
      name: 'Button',
      buttonImage: '/public/assets/img/button.png',
      rolloverImage: '/public/assets/img/button_over.png',
      buttonText: '',
      buttonStyle: '',
      buttonOverStyle: ''
    },
    quickSettings: [
      'buttonImage',
      'rolloverImage'
    ],
    editableParameters: {
      buttonImage: {
        type: 'url'
      },
      rolloverImage: {
        type: 'url'
      },
      buttonStyle: {
        type: 'css'
      },
      buttonOverStyle: {
        type: 'css'
      }
    }
  },
  Coverpage: {
    name: 'Coverpage',
    defaults: { // unique params
      name: 'Coverpage',
      imgUrl: ''
    },
    quickSettings: [
      'imgUrl',
      'clickThruURL'
    ],
    editableParameters: {
      imgUrl: {
        type: 'url'
      }
    }
  },
  CarouselV2: {
    name: 'CarouselV2',
    defaults: {
      name: 'CarouselV2',
      autoSlide: false,
      interactionMode: 'none',
      loop: -1,
      animation: {
        itemDelay: 1000,
        animationTime: .45,
        ease: 'Power2.easeOut'
      },
      arrows: {
        imgUrl: '/public/assets/arrow.png',
        width: 60,
        height: 60,
        xOffset: 260,
        yOffset: 80
      },
      image: {
        x: 30,
        y: 5,
        width: 60,
        height: 60
      },
      groupTextFields: false,
      textContainer: {
        x: 5,
        y: 70,
        width: 110,
        height: 100
      },
      titleText: {
        x: 5,
        y: 0,
        width: 110,
        height: 60,
        font: '10px verdana',
        alignment: 'center',
        color: '#333'
      },
      dealText: {
        x: 5,
        y: 0,
        width: 110,
        font: '14px verdana',
        alignment: 'center',
        color: '#F00'
      },
      card: {
        width: 120,
        height: 150,
        backgroundColor: '#FDD',
        border: 'solid 1px #F00'
      },
      mainCard: {
        xOffset: 0,
        yOffset: 40,
        scale: 1.3,
        opacity: 1
      },
      sideCard: {
        xOffset: 160,
        yOffset: 20,
        scale: .8,
        opacity: .5
      }
    },
    quickSettings: [
      'autoSlide',
      'loop',
      'arrows',
      'card'
    ],
    editableParameters: {
      autoSlide: {
        type: 'bool'
      },
      interactionMode: {
        type: 'interactionMode',
        options: [
          'none',
          'mouseOver'
        ]
      },
      loop: {
        type: 'int'
      },
      animation: {
        type: 'object',
        props: {
          itemDelay: {
            type: 'float'
          },
          animationTime: {
            type: 'float'
          },
          ease: {
            type: 'ease',
            options: [
              'linear',
              'Power2.easeOut',
              'Power2.easeIn'
            ]
          }
        }
      },
      arrows: {
        type: 'object',
        props: {
          imgUrl: {
            type: 'url'
          },
          width: {
            type: 'int'
          },
          height: {
            type: 'int'
          },
          xOffset: {
            type: 'int'
          },
          yOffset: {
            type: 'int'
          }
        }
      },
      image: {
        type: 'object',
        props: {
          x: {
            type: 'int'
          },
          y: {
            type: 'int'
          },
          width: {
            type: 'int'
          },
          height: {
            type: 'int'
          },
        }
      },
      groupTextFields: {
        type: 'bool'
      },
      textContainer: {
        type: 'object',
        props: {
          x: {
            type: 'int'
          },
          y: {
            type: 'int'
          },
          width: {
            type: 'int'
          },
          height: {
            type: 'int'
          },
        }
      },
      titleText: {
        type: 'object',
        props: {
          x: {
            type: 'int'
          },
          y: {
            type: 'int'
          },
          width: {
            type: 'int'
          },
          height: {
            type: 'int'
          },
          font: {
            type: 'font'
          },
          alignment: {
            type: 'alignment',
            options: [
              'left',
              'center',
              'right'
            ]
          },
          color: {
            type: 'color'
          },
        }
      },
      dealText: {
        type: 'object',
        props: {
          x: {
            type: 'int'
          },
          y: {
            type: 'int'
          },
          width: {
            type: 'int'
          },
          height: {
            type: 'int'
          },
          font: {
            type: 'font'
          },
          alignment: {
            type: 'alignment',
            options: [
              'left',
              'center',
              'right'
            ]
          },
          color: {
            type: 'color'
          },
        }
      },
      card: {
        type: 'object',
        props: {
          width: {
            type: 'int'
          },
          height: {
            type: 'int'
          },
          backgroundColor: {
            type: 'color'
          },
          border: {
            type: 'border'
          },
        }
      },
      mainCard: {
        type: 'object',
        props: {
          xOffset: {
            type: 'int'
          },
          yOffset: {
            type: 'int'
          },
          scale: {
            type: 'float'
          },
          opacity: {
            type: 'float'
          },
        }
      },
      sideCard: {
        type: 'object',
        props: {
          xOffset: {
            type: 'int'
          },
          yOffset: {
            type: 'int'
          },
          scale: {
            type: 'float'
          },
          opacity: {
            type: 'float'
          },

        }

      }
    }
  },
  InBannerVideo: {
    name: 'InBannerVideo',
    defaults: { // unique params
      name: 'InBannerVideo',
      videoUrl: ''
    },
    quickSettings: [
      'videoUrl'
    ],
    editableParameters: {
      videoUrl: {
        type: 'url'
      }
    }
  },
  Map: {
    name: 'Map',
    defaults: {
      name: 'Map',
      mapPinX: 10, // map btn pos
      mapPinY: 200, // map btn pos
      mapTextFont:"Arial",
      mapTextWeight:"normal",
      mapTextSize:"10",
      mapTextColor:"#000000",
      mapText1Left:"35",
      mapText1Top:"200",
      mapText2Left:"35",
      mapText2Top:"212",
      mapWidth:"600",
      mapHeight:"180",
      napiListingsCall: "https://qa-api.cofactordigital.com/retail/7081868b4c48acc9/listings.json?postalcode=60625&departmentid=5321",
      logoImage2: "https://liquidusfiles.file.core.windows.net/adbuilderprod/500245/9e3f1370-1ee7-4f9d-9bc3-9eb1305aabb0?sv=2017-07-29&sr=f&sig=8Qic4mpgWeA7rCj0RcvpqxnjqTvkXxnKV3sXy2YNWsg%3D&se=2020-01-28T19%3A12%3A37Z&sp=r",
      mapPinImage: "https://liquidusfiles.file.core.windows.net/adbuilderprod/500245/8138f95d-30cd-4f34-9577-af8ea89f96a4?sv=2017-07-29&sr=f&sig=nI5k6o5DG4yan8ObKu1qzN6fydj84NxOBF91b6YZMLU%3D&se=2020-01-28T19%3A13%3A12Z&sp=r",
      closeButtonImage: "https://liquidusfiles.file.core.windows.net/adbuilderprod/500245/61d5be17-ca20-4f05-994e-283f4aab4f3e?sv=2017-07-29&sr=f&sig=TG5ibJt%2FAFqS2VBFbiLbMDFDQvG65P%2BwIDRqDXgnMLI%3D&se=2020-01-28T19%3A13%3A21Z&sp=r"
    },
    quickSettings: [
      'mapPinX',
      'mapPinY',
      'mapWidth',
      'mapHeight'
    ],
    editableParameters: {
      mapPinX: {
        type: 'int'
      },
      mapPinY: {
        type: 'int'
      }
    }
  },
  SliderV2: {
    name: 'SliderV2',
    defaults: {
      name: 'SliderV2',
      interactionMode: 'none',
      loop: 0, // if 0 will go to next state, if -1 will loop infinitely
      onSlide: {
        opacity: 1
      },
      offSlide: {
        opacity: 0
      },
      animation: {
        itemDelay: 1000,
        animationTime: .6,
        ease: 'Power2.easeOut'
      },
      image: {
        x: 0,
        y: 50,
        offsetX: 0,
        offsetY: 0,
        width: 100,
        height: 100
      },
      groupTextFields: false,
      textContainer: {
        x: 5,
        y: 5,
        width: 110,
        height: 100
      },
      titleText: {
        x: 0,
        y: 120,
        width: 110,
        height: 100,
        font: '17px verdana',
        alignment: 'center',
        color: '#00E'
      },
      dealText: {
        x: 0,
        y: 0,
        width: 110,
        height: 100,
        font: '22px verdana',
        alignment: 'center',
        color: '#F00'
      }
    },
    quickSettings: [
      'interactionMode',
      'loop',
      'groupTextFields',
      'titleText',
      'dealText'
    ],
    editableParameters: {
      interactionMode: {
        type: 'interactionMode',
        options: [
          'none',
          'mouseOver'
        ]
      },
      loop: {
        type: 'int'
      },
      numProducts: {
        type: 'int'
      },
      animation: {
        type: 'object',
        props: {
          itemDelay: {
            type: 'float'
          },
          animationTime: {
            type: 'float'
          },
          ease: {
            type: 'ease',
            options: [
              'linear',
              'Power2.easeOut',
              'Power2.easeIn'
            ]
          }
        }
      },
      image: {
        type: 'object',
        props: {
          offsetX: {
            type: 'int'
          },
          offsetY: {
            type: 'int'
          },
          width: {
            type: 'int'
          },
          height: {
            type: 'int'
          }
        }
      },
      groupTextFields: {
        type: 'bool'
      },
      titleText: {
        type: 'object',
        props: {
          font: {
            type: 'font'
          },
          color: {
            type: 'color'
          }
        }
      },
      dealText: {
        type: 'object',
        props: {
          font: {
            type: 'font'
          },
          color: {
            type: 'color'
          }
        }
      }
    }
  },
  Textfield: {
    name: 'Textfield',
    defaults: {
      name: 'Textfield',
      text: 'Test',
      font: '12px bold Arial',
      color: '#000',
      shadow: 'none',
      userSelect: 'none',
      alignment: 'left',
    },
    quickSettings: [
      'text',
      'color'
    ],
    editableParameters: {
      text: {
        type: 'string'
      },
      font: {
        type: 'font'
      },
      color: {
        type: 'color'
      },
      shadow: {
        type: 'shadow'
      },
      userSelect: {
        type: 'userSelect',
        options: [
          'none',
          'all'
        ]
      },
      alignment: {
        type: 'alignment',
        options: [
          'left',
          'center',
          'right'
        ]
      }
    }
  },
  Vimeo: {
    name: 'Vimeo',
    defaults: {
      name: 'Vimeo',
      videoURL: 'https://player.vimeo.com/video/157658395'
    },
    editableParameters: {
      videoURL: {
        type: 'url'
      }
    },
    quickSettings:[
      'videoURL'
    ]
  }
}

const transition = {
  in: {
    duration: 0,
    init: { // initial CSS props

    },
    anim: { // animate to these values

    }
  },
  out: {
    duration: 0,
    anim: {} // no init b/c the current position is the 'init' for a transition out
  }
}



export { Components }
