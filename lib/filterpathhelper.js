
var pathIgnore = ['/auth/ssocallback', '/favicon.ico'];
var contentTypeIngnore = ['text/html;charset=utf-8','text/css; charset=utf-8','text/javascript; charset=utf-8'];
module.exports.inIgnorePath = function (path) {
  for (var item in pathIgnore) {
    if (pathIgnore[item] === path) {
      return true;
    }
  }
  return false;
};
module.exports.inIgnoreContentType = function (type) {
  for (var item in contentTypeIngnore) {
    if (contentTypeIngnore[item] === type) {
      return true;
    }
  }
  return false;
};


module.exports.getExpireTime = function () {
  //访问权限过期时间
  return 1000 * 60 * 60 * 24 * 1;
  //return 1000 * 5;
};
