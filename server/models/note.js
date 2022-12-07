const con = require("./db_connect");


async function createTable() {
let sql=`CREATE TABLE IF NOT EXISTS NoteContent (
  NoteId INT NOT NULL AUTO_INCREMENT,
  UserId INT NOT NULL AUTO_INCREMENT,
  NoteContent VARCHAR(255) NOT NULL,
  CONSTRAINT notePK PRIMARY KEY(NoteId)
); `

}
createTable();

async function create(note) {

const sql = `INSERT INTO NoteContent (UserId, NoteContent)
  VALUES ("${note.UserId}","${note.NoteContent}");
`

await con.query(sql);
return {success:"Note Content is updated"};
}


async function get_AllNotesContent() {
 const sql = "SELECT * FROM NoteContent;";
 let NoteContent = await con.query(sql);
 console.log(NoteContent)
 return NoteContent;
}


async function get_Note(note) {
  let sql;
  
    sql = `
      SELECT * FROM NoteContent
       WHERE NoteId = ${note.NoteId}
    `
  
  return await con.query(sql);  
  }
  async function Delete_Notes(note) {
    let sql = `DELETE FROM NoteContent
      WHERE NoteId = ${note.NoteId}
    `
    await con.query(sql);
    }
async function Edit_Notes(note) {
  let sql = `UPDATE NoteContent
    SET NoteContent = "${note.NoteContent}"
    WHERE NoteId = ${note.NoteId}
  `;
  
  await con.query(sql);
  let updatedNote = await get_Note(NoteContent);
  return updatedNote[0];
  }

module.exports = { get_AllNotesContent, get_Note, create, Edit_Notes, Delete_Notes};