// https://www.w3schools.com/howto/howto_js_filter_lists.asp
function myFunction() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}

function insert(event) {
event.preventDefault();
var repairType = document.getElementById("repairType");
var doneDateDesired = document.getElementById("doneDateDesired");
var customerId = document.getElementById("customerId");
var bikeId = document.getElementById("bikeId");
var employeeId = document.getElementById("employeeId");

var item = {
  repairType: repairType.value,
  doneDateDesired: doneDateDesired.value,
  customerId: customerId.value,
  bikeId: bikeId.value,
  employeeId: employeeId.value
  };

//console.log(item);
if (repairType.value.length > 0 && doneDateDesired.value.toString().length > 0){

  var response = postData('/insert-repairs', item).then(data =>{renderData(data);});
  window.alert("Submission Successful!");
  location.reload()
}
else{
  window.alert("Repair Type and Done Date Desired must have a value!");
}
//console.log(response);
//document.getElementById("").value = ""
//document.getElementById("employeeLastName").value = ""
}

const form = document.getElementById('repair-insert-form');
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