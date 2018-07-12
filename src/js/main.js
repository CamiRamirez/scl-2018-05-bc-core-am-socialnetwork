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
  	containerCrearcuenta.classList.add('divDisplayNone');
  	containerMuro.classList.remove('divDisplayNone');
  	containerMuro.classList.add('divDisplayBlock');
  }

//Iniciar seción a traves de correo
function singIn(){
		login.classList.add('divDisplayBlock');
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
		login.classList.add('divDisplayBlock');
		containerMuro.classList.remove('divDisplayNone');
		containerMuro.classList.add('divDisplayBlock');
}	

