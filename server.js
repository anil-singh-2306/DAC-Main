const app = require('./app');
const port = process.env.PORT || '8080';


app.listen(port,(err,res)=>{
    if(!err){
        
        console.log(`running on port ${process.env.PORT}`);
    }
})