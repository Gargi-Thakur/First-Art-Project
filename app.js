var renderer_ = i2d.SVGLayer('#Mycanvas', {
    events: false,
    selectiveClear: false
});
var parallelChain = i2d.chain.parallelChain().loop(10)
var circlesCount = 100
var radius = 100

var g = renderer_.createEl({
    el: 'group',
    attr: {
        transform: {
            translate: [renderer_.width / 2, renderer_.height / 2]
        }
    }
})

g.createEls((new Array(circlesCount)).fill().map(function(d, i) {
        return i
    }), {
        el: 'circle',
        attr: {
            r: 5,
            cx: 0,
            cy: 0
        },
        style: {
            fill: function(d) {
                return 'hsl(' + ((d % 50) / 50) * 360 + ',70%, 50%)'
                              }
               }
    })
    .exec(animateEachCircle)

function animateEachCircle(d) {
    parallelChain.add(this.animateExe({
        duration: 2000,
        delay: (d % 50) * 30,
        ease: 'easeInOutSin',
        attr: function(f) {
            this.setAttr({
                cx: radius * Math.cos(f * Math.PI * 2 + Math.PI * Math.floor(d / 50)) + (-radius + Math.floor(d / 50) * radius * 2),
                cy: radius * Math.sin(f * Math.PI * 2 + Math.PI * Math.floor(d / 50))
            })
        }
    }))
}

parallelChain.start()
