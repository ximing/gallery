/**
 * Created by lyq on 15/8/23.
 */
var path = require('path');
var fs = require('fs');
var parse = require('co-busboy');
var views = require('co-views');
var env = process.env.NODE_ENV || "development";
var streamHelper = require('../lib/streamPipeStream');
var qiniu = require('../lib/qiniu');


var versionIndex = function*() {
    this.body = yield views(__dirname + '/../views', {
        map: {html: 'swig'}, cache: env != 'production' ? false : 'memory'
    })('index');
};

var fileUpload = function*() {
    var parts = parse(this, {
        autoFields: true
    });
    var part;
    while (part = yield parts) {
        var fileName = (new Date()).valueOf() + '.' + part.filename.split('.').reverse()[0];
        var path_temp = path.join(__dirname + '/../images/' + fileName);
        if (env !== 'development') {
            path_temp = path.join('/usr/share/nginx/html/images/' + fileName);
        }
        var stream = fs.createWriteStream(path_temp);
        yield streamHelper.pipe(part,stream);
        //part.pipe(stream);
        var url = yield qiniu(path_temp,fileName);
        fs.unlinkSync(path_temp);
        console.log('******',url);
        this.body = {
            markdown: url,
            src: url
        }
    }

};

exports.register = function (router) {
    router.get('/', versionIndex);
    router.post('/upload', fileUpload);
};

