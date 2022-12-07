const express = require('express');
const User = require('../models/user');
const router = express.Router();

router
.post('/login', async (req, res) => {
  try {
    let user = await User.login(req.body);
    res.send({...user, password: undefined})
  } catch(err) {
    res.status(401).send({message: err.message});
  }
})
.post('/Register', async (req, res) => {
  try {
    let user = await User.Register(req.body);
    res.send({...user, password: undefined})
  } catch(err) {
    res.status(401).send({message: err.message});
  }
})
  .get('/get_AllUsers', async (req, res) => {
    try {
      const users = await User.get_AllUsers();
      res.send(users);
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })
  .put('/Edit_User', async (req, res) => {
    try {
      let user = await User.Edit_User(req.body);
      res.send({...user, password: undefined});
    } catch(err) {
      res.status(401).send({message: err.message})
    }
  })


  .delete('/Delete_User', async (req, res) => {
    try {
      User.Delete_User(req.body);
      res.send({success: "User is deleted successfully"})
    } catch(err) {
      res.status(401).send({message: err.message})
    }
  })



  
module.exports = router;