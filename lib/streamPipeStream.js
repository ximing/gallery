/**
 * Created by lyq on 15/9/10.
 */
module.exports.pipe = function(streamFrom, streamTo){
    return new Promise(function(resolve, reject){
        streamFrom.pipe(streamTo);
        streamTo.on('close', function () {
            resolve();
        });
    });
};