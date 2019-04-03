import _ from 'lodash'
import dotenv from 'dotenv/config'
import { log } from './Log'
import { MongoClient, ObjectId } from 'mongodb'

export default class Mongo {

  async insertBanner(data) {

    const client = await MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true })
    const db = client.db(process.env.DB_NAME)

    data._id = null;

    const bd = await db.collection('banners').insertOne(data)
    client.close()

    return bd.insertedId

  }

  async updateBanner(data, id) {

    const client = await MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true })
    const db = client.db(process.env.DB_NAME)
    delete data._id
    const bd = await db.collection('banners').updateOne(
      { "_id": ObjectId(id) },
      { $set: data }
    )
      .catch((err) => {
        log(err)
        return false
      })
    client.close()
    data._id = id
    return data

  }

  async getBanner(id) {

    const client = await MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true })
    const db = client.db(process.env.DB_NAME)
    const result = await db.collection('banners').findOne({ "_id" : ObjectId(id) })
    client.close()

    return result

  }

  async getBanners() {

    const client = await MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true })
    const db = client.db(process.env.DB_NAME)
    const result = await db.collection('banners').find().sort({"_id": -1}).toArray()
    client.close()

    return result

  }

  async getPreset(id) {

    const client = await MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true })
    const db = client.db(process.env.DB_NAME)
    const result = await db.collection('presets').findOne({ "_id" : ObjectId(id) })
    client.close()

    return result

  }

  async insertPreset(data) {

    const client = await MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true })
    const db = client.db(process.env.DB_NAME)

    data._id = null

    log("Connected successfully to server")
    let bd = await db.collection('presets').insertOne(data)
    client.close()

    return bd.insertedId

  }

  async deletePreset(id) {

    const client = await MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true })
    const db = client.db(process.env.DB_NAME)

    log("Connected successfully to server")
    log(id)
    await db.collection('presets').remove({ "_id": ObjectId(id) })
    client.close()

    return true

  }

  async getPresets() {

    const client = await MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true })
    const db = client.db(process.env.DB_NAME)
    const result = await db.collection('presets').find().sort({name: 1}).toArray()
    client.close()

    return result

  }

  async getComponents() {

    const client = await MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true })
    const db = client.db(process.env.DB_NAME)
    const result = await db.collection('components').find().toArray()
    client.close()

    return result

  }

  async getComponentPresets() {

    const client = await MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true })
    const db = client.db(process.env.DB_NAME)
    const result = await db.collection('componentPresets').find().toArray()
    client.close()

    return result

  }

  async purge() {

    const client = await MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true })
    const db = client.db(process.env.DB_NAME)

    db.collection('counters').updateOne(
      {_id: 'id' },
      {$set:{sequence_value : 0}}
    )

    const result = await db.collection('banners').deleteMany({})
    client.close();

    return result

  }

  async getNextSequenceValue(client){

    const db = client.db(process.env.DB_NAME)
    await Promise.resolve(
      db.collection('counters').updateOne(
        {_id: 'id' },
        {$inc:{sequence_value:1}}
      )
    )

    return await Promise.resolve(db.collection('counters').findOne({ _id: 'id' }))

  }

  getIdCounter(_id) {
    var id          = _id.toString();
    var ctr         = 0;
    var timestamp   = parseInt(id.slice(ctr, (ctr+=8)), 16);
    var machineID   = parseInt(id.slice(ctr, (ctr+=6)), 16);
    var processID   = parseInt(id.slice(ctr, (ctr+=4)), 16);
    var counter     = parseInt(id.slice(ctr, (ctr+=6)), 16);

    return counter;
  }
}
