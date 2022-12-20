const con = require("./db_connect");


async function createTable() {
let sql=`CREATE TABLE IF NOT EXISTS NoteContent (
  NoteId INT NOT NULL AUTO_INCREMENT,
  Username VARCHAR(255) NOT NULL UNIQUE,
  NoteContent VARCHAR(255) NOT NULL,
  CONSTRAINT notePK PRIMARY KEY(NoteId)
); `
await con.query(sql);
}
createTable();

async function create(NoteContent) {

let sql = `INSERT INTO NoteContent (Username, NoteContent)
  VALUES ("${note.Username}","${note.NoteContent}");
`

await con.query(sql);
return {success:"Note Content is updated;)"};
}


async function get_AllNotesContent() {
 const sql = "SELECT * FROM Note;";
 let NoteContent = await con.query(sql);
 console.log(Notes)
 return Notes;
}
//get_AllNotesContent()

async function get_Note(NoteContent) {
  let sql;
  
    sql = `
      SELECT * FROM note
       WHERE NoteId = ${note.NoteId}
    `
  
  return await con.query(sql);  
  }
  async function Delete_Notes(NoteContent) {
    let sql = `DELETE FROM note
      WHERE NoteId = "${note.NoteId}"
    `;
    return await con.query(sql);
    }
async function Edit_Notes(NoteContent) {
  let sql = `UPDATE note
    SET NoteContent = "${note.NoteContent}"
    WHERE NoteId = ${note.NoteId}
  `;
  
  await con.query(sql);
  let updatedNote = await get_Note(NoteContent);
  return updatedNote[0];
  }

module.exports = { get_AllNotesContent, get_Note, create, Edit_Notes, Delete_Notes};