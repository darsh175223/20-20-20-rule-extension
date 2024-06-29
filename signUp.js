document.getElementById('signUpButton').addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
  
    if (!name || !email || !password || !confirmPassword) {
      document.getElementById('errorMessage').textContent = "Please fill in all fields.";
      highlightEmptyFields();
      return;
    }
  
    if (password !== confirmPassword) {
      document.getElementById('errorMessage').textContent = "Passwords do not match.";
      highlightEmptyFields();
      return;
    }
  
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        user.updateProfile({
          displayName: name
        }).then(() => {
          window.close(); // Close the sign-up tab
        });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        document.getElementById('errorMessage').textContent = errorMessage;
      });
  });
  
  function highlightEmptyFields() {
    document.querySelectorAll('input').forEach(input => {
      if (!input.value) {
        input.style.border = '1px solid red';
      } else {
        input.style.border = '';
      }
    });
  }
  