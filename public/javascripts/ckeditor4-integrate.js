
const options = {
	width: '100%',
	// removeButtons: 'Source',
	skin: 'moono-lisa',
	extraPlugins: [
				'uploadimage',
				'codesnippet',
				'link',
		],
	filebrowserUploadMethod: 'form',
	filebrowserBrowseUrl: '/admin/files',
	filebrowserUploadUrl: '/admin/uploadFile',
	uploadUrl: '/admin/dragDropFile',
};

const editor = CKEDITOR.replace('content', options);

// editor.on('mode', function() {
// 	var submitBtn = document
// 		.querySelector('.btn-primary');
// 	if (this.mode === 'source') {
// 		submitBtn.disabled = true;
// 	} else {
// 		submitBtn.disabled = false;
// 	}
// });