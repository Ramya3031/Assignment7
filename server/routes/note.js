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
  .get('/AllNotesContent', async (req, res) => {
    try {
      const NoteContent = await Note.get_AllNotesContent();
      res.send(NoteContent);
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })
  .get('/NotesById', async (req, res) => {
    try {
      let note = await Note.get_NoteById(req.body);
      if(note["0"]){
        res.send({...note})
      }else{
        res.send({error:"NoteID is not valid"});
      }
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })

  .delete('/delete', async (req, res) => {
    try {
    Note.Delete_Notes(req.body);
    res.send({success: "Given Notes is deleted"})
    } catch(err) {
    res.status(401).send({message: err.message})
    }
})

  .put('/edit', async (req, res) => {
    try {
      let note = await Note.Edit_Notes(req.body);
      res.send({...note});
    } catch(err) {
      res.status(401).send({message: err.message})
    }
  })


  
module.exports = router;