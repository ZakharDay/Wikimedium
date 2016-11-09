$(function() {
  var state = {
    imagesQuantity: $('.galleryRail img').length,
    currentImage: 0,
    imageWidth: 0
  }

  function canMoveNext() {
    return state.currentImage != state.imagesQuantity;
  }

  function canMovePrev() {
    return state.currentImage != 1;
  }

  function railTransition() {
    if (state.imageWidth <= 768 && state.imageWidth >= 481) {
      $('.galleryRail').css('transform', 'translateX(-' + state.currentImage * 768 + 'px)');
    } else {
      $('.galleryRail').css('transform', 'translateX(-' + state.currentImage + '00vw)');
    }
  }

  function moveRail(id) {
    if (id == 'next' && canMoveNext() || id == 'prev' && canMovePrev()) {
      railTransition();
    }
  }

  function updateState(id) {
    if (id == 'next') {
      state.currentImage = state.currentImage + 1;
    } else if (id == 'prev') {
      state.currentImage = state.currentImage - 1;
    }
  }

  function checkMoveAvailability() {
    if (state.currentImage + 1 >= state.imagesQuantity) {
      $('#next').addClass('disabled');
    } else {
      $('#next').removeClass('disabled');
    }

    if (state.currentImage <= 0) {
      $('#prev').addClass('disabled');
    } else {
      $('#prev').removeClass('disabled');
    }
  }

  function setImageWidth() {
    state.imageWidth = $('.gallery figure').first().width();
  }

  $(window).resize(function() {
    setImageWidth();
    railTransition();
  });

  $('.galleryNav div').on('click', function(e) {
    console.log(state);

    if ($(this).hasClass('disabled')) {
      e.preventDefault();
    } else {
      updateState(this.id);
      moveRail(this.id);
      checkMoveAvailability();
    }
  });

  setImageWidth();
});
