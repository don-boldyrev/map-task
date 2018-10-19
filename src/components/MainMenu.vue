<template>
    <div class="main-menu">
        <div class="menu-top-part">
            <div class="menu-logo">
                <img class="menu-logo-img" :src="logoImgSrc" width="93" height="13" alt="Logo">
            </div>
            <div class="menu-list">
                <div class="menu-list-item" 
                    v-for="(link, index) in menuLinks" 
                    :key="index">
                        <a :href="link.url" class="menu-list-link">{{link.text}}</a>

                </div>
            </div>
        </div>
        <div class="menu-bottom-part">
            <div class="menu-contact-social">
                <a href="#" class="icon icon-twitter menu-contact-link menu-contact-twitter"></a>
                <a href="#" class="icon icon-facebook menu-contact-link menu-contact-facebook"></a>
                <a href="#" class="icon icon-google menu-contact-link menu-contact-google"></a>
                <a href="#" class="icon icon-vimeo menu-contact-link menu-contact-vimeo"></a>
            </div>
            <div class="menu-contact-info-list">
                <div class="menu-contact-info-item">
                    <div class="menu-contact-info-text">Размещение рекламы:</div>
                    <div class="menu-contact-info-text">+7 945 249-48-91</div>
                    <div class="menu-contact-info-text">+7 966 009-30-65</div>
                    <div class="menu-contact-info-text">
                        <a class="menu-contact-info-link" href="mailto:media@hpmdnetwork.ru">media@hpmdnetwork.ru</a>
                    </div>
                </div>
                <div class="menu-contact-info-item">
                    <div class="menu-contact-info-text">По вопросам подключения сайтов к сети HPMD Network или использования SSP HPMD Ads:</div>
                    <div class="menu-contact-info-text">
                        <a class="menu-contact-info-link" href="mailto:media@hpmdnetwork.ru">media@hpmdnetwork.ru</a>
                    </div>
                </div>
            </div>
            <div class="menu-place-list">
                <!--every time new Array in setCenter-->
                <div class="place-item" 
                    @click="setCenter([place.coords.lat, place.coords.lng])"
                    :class="{'active': checkIsActive([place.coords.lat, place.coords.lng])}"
                    v-for="place in placemarksObjs" 
                    :key="place.id">
                    <span class="icon place-city-icon" :class="place.cityIconClassName"></span>
                    <div class="place-city-mame">{{place.cityName}}</div>
                    <div class="place-phone-number">{{place.phoneNumber}}</div>
                    <div class="place-address">{{place.address}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import logoImgSrc from '@/assets/images/marker-image.png'
export default {
    name: 'MainMenu',
    props: ['center'],
    data () {
        return {
            logoImgSrc: logoImgSrc,
            menuLinks: [
                {
                    text: 'Кейсы',
                    url: '#'
                },
                {
                    text: 'Форматы',
                    url: '#'
                },
                {
                    text: 'Издатели',
                    url: '#'
                },
                {
                    text: 'Платформа',
                    url: '#'
                }
            ] 
        }
    },
    computed: {
        placemarksObjs () {
            return this.$store.getters.places.map((place, index) => {
                const id = place.coords.lat + place.coords.lng + index
                place.id = id.toString()
                return place
            })
        }
    },
    methods: {
        setCenter (coords) {
            this.$emit('changeMapCenter', coords)
        },
        checkIsActive (coords) {
            return this.center[0] === coords[0] && this.center[1] === coords[1]
        }
    }
}
</script>

<style>
.main-menu {
    height: 100%;
    padding-right: 20px;
}
.menu-top-part {
    height: 200px;
    padding-left: 48px;
}
.menu-bottom-part {
    height: calc(100% - 200px);
    display: flex;
    flex-direction: column-reverse;
    overflow: auto;
    padding-left: 48px;
    padding-bottom: 18px;
}
.menu-bottom-part::-webkit-scrollbar {
    width: 3.5px;
}

.menu-bottom-part::-webkit-scrollbar-track {
    opacity: 0.26;
    border-radius: 1px;
    background-color: #d8d8d8;
}

.menu-bottom-part::-webkit-scrollbar-thumb {
    border-radius: 1px;
    background-color: #00e0a9;
}

/*****/

.menu-logo {
    padding-top: 18px;
    margin-bottom: 31px;
    width: 100%;
}
.menu-logo-img {
    display: block;
    width: 93px;
    height: 13px;
}
.menu-list {
    width: 100%;
}
.menu-list .menu-list-link {
    font-size: 11px;
    text-transform: uppercase;
    padding: 0;
    line-height: 23px;
}
.menu-list-item {
    margin-bottom: 5px;
}
.menu-list .menu-list-item:last-child {
    margin-bottom: 0;
}

/*****/

.menu-place-list {
    margin-bottom: 36px;
    font-size: 8px;
    line-height: 1.5;
    color: #4a4a4a;
}
.place-city-mame {
    font-weight: bold;
}
.place-item {
    position: relative;
    cursor: pointer;
    margin-bottom: 22px;
}
.menu-place-list .place-item:last-child {
    margin-bottom: 0;
}
.place-item.active {
    color: #000;
    font-weight: bold;
}
.place-city-icon {
    position: absolute;
    top: -1px;
    left: -27px;
}

/*****/

.menu-contact-info-list {
    max-width: 170px;
    font-weight: 500;
    color: #4a4a4a;
    font-size: 8px;
    line-height: 1.5;
    margin-bottom: 13px;
}
.menu-contact-info-link,
.menu-contact-info-link:hover,
.menu-contact-info-link:focus,
.menu-contact-info-link:visited {
    color: #0040ff;
}

/*****/

.menu-contact-social .menu-contact-link {
    display: inline-block;
    margin-left: 23px;
    height: 13px;
}
.menu-contact-social .menu-contact-link:focus {
    outline: none;
}
.menu-contact-social .menu-contact-link:first-child {
    margin-left: 0;
}

.menu-contact-social .menu-contact-twitter {
    width: 19px;
}
.menu-contact-social .menu-contact-facebook {
    width: 6px;
}
.menu-contact-social .menu-contact-google {
    width: 9px;
}
.menu-contact-social .menu-contact-vimeo {
    width: 15px;
}
</style>
