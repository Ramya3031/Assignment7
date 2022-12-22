async function fetchData(route = '', data = {}, methodType) {
    const response = await fetch(`http://localhost:3000${route}`, {
      method: methodType, 
      mode: 'cors', 
      cache: 'no-cache', 
      credentials: 'same-origin', 
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', 
      referrerPolicy: 'no-referrer',  
      body: JSON.stringify(data)
    });
    if(response.ok) {
      return await response.json();
    } else {
      throw await response.json();
    }
  } 
  //logout button
  let logout = document.getElementById("logout-btn");
  if(logout) logout.addEventListener('click', removeCurrentUser);

   // getting current user function
   function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
  
// logging in a user
 function setCurrentUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
    window.location.href = "Note.html";
  }
// logout function for current user
function removeCurrentUser() {
    localStorage.removeItem('user');
    window.location.href = "login.html";
  }
  function get_User(){
    fetch("http://localhost:3000/users/")
    .then((res)=> res.json())
    .then((data)=> console.log(data))
    .catch((err)=>console.log(err))
}
class User {
    constructor(firstname,lastname,username,password){
        this.fname=firstname;
        this.lname=lastname;
        this.uname=username;
        this.password=password;
    }
    getfirstname(){
        return this.fname;
    }
    getlastname(){
        return this.lname;
    }
    getusername(){
        return this.uname;
    }
    getpassword(){
        return this.password;
    }
    setfirstname(firstname){
        this.fname=firstname;
    }
    setlastname(lastname){
        this.lname=lastname;
    }
    setusername(username){
        this.uname=username;
    }
    setpassword(password){
        this.password=password;
    }
}
class Note{
    constructor(note_text){
        this.notemaking=note_text;
    }
    getnotemaking(){
        return this.notemaking;
    }
    setnotemaking(){
        this.notemaking=note_text;
    }
}

let loginform = document.getElementById("login");
if(loginform) loginform.addEventListener('submit',Create_login);

function Create_login(e){
    e.preventDefault();
    let usr=document.getElementById('uname').value;
    let pa=document.getElementById('password').value;
    let luser=new User(usr,pa);
    fetchData("/users/login",luser,"POST").then((data) => {
        setCurrentUser(data);
        window.location.href = "Note.html";
      })
      .catch((err) =>{
        let p = document.querySelector('error');
        p.innerHTML = err.message;
        alert("Incorrect username or password");
      });
      loginform.reset();
}

let registerform = document.getElementById("Register");
if(registerform) registerform.addEventListener('submit',Create_register);
function Create_register(e){
    e.preventDefault();
    let f=document.getElementById('fname').value;
    let l=document.getElementById('lname').value;
    let u=document.getElementById('uname').value;
    let pass=document.getElementById('password').value;
    let registration = new User(f,l,u,pass);
    fetchData("/users/Register",registration,"POST").then((data) => {
        setCurrentUser(data);
        alert("registration Done..!!!");
        window.location.href = "Note.html";
      })
      .catch((err) =>{
        let p = document.querySelector('error');
       // p.innerHTML = err.message;
        alert("Registration Failed :|");
      });
      //console.log(registerform.getfirstname())
      //console.log(registerform.getlastname())
      //console.log(registerform.getusername())
      //console.log(registerform.getpassword())
      registerform.reset();
}

let noteform = document.getElementById("note");
if(noteform) noteform.addEventListener('submit',Create_notes);

function Create_notes(e){
   e.preventDefault();
    let text=document.getElementById('notemaking').value;
    let notetaking= new Note(text);
    fetchData("/notes/Create_Note",notetaking,"POST").then((data) => {
        alert("added");
        window.location.href = "Note.html";
      })
      .catch((err)=> {
        let p = document.querySelector('.error');
        //p.innerHTML = err.message;
      })
}
let notes = document.querySelector('notes');
let user=getCurrentUser();
if(notes&&user){
  notes.innerHTML = `
    <ul>
  `
  fetch("http://localhost:3000/notes/")
  .then((res)=> res.json())
  .then((data) => {
    for (const note in data) {
      console.log(data[note]+" "+user.NoteId);
      if (data[note].NoteId==user.NoteId) {
        notes.innerHTML = notes.innerHTML+`
          <li>${data[note].note}</li>
        `
      }
    }
  })
   .catch((err)=> {
    let p = document.querySelector('notes');
    p.innerHTML = err.message;
  })
 notes.innerHTML = notes.innerHTML+`
    </ul>
  `
} else {
  if(notes) window.location.href = "login.html";
}