var getQuery = require('./ajax_crud_query');
var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');


router.get('/', getQuery.showForm);

var randomStrGen = (len, string) => {
    var randomAplNum = '';
    for (var i = len; i > 0; i--) 
    {
        randomAplNum += string[(Math.floor(Math.random() * string.length))];
    }
    return randomAplNum;
}

var resultedString = randomStrGen(20, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

var storePhoto = multer.diskStorage({
    destination: function (req, file, cb) {
       cb(null, 'public/uploads');    //path.join(__dirname, '/uploads')
    },
    filename: function (req, file, cb) {
       cb(null, `${resultedString}_${Date.now()}${path.extname(file.originalname)}`);
    }
 });

var upload = multer({ storage: storePhoto });

router.post('/submit', upload.single('enterPhoto'), getQuery.insertData);
router.get('/display', getQuery.showDashboard);
router.post('/clear-all', getQuery.truncateTable);
router.delete('/delete', getQuery.deleteData);
router.post('/edit-req', getQuery.requestEdit);
router.post('/update-without-file', getQuery.updateDataWithoutFile);
router.post('/update-with-file', upload.single('enterPhoto'), getQuery.updateDataWithFile);


module.exports = router;