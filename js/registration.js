let firstNameTextBox = document.getElementById("firstNameTextBox")
let lastNameTextBox = document.getElementById("lastNameTextBox")
let emailTextBox = document.getElementById("emailTextBox")
let passwordTextBox = document.getElementById("passwordTextBox")
let cityTextBox = document.getElementById("cityTextBox")
let stateTextBox = document.getElementById("stateTextBox")
let weightTextBox = document.getElementById("weightTextBox")
let ageTextBox = document.getElementById("ageTextBox")
let feetTextBox = document.getElementById("feetTextBox")
let inchesTextBox = document.getElementById("inchesTextBox")

//line change on github
firebase.auth().onAuthStateChanged(function(user){
  if(user) {
    alert('Please log out before registering a new account')
  }else{
    let registerBtn = document.getElementById("registerBtn")
    let database = firebase.database()
    let usersRef = database.ref('users')


    registerBtn.addEventListener('click', function(e) {
      e.preventDefault();
      let email = emailTextBox.value
      let password = passwordTextBox.value
      let firstName = firstNameTextBox.value
      let lastName = lastNameTextBox.value
      let city = cityTextBox.value
      let state = stateTextBox.value
      let weight = weightTextBox.value
      let age = ageTextBox.value
      let feet = feetTextBox.value
      let inches = inchesTextBox.value

      let weightInt = parseInt(weight,10)
      let ageInt = parseInt(age,10)
      let feetInt = parseInt(feet,10)
      let inchesInt = parseInt(inches,10)

      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function(response){
        console.log('uid', response.user.uid)
        let userRef = usersRef.child(response.user.uid)
        userRef.set({
          firstName: firstName,
          lastName: lastName,
          location: {
            city: city,
            state: state,
          },
          weight: weightInt,
          Age : ageInt,
          height: {feet: feetInt,
          inches: inchesInt}
        })
        alert("You have successfully registered!")
        window.location = "login.html"
      })
      .catch(function(error) {
        var errorCode = error.code
        var errorMessage = error.messages
        console.log(errorMessage)
      })
    })
  }
})
