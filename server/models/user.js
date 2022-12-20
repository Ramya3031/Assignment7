const con = require("./db_connect");


async function createTable() {
let sql=`CREATE TABLE IF NOT EXISTS users (
  UserID INT NOT NULL AUTO_INCREMENT,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  Username VARCHAR(255) NOT NULL UNIQUE,
  Password VARCHAR(255) NOT NULL,
  CONSTRAINT userPK PRIMARY KEY(userID)
); `
await con.query(sql);
}
createTable();

async function login(user) { 
  console.log(user.Username);
let cUser = await get_User(user); 

if(!cUser[0]) throw Error(user.Username+" UserId or Email doesn't exist");
if(cUser[0].password !== user.password) throw Error("Either UserId/Email or Password is incorrect");
console.log(cUser[0]);

return cUser[0];
}
//login(users[0]);

async function Register(user) {
let cUser = await get_User(user.Username);
console.log(user)
if(cUser.length > 0) throw error("User exists");

const sql = `INSERT INTO users (firstname, lastname, Username, password)
  VALUES ("${user.firstname}", "${user.lastname}","${user.Username}","${user.password}");
`
await con.query(sql);
return await login(user);
}


async function get_AllUsers() {
 const sql = "SELECT * FROM users;";
 let users = await con.query(sql);
 console.log(users)
 return users;
}


async function get_User(user) {
  let sql;
  
  if(user.userID) {
    sql = `
      SELECT * FROM users
       WHERE userID = ${user.userID}
    `
  } else {
    sql = `
    SELECT * FROM users 
      WHERE Username = "${user.Username}"
  `;
  }
  return await con.query(sql);  
  }

async function Edit_User(user) {
  let sql = `UPDATE users 
    SET Username = "${user.Username}"
    WHERE userID = ${user.userID}
  `;
  
  await con.query(sql);
  let updatedUser = await get_User(user);
  return updatedUser[0];
  }
async function Delete_User(user) {
  let sql = `DELETE FROM users
    WHERE userID = ${user.userID}
  `
  await con.query(sql);
  }


module.exports = {get_AllUsers, login, Register, Edit_User, Delete_User};