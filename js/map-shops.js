
function initMapShops () {
    $('.js-map-shops').each(function () {
        var element = $(this),
            centerCoord = element.data('objectcoord') || [59.93914514163674,30.33349282507063],
            idMap = element.data('map-id') || '',
            iconUrl = element.data('map-icon') || '',
            iconUrlHover = element.data('map-icon-hover') || '',
            zoom = element.data('map-zoom') || 16;

        var myMap = new ymaps.Map(idMap, {
            center: centerCoord,
            zoom: zoom,
            controls: ['zoomControl', 'fullscreenControl'],
            }, {
                autoFitToViewport: 'always',
                balloonPanelMaxMapArea: 0,
                zoomControlPosition: { right: 10, top: 70 }
        }),
        objectManager = new ymaps.ObjectManager(),
        masObjects =[];

        //myMap.behaviors.disable('drag');
        myMap.behaviors.disable('scrollZoom');
        myMap.geoObjects.add(objectManager);

        $('.js-map-item').each(function () {
            var objectId = $(this).data('objectid'),
                objectCoord = $(this).data('objectcoord'),
                objectText =  $(this).find('.js-map-item-value').text();

            var elementsObjects =
                {
                    "type": "Feature",
                    "id": objectId,
                    "options": {
                        iconLayout: 'default#image',
                        iconImageHref: iconUrl,
                        //"preset": "islands#blueIcon",
                    },
                    "geometry":{
                        "type": "Point",
                        "coordinates": objectCoord,
                    },
                    "properties":{
                        "balloonContentBody": '<div class="map-popup">' +
                            '<div class="map-popup-body"><i class="las la-map-marker"></i>' + objectText + '</div>' +
                            '</div>',
                    }
                };

            masObjects.push(elementsObjects);
        });

        objectManager.add({
                "type": "FeatureCollection",
                "features": masObjects
        });

        objectManager.objects.events.add('click', function (e) {
            var objectId=e.get('objectId');
            viewObject(objectId);
        });

        [].forEach.call(document.querySelectorAll('[data-objectId]'), function(el) {
            el.addEventListener('click', function() {
                var objectId=el.getAttribute("data-objectId");
                viewObject(objectId);
            });
        });

        function viewObject(objectId){
            $('.js-map-item').removeClass('active');

            document.querySelector('[data-objectId="'+objectId+'"]').classList.add('active');

            objectManager.objects.each(function (item) {
                    objectManager.objects.setObjectOptions(item.id, {
                    iconImageHref: iconUrl
                });
            });
            objectManager.objects.setObjectOptions(objectId, {
                    iconImageHref: iconUrlHover
            });
            /*
            myMap.setCenter(objectManager.objects.getById(objectId).geometry.coordinates, 10, {
                checkZoomRange: true
            });
            */
            if (masObjects.length > 1) {
                myMap.setBounds(objectManager.getBounds());
            }
        }
        if (masObjects.length > 1) {
            myMap.setBounds(objectManager.getBounds());
        }
    });
}

