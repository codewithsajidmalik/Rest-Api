const express = require('express');
const router = express.Router('express');
const Student = require('./models/student');
const mongoose = require('mongoose')

// middleware check_auth check tokens
const check_auth = require('./middleware/check_auth')

router.get('/',check_auth,(req,resp,next)=>{
   Student.find() 
  .then(result=>{
    resp.status(200).json({
        studentData:result
    }); 

   })
   .catch(err=>{
    console.log(err)
resp.status(500).json({
    error:err
})
   });

})

router.post('/',(req,resp,next)=>{
    // resp.status(200).json({
    //     msg:'This is post from student'
    // })
    // console.log(req.body);

    const student = new Student({
        _id:new mongoose.Types.ObjectId,
        name:req.body.name,
        course:req.body.course,
        gender:req.body.gender

    })
    student.save()
    .then(result=>{
        console.log(result);
        resp.status(200).json({
            newStudent:result
        })
    })
    .catch(err=>{
        console.log(err);
        resp.status(500).json({
            error:err
        })
    })

});
router.get('/:id',(req,resp,next)=>{
    console.log(req.params.id);
    Student.findById(req.params.id)
    .then(result=>{
        resp.status(200).json({
            student:result
        });
    
       })
       .catch(err=>{
        console.log(err)
    resp.status(500).json({
        error:err
    })
       });
})


// ******************delete request*************

router.delete('/:id',(req,resp,next)=>{
    Student.remove({_id:req.params.id})
    .then(result=>{
        resp.status(200).json({
           message:'student deleted',
           result:result
        });
    
       })
       .catch(err=>{
        console.log(err)
    resp.status(500).json({
        message:'error',      
           error:err
    })
       });
    
})

router.put('/:id',(req,resp,next)=>{
    console.log(req.params.id);
    Student.findOneAndUpdate({_id:req.params.id},{
        $set:{
            _id:new mongoose.Types.ObjectId,
            name:req.body.name,
            course:req.body.course,
            gender:req.body.gender

        }
    })
    .then(result=>{
        resp.status(200).json({
          updated_Student:result
        });
    
       })
       .catch(err=>{
        console.log(err)
    resp.status(500).json({
      //  message:'error',      
           error:err
    })
       });

})
module.exports = router;