
$(document).ready(function() {
	// scroll top
	$('.scroll-top').click(function() {
		$("html, body").animate({ scrollTop: 0 }, 600);
		return false;
	});

	$('.btn-cancel').click(function(e) {
		window.location = '/';
	});
	
	$('.btn-cancel-login').click(function(e) {
		window.location = '/';
	});
});
