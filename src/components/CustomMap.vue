<template>
    <div id="main-map"></div>
</template>
<script>
import ymaps from 'ymaps'
import markerImg from '@/assets/images/marker-image.png'
export default {
    name: 'CustomMap',
    props: ['center'],
    data () {
        return {
            myMap: null,
            placemarks: [],
            zoom: 15,
            defaultCenter: [55.754782, 37.620624]
        }
    },
    computed: {
        placemarksObjs () {
            return this.$store.getters.places
        }
    },
    mounted () {
        ymaps.load().then(maps => {
            const center = this.center ? this.center : this.defaultCenter
            this.myMap = new maps.Map('main-map', {
                center: center,
                zoom: this.zoom,
                type: 'yandex#hybrid',
                controls: []
            })
            const getCustomIcon = (cityIconClassName) => {

                const customIcon = maps.templateLayoutFactory.createClass(
                    `<div class="custom-placemark-tpl">
                        <div class="custom-placemark-layout">
                            <span class="custom-placemark-city-icon icon ${cityIconClassName}"></span>
                            <img class="custom-placemark-img" src="${markerImg}" width="93" height="13">
                            <div class="custom-placemark-anchor-wrapper">
                                <div class="custom-placemark-anchor"></div>
                            </div>
                            <div class="border-bottom-left"></div>
                            <div class="border-bottom-rigth"></div>
                        </div>
                    </div>`,
                    {
                        getShape: function()
                        {
                            const elem = this.getElement()
                            if ( !elem ) {
                                return null
                            }
                                

                            const icon = elem.firstChild
                            return new maps.shape.Rectangle( new maps.geometry.pixel.Rectangle([
                                [ icon.offsetLeft, icon.offsetTop ],
                                [ icon.offsetLeft + icon.offsetWidth, icon.offsetTop + icon.offsetHeight ]
                            ]))
                        }
                    }
                )
                return customIcon
            }
            
            this.placemarksObjs.forEach(obj => {
                this.placemarks.push(new maps.Placemark(
                    [ obj.coords.lat, obj.coords.lng ],
                    {
                        hasBalloon : false
                    },
                    { 
                        iconLayout: getCustomIcon(obj.cityIconClassName),
                        iconOffset: [-50, -50]
                    }
                ))
            })
            
            this.initPlaceMarks ()
        })
       
    },
    methods: {
        initPlaceMarks () {
            this.placemarks.forEach((placemark) => {
                this.myMap.geoObjects.add(placemark)
            })
        }
    },
    watch: { 
        center: function(newVal) {
            this.myMap.panTo(newVal, {
                checkZoomRange: true,
                duration: 1000
            })
        }
    }
}
</script>
<style>
#main-map {
    width: 100%;
    height: 100%;
}
@media (max-width: 768px) {
    height: 50%;
}
.custom-placemark-tpl {
    width: 120px;
}
.custom-placemark-layout {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    border: 1px solid #fff;
    border-bottom: 0;
    border-radius: 2px;
    position: relative;
}
.custom-placemark-city-icon {
    position: absolute;
    top: -14px;
    left: -14px;
}
.custom-placemark-img {
    width: 93px;
    height: 13px;
}
.custom-placemark-anchor-wrapper {
    width: 16px;
    height: 8px;
    overflow: hidden;
    position: absolute;
    bottom: -8px;
    left: calc(50% - 9px);
}
.custom-placemark-anchor {
    width: 11px;
    height: 11px;
    border-right: 1px solid #fff;
    border-bottom: 1px solid #fff;
    background-color: rgba(0, 0, 0, 0.5);
    transform: rotate(45deg);
    position: absolute;
    left: 2px;
    bottom: 2px;
}
.border-bottom-left,
.border-bottom-rigth {
    width: 51px;
    border-top: 1px solid #fff;
    position: absolute;
}
.border-bottom-left {
    bottom: 0;
    left: 0;
}
.border-bottom-rigth {
    bottom: 0;
    right: 0;
}
</style>
