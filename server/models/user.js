const users = [
  {
      firstname:"Ramya",
      lastname:"Kata",
      Email: "ramyakata69@gmail.com",
      password: "Taetae@69"
  },
  {
      username: "RamyaKata",
      password: "Taetae@69"
    
  },
];


const con = require("./db_connect");


async function createTable() {
let sql=`CREATE TABLE IF NOT EXISTS users (
  UserID INT NOT NULL AUTO_INCREMENT,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  Email VARCHAR(255) NOT NULL UNIQUE,
  Password VARCHAR(255) NOT NULL,
  CONSTRAINT userPK PRIMARY KEY(UserID)
); `

}
createTable();

async function login(user) { 
  console.log(user.UserID);
let cUser = await get_User(user); 

if(!cUser[0]) throw Error(user.UserID+" UserId or Email doesn't exist");
if(cUser[0].password !== user.password) throw Error("Either UserId/Email or Password is incorrect");
console.log(cUser[0]);

return cUser[0];
}
async function Register(user) {
let cUser = await get_User(user.UserID);
console.log(user)
if(cUser.length > 0) throw error("User exists");

const sql = `INSERT INTO users (firstname, lastname, UserID, password)
  VALUES ("${user.firstname}", "${user.lastname}","${user.UserID}","${user.password}");
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
      WHERE Email = "${user.Email}"
  `;
  }
  return await con.query(sql);  
  }

async function Edit_User(user) {
  let sql = `UPDATE users 
    SET Email = "${user.Email}"
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