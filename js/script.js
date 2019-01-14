$(window).resize(function() {
  if($(window).width() > 991) {
    $(".navmenu").attr("style", "none");
    $(".nav-burger").removeClass("is-active");
  };
});

$(document).ready(function () {
  $(".nav-burger").click(function () {
    $('body').toggleClass("open");
    var widthscreen = "-" + $(window).width() - 51 + "px";
    if($(this).hasClass("is-active")) {
      $(this).removeClass("is-active");
      $(".navmenu").animate({
        left: widthscreen
      }, 500, function() {
        $(".navmenu").css("display", "none");
      });
    } else {
      $(this).addClass("is-active");
      $(".navmenu").css("display", "block").css("left", widthscreen).animate({
        left: "0"
      }, 500, function() {
        // Animation complete.
      });
    };
  });
  $(".delete").click(function () {
    $(".modal").css("display", "block");
    $("body").toggleClass("open");
  });

  $(".destroy").click(function () {
    $(".modal").css("display", "none");
    $("body").toggleClass("open");
  });

  $('.modal').click(function(){
     $('.modal').css("display", "none");
     $("body").toggleClass("open");
   });

  $('.modal-dialog').click(function(event){
      event.stopPropagation();
  });
});
