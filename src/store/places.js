export default {
    state: {
        places: [
            {
                cityName: 'Москва',
                phoneNumber: '+7 (495) 269 84 30',
                address: 'ул. Ленинская слобода, 19',
                placeName: 'Бизнес центр "Омега плаза"',
                cityIconClassName: 'icon-moscow',
                coords: { lat: 55.708631, lng: 37.652849 }
            },
            {
                cityName: 'Санкт-Петербург',
                phoneNumber: '+7 (812) 240 43 35',
                address: '196158, наб. Обводного канала 199',
                placeName: '"Обводный двор", офис 3 "А"',
                cityIconClassName: 'icon-spb',
                coords: { lat: 59.910333, lng: 30.285438 }
            }
        ]
    },
    mutations: {},
    actions: {},
    getters: {
        places(state) {
            return state.places
        }
    }
}
