const serve = require('koa-static');
const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-body');
const cors = require('@koa/cors');

const router = require('./routes/index');

const PORT = process.env.PORT || 8080 ;

app.use(cors());

app.use(bodyParser())

app.use(router.routes())


if(process.env.NODE_ENV === 'production')
{
    app.use( serve('client/build'))
}

app.listen(PORT);