const serve = require('koa-static');
const Koa = require('koa');
const server = new Koa();
const bodyParser = require('koa-body');

const router = require('./routes/index');

const PORT = process.env.PORT || 8080 ;

server.use(bodyParser())

server.use(router.routes())


if(process.env.NODE_ENV === 'production')
{
    server.use( serve('client/build'))
}

server.listen(PORT);