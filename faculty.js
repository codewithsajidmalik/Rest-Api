const express = require('express');
const router = express.Router('express');

router.get('/',(req,resp,next)=>{
    resp.status(200).json({
        msg:"This is faculty from get"
    })
})

module.exports = router;