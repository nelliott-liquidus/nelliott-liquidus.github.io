const DefaultBanner = {

    "name": "Carousel as Slider",
    "description": "Using the carousel like a slider",
    "companyURL": "http://liquidus.net",
    "fallbackImage": "https://images-na.ssl-images-amazon.com/images/I/51Atw18IZ5L._SX425_.jpg",
    "campaignID": "9e37013c87b14e0b",
    "width": 300,
    "height": 250,
    "initWidth": 300,
    "initHeight": 250,
    "backgroundColor": "#000",
    "services": [
        {
            "name": "NAPI",
            "options": {
                "zipLimit": 1,
                "radius": 100,
                "listingLimit": 3,
                "storeLimit": 5,
                "departmentid": 5321
            }
        },
        {
            "name": "Liquidus",
            "options": {}
        }
    ],
    "states": [
        {
            "name": "Entaktigen Cover",
            "preview": true,
            "components": [
                {
                    "name": "Coverpage",
                    "options": {
                        "imgUrl": "https://i.imgur.com/FauAPjx.png",
                        "width": 300,
                        "height": 250,
                        "clickAction": "nextState"
                    },
                    "id": 0,
                    "stateID": 0
                },
                {
                    "name": "Textfield",
                    "options": {
                        "clickAction": "nextState",
                        "text": "Coverpage",
                        "alignment": "center",
                        "font": "bold 40px arial",
                        "color": "#AFF",
                        "shadow": "2px 2px 40px #1388AF",
                        "width": 300,
                        "height": 50,
                        "y": 100
                    }
                }
            ],
            "transitions": {
                "in": {
                    "duration": 450,
                    "init": {
                        "left": 300
                    },
                    "anim": {
                        "left": 0
                    }
                },
                "out": {
                    "duration": 450,
                    "anim": {
                        "left": -300
                    }
                }
            }
        },
        {
            "name": "Carousel State",
            "components": [
                {
                    "name": "CarouselV2",
                    "options": {
                      "backgroundColor": "#FFF",
                      animation: {
                        itemDelay: 1000,
                        animationTime: .45,
                        ease: 'Power2.easeOut'
                      },
                      autoSlide: true,
                      interactionMode: 'none',
                      loop: 1,
                      "width": 300,
                      "height": 250,
                      card: {
                        width: 300,
                        height: 250,
                        backgroundColor: '#FFF',
                        border: 'none'
                      },
                      mainCard: {
                        xOffset: 0,
                        yOffset: 0,
                        scale: 1,
                        opacity: 1
                      },
                      sideCard: {
                        xOffset: 300,
                        yOffset: 0,
                        scale: .8,
                        opacity: 0
                      },
                      image: {
                        x: 90,
                        y: 10,
                        width: 120,
                        height: 120
                      },
                      arrows: {
                        imgUrl: '/public/assets/arrow.png',
                        width: 0,
                        height: 0,
                        xOffset: 800,
                        yOffset: 0
                      },
                      groupTextFields: true,
                      textContainer: {
                        x: 5,
                        y: 135,
                        width: 290,
                        height: 100
                      },
                      titleText: {
                        x: 5,
                        y: 5,
                        width: 290,
                        height: 60,
                        font: '14px verdana',
                        alignment: 'center',
                        color: '#333'
                      },
                      dealText: {
                        x: 5,
                        y: 0,
                        width: 290,
                        font: '16px verdana',
                        alignment: 'center',
                        color: '#F00'
                      }
                    }
                },
                {
                  "name": "Map",
                  "options": {
                    width: 300,
                    height: 250,
                    mapPinX: 5,
                    mapPinY :210,
                    maxWidth: 300,
                    maxHeight: 200,
                    mapWidth: 300,
                    mapHeight: 200
                  }
                },
                {
                  "name": "Button",
                  "options": {
                    x: 5,
                    y: 5,
                    width: 80,
                    height: 20,
                    clickAction: 'nextState',
                    buttonImage: '',
                    rolloverImage: '',
                    buttonText: 'Button',
                    buttonStyle: 'padding:5px;background-color:#000;color:#FFF',
                    buttonOverStyle: 'background-color:#FFF;color:#000'
                  }
                }
            ],
            "transitions": {
                "in": {
                    "duration": 450,
                    "init": {
                        "left": 300
                    },
                    "anim": {
                        "left": 0
                    }
                },
                "out": {
                    "duration": 450,
                    "anim": {
                        "left": -300
                    }
                }
            },
        },
        {
            "name": "Address Screen",
            "components": [
                {
                    "name": "Coverpage",
                    "options": {
                        "x": 0,
                        "y": 0,
                        "clickAction": "companyClick",
                        "clickThruURL": "https://liquidus.net",
                        "imgUrl": "https://i.imgur.com/1ZBgVyH.png",
                        "width": 300,
                        "height": 250
                    },
                    "id": 0,
                    "stateID": 0
                },
                {
                    "name": "Address",
                    "options": {
                        "clickAction": "companyClick",
                        "clickThruURL": "https://liquidus.net",
                        "alignment": "center",
                        "font": "bold 18px arial",
                        "color": "#FFF",
                        "shadow": "2px 2px 40px #033",
                        "width": 290,
                        "height": 50,
                        "x": 5,
                        "y": 180
                    }
                },
                {
                    "name": "Textfield",
                    "options": {
                        "clickAction": "companyClick",
                        "clickThruURL": "https://liquidus.net",
                        "text": "Liquidus Marketing",
                        "alignment": "center",
                        "font": "bold 24px arial",
                        "color": "#FFF",
                        "width": 290,
                        "height": 50,
                        "x": 5,
                        "y": 10
                    }
                }
            ],
            "transitions": {
                "autoSwitch": 3000,
                "in": {
                    "duration": 450,
                    "init": {
                        "left": 300
                    },
                    "anim": {
                        "left": 0
                    }
                },
                "out": {
                    "duration": 450,
                    "anim": {
                        "left": -300
                    }
                }
            },
            "id": 0
        }
    ]
}

export { DefaultBanner }
