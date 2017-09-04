ymaps.ready(init);

function init(){ 
	var	myMap = new ymaps.Map("YMapsID", {
	        center: [53.86160359323152,37.46494337134814],
	        zoom: 12,
	        controls: []
	    });


	//myMap.behaviors.disable('drag');
    myMap.behaviors.disable('scrollZoom');

    myMap.controls.add("zoomControl", {
        position: {top: 15, left: 15}
    });

    objectManager = new ymaps.ObjectManager({
	    // Включаем кластеризацию.
	    clusterize: false,
	    // Опции кластеров задаются с префиксом 'cluster'.
	    clusterHasBalloon: false,
	    // Опции геообъектов задаются с префиксом 'geoObject'.
	    geoObjectOpenBalloonOnClick: false
	});

	// Опции можно задавать напрямую в дочерние коллекции.
	objectManager.clusters.options.set({
	    preset: 'islands#grayClusterIcons',
	    hintContentLayout: ymaps.templateLayoutFactory.createClass('Группа объектов')
	});
	objectManager.objects.options.set('preset', 'islands#grayIcon');

	objectManager.objects.options.set( 
	{
		iconLayout: 'default#image',        
		iconImageHref: 'http://blog.karmanov.ws/files/APIYaMaps1/min_marker.png',
     	iconImageSize: [30, 40],
		  	iconImageOffset: [-20, -47] 
    });

	myMap.geoObjects.add(objectManager);

    objectManager.add({
		    type: 'Feature',
		    id: 0,
		    geometry: {
		        type: 'Point',
		        coordinates: [53.86160359323152,37.46494337134814]
		    }
		});
};