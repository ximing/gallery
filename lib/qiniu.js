/**
 * Created by yeanzhi on 15/9/24.
 */
var path = require('path');
var fs = require('fs');
var qiniu = require('qiniu');
var qiniu_config = require('../config.json');

module.exports = function(path_temp, name){
    return new Promise(function(resolve, reject){
        var target_path = path_temp;
        //使用同步方式重命名一个文件
        qiniu.conf.ACCESS_KEY = qiniu_config.AK;
        qiniu.conf.SECRET_KEY = qiniu_config.SK;
        var uptoken = new qiniu.rs.PutPolicy(qiniu_config.bucket).token();
        var extra = new qiniu.io.PutExtra();
        fs.readFile(target_path, function(err, data){
            qiniu.io.put(uptoken,name, data, extra, function(err, ret) {
                if(!err) {
                    resolve(qiniu_config.domain +'/'+ret.key);
                } else {
                    reject();
                }
            });
        });
    });

};