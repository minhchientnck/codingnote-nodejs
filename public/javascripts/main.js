
$(document).ready(function() {
	// scroll top
	$('.scroll-top').click(function() {
		$('html, body').animate({ scrollTop: 0 }, 600);
		return false;
	});

	$('.btn-cancel').click(function(e) {
		window.location = '/';
	});
	
	$('.btn-cancel-login').click(function(e) {
		window.location = '/';
	});

	$('.side-navbar').hide();
	$('.navbar-btn').click(function() {
		$('.side-navbar').fadeToggle( '200ms');
    var className = $('.navbar-btn span i').attr('class');
    if (className === 'bi bi-justify') {
      $('.search-form').hide();
      $('.search-btn span i').attr('class', 'bi bi-search')
      $('.navbar-btn span i').attr('class', 'bi bi-x')
    } else {
      $('.navbar-btn span i').attr('class', 'bi bi-justify')
    }
	})

  $('.search-form').hide();
  $('.search-btn').click(function() {
    $('.search-form').fadeToggle('200ms');
    var className = $('.search-btn span i').attr('class');
    if (className === 'bi bi-search') {
      $('.side-navbar').hide();
      $('.navbar-btn span i').attr('class', 'bi bi-justify')
      $('.search-btn').css('font-size', '2em');
      $('.search-btn span i').attr('class', 'bi bi-x')
    } else {
      $('.search-btn span i').attr('class', 'bi bi-search')
    }
  });
});
