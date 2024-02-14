const bodyParser=require('body-parser')
const cors=require('cors')
const express=require('express')
const mongoose=require('mongoose')


const {Restaurant,Users}=require('./schema.cjs')
const app=express()
app.use(bodyParser.json())
app.use(cors())


async function connectToDb(){
    try{
        await mongoose.connect('mongodb+srv://steve_11:2025@cluster0.qybpfpp.mongodb.net/swiggy?retryWrites=true&w=majority')
        console.log('Connection Establised')
        const port=process.env.PORT || 8000
        app.listen(port,function(){
            console.log(`Listening on port ${port}..`)
        })
    }catch(error){
        console.log(error)
        console.log('Couldn\'t Establish connection')
    }
}
connectToDb()

app.post('/add-restaurant',async function(request,response){
    try{
        await Restaurant.create({
            "areaName":request.body.areaName,
            "avgRating":request.body.avgRating,
            "costForTwo":request.body.costForTwo,
            "cuisins":request.body.cuisins,
            "name":request.body.name 
        }) 
        response.status(201).json({
            "status":"Success",
            "message":"Created successfully"
          })
      } catch(error) {
        response.status(500).json({
            "status":"Failure",
            "message":"internal server error"
        })
      }
  })

  app.get('/get-restaurant-details',async function(request,response ){
    try{
        const restaurantDetails=await Restaurant.find()
        response.status(200).json(restaurantDetails)
    }catch(error){
        response.status(500).json({
            "status":"Failure",
            "message":"could not fetch details",
            "error":error
        })
    }
  })
// delete process in the code
  app.delete('/delete-restaurant-detail/:id', async function(request, response) {
    try {
        const restaurant = await Restaurant.findById(request.params.id)
        if(restaurant) {
            await Restaurant.findByIdAndDelete(request.params.id)
            response.status(200).json({
                "status" : "success",
                "message" : "deleted successfully"
            })
        } else { //restaurant : null
            response.status(404).json({
                "status" : "failure",
                "message" : "entry not found"
            })
        }
    } catch(error) {
        response.status(500).json({
            "status" : "failure",
            "message" : "could not delete",

            "error" : error
        })
    }
})



  app.post('/create-new-user',async function(request,response){
    try{
        await Users.create({
          "userName":request.body.userName,
          "email":request.body.email,
          "password":request.body.password,
          "contact":request.body.contact
        })
        response.status(201).json({
          "status":"Success",
          "message":"Created successfully"
        })  
      }catch(error){
        response.status(500).json({
          "status":"Failure",
          "message":"internal server error"
        })
      }   
  })
  
  
  
  app.post('/validate-user',async function(request,response){
    try{
        const user=await Users.findOne({
          "email":request.body.email,
          "password":request.body.password
        })
        if(user){
          response.status(200).json({
            "message":"valid user"
          })
        }else{
          response.status(401).json({
            "message":"invalid user"
          })
        }
    }catch(error){
      response.status(500).json({
        "message":"internal server error"
  
      })
    }
  })