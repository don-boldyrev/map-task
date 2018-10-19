<template>
  <div id="app">
	
    <div class="columns main-grid">
		<div class="column map-column">
			<CustomMap :center="centerMap"/>
		</div>
		<div class="column menu-column">
			<MainMenu :center="centerMap" @changeMapCenter="setCenter($event)"/>
		</div>
    </div>
  </div>
</template>

<script>
import MainMenu from '@/components/MainMenu'
import CustomMap from '@/components/CustomMap'
export default {
	name: 'app',
	data() {
		return {
			centerMap: this.$store.getters.places.length ? [this.$store.getters.places[0].coords.lat, this.$store.getters.places[0].coords.lng] : null
		}
	},
	methods: {
		setCenter (centerCoords) {
			this.centerMap = centerCoords
		}
	},
	components: {
		MainMenu,
		CustomMap
	}
}
</script>

<style>
#app {
    height: 100%;
}
.main-grid,
.main-grid > .column {
    height: 100%;
    align-self: stretch;
}
.main-grid .map-column {
    flex-basis: 71%;
    width: 71%;
}
.main-grid .menu-column {
    flex-basis: 39%;
    width: 39%;
}
@media (max-width: 768px) {
    .main-grid .map-column,
    .main-grid .menu-column {
        flex-basis: 0;
        width: 100%;
        padding: 20px;
    }
    .main-grid > .map-column {
        height: 50%;
    }
}
</style>
