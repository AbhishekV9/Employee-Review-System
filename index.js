const express=require("express");
const app =express();
const port=process.env.PORT || 8000 ;




app.listen(port,function(err){
    if(err){
        console.log("ERROR in connectiong to the server");
    }
    console.log(`Server is running on port ${port}`);
})