var APP = {};
APP.$document = $(document);
APP.hamburger = $('.hamburger');
APP.slider = $('.slider-container');
APP.dropdown = $('.dropdown');
APP.dropdownContent = $('.dropdown-content');
APP.citySwitcher = $('.contacts-clickable');
APP.mobileCitySwitcher = $('.contacts-dropdown__item');
APP.hamburger = $('.hamburger');
APP.servicesShow = $('.services__subtitle');

function currentSlideCount(item){
  let dotsLenght = $(item).find('.slick-dots li').length,
      activeIndex = $(item).find('.slick-dots li.slick-active').index() + 1;

  $(item).find('.slick-dots').attr('data-lenght',dotsLenght);
  $(item).find('.slick-dots').attr('data-current',activeIndex);
}

APP.$document.ready(function() {
  
  $(document).keyup(function(e) { 
      if (e.keyCode == 27) { 
        closeModal();
      } 
  });

  APP.servicesShow.on('click', function() {
    $(this).toggleClass('show');
  })

  APP.mobileCitySwitcher.on('click', function() {
    let city = $(this).data('city');

    $('.contacts__map iframe').removeClass('current');
    $('.contacts__map iframe[data-city="' + city + '"]').addClass('current');
    $('.contacts-item.current').removeClass('current');
    $('.contacts-clickable[data-city="' + city + '"]').parents('.contacts-item').addClass('current');
    $('.contacts-dropdown__item').removeClass('current');
    $(this).addClass('current');
    $('.contacts-dropdown').removeClass('show');
  })

  APP.citySwitcher.on('click', function() {
    if($(window).width() >= 768) {
      let city = $(this).data('city');

      $('.contacts__map iframe').removeClass('current');
      $('.contacts__map iframe[data-city="' + city + '"]').addClass('current');
      $('.contacts-item.current').removeClass('current');
      $(this).parents('.contacts-item').addClass('current');
    } else {
      if($(event.target).hasClass('contacts__city') || $(event.target).parents('.contacts__city').length) {
        $('.contacts-dropdown').toggleClass('show');
      }
    }
  })

  APP.hamburger.on('click', function(){
    $(this).toggleClass('active');
    $('body').toggleClass('menu');
    $('html').toggleClass('overflow');
  });

  $(document).on('click', function(event){
    if(!$(event.target).parents('.dropdown-parent').length) {
      APP.dropdown.removeClass('active');
    }
    if(!$(event.target).hasClass('contacts__city') && !$(event.target).hasClass('contacts-dropdown') && !$(event.target).parents('.contacts__city').length) {
      $('.contacts-dropdown.show').removeClass('show');
    }
  })

  APP.dropdown.on('click', function(){
    APP.dropdown.not(this).removeClass('active');
    $(this).toggleClass('active');
  });

	APP.slider.each(function(key, item) {
    var options = {
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      dots: true,
      nextArrow: '<button class="slick-next slick-arrow"><i class="icon-slider-arrow"></i></button>',
      prevArrow: '<button class="slick-prev slick-arrow"><i class="icon-slider-arrow"></i></button>',
    };
    $(item).slick(options);
  });

  $('.slider-counter').each(function(key, item){
    currentSlideCount(item);
    $(item).on('afterChange', function(event, slick, currentSlide, nextSlide){
      currentSlideCount(item)
    });
  });
})