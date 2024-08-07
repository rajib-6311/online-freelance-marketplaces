

const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;


const corsOptions ={
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
    optionSuccessStatus: 200,
}


// middlewares
app.use(cors(corsOptions));
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bgilkf0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    const jobsCollection = client.db('online_freelance').collection('Jobs')
    const bidsCollection = client.db('online_freelance').collection('bids')

    // Connect the client to the server	(optional starting in v4.7)
   

    // get all jobs
    app.get('/Jobs',async (req, res)=>{
      const result = await jobsCollection.find().toArray()

      res.send(result)
    })

    // get a single job
    app.get('/job/:id', async (req, res)=>{
      const id = req.params.id
      const query = {_id: new ObjectId(id)}
      const result = await jobsCollection.findOne(query)
      res.send(result)
    })

    // save a bid data in db
    app.post('/bid', async(req, res)=>{
      const bidData = req.body
      // console.log(bidData)
      // return
      const result = await bidsCollection.insertOne(bidData)
      res.send(result)
    })

    // save a job data in db
    app.post('/job', async(req, res)=>{
      const jobData = req.body
      // console.log(bidData)
      // return
      const result = await jobsCollection.insertOne(jobData)
      res.send(result)
    })


    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    
  }
}
run().catch(console.dir);



    
app.get('/', (req, res) => {
    res.send('simple server online-freelance-marketplace');
})

app.listen(port, () => {
    console.log(`simple online-freelance-marketplace in running on port, ${port}`);
})
