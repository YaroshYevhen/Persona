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
APP.modalBtn = $('.modal-btn');
APP.closeModal = $('.modal-close');
APP.modalDropdown = $('.modal-dropdown__current');
APP.modalDropdownItem = $('.modal-dropdown__item');
APP.inputFile = $('.input-file__hidden');
APP.removeFile = $('.file');

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
        $('.input-file__btn')
            .css("background-image", ("url(" + e.target.result + ")"));
    };

    reader.readAsDataURL(input.files[0]);
  }
}

function closeModal() {
  $('.modal').scrollTop(0).removeClass('active');
  $('html').removeClass('overflow');
}

function currentSlideCount(item){
  let dotsLenght = $(item).find('.slick-dots li').length,
      activeIndex = $(item).find('.slick-dots li.slick-active').index() + 1;

  $(item).find('.slick-dots').attr('data-lenght',dotsLenght);
  $(item).find('.slick-dots').attr('data-current',activeIndex);
}

APP.$document.ready(function() {
  APP.inputFile.on('change', function(event) {
    var file = event.target.files[0],
        fileName = file.name,
        replace = fileName.replace(/\s/g,'_');

    if(file) {
      $(this).parents('.input-file').find('label').addClass('file');
    } else {
      $(this).parents('.input-file').find('label').removeClass('file');
    }
    $('.input-file__text').html(replace);
    readURL(this);
  });

  $('label').on('click', function(event) {
    if($(this).hasClass('file')) {
      event.preventDefault();
      $('.input-file__text').text('Прикрепить фото');
    APP.inputFile.val('');
    $(this).parents('.input-file').find('label').removeClass('file');
    $(this).parents('.input-file').find('.input-file__btn').css("background-image", "");
    }
  });

  $(document).on('click', function(event) {
    if(!$(event.target).hasClass('.modal-dropdown') && !$(event.target).parents('.modal-dropdown').length) {
      $('.modal-dropdown.show').removeClass('show');
    }
  })

  APP.modalDropdownItem.on('click', function() {
    let text = $(this).find('span').text();

    $(this).parents('.modal-dropdown').find('.modal-dropdown__current span').text(text);
    $('.modal-dropdown__item.current').removeClass('current');
    $(this).addClass('current');
    $(this).parents('.modal-dropdown').removeClass('show');
  })

  APP.modalDropdown.on('click', function() {
    $(this).parents('.modal-dropdown').toggleClass('show');
  })

  APP.modalBtn.on('click', function() {
    var attr = $(this).attr('data-target'),
        modal = $('.modal[data-target="' + attr + '"]'),
        order = $(this).attr('data-order');

    modal.addClass('active');
    $('html').addClass('overflow');
    $('body').removeClass('menu');
  });
  
  $('.modal-close').on('click', function() {
    closeModal();
  });

  $('.modal').on('click', function(event){
    if($(event.target).hasClass('modal')){
      closeModal();
    }
  });

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