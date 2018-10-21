export default {
    props: ['center'],
    data() {
        return {
            defaultZoom: null
        }
    },
    methods: {
        setCenter(coords) {
            this.$emit('changeMapCenter', {
                center: coords,
                zoom: this.defaultZoom
            })
        },
        checkIsActive(coords) {
            return this.center[0] === coords[0] && this.center[1] === coords[1]
        }
    }
}
