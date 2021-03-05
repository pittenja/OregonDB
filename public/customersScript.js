function insert(event) {
    event.preventDefault();
    var firstName = document.getElementById("firstName");
    var lastName = document.getElementById("lastName");
    var email = document.getElementById("email");
  
    var item = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value
      };
  
    console.log(item);
    if (firstName.value.length > 0 && lastName.value.length > 0 && email.value.length > 0){
      var response = postData('/insert-customers', item).then(data =>{renderData(data);});
      window.alert("Submission Successful!");
      location.reload()
    }
    else{
      window.alert("First Name, Last Name, and Email must have values!");
    }
    //var response = postData('/insert-customers', item).then(data =>{renderData(data);});
    //console.log(response);
    document.getElementById("firstName").value = ""
    document.getElementById("lastName").value = ""
    document.getElementById("email").value = ""
  }
  
  const form = document.getElementById('customer-insert-form');
  form.addEventListener('submit', insert);
  
  async function postData(url = '', data = {}) {
      const response = await fetch(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
           },
      
     body: JSON.stringify(data) 
    });
    return response.json(); 
  }