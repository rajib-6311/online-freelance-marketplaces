
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;


const corsOptions ={
    origin: [
      'http://localhost:5173', 
      'http://localhost:5174',
      'https://online-freelance-marketplace.web.app', 
      'https://online-freelance-marketplace.firebaseapp.com',
      
    ],
    credentials: true,
    optionSuccessStatus: 200,
}


// middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// verify middleware
const verifyToken = (req, res, next) => {
  const token = req.cookies?.token 
  if(!token) return res.status(401).send({message: 'unauthorized access'})

  if(token){
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
      if(err){
         console.log(err);
         return res.status(401).send({message: 'unauthorized access'})
      }
      console.log(decoded);
      req.user = decoded;

      next();
    } )
  }
}


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bgilkf0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// const cookeOption = {
//   httpOnly : true,
//   sameSite : process.env.NODE_ENV === 'production' ? 'none' : 'strict',
//   secure : process.env.NODE_ENV === 'production' ? 'true' : 'false',
// }
async function run() {
  try {

    const jobsCollection = client.db('online_freelance').collection('Jobs')
    const bidsCollection = client.db('online_freelance').collection('bids')

    // Connect the client to the server	(optional starting in v4.7)

    // jwt generated 
    app.post('/jwt', async (req, res) => {
      const email = req.body 
      const token = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '7days',
      })
      res 
      .cookie('token', token,
        {
        httpOnly : true,
        secure : process.env.NODE_ENV === 'production',
        sameSite : process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      }
    )
      .send({success : true});
    })

    // clear token logout 
    app.get('/logout', (req, res) =>{
      res 
      .clearCookie('token', {
        httpOnly : true,
        secure : process.env.NODE_ENV === 'production' ? 'true' : 'false',
        sameSite : process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge : 0,
      })
      .send({success : true});
    })
   

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

      // cheek if it's a duplicate request
      const query = {
        email: bidData.email,
        jobId: bidData.jobId
      };
      const alreadyApplied = await bidsCollection.findOne(query)
      console.log(alreadyApplied)

      if(alreadyApplied){
        return res
        .status(400)
        .send('You have already placed a bid on this job')
      }

      const result = await bidsCollection.insertOne(bidData)

      // update bid count in jobs collection
      const updateDoc ={
        $inc: {bid_count: 1},
      }
      const jobQuery = {_id: new ObjectId(bidData.jobId)}
      const updateBidCounts = await jobsCollection.updateOne(jobQuery,updateDoc)
      console.log(updateBidCounts)
      res.send(result)
    })

    // save a job data in db
    app.post('/job', async(req, res)=>{
      const jobData = req.body
      const result = await jobsCollection.insertOne(jobData)
      res.send(result)
    })

    // get all jobs posted by a specific user
    app.get('/jobs/:email', verifyToken, async(req, res)=>{
      // jwt
      const tokenEmail = req.user.email
      const email = req.params.email
      if (tokenEmail !== email){
        return res.status(403).send({message: 'forbidden access'})
      }
      const query = {'buyer.email':email}
      const result = await jobsCollection.find(query).toArray()
      res.send(result)
    })

    // delete a job data form db
    app.delete('/job/:id',  async(req, res)=>{
      const id = req.params.id
      const query = {_id: new ObjectId(id)}
      const result = await jobsCollection.deleteOne(query)
      res.send(result) 
    })

    // Update a job in db
    app.put('/job/:id', async(req,res)=>{
      const id = req.params.id 
      const jobData = req.body
      const query = { _id: new ObjectId(id)}
      const options = {upsert: true}   
      const updateDoc = {
        $set :{
          ...jobData,
        },
      }
      const result = await jobsCollection.updateOne(query, updateDoc, options)
      res.send(result);
    })

    // get all bids for a user by email form db
    app.get('/my-bids/:email', verifyToken,  async(req, res)=>{
      // JWT 
      // const email = req.params.email
      const tokenEmail = req.user.email
      const email = req.params.email
      if (tokenEmail !== email){
        return res.status(403).send({message: 'forbidden access'})
      }
      const query = {email}
      const result = await bidsCollection.find(query).toArray()
      res.send(result)
    })
    // get all bid requests form db for job owner 
    app.get('/bid-requests/:email', async(req, res)=>{
      const email = req.params.email
      const query = {'buyer.email': email}
      const result = await bidsCollection.find(query).toArray()
      res.send(result)
    })

    // Update bid status
    app.patch('/bid/:id', async(req, res)=>{
      const id = req.params.id 
      const status = req.body
      const query = {_id: new ObjectId(id)}
      const updateDoc = {
        $set: status,
      }
      const result = await bidsCollection.updateOne(query, updateDoc)
      res.send(result);
    })

     // get all jobs data from pagination
     app.get('/all-jobs',async (req, res)=>{
      const size = parseInt(req.query.size)
      const page = parseInt(req.query.page) - 1
      const filter = req.query.filter
      const sort = req.query.sort
      const search = req.query.search
      console.log(size,page)

      // for category 
      let query = {
        job_title: {$regex: search, $options: 'i'}
      }
      if(filter) query.category = filter 
      // for accenting descending sorting
      let options = {}
      if(sort) options = {sort: {deadline: sort === 'asc' ? 1 : -1}}

      const result = await jobsCollection
      .find(query, options)
      .skip(page * size)
      .limit(size)
      .toArray()
      
      res.send(result)
    })

     // get all jobs data count form DB
     app.get('/jobs-count',async (req, res)=>{
      const filter = req.query.filter
      const search = req.query.search
      let query = {
        job_title: {$regex: search, $options: 'i'}
      }
      if(filter) query.category = filter 
      const count = await jobsCollection.countDocuments(query)
      res.send({count})
    })

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
