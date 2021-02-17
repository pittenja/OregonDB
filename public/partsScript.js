/* OregonDB */

// call function to perform initial table render if their is currently contents in the database table
document.addEventListener('DOMContentLoaded', selectTableRender);
// call function to populate insert form with bike model
document.addEventListener('DOMContentLoaded', checkFormBikes("insert"));


/* Function to add all of the bike models to the insert part form or update part form as checklist 
- adds event listener to insert form submit button if insert form is being updated*/
function checkFormBikes(form, id){
    var req = new XMLHttpRequest();
    req.open("GET", "/select-bikes", true);
    req.addEventListener("load", function(){
        if( req.status >= 200 && req.status < 400){
            var response = JSON.parse(req.responseText);
            // build proper bikes checklist based for form
            if(form == "update"){
                var bikesCheckList = document.getElementById("bikes-update-checklist");
            } else {
                var bikesCheckList = document.getElementById("bikes-checklist");
            }
            for(var i = 0; i < response.results.length; i++){
                // make new list item
                var newListItem = document.createElement("li");
                bikesCheckList.appendChild(newListItem);
                // append child the name of the bike
                var bikeFullName = document.createElement("p");
                bikeFullName.textContent = response.results[i].year + " " + response.results[i].make + " " + response.results[i].model;
                newListItem.appendChild(bikeFullName);
                // append child the checkbox for the part with id of the part
                var checkBox = document.createElement("input");
                checkBox.setAttribute("type", "checkbox");
                checkBox.setAttribute("id", response.results[i].bikeId); 
                bikeFullName.appendChild(checkBox);
            }
            // if the current form is the insert form, set event listener for submit button
            if(form != "update"){
                // add event listener for table insert form 
                var insertPartButton = document.getElementById('part-entry-submit');
                insertPartButton.addEventListener('click', function(event){
                    // if submit button is clicked, perform insertion into part table
                    insertPart();
                    event.preventDefault();
                });
            // checklist is in update form, call function to precheck boxes of currently compatible bikes
            } else {
                populateBikeCheckBoxes(id);
            }

        } else {
            console.log("select request to fill update form failed: incorrect input");
        }
    })
    req.send(null);
}


/* Function checks boxes in bikes-update-checklist for all bikes that are compatible with part that has id*/
function populateBikeCheckBoxes(id){
    // populate checklist with currently compatible bikes
    var req = new XMLHttpRequest();
    var reqContent = "?partId=" + id;
    req.open("GET", "/select-compatible-bikes" + reqContent, true);
    req.addEventListener("load", function(){
        if( req.status >= 200 && req.status < 400){
            var response = JSON.parse(req.responseText);
            var bikeList = document.getElementById("bikes-update-checklist");
            // iterate through all compatible bikes
            for(var i = 0; i < response.results.length; i++){
                // find the compatible bike in the check list and check the box
                for(var j = 0; j < bikeList.children.length; j++){
                    var checkBox = bikeList.children[j].lastElementChild.lastElementChild;
                    if (response.results[i].bikeId == checkBox.id){
                        checkBox.checked = true;
                    }
                }
            }
        } else {
            console.log("select request to fill update form failed: incorrect input");
        }
        
    })
    req.send(null);
}


/* Function that requests table contents from Node server and renders the contents on the page */
function selectTableRender(){
    var req = new XMLHttpRequest();
        req.open("GET", "/select-parts", true);
        req.addEventListener("load", function(){
            if( req.status >= 200 && req.status < 400){
                var tableBody = document.getElementById("part-table-body");
                // remove current table contents to replace with updated table
                var child = tableBody.lastElementChild;
                // hide update form - used to update part and compatible bikes - hide whenever table is rendered
                document.getElementById("part-update-form").style.display = "none";
                // clear current table
                while (child) { 
                    tableBody.removeChild(child); 
                    child = tableBody.lastElementChild;
                }
                // reset submit-form
                document.getElementById("part-insert-form").reset();
                var response = JSON.parse(req.responseText);
                for(var i = 0; i < response.results.length; i++){
                    // show table
                    document.getElementById("parts-table").style.display = "table";

                    // create table row
                    var newRow = document.createElement("tr");
                    tableBody.appendChild(newRow);
                    // create td name
                    var newName = document.createElement("td");
                    newName.textContent = response.results[i].partName;
                    newRow.appendChild(newName);

                    // create td form with update and delete buttons and hidden input of id
                    var newFormCell = document.createElement("td");
                    newRow.appendChild(newFormCell);
                    var newForm = document.createElement("form");
                    newFormCell.appendChild(newForm);
                    var hiddenInput = document.createElement("input");
                    hiddenInput.setAttribute("type", "hidden");
                    hiddenInput.setAttribute("id", response.results[i].partId); 
                    newForm.appendChild(hiddenInput);
                    var deleteButton = document.createElement("input");
                    deleteButton.setAttribute("type", "submit");
                    deleteButton.setAttribute("class", "part-delete-select");
                    deleteButton.setAttribute("value", "Delete");
                    newForm.appendChild(deleteButton);
                    var updateButton = document.createElement("input");
                    updateButton.setAttribute("type", "submit");
                    updateButton.setAttribute("class", "part-update-select");
                    updateButton.setAttribute("value", "Update");
                    newForm.appendChild(updateButton);
                }
                // hide table if nothing in table
                if(response.results.length == 0){
                    document.getElementById("parts-table").style.display = "none";
                }
            } else {
                console.log("table select request failed: incorrect input");
            }
            // call button array to add event listeners to all view buttons
            buttonArray();
        });
    req.send(null);
}


