function insert(event) {
    event.preventDefault();
    var employeeFirstName = document.getElementById("employeeFirstName");
    var employeeLastName = document.getElementById("employeeLastName");
  
    var item = {
      employeeFirstName: employeeFirstName.value,
      employeeLastName: employeeLastName.value
      };
  
    //console.log(item);
    if (employeeFirstName.value.length > 0 && employeeLastName.value.length > 0){
      var response = postData('/insert-employees', item).then(data =>{renderData(data);});
      window.alert("Submission Successful!");
      location.reload()
    }
    else{
      window.alert("First Name, and Last Name must have values!");

    }
    //console.log(response);
    document.getElementById("employeeFirstName").value = ""
    document.getElementById("employeeLastName").value = ""
  }
  
  const form = document.getElementById('employee-insert-form');
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