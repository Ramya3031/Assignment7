const express = require('express');
const Note = require('../models/note');
const router = express.Router();

router
.post('/create', async (req, res) => {
    try {
      let note = await Note.create(req.body);
      res.send({...note})
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })
  .get('/get_AllNotesContent', async (req, res) => {
    try {
      const note = await Note.get_AllNotesContent();
      res.send(note);
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })
  .get('/get_Note', async (req, res) => {
    try {
      let NoteContent = await Note.get_Note(req.body);
      if(NoteContent["0"]){
        res.send({...NoteContent})
      }else{
        res.send({error:"NoteID is not valid"});
      }
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })
  .get('/get_NoteByUser', async (req, res) => {
    try {
      let note = await Note.get_NoteByUser(req.body);
      if(note["0"]){
        res.send({...note})
      }else{
        res.send({error:"User does not have any notes"});
      }
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })


  .delete('/Delete_Notes', async (req, res) => {
    try {
    Note.Delete_Notes(req.body);
    res.send({success: "Given Notes is deleted"})
    } catch(err) {
    res.status(401).send({message: err.message})
    }
})

  .put('/Edit_Notes', async (req, res) => {
    try {
      let note = await Note.Edit_Notes(req.body);
      res.send({...note});
    } catch(err) {
      res.status(401).send({message: err.message})
    }
  })


  
module.exports = router;