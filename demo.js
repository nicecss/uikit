const template = require('art-template');
const Koa = require('koa');

const app = new Koa();

template.config('base', __dirname);

var data = {list: ["aui", "test"],title:'ni'};


var html = template('_demos/index', data);

app.use(async function(ctx, next){
  ctx.body = 'none'
})

app.listen(3001)
