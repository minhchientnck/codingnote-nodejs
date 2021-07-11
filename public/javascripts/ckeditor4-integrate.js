
const options = {
	removeButtons: 'Source',
	skin: 'moono-lisa',
	extraPlugins: [
				'uploadimage',
				'codesnippet',
				'link',
		],
	filebrowserBrowseUrl: '/ckfinder/static/ckfinder.html',
	filebrowserUploadUrl: '/ckfinder/connector?command=QuickUpload&type=Files',
};

const editor = CKEDITOR.replace('content', {
  width: '100%',
});
// editor.on('mode', function() {
// 	var submitBtn = document
// 		.querySelector('.btn-primary');
// 	if (this.mode === 'source') {
// 		submitBtn.disabled = true;
// 	} else {
// 		submitBtn.disabled = false;
// 	}
// });