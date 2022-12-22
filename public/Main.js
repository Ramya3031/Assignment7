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
    constructor(firstname1,lastname1,username1,password1){
        this.firstname=firstname1;
        this.lastname=lastname1;
        this.Username=username1;
        this.Password=password1;
    }
    getfirstname(){
        return this.firstname;
    }
    getlastname(){
        return this.lastname;
    }
    getUsername(){
        return this.Username;
    }
    getPassword(){
        return this.Password;
    }
    setfirstname(firstname1){
        this.firstname=firstname1;
    }
    setlastname(lastname1){
        this.lastname=lastname1;
    }
    setUsername(username1){
        this.Username=username1;
    }
    setPassword(password1){
        this.Password=password1;
    }
}
class Note{
    constructor(note_text){
        this.NoteContent=note_text;
    }
    getNoteContent(){
        return this.NoteContent;
    }
    setNoteContent(note_text){
        this.NoteContent=note_text;
    }
}

let loginform = document.getElementById("login");
if(loginform) loginform.addEventListener('submit',Create_login);

function Create_login(e){
    e.preventDefault();
    let usr=document.getElementById('Username').value;
    let pa=document.getElementById('Password').value;
    let luser=new User(null,null,usr,pa);
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
    let f=document.getElementById('firstname').value;
    let l=document.getElementById('lastname').value;
    let u=document.getElementById('Username').value;
    let pass=document.getElementById('Password').value;
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

/*
let user=getCurrentUser();
let noteform = document.getElementById("note");
if(noteform) noteform.addEventListener('submit',Create_notes);

function Create_notes(e){
   e.preventDefault();
    let text=document.getElementById('NoteContent').value;
    let notetaking= new Note(text);
    notetaking.UserID = user.UserID;
    fetchData("/notes/Create_Note",notetaking,"POST")
    .then((data) => {
      setCurrentUser(data);
        alert("added");
        window.location.href = "Note.html";
      })
      .catch((err)=> {
        let p = document.querySelector('.error');
        //  p.innerHTML = err.message;
      })
}


if(user&&noteform) getAllNotes();

function getAllNotes(){
  let text1=document.getElementById('NoteContent');
  fetchData("/notes/getNotes",user,"POST")
    .then((data) => {
 //console.log(data);
 for(let i=0;i<data.length;i++){
 text1.value='\n'+data[i].NoteContent;
 }


    })
}
*/

/*
let notes = document.querySelector('NoteContent');
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
}*/ 
let user = getCurrentUser();
const note1=document.getElementById("note");
if(note1) note1.addEventListener('submit',funnote)

function funnote(e)
{
  e.preventDefault()
  
  let note=document.getElementById("NoteContent").value;
  const user1=new Note(note);
  console.log(user1);






  user1.UserID = user.UserID;

    fetchData("/notes/Create_Note", user1 , "POST")

  .then((data) => {

    setCurrentUser(data);

    console.log(data);

   

  })

  .catch((err) =>{

    let p = document.querySelector('.error');

    p.innerHTML = err.message;
    

  })

  window.location.reload();

}
const notesBtn=document.getElementById("notes-btn");
if(notesBtn)notesBtn.addEventListener('click',getNotes);


if(user && note1) getNotes();


function getNotes(){
  let Note= document.getElementById("NoteContent");
  fetchData("/notes/getNotes",user,"POST")
  .then((data) => {
    console.log(data);
 for(let i=0;i<data.length;i++){
 Note.value='\n'+data[i].NoteContent
 }

    })
    
 }