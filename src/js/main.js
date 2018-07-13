window.onload = ()=>{
  firebase.auth().onAuthStateChanged(function(user) {
if (user) {
 //si esta logueado
  console.log('usuario existente')
  console.log("user >"+JSON.stringify(user));
} else {
  //no esta logueado
  console.log('usuario no existente')
}
});

}

/*Barra lateral */
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

//ocultar login al apretar boton registrar y mostar registro
function registry(){
login.classList.add('divDisplayNone');
containerCrearcuenta.classList.remove('divDisplayNone');
containerCrearcuenta.classList.add('divDisplayBlock');
}

//Registro Nuevos Usuarios	
function registryUser(){
containerCrearcuenta.classList.remove('divDisplayBlock');
containerCrearcuenta.classList.add('divDisplayNone');
  containerMuro.classList.remove('divDisplayNone');
  containerMuro.classList.add('divDisplayBlock');
let emailRegistry = registryEmail.value;
let passwordRegistry = registryPassword.value;
  console.log(emailRegistry);
  console.log(passwordRegistry);
  firebase.auth().createUserWithEmailAndPassword(emailRegistry, passwordRegistry)
  .catch(function(error) {
    let errorCode = error.code;
    let errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
});
  
}

//Iniciar seción usuario registrado
function singIn(){

  login.classList.add('divDisplayNone');
  containerMuro.classList.remove('divDisplayNone');
  containerMuro.classList.add('divDisplayBlock');
let validarMail = exampleInputEmail1.value;
let valiarPassword = exampleInputPassword1.value;
if (/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(validarMail)) {
  alert("correcto");
}else{
  alert("incorrecto");
}
  console.log(validarMail);
  console.log(valiarPassword);
firebase.auth().signInWithEmailAndPassword(validarMail, valiarPassword)
  .then(()=>{
    console.log("usuarioExistente");
  })
  .catch(function(error) {
      let errorCode = error.code;
       let errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
});
  
}

//Ingreso Usuario Facebook
function loginFacebook(){
const provider = new firebase.auth.FacebookAuthProvider();
//provider.addScope(""); hay que pedir permiso a facebook
provider.setCustomParameters({
  'display' : 'popup'
});
firebase.auth().signInWithPopup(provider)
.then(()=>{
  console.log("login con facebook");
})
.catch((error)=>{
  console.log("error de firebase"+error.code);
  console.log("error de firebase, mensaje "+error.message);
});
  login.classList.add('divDisplayNone');
  containerMuro.classList.remove('divDisplayNone');
  containerMuro.classList.add('divDisplayBlock');
}	

// Ingressando con google
function loginGoogle(){
const provider = new firebase.auth.GoogleAuthProvider();
 provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
 firebase.auth().languageCode = 'pt';
provider.setCustomParameters({
    'login_hint': 'user@example.com'
});
 firebase.auth().signInWithPopup(provider)
 .then((result)=> {
  let token = result.credential.accessToken;
  let user = result.user;
})
 .catch((error)=> {
 console.log("error de firebase"+error.code);
console.log("error de firebase, mensaje "+error.message);
});
firebase.auth().signInWithRedirect(provider);
firebase.auth().signOut().then(function() {

}).catch((error)=> {

});
}


//MURO CON COMENTARIOS

// Firebase Database
// Usaremos una colección para guardar los mensajes, llamada messages
function sendMessage(){
  const currentUser = firebase.auth().currentUser;
  const messageAreaText = messageArea.value;
  const displayName = registryName.value;
  const heart =  document.createElement("i");
  heart.classList.add('fas', 'fa-heart', 'heart'); 

  
  //Para tener una nueva llave en la colección messages
  const newMessageKey = firebase.database().ref().child('messages').push().key;

  
  firebase.database().ref(`messages/${newMessageKey}`).set({
      creator : currentUser.uid,
      creatorName : currentUser.displayName || currentUser.email,
      text : messageAreaText,
      icon : heart,
  });
  }             

firebase.database().ref('messages')
.limitToLast(5) //filtro para no obtener todos los mensajes
.once('value')
.then((messages)=>{
  console.log("Mensajes >"+ JSON.stringify(messages));
})
.catch(()=>{

});


//Llamando a los mensajes  para que aparezcan cada vez que recargue la pagina


  firebase.database().ref('messages')
      .limitToLast(8) //muestra solo los ultimos 8 mensajes como historial al recargar la pagina
      .on('child_added', (newMessage)=>{
          messageContainer.innerHTML += `
              <div style="border:1px solid gray; margin: 7%; border-radius:4px; background-color:white"><p style="margin-left:0.5em; color:#9B369D;">${newMessage.val().creatorName} ha comentado:</p>
              <p style="margin-left:0.5em;">${newMessage.val().text}</p>

              </div>
          `;
      });

// Firebase Database
// Usaremos una colección para guardar los mensajes, llamada messages
function sendMessage(){
const currentUser = firebase.auth().currentUser;
const messageAreaText = messageArea.value;
const displayNames = registryName.value;

//Para tener una nueva llave en la colección messages
const newMessageKey = firebase.database().ref().child('messages').push().key;


firebase.database().ref(`messages/${newMessageKey}`).set({
    creator : currentUser.uid,
    creatorName : currentUser.displayName || currentUser.email,
    text : messageAreaText
});
}             


window.onload = () => {
  openPerfil();
  openQuienesSomos();
  openNav();
  closeNav();

  //aqui va nombre de la funcion

}


function openPerfil() {
  const btnPerfil = document.getElementById('perfil').addEventListener ('click', () => {
    document.getElementById("containerMuro").style.display="none";
    document.getElementById("containerQuienesSomos").style.display="none";
    document.getElementById("containerPerfil").style.display="block";
    //id container .style.display="none";
  });
}

function openQuienesSomos() {
  const btnPerfil = document.getElementById('quienesSomos').addEventListener ('click', () => {
    document.getElementById("containerMuro").style.display="none";
    document.getElementById("containerPerfil").style.display="none";
    document.getElementById("containerQuienesSomos").style.display="block";
    //id container .style.display="none";
  });
}