/* function adds event listeners to delete and update buttons - and calls functions when these buttons are clicked */
function buttonArray(){
    // get array of all delete and update buttons on page
    deleteButtons = document.getElementsByClassName('part-delete-select');
    updateButtons = document.getElementsByClassName('part-update-select');

    // iterate through each button
    for( var i = 0; i < deleteButtons.length; i++){

        // if the delete button has not yet had a listener added for it
        if (deleteButtons[i].getAttribute("id") != ("listening" + i)){
            // mark button that it has a listener, and add event listener
            deleteButtons[i].setAttribute("id", ("listening" + i));
            deleteButtons[i].addEventListener('click', function(event){
                // if delete button is clicked, get id for row and call function to delete row
                var id = this.previousSibling.getAttribute("id");
                event.preventDefault();
                rowDelete(id);
            });
        }
        //if the update button for this row has not had a listener added for it
        if (updateButtons[i].getAttribute("id")!= ("listening" + i)){
            // mark button that it has a listener, and add event listener
            updateButtons[i].setAttribute("id", ("listening" + i));
            updateButtons[i].addEventListener('click', function(event){
                // if update button is clicked, get id for row, call function to disable all delete and update buttons, and call row update function
                var id = this.previousSibling.previousSibling.getAttribute("id");
                disableButtons();
                rowUpdate(id);
                
                // reset the update form for next use
                //document.getElementById("part-update-form").reset();
                event.preventDefault();
            });
        }
    }
}

/* Function to disable all delete and update buttons on page */
function disableButtons(){
    deleteButtonDisable = document.getElementsByClassName('part-delete-select');
    updateButtonDisable = document.getElementsByClassName('part-update-select');
    // deactivate table buttons 
    for( var j = 0; j < updateButtonDisable.length; j++){
        deleteButtonDisable[j].setAttribute("disabled", "disabled");
        updateButtonDisable[j].setAttribute("disabled", "disabled");
    }
}


/* Function builds part update form and updates part as well as respective compatibility relationships*/
function rowUpdate(id){
    document.getElementById("part-update-form").style.display = "block";
    // build checklist of compatible bikes
    checkFormBikes("update", id);
    // request to get bike year model and name by id
    var req = new XMLHttpRequest();
    var reqContent = "?partId=" + id;
    req.open("GET", "/select-part-by-id" + reqContent, true);
    req.addEventListener("load", function(){
        if( req.status >= 200 && req.status < 400){
            // populate part name text box in update form with current part name
            var partNameInput = document.getElementById("part-update-name");
            var response = JSON.parse(req.responseText);
            partNameInput.value = response.results[0].partName;
        } else {
            console.log("select request to fill update form failed: incorrect input");
        }
    })
    req.send(null);

    // set event listener for save button
        // in event listener - delete all compatiblilies by id
        // update part name in parts table from part name input
        // insert all compatibilities into bikepartcompatibility
}


/* Function that inserts a new bike into BikeModels table as well as BikePartCompatibility table for selected compatible parts */
function insertPart(){
    // perform bike insert form input validation
    var insError = document.getElementById('insert-error');
    insError.textContent = "";
    var newPartName = document.getElementById('part-name');
    if(newPartName.value == ""){
        insError.textContent = "Part Name cannot be Empty.";
        return;
    }
    // insert part into Parts table if input is valid
    // build post body
    var part = 'partName=' + newPartName.value;
    var req = new XMLHttpRequest();
    req.open("POST", "/insert-part", true);
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    req.addEventListener("load", function(){
        if( req.status >= 200 && req.status < 400){
            var response = JSON.parse(req.responseText);
            var partId = response.results.insertId;
            // build post body for compatibility insert
            var compBikes = "partId=" + partId;
            var bikesChecked = document.getElementById('bikes-checklist');
            var child;
            var count = 0;
            // iterate through list of bikes to see which ones were checked, add checked bikes to req body
            for(var i = 0; i < bikesChecked.children.length; i++) { 
                child = bikesChecked.children[i];
                if (child.lastElementChild.lastElementChild.checked){
                    compBikes += '&bikeId=' + child.lastElementChild.lastElementChild.id;
                    count += 1;
                }
            }
            // reset the insert form
            document.getElementById("part-insert-form").reset();
            // call selectTableRender to re-render part table on page and refresh page
            selectTableRender();
            // perform compatibility insert only if bikes were selected
            if(count > 0){
                var req2 = new XMLHttpRequest();
                req2.open("POST", "/partId-compatibility-insert", true);
                req2.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                req2.addEventListener("load", function(){
                    if( req2.status < 200 || req2.status >= 400){
                        console.log("select request to fill update form failed: incorrect input");
                    }
                })
                req2.send(compBikes);
            } 
        } else {
            console.log("select request to fill update form failed: incorrect input");
        }
    })
    req.send(part);
}


/* Function performs request to node server to delete row from Parts table with id */
function rowDelete(id) {
    // perform request from node server to delete row from database
    var req = new XMLHttpRequest();
        var reqContent = "?partId=" + id;
        // perform asynchronous GET request to Node server
        req.open("GET", "/delete-part" + reqContent, true);
        req.addEventListener("load", function(){
            if( req.status >= 200 && req.status < 400){
                // call function to render updated table
                selectTableRender();
            } else {
                console.log(" delete table row request failed: incorrect input");
            }
        })
    req.send(null);
}