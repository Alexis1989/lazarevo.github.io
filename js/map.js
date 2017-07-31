ymaps.ready(init);

function init(){ 
	var currentClickLabel = -1;

    var myMap = new ymaps.Map("YMapsID", {
        center: [54.191966460284256,37.63198526188134],
        zoom: 12,
        controls: []
    });

    myMap.behaviors.disable('scrollZoom');

    myMap.controls.add("zoomControl", {
        position: {top: 15, left: 15}
    });

    var objectManager = new ymaps.ObjectManager({
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

	var currentId = 0;

	myMap.geoObjects.add(objectManager);

    var tula_shops = [
    				[54.200850089500726, 37.64524466069955], // Марата
    			    [54.199211, 37.65328], // Ложевая
    			    [54.174591, 37.615577], // Михеева
    			    [54.186051, 37.619204], // Центральный рынок
    			    [54.17867215774516, 37.63252949999999], // Кауля
    			    [54.15755980287482, 37.5821166312828], // Калужское шоссе
    			    [54.18882973572253, 37.612421308405445], // Ленина 30
    			    [54.219543857624224, 37.62280049999992], // Демидовская
    			    [54.15347930370635, 37.58515077116389], // Ленина 131
    			    [54.181881068069245, 37.60227072023767], // Первомайская
    			    [54.19846026, 37.58197141], // Дм.Ульянова
    			    [54.21355078, 37.61069150], // Максима Горького
    			    [54.20837, 37.672729], // Кутузова
    			    [54.188952, 37.690698], // Металлистов
    			    [54.158633, 37.636428], // Новомосковское шоссе
    			    [54.16535, 37.582357] // 9 мая
    			];

    var oblast_shops = [
    				[54.008186, 37.518505], // г. Щекино Ленина
    			    [54.734204, 37.397279], // п. Заокский
    			    [53.851336, 37.486176], // п. Лазарево
    			    [54.022367, 37.500576], // г. Щекино Емельянова 
    			    [54.165618, 37.468655], // п. Иншинский
    			    [53.703009, 37.280359] // г. Плавск

    			];

    for (var i = 0, l = tula_shops.length; i < l; i++) {
        objectManager.add({
		    type: 'Feature',
		    id: currentId++,
		    geometry: {
		        type: 'Point',
		        coordinates: tula_shops[i]
		    }
		});
    };

    for (var i = 0, l = oblast_shops.length; i < l; i++) {
        objectManager.add({
		    type: 'Feature',
		    id: currentId++,
		    geometry: {
		        type: 'Point',
		        coordinates: oblast_shops[i]
		    }
		});
    };

    objectManager.objects.events.add('click', function (e) {
	    var objectId = e.get('objectId');
	    var coords = e.get('coords');
	    var curr = objectManager.getObjectState(objectId);
	    console.log(curr);
	    console.log(objectId);
	    if(currentClickLabel > -1){
	      objectManager.objects.setObjectOptions(currentClickLabel, {
		    iconImageSize: [30, 40]
		  });
	    };

	    objectManager.objects.setObjectOptions(objectId, {
		    iconImageSize: [40, 50]
		});

	    currentClickLabel = objectId;

	    //hideLabelsTula();
	    myMap.setZoom(12);
	    myMap.setCenter(coords);
	    
	});

	function hideLabelsTula() {
		myMap.setCenter([54.27806562134709, 37.34628936910047]);
		objectManager.setFilter('id > 15');
		myMap.setZoom(9);
	};
};