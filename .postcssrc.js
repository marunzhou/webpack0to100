module.exports = {
  "plugins": {
    "postcss-cssnext": {},
    "postcss-px-to-viewport": {
        viewportWidth: 750,   
        viewportHeight: 1334,
        unitPrecision: 3,     
        viewportUnit: 'vw',
        selectorBlackList: ['.ignore', '.hairlines'],
        minPixelValue: 1,
        mediaQuery: false
    },
    "postcss-viewport-units":{},
    "cssnano": {
        preset:"advanced",
        autoprefixer:false,
        "postcss-zindex":false
    }
  }
}