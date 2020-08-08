const Router = require('koa-router')
const router = new Router()

const MDB = require('../handler/mdb')

const mongo_ddb = new MDB({})

/**Get Data*/
router.get('/api/contacts' , async ctx =>{

    await mongo_ddb.Get()
        .then(data=>{

            ctx.body = data
        })
        .catch(err =>{

            ctx.body = "err:" + err
        })

})

/**Get single Data*/

router.post('/api/getcontact' , async ctx =>{

    await mongo_ddb.Get(ctx.request.body)
        .then(data=>{

            ctx.body = data
        })
        .catch(err =>{

            ctx.body = "err:" + err
        })

})

/**Set Data*/

router.post('/api/contact' , async ctx =>{

    await mongo_ddb.Set(ctx.request.body)
        .then(data=>{

            ctx.body = data
        })
        .catch(err =>{

            ctx.body = "err:" + err
        })

})

/**Update Data*/
router.put('/api/contact/:id' , async ctx =>{

    await mongo_ddb.Upd(ctx.request.body)
        .then(data=>{

            ctx.body = data
        })
        .catch(err =>{

            ctx.body = "err:" + err
        })

})

/**delete Data*/
router.delete('/api/contact/:id' , async ctx =>{

    await mongo_ddb.Del(ctx.params.id)
        .then(data=>{
            ctx.body = data
        })
        .catch(err =>{
            ctx.body = "err:" + err
        })

})


module.exports = router