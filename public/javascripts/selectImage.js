
function getUrlParam(paramName) {
  var reParam = new RegExp('(?:[\?&]|&)' + paramName + '=([^&]+)', 'i');
  var match = window.location.search.match(reParam);
  return (match && match.length > 1) ? match[1] : null;
}

function returnFileUrl(fileUrl) {
  var funcNum = getUrlParam('CKEditorFuncNum');
  window.opener.CKEDITOR.tools.callFunction(funcNum, fileUrl);
  window.close();
}
