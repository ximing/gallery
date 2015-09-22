/**
 * Created by yeanzhi on 15/9/21.
 */
'use strict';
var compress = require('koa-compress');
var logger = require('koa-logger');
var serve = require('koa-static');
var koa = require('koa');
var path = require('path');
var app = koa();
//-----
var koaJson = require('koa-json');
var bodyParser = require('koa-bodyparser');
var co = require('co');
var controller = require('./router');
var env = process.env.NODE_ENV || "development";

//-------
app.use(bodyParser());
app.use(koaJson());
// Serve static files
app.use(serve(path.join(__dirname, 'public')));
// Compress
app.use(compress());
// Logger
app.use(logger());
//-------
controller.register(app);

//try {
//    if (env === "development") {
//        app.listen(9090);
//        console.log('connected to database and listening on port 9090');
//    } else {
//        app.listen(9090);
//        console.log('start in production env & listening on port 9090');
//    }
//}catch(err){
//    console.log(err);
//}
app.listen(9090);

