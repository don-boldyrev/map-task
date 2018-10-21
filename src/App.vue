<template>
  <div id="app">
	
    <div class="main-grid clearfix">
		<div class="map-column">
			<CustomMap :options="optionsMap"/>
		</div>
		<div class="menu-column">
			<div class="menu-logo">
                <img class="menu-logo-img" :src="logoImgSrc" width="93" height="13" alt="Logo">
            </div>
			<div class="menu-tabs">
				<div class="menu-tab" :class="{'active': activeMenuTab === 'main-menu'}" @click="changeActiveMenuTab('main-menu')">
					Main menu
				</div>
				<div class="menu-tab" :class="{'active': activeMenuTab === 'station-menu'}" @click="changeActiveMenuTab('station-menu')">
					Station menu
				</div>
			</div>
			<MainMenu v-show="activeMenuTab === 'main-menu'" :center="optionsMap.center" @changeMapCenter="setCenter($event.center, $event.zoom)"/>
			<StationMenu v-show="activeMenuTab === 'station-menu'" :center="optionsMap.center" @changeMapCenter="setCenter($event.center, $event.zoom)"/>
		</div>
    </div>
  </div>
</template>

<script>
import MainMenu from '@/components/MainMenu'
import StationMenu from '@/components/StationMenu'
import CustomMap from '@/components/CustomMap'
import logoImgSrc from '@/assets/images/marker-image.png'
export default {
	name: 'app',
	data() {
		return {
			optionsMap: {
				center: this.$store.getters.places.length ? [this.$store.getters.places[0].coords.lat, this.$store.getters.places[0].coords.lng] : null,
				zoom: 15
			},
			optionsMainMenuMap: {
				center: null,
				zoom: null
			},
			optionsStationMenuMap: {
				center: [59.933986, 30.334278],
				zoom: 11
			},
			logoImgSrc: logoImgSrc,
			activeMenuTab: 'main-menu'
		}
	},
	created () {
		this.optionsMainMenuMap = Object.assign({}, this.optionsMap)
	},
	methods: {
		setCenter (center, zoom) {
			this.optionsMap = {
				center: center,
				zoom: zoom
			}
			let savedOptionsObj = {}
			switch (this.activeMenuTab) {
				case 'main-menu':
					savedOptionsObj = this.optionsMainMenuMap
					break
				case 'station-menu':
					savedOptionsObj = this.optionsStationMenuMap
					break
			}
			savedOptionsObj.center = center
			savedOptionsObj.zoom = zoom
		},
		changeActiveMenuTab (tabName) {
			this.activeMenuTab = tabName
			switch (this.activeMenuTab) {
				case 'main-menu':
					this.optionsMap = Object.assign({}, this.optionsMainMenuMap)
					break
				case 'station-menu':
					this.optionsMap = Object.assign({}, this.optionsStationMenuMap)
					break
			}
			this.setCenter (this.optionsMap.center, this.optionsMap.zoom)
		}
	},
	components: {
		MainMenu,
		StationMenu,
		CustomMap
	}
}
</script>

<style>
#app {
    height: 100%;
}
.main-grid {
    height: 100%;
}
.main-grid .map-column,
.main-grid .menu-column {
    float: left;
    height: 100%;
}
.main-grid .map-column {
    width: 60%;
}
.main-grid .menu-column {
    width: 40%;
    position: relative;
}
.menu-column::before {
    content: "";
    position: absolute;
    left: -23px;
    bottom: 30%;
    border: 13px solid transparent;
    border-right: 13px solid #fff;
}
@media (max-width: 768px) {
    .main-grid .map-column,
    .main-grid .menu-column {
        float: none;
        width: 100%;
        padding: 20px;
    }
    .main-grid > .map-column {
        height: 50%;
    }
    .menu-column::before {
        display: none;
    }
}
/*****/
.menu-logo {
    padding-top: 18px;
    padding-left: 48px;
    margin-bottom: 15px;
    width: 100%;
}
.menu-logo-img {
    display: block;
    width: 93px;
    height: 13px;
}
/*****/
.menu-tabs {
    display: flex;
    box-shadow: 0 5.5px 5.5px -5.5px rgba(0, 0, 0, 0.1);
    margin-bottom: 29px;
}
.menu-tab {
    width: 50%;
    height: 25px;
    line-height: 25px;
    text-align: center;
    cursor: pointer;
    white-space: nowrap;
}
.menu-tab:hover {
    background-color: #f5f5f5;
}
.menu-tab.active {
    font-weight: bold;
}
</style>
