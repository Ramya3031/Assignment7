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
  
  let logout = document.getElementById("logout-btn");
  if(logout) logout.addEventListener('click', removeCurrentUser)
  
  //Allusers Button
  //document.getElementById("btn-users").addEventListener('click', get_AllUsers);
  
  // stateful mechanism for user
  // logging in a user
  function setCurrentUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
    window.location.href = "note.html";
  }
  
  // getting current user function
  function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
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
class user
{
    constructor(firstname,lastname,username,password)
    {
    this.FN=firstname;
    this.LN=lastname;
    this.UN=username;
    this.Pwd=password;

    }
    getFN(){
        return this.FN;
    }
    getLN(){
        return this.LN;
    }
    getUN(){
        return this.UN;
    }
    getPwd()
    {
        return this.Pwd;
    }
    /*get_Note()
    
    {
       return this.Note;
    }
    get_AllUsers()
      {
      return this.User;
      }
    getLoginpwd()
    {
       return this.Loginpwd;
    } */
    setFN(firstname){
        this.FN=firstname;
    }
    setLN(lastname){
        this.LN=lastname;
    }      
    setUN(username){
        this.UN=username;
    }
    setPwd(password)
    {
        this.Pwd=password;
    }
    /*setNote(note)
    {
        this.Note=note;
    }
    setUser(user)
    {
        this.User=user;
    }
    setLoginpwd(pwd)
    {
        this.Loginpwd=pwd;
    } */
}
class note{
    constructor(note_text){
      this.notes= note_text;
    }zzxs
    setnotes(note_text)
    {
      this.notes=note_text;
    }
    getnotes(){
      return this.notes;
    }
  }
const Create_login=document.getElementById("login");
if(Create_login) Create_login.addEventListener('submit', login)
function login(l){
    l.preventDefault();
    let usr=document.getElementById('uname').value;
    let pa=document.getElementById('password').value;
    let luser=new main();
	luser.setUN(`${usr}`);
	luser.setPwd(`${pa}`);
	fetchData("/users/login",{"usr":usr,"pa":pa},"POST").then((data) => {
	setCurrentUser(data);
    console.log(data);
    window.location.href ="note.html";
})
.catch((err) =>{
  let p = document.querySelector('error');
  p.innerHTML = err.message;
});
Create_login.reset();
}
let user= getCurrentUser()
const Noting=document.getElementById("note").value;
if(Noting) Noting.addEventListener('submit',notem)
function notem(r)
{
    r.preventDefault();
    let text=document.getElementById('notemaking').value;
    let notetaking= new note(text);
    notetaking.userID= user.userID;
fetchData("/notes/create",notetaking,"POST").then((data) => {
    alert("added");
    window.location.href = "note.html";
  })
  .catch((err)=> {
    let p = document.querySelector('.error');
    p.innerHTML = err.message;
  })
  console.log(`${text}`);
    noteform.reset();
}
let notes = document.querySelector('notes');
if(notes&&getCurrentUser()){
  let user= getCurrentUser();
  notes.innerHTML = `
    <ul>
  `
  fetch("http://localhost:3000/notes/")
  .then((res)=> res.json())
  .then((data) => {
    for (const note in data) {
      console.log(data[note]+" "+user.UserID);
      if (data[note].UserID==user.UserID) {
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
const regist=document.getElementById("Register");
if(regist) regist.addEventListener('submit',registr)
function registr(e){
    e.preventDefault();
    let f=document.getElementById('FN').value;
    let l=document.getElementById('LN').value;
    let u=document.getElementById('UN').value;
    let pass=document.getElementById('Pwd').value;
	
	let reg= new main(f,l,u,pass);
   fetchData("/users/register",reg,"POST").then((data) => {
    setCurrentUser(data);
    window.location.href = "Note.html";
  })
  .catch((err) =>{
    let p = document.querySelector('error');
    p.innerHTML = err.message;
  });

    console.log(reg.getFN())
    console.log(reg.getLN())
    console.log(reg.getUN())
    console.log(reg.getPwd())
   regist.reset();
}