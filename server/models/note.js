const con = require("./db_connect");

// Table Creation 
async function createTable() {
  let sql=`CREATE TABLE IF NOT EXISTS notes (
    NoteId INT NOT NULL ,
    NoteContent VARCHAR(255),
    UserID INT NOT NULL,
    CONSTRAINT notePK PRIMARY KEY(NoteId),
    CONSTRAINT notefk FOREIGN KEY(UserID) REFERENCES users(UserID)
  ); `
  await con.query(sql);
}
createTable();

// grabbing all notes in database
async function getAllNotes() {
    const sql = `SELECT * FROM notes;`;
    let notes = await con.query(sql);
    console.log(notes)
    return notes;
  }

  async function getNotes(note) {
    let sql;
    
    sql = `
      SELECT * FROM notes
       WHERE UserID = ${note.UserID}
    `
  
  return await con.query(sql);   
 }

 //create notes function
async function Create_Note(note){
    let Note1= await getNotes(note);
    let sql = `INSERT INTO notes (UserID, NoteContent)
      VALUES ("${note.UserID}", "${note.NoteContent}");
    `
let data =  await con.query(sql);
 return {success:"Note Content is created;)"};
}
// Update notes function
async function Edit_Notes(note){
    let sql = `UPDATE notes
    SET NoteContent = "${note.NoteContent}"
    WHERE NoteId = ${note.NoteId}
  `;
  
  await con.query(sql);
  let updatedNote = await getNotes(NoteContent);
  return updatedNote[0]; 
}
// Delete notes function
async function Delete_Notes(note){
    let sql = `DELETE FROM notes
      WHERE NoteId = "${note.NoteId}"
    `;
    return await con.query(sql);
} 
module.exports = { getAllNotes, getNotes, Create_Note, Edit_Notes, Delete_Notes};