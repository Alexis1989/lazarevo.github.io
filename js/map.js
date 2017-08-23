ymaps.ready(init);

var curr_click_item = null;
var myMap = null;
var objectManager = null;
var last_click_label = -1;

$( document ).ready(function() {

	var height_menu = $('.adress').height();
    $('.hidden_adress').click(function () {
        if($(this).hasClass('is-show')) {
        	$('.adress').css("overflow-y", "hidden");
            $('.adress').animate({
			     height : 40
			});
            $(this).removeClass('is-show');

            $('.hidden_adress > i').removeClass("fa-chevron-up").addClass("fa-chevron-down");
        } else {
        	$('.adress').css("overflow-y", "hidden");
            $('.adress').animate({ height : height_menu }, 
				{ 
					done: function() { 
						$('.adress').css("height", "calc(100vh - 100px)");
					}
			  	}
		    );

    		
			$(this).addClass('is-show');
			$('.hidden_adress > i').removeClass("fa-chevron-down").addClass("fa-chevron-up");
        }; 
    });

	$(".view-region > a" ).click(function() {
		$(".tula").css("display", "none");
		$(".region").css("display", "block");

		$(".view-region").addClass("is-active");
		$(".view-tula").removeClass("is-active");

		myMap.setCenter([54.27806562134709, 37.34628936910047]);
		myMap.setZoom(9);
		objectManager.setFilter('id > 15');
	});

	$(".view-tula > a" ).click(function() {
		$(".region").css("display", "none");
		$(".tula").css("display", "block");

		$(".view-tula").addClass("is-active");
		$(".view-region").removeClass("is-active");

		$(".tula a").removeClass("is-active");

		myMap.setCenter([54.191966460284256,37.63198526188134]);
		myMap.setZoom(12);
		objectManager.setFilter('id < 15');
	});

    $(".store" ).click(function() {
    	if(curr_click_item != null) {
    		curr_click_item.removeClass("is-active");
    	}

    	curr_click_item = $(this);


    	$(this).addClass("is-active");
    	var data_coordinate_x = $(this).data("x");
    	var data_coordinate_y = $(this).data("y");
    	var objectId = $(this).attr("id");

    	//$(".ymaps-2-1-53-map").remove();

    	console.log(data_coordinate_x);
    	console.log(data_coordinate_y);
    	console.log(objectId);

    	myMap.setCenter([data_coordinate_x, data_coordinate_y]);
    	myMap.setZoom(14);

    	if(last_click_label > -1){
	      objectManager.objects.setObjectOptions(last_click_label, {
		    iconImageSize: [30, 40]
		  });
	    };

	    last_click_label = objectId;

    	objectManager.objects.setObjectOptions(objectId, {
		    iconImageSize: [40, 50]
		  });
	});
});

function init(){ 
	if(myMap == null) {
		myMap = new ymaps.Map("YMapsID", {
	        center: [54.191966460284256,37.63198526188134],
	        zoom: 12,
	        controls: []
	    });
	};

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

    objectManager.setFilter('id < 16');

    objectManager.objects.events.add('click', function (e) {
	    var objectId = e.get('objectId');

	    // SCROLL
	    if(objectId > 15) {
	    	$(".menu").animate({scrollTop:117*(objectId - 16)}, 1000,'swing');
	    } else {
	    	$(".menu").animate({scrollTop:117*objectId}, 1000,'swing');
	    }
	    
	    $("#" + objectId).addClass("is-active");
	    var data_coordinate_x = $("#" + objectId).data("x");
    	var data_coordinate_y = $("#" + objectId).data("y");

	    if(curr_click_item != null) {
    		curr_click_item.removeClass("is-active");
    	}

    	curr_click_item = $("#" + objectId);

	    if(last_click_label > -1){
	      objectManager.objects.setObjectOptions(last_click_label, {
		    iconImageSize: [30, 40]
		  });
	    };

	    last_click_label = objectId;

	    myMap.setZoom(13);
	    myMap.setCenter(objectManager.objects.getById(objectId).geometry.coordinates);
	    myMap.setZoom(14);

	    objectManager.objects.setObjectOptions(objectId, {
		    iconImageSize: [40, 50]
		});
	});

	function hideLabelsTula() {
		myMap.setCenter([54.27806562134709, 37.34628936910047]);
		objectManager.setFilter('id > 15');
		myMap.setZoom(9);
	};
};