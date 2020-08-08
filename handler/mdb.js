const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const dotenv = require('dotenv');
dotenv.config();
/**
 */
class MDB
{

    /**
     */
    constructor(p)
    {
        //todo
    }
    /**
     * Connect to Client
     */
    Client = async () =>
    {

        try
        {

            const uri = `mongodb+srv://${ process.env.USER_NAME }:${ process.env.USER_PASS }@phonebookcluster.ng2wd.mongodb.net/${ process.env.DB_Name }?retryWrites=true&w=majority`;

            console.log("connect uri", uri)

            const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true});

            await client.connect()
                .then(()=> console.log("connect"))

            return client

        }
        catch (err)
        {
            console.log("Client connect err", err)
            return Promise.reject(err)
        }

    }
    /**
     * Set
     */
    Set = async (params) =>
    {
        try
        {
            // console.log("set params:", params)

            const client     = await this.Client();
            const database   = client.db('phonebook')
            const collection = database.collection('contacts')

            const check_exists = await collection.find({number: params.number}).toArray()

            // console.log("check_exists", check_exists)

            if(check_exists.length)
                return {resp: "Already exists"}

            params.dt_create = Date.now()

            await collection.insertOne(params)

            return {resp: "Ok"}
        }
        catch (err)
        {
            return Promise.reject(err)
        }
    }

    /**
     * Get
     */
    Get = async (params) =>
    {
        try
        {
            const client = await this.Client();

            const database  =   client.db('phonebook');
            const collection  = database.collection('contacts');

            console.log("params", params)
            //
            const resp_data = params && params.number ?  await collection.find({number: params.number}).toArray()
                : await collection.find().toArray()

            console.log("resp_data", resp_data )

            return {resp: resp_data }

        }
        catch (err)
        {
            // console.log("Get Error", err)

            return Promise.reject(err)
        }
    }

    /**
     * Update
     */
    Upd = async (params) =>
    {
        try
        {
            const client = await this.Client();
            const database  =   client.db('phonebook')
            const collection  = database.collection('contacts')

            const filter = { _id: ObjectId(params._id) };

            // console.log("update params", params)

            const updateContact = {
                $set: {
                    name: params.name ,
                    number: params.number
                },
            };
            await collection.findOneAndUpdate(filter, updateContact)

            return {resp: "Ok"}

        }
        catch (err)
        {
            return Promise.reject(err)
        }
    }
    /**
     * Delete
     */
    Del = async (id) =>
    {
        try
        {
            const client = await this.Client();
            const database  =   client.db('phonebook')
            const collection  = database.collection('contacts')

            // console.log("delete id", id)

            const query = { _id :  ObjectId(id) };

            const result = await collection.deleteOne(query);

            if (result.deletedCount === 1)
                return {resp: "Ok"}
            else
                throw new Error("No contacts found.");

        }
        catch (err)
        {
            return Promise.reject(err)
        }
    }

}   // class DDB

module.exports = MDB