const express=require('express');
const { append } = require('express/lib/response');
const router=express.Router();
const Task=require('../models/task');
const { route } = require('./user');

router.get('/tasks',async(req,res)=>{
    const tasks=await Task.find({})
    res.render('tasks',{tasks})
})

router.get('/tasks/new',(req,res)=>{
    res.render('newTask')
})

router.post('/tasks',async(req,res)=>{
    const task=new Task(req.body.task);
    await task.save();
    res.redirect(`/tasks/${task._id}`)
})

router.get('/tasks/:id',async(req,res)=>{
    const task=await Task.findById(req.params.id)
    res.render('showTask',{task})
})

router.get('/tasks/:id/edit',async(req,res)=>{ 
    const task=await Task.findById(req.params.id)
    res.render('editTask',{task})
})

router.put('/tasks/:id',async(req,res)=>{
    const {id}=req.params;
    const task=await Task.findByIdAndUpdate(id,{...req.body.task})
    res.redirect(`/tasks/${task._id}`)
})

router.delete('/tasks/:id',async(req,res)=>{
    const {id}=req.params
    await Task.findByIdAndDelete(id);
    res.redirect('/tasks');
})


module.exports=router;