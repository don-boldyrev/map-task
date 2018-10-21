<template>
    <div class="station-menu custom-scroll">
        <div class="menu-stations-list">
            <div 
                class="station-item"
                :class="{'active': checkIsActive([+station.lat, +station.lng])}"
                v-for="station in stations"
                :key="station.id"
                @click="setCenter([+station.lat, +station.lng])"
            >
                <span class="icon icon-subway"></span>
                <span v-html="$options.filters.nameHtml(station.name)"></span>
            </div>
        </div>
    </div>
</template>
<script>
import menuMixin from '@/components/mixins/menuMixin'
export default {
    name: 'StationMenu',
    mixins: [menuMixin],
    data () {
        return {
            defaultZoom: 13
        }
    },
    computed: {
        stations () {
            return this.$store.getters.stations
        }
    },
    filters: {
        nameHtml: function (value) {
            const valueParts = value.split(' (')
            const resultStr =   '<span class="fist-name">' + valueParts[0] + '<span>' +
                                '<br>' + 
                                '<span class="second-name">(' + valueParts[1] + '<span>'
            return resultStr
        }
    }
}
</script>
<style>
.station-menu {
    height: calc(100% - 100px); /*logo height and tabs + padding + margin*/
    padding-right: 20px;
}
.station-item {
    margin-bottom: 20px;
    font-size: 12px;
    line-height: 1.43;
    color: #4a4a4a;
    cursor: pointer;
    padding-left: 51px;
    position: relative;
}
.station-item.active {
    color: #000;
}
.station-item:hover {
    background-color: #f5f5f5;
}
.station-item .fist-name {
    font-weight: 500;
}
.station-item .second-name {
    font-weight: 400;
}
.station-item.active .fist-name,
.station-item.active .second-name {
    font-weight: 700;
}
.station-item .icon-subway {
    position: absolute;
    top: 10px;
    left: 20px;
}
</style>
