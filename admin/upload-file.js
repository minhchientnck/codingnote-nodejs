var express = require('express');
var router = express.Router();
var multer  = require('multer');
var path = require('path');
var fs = require('fs');

const storageBase = 'public/admin/uploadedFile';
const prefixUrl = 'uploadedFile';

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, storageBase)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
var upload = multer({ storage: storage });

router.get('/files', function (req, res, next) {
  var uploadedfiles = fs.readdirSync(storageBase)
      .map(el => ({
        name: el,
        url: path.join(prefixUrl, el),
      }));
  res.render('admin/uploadFile', { uploadedfiles });
});

router.post('/uploadFile', upload.array("upload"), function (req, res, next) {
  const files = req.files;
  if (!files) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  res.redirect('/admin/files');
});

router.post('/dragDropFile', upload.array("upload"), function (req, res, next) {
  const files = req.files;
  console.log(files)
  if (!files) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  res.send({
    uploaded: 1,
    fileName: files[0].filename,
    url: path.join('/admin/uploadedFile', files[0].filename),
  })
});

router.post('/deleteFile/:filename', function (req, res, next) {
  const filename = req.params['filename'];
  console.log(filename)
  try {
    fs.unlinkSync(path.join(storageBase, filename))
    console.log('File is removed');
  } catch(err) {
    console.error(err)
  }
  res.redirect('/admin/files');
});


module.exports = router;