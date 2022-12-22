const express = require('express');
const Note = require('../models/note');
const router = express.Router();

router
.get('/getAllNotes', async (req, res) => {
    try {
        const notetake = await Note.getAllNotes();
        res.send(notetake);
      } catch(err) {
        res.status(401).send({message: err.message});
      }
})

.post('/getNotes', async (req,res) => {
    try {
        let notetake = await Note.getNotes(req.body);
        res.send(notetake)
      } catch(err) {
        res.status(401).send({message: err.message});
      }
})

.post('/Create_Note', async (req,res) => {
    try {
        let notetake = await Note.Create_Note(req.body);
        res.send({...notetake})
      } catch(err) {
        res.status(401).send({message: err.message});
      }
})

.post('Edit_Notes', async (req,res) => {
    try {
        let notetake = await Note.Edit_Notes(req.body);
        res.send({...notetake});
      } catch(err) {
        res.status(401).send({message: err.message})
      }
})

.post('Delete_Notes', async (req,res) => {
    try {
        Note.Delete_Notes(req.body);
        res.send({success: "Given Notes is deleted"})
        } catch(err) {
        res.status(401).send({message: err.message})
        }
})
module.exports = router;