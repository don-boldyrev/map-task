<template>
    <div id="main-map"></div>
</template>
<script>
import _ from 'underscore'
import Vue from 'vue'
import ymaps from 'ymaps'
import markerImg from '@/assets/images/marker-image.png'
import stationMarkerImg from '@/assets/images/station-marker-icon.png'
import ChartBaloon from '@/components/ChartBaloon'
const defaulChartBarColor = '#f87979'
export default {
    name: 'CustomMap',
    props: ['options'],
    data () {
        return {
            myMap: null,
            placemarks: [],
            defaultCenter: [55.754782, 37.620624],
            defaultZoom: 15,
            chartData: {
                labels: [],
                datasets: [
                    {
                        backgroundColor: defaulChartBarColor,
                        data: []
                    }
                ]
            },
            chartOptions: {
                responsive: true, 
                maintainAspectRatio: false,
                legend: {
                    display: false,
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            display: false
                        }
                    }]
                }
            },
            isOpenBallon: false
        }
    },
    computed: {
        placemarksObjs () {
            return this.$store.getters.places
        },
        stationmarksObjs () {
            return this.$store.getters.stations
        }
    },
    mounted () {
        ymaps.load().then(maps => {
            const center = this.options.center ? this.options.center : this.defaultCenter
            const zoom = this.options.zoom !== null ? this.options.zoom: this.defaultZoom
            this.myMap = new maps.Map('main-map', {
                center: center,
                zoom: zoom,
                type: 'yandex#hybrid',
                controls: []
            })
            this.myMap.events.add('sizechange', ()=>{
                const context = this
                _.debounce(function () {
                   context.rerenderBaloon()
                }, 300)()
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
            this.stationmarksObjs.forEach(obj => {
                const balloonHtml = maps.templateLayoutFactory.createClass('<div id="balloonTpl" class="custom-balloon-tpl"></div>')
                const placemark = new maps.Placemark(
                    [ +obj.lat, +obj.lng ],
                    {
                        balloonContent: ''
                    },
                    { 
                        iconLayout: 'default#image',
                        balloonContentLayout: balloonHtml,
                        iconImageHref: stationMarkerImg,
                        iconImageSize: [29, 35]
                    }
                )
                placemark.events.add('balloonopen', () => {
                    this.chartData = {
                        labels: this.$store.getters.getDynamicById(obj.id).labels,
                        datasets: [
                            {
                                backgroundColor: defaulChartBarColor,
                                data: this.$store.getters.getDynamicById(obj.id).data
                            }
                        ]
                    }
                    this.mountBaloon()
                    this.isOpenBallon = true
                })
                placemark.events.add('balloonclose', () => {
                    this.isOpenBallon = false
                })

                this.placemarks.push(placemark)
            })
            this.initPlaceMarks ()
        })
    },
    methods: {
        initPlaceMarks () {
            this.placemarks.forEach((placemark) => {
                this.myMap.geoObjects.add(placemark)
            })
        },
        mountBaloon () {
            const balloonTpl = document.getElementById('balloonTpl')
            const chartInstance = new Vue({ 
                ...ChartBaloon,
                propsData: { 
                    chartData: this.chartData,
                    options: this.chartOptions,
                    styles: {   
                        height: '100%',
                        width: '100%',
                        position: 'relative'
                    }
                }
            })
            chartInstance.$mount(balloonTpl)
        },
        rerenderBaloon () {
            setTimeout(() => {
                const balloonTpl = document.getElementById('balloonTpl')
                if (balloonTpl && this.isOpenBallon) {
                    this.mountBaloon ()
                }
            }, 200)
        }
    },
    watch: { 
        options: function(newVal) {
            const center = newVal.center ? newVal.center : this.defaultCenter
            this.myMap.panTo(center, {
                checkZoomRange: true,
                duration: 1000
            })
            .then(() => {
                if (newVal.zoom !== null && newVal.zoom !== undefined) {
                    this.myMap.setZoom(newVal.zoom)
                }
            })
        }
    },
    components: {
        ChartBaloon
    }
}
</script>
<style>
/****/
#main-map {
    width: 100%;
    height: 100%;
}
.custom-balloon-tpl {
    width: 300px;
    height: 200px;
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
