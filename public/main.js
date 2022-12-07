//Allusers Button
document.getElementById("btn-users").addEventListener('click', getUser);

function getUser(){
    fetch("http://localhost:3000/users/")
    .then((res)=> res.json())
    .then((data)=> console.log(data))
    .catch((err)=>console.log(err))
}

class main
{
    constructor(firstname,lastname,username,password,note)
    {
    this.FN=firstname;
    this.LN=lastname;
    this.UN=username;
    this.Pwd=password;
    this.Note=note;

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
    getNote()
    
    {
        return this.Note;
    }
     getUser()
     {
        return this.User;
      }
    getLoginpwd()
    {
        return this.Loginpwd;
    } 
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
    setNote(note)
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
    }
}
const login=document.getElementById("login");
if(login) login.addEventListener('submit', loginuser)
function loginuser(l){
    l.preventDefault();
    let user=document.getElementById('uname').value;
    let password=document.getElementById('password').value;
    console.log(`${user}`);
    console.log(`${password}`);
    login.reset();
}
const Noting=document.getElementById("note");
if(Noting) Noting.addEventListener('submit',notem)
function notem(f)
{
    f.preventDefault();
    let text=document.getElementById('notemaking').value;
    console.log(`${text}`);
    Noting.reset();
}
const regist=document.getElementById("Register");
if(regist) regist.addEventListener('submit',registr)
function registr(e){
    e.preventDefault();
    let f=document.getElementById('fname').value;
    let l=document.getElementById('lname').value;
    let u=document.getElementById('uname').value;
    let pass=document.getElementById('password').value;

    let reg= new main(f,l,u,pass);
    console.log(reg.FN)
    console.log(reg.LN)
    console.log(reg.UN)
    console.log(reg.Pwd)
    regist.reset();
}