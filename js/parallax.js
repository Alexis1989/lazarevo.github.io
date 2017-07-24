$(window).scroll(function() {
  var st = $(this).scrollTop();

  $(".header_text").css({
    "transform" : "translate(0%, " + st/2 + "%"
  });

  $(".mirror img").css({
    "transform" : "translate(0%, -" + st/20 + "%"
  });
});

$(window).resize(function() {
  var width = $(this).width();
  var height = $(this).height();

  var relation = $(this).height() / $(this).width();

  var img_width = $(".mirror img").width();

  var centr = (img_width - width) / 2;

  if (relation > 0.75) {
    $(".mirror img").css("width", "auto").css("height", "100vh").css("left", "-" + centr +"px");
  } else {
    $(".mirror img").css("height", "auto").css("width", "100vw").css("left", "0px");;
  };

  console.log("width = " + width + "; height = " + height);
});

$(document).ready(function(){
        var width = $(window).width();
        var height = $(window).height();

        console.log("width = " + width + "; height = " + height);

        var relation = height / width;

        var img_width = $(".mirror img").width();

        var centr = (img_width - width) / 2;

        if (relation > 0.75) {
          $(".mirror img").css("width", "auto").css("height", "100vh").css("left", "-" + centr +"px");
        } else {
          $(".mirror img").css("height", "auto").css("width", "100vw").css("left", "0px");;
        };
  });