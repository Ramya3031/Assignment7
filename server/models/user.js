const con = require("./db_connect");

// Table Creation 
async function createTable() {
    let sql=`CREATE TABLE IF NOT EXISTS users (
        UserID INT NOT NULL ,
        firstname VARCHAR(255) NOT NULL,
        lastname VARCHAR(255) NOT NULL,
        Username VARCHAR(255) NOT NULL UNIQUE,
        Password VARCHAR(255) NOT NULL,
        CONSTRAINT userPK PRIMARY KEY(UserID)
      ); `
  await con.query(sql);
}
createTable();

// grabbing all users in database
async function getAllUsers() {
    const sql = `SELECT * FROM users;`;
    let users = await con.query(sql);
    console.log(users)
    return users;
  }
  
  // Create  User - Registering
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
  
  // Read User -- login user
  async function login(user) { 
    console.log(user.Username);
  let cUser = await get_User(user); 
  
  if(!cUser[0]) throw Error(user.Username+" UserId or Email doesn't exist");
  if(cUser[0].password !== user.password) throw Error("Either UserId/Email or Password is incorrect");
  console.log(cUser[0]);
  
  return cUser[0];
}
  
  // Update User function
  async function Edit_User(user) {
    let sql = `UPDATE users 
      SET Username = "${user.Username}"
      WHERE UserID = ${user.UserID}
    `;
    
    await con.query(sql);
    let updatedUser = await get_User(user);
    return updatedUser[0];
}
  
  // Delete User function
  async function Delete_User(user) {
    let sql = `DELETE FROM users
      WHERE UserID = ${user.UserID}
    `
    await con.query(sql);
}
  
  // Useful Functions
  async function get_User(user) {
    let sql;
    
    if(user.UserID) {
      sql = `
        SELECT * FROM users
         WHERE UserID = ${user.UserID}
      `
    } else {
      sql = `
      SELECT * FROM users 
        WHERE Username = "${user.Username}"
    `;
    }
    return await con.query(sql);  
    }
  
  module.exports = { getAllUsers, login, Register, Edit_User, Delete_User};