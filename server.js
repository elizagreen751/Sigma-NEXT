import express from 'express';
import cors from 'cors';
// Create express applicaton
const app = express();
app.use(express.json())
app.use(cors()) //cors is a configuration that prevents cors error -- when server does not allow outside enterance via other server
let customer_input="Avitel"
// Process GET requests for /myname resource
app.get("/myname", getMyName)

function getMyName(req, res) {
    console.log("request body is" + req.body)
    // Return object in JSON notation back
    res.json({ name: customer_input })
}
//Process post requsests to /mynmw NS Acw rhw sR
// Start accepting connections on port 3000
app.post("/myname",saveMyName)
function saveMyName(req,res){
    console.log(req['body']['name'])
    customer_input=req['body']['name']
}
app.listen(3000)