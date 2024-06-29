document.getElementById('signInButton').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        // Signed in 
        var user = userCredential.user;
        window.close(); // Close the sign-in tab
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
  });
  