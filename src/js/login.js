window.onload = () => {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      //si esta logueado
      console.log('usuario existente')
      console.log("user >" + JSON.stringify(user));
    } else {
      //no esta logueado
      console.log('usuario no existente')
    }
  });

}


//ocultar login al apretar boton registrar y mostar registro
function registry() {
  login.classList.add('divDisplayNone');
  containerCrearcuenta.classList.remove('divDisplayNone');
  containerCrearcuenta.classList.add('divDisplayBlock');
}

//Registro Nuevos Usuarios	

const btnIniciar = document.getElementById('btnregister').addEventListener('click', () => {

  let emailRegistry = registryEmail.value;
  let passwordRegistry = registryPassword.value;
  let nameRegistry = registryName.value;
  console.log(emailRegistry);
  console.log(passwordRegistry);
  firebase.auth().createUserWithEmailAndPassword(emailRegistry, passwordRegistry)
    .then(() => {
      containerCrearcuenta.classList.remove('divDisplayBlock');
      containerCrearcuenta.classList.add('divDisplayNone');
      containerMuro.classList.remove('divDisplayNone');
      containerMuro.classList.add('divDisplayBlock');
    })
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });

})

//Iniciar seción usuario registrado
const btnSingIn = document.getElementById('btnSingIn').addEventListener('click', () => {
  let validarMail = exampleInputEmail1.value;
  let valiarPassword = exampleInputPassword1.value;
  if (/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(validarMail)) {
    firebase.auth().signInWithEmailAndPassword(validarMail, valiarPassword)
      .then(() => {
        console.log("usuarioExistente");
        login.classList.add('divDisplayNone');
        containerMuro.classList.remove('divDisplayNone');
        containerMuro.classList.add('divDisplayBlock');
      })
      .catch(function (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
    alert("correcto");
  } else {
    alert("incorrecto");
  }
  console.log(validarMail);
  console.log(valiarPassword);
})

//Ingreso Usuario Facebook
const btnFacebook = document.getElementById('facebook').addEventListener('click', () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  //provider.addScope(""); hay que pedir permiso a facebook
  provider.setCustomParameters({
    'display': 'popup'
  });
  firebase.auth().signInWithPopup(provider)
    .then(() => {
      console.log("login con facebook");
      login.classList.add('divDisplayNone');
      containerMuro.classList.remove('divDisplayNone');
      containerMuro.classList.add('divDisplayBlock');
    })
    .catch((error) => {
      console.log("error de firebase" + error.code);
      console.log("error de firebase, mensaje " + error.message);
    });

})


// Ingressando con google
function loginGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  firebase.auth().languageCode = 'pt';
  provider.setCustomParameters({
    'login_hint': 'user@example.com'
  });
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      let token = result.credential.accessToken;
      let user = result.user;
    })
    .catch((error) => {
      console.log("error de firebase" + error.code);
      console.log("error de firebase, mensaje " + error.message);
    });
  firebase.auth().signInWithRedirect(provider);
  firebase.auth().signOut().then(function () {

  }).catch((error) => {

  });
}




