/// <binding BeforeBuild='copy-wwwroot/npm' Clean='clean-wwwroot/npm' />
const Initer = require('@rugal.tu/gulp-initer');
Initer
    .AddFolder('@fortawesome/fontawesome-free/js')
    .AddFolder('@fortawesome/fontawesome-free/css')
    .AddFolder('@fortawesome/fontawesome-free/webfonts', {
        encoding: false, // NOTE: encoding should be false
    })
    .AddFolder('@mdi/font/css')
    .AddFolder('@mdi/font/fonts', {
        encoding: false,
    })
    .AddFolder('bootstrap/dist', {
        Type: '*.+(js|css)' // NOTE: only copy .js .css files
    })
    .AddFolder_Js('vue/dist')
    .AddFolder('vuetify/dist', {
        Type: '*.+(js|css)' // NOTE: only copy .js .css files
    })
    .AddFolder('vuetify/lib/styles')
    .AddFolder_Js('@rugal.tu/vuemodel3/dist')
    .InitTask();