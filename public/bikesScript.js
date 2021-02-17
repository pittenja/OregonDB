/* OregonDB */

// call function to perform initial table render if their is currently contents in the database table
document.addEventListener('DOMContentLoaded', selectTableRender);

// call function to populate insert form with parts inventory
document.addEventListener('DOMContentLoaded', insertFormParts);


function insertFormParts(){
    var req = new XMLHttpRequest();
    req.open("GET", "/select-parts", true);
    req.addEventListener("load", function(){
        if( req.status >= 200 && req.status < 400){
            var response = JSON.parse(req.responseText);
            var partsCheckList = document.getElementById("parts-checklist");
            for(var i = 0; i < response.results.length; i++){
                // make new list item
                var newListItem = document.createElement("li");
                partsCheckList.appendChild(newListItem);
                // append child the name of the part
                var partName = document.createElement("p");
                partName.textContent = response.results[i].partName;
                newListItem.appendChild(partName);
                // append child the checkbox for the part with id of the part
                var checkBox = document.createElement("input");
                checkBox.setAttribute("type", "checkbox");
                //checkBox.setAttribute("value", "false");
                checkBox.setAttribute("id", response.results[i].partId); 
                partName.appendChild(checkBox);
            }
            
            // add event listener for table insert form 
            var insertBikeButton = document.getElementById('bike-entry-submit');
            insertBikeButton.addEventListener('click', function(event){
                // if submit button is clicked, perform insertion into bike table
                insertBike();
                event.preventDefault();
            });

        } else {
            console.log("select request to fill update form failed: incorrect input");
        }
    })
    req.send(null);
}


/* Function that inserts a new bike into BikeModels table as well as BikePartCompatibility table for selected compatible parts */
function insertBike(){
    // perform bike insert form input validation
    var insError = document.getElementById('insert-error');
    insError.textContent = "";
    var newBikeMake = document.getElementById('bike-make');
    if(newBikeMake.value == ""){
        insError.textContent = "Bike Make cannot be Empty.";
        return;
    }
    var newBikeModel = document.getElementById('bike-model');
    if(newBikeModel.value == ""){
        insError.textContent = "Bike Model cannot be Empty.";
        return;
    }
    var newBikeYear = document.getElementById('bike-year');
    if(newBikeYear.value == ""){
        insError.textContent = "Bike Year cannot be Empty.";
        return;
    }
    else if(newBikeYear.value < 1000 || newBikeYear.value > 9999 || isNaN(newBikeYear.value)){
        insError.textContent = "Bike Year must be a four digit number.";
        return;
    }
    // insert bike into bikeModels table
    var bike = 'make=' + newBikeMake.value + "&model=" + newBikeModel.value + "&year=" + newBikeYear.value;
    var req = new XMLHttpRequest();
    req.open("POST", "/insert-bike", true);
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    req.addEventListener("load", function(){
        
        if( req.status >= 200 && req.status < 400){
            var response = JSON.parse(req.responseText);
            var bikeId = response.results.insertId;
            
            var compParts = "bikeId=" + bikeId;
            var partsChecked = document.getElementById('parts-checklist');
            var child;
            var count = 0;
            for(var i = 0; i < partsChecked.children.length; i++) { 
                child = partsChecked.children[i];
                if (child.lastElementChild.lastElementChild.checked){
                    compParts += '&partId=' + child.lastElementChild.lastElementChild.id;
                    count += 1;
                }
            }
            document.getElementById("bike-insert-form").reset();
            // if insert successful, call selectTableRender to rerender bike table on page and refresh page
            selectTableRender();
            // perform compatibility insert if parts were selected
            if(count > 0){
                var req2 = new XMLHttpRequest();
                req2.open("POST", "/bikeId-compatibility-insert", true);
                req2.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                req2.addEventListener("load", function(){
                    if( req2.status < 200 || req2.status >= 400){
                        console.log("select request to fill update form failed: incorrect input");
                    }
                })
                req2.send(compParts);
            } 
        } else {
            console.log("select request to fill update form failed: incorrect input");
        }
    })
    req.send(bike);
}


/* Function that requests table contents from Node server and renders the contents on the page */
function selectTableRender(){
    var req = new XMLHttpRequest();
        req.open("GET", "/select-bikes", true);
        req.addEventListener("load", function(){
            if( req.status >= 200 && req.status < 400){
                var tableBody = document.getElementById("bike-table-body");
                // remove current table contents to replace with updated table
                var child = tableBody.lastElementChild;
                // hide view form - used to view compatible parts for bike model - hide whenever table is rendered
                document.getElementById("bike-view-form").style.display = "none";
                // clear current table
                while (child) { 
                    tableBody.removeChild(child); 
                    child = tableBody.lastElementChild;
                }
                // reset submit-form
                document.getElementById("bike-insert-form").reset();
                var response = JSON.parse(req.responseText);
                for(var i = 0; i < response.results.length; i++){
                    // show table
                    document.getElementById("bike-table").style.display = "table";

                    // create table row
                    var newRow = document.createElement("tr");
                    tableBody.appendChild(newRow);
                    // create td make
                    var newMake = document.createElement("td");
                    newMake.textContent = response.results[i].make;
                    newRow.appendChild(newMake);
                    // create td model
                    var newModel = document.createElement("td");
                    newModel.textContent = response.results[i].model;
                    newRow.appendChild(newModel);
                    // create td year
                    var newYear = document.createElement("td");
                    newYear.textContent = response.results[i].year;
                    newRow.appendChild(newYear);

                    // create td form with view button and hidden input of id
                    var newFormCell = document.createElement("td");
                    newRow.appendChild(newFormCell);
                    var newForm = document.createElement("form");
                    newFormCell.appendChild(newForm);
                    var hiddenInput = document.createElement("input");
                    hiddenInput.setAttribute("type", "hidden");
                    hiddenInput.setAttribute("id", response.results[i].bikeId); 
                    newForm.appendChild(hiddenInput);
                    var viewButton = document.createElement("input");
                    viewButton.setAttribute("type", "submit");
                    viewButton.setAttribute("class", "bike-view-select");
                    viewButton.setAttribute("value", "View");
                    newForm.appendChild(viewButton);
                }
                // hide table if nothing in table
                if(response.results.length == 0){
                    document.getElementById("bike-table").style.display = "none";
                }
            } else {
                console.log("table select request failed: incorrect input");
            }
            // call button array to add event listeners to all view buttons
            buttonArray();
        });
    req.send(null);
}

/* function adds event listeners to view buttons - and calls functions when these buttons are clicked */
function buttonArray(){
    // get array of all view buttons on page
    viewButtons = document.getElementsByClassName('bike-view-select');

    // iterate through each button
    for( var i = 0; i < viewButtons.length; i++){
        //if the view button for this row has not had a listener added for it
        if (viewButtons[i].getAttribute("id")!= ("listening" + i)){
            // mark button that it has a listener, and add event listener
            viewButtons[i].setAttribute("id", ("listening" + i));
            viewButtons[i].addEventListener('click', function(event){
                // if view button is clicked, get id for row, call function to disable all view buttons, and call rowView
                var id = this.previousSibling.getAttribute("id");
                disableButtons();
                rowView(id);
                event.preventDefault();
            });
        }
    }
}


/* event driven function shows compatible parts for selected bike model */
function rowView(id){
    // show view form
    document.getElementById("bike-view-form").style.display = "block";
    // request to get bike year model and name by id
    var req = new XMLHttpRequest();
    var reqContent = "?bikeId=" + id;
    req.open("GET", "/select-bike-by-id" + reqContent, true);
    req.addEventListener("load", function(){
        if( req.status >= 200 && req.status < 400){
            var response = JSON.parse(req.responseText);
            var nameString = "";
            var bikeFullName = document.getElementById("bike-full-name");
            for(var i = 0; i < response.results.length; i++){
                nameString += response.results[i].year + " " + response.results[i].make + " " + response.results[i].model;
                bikeFullName.textContent = nameString;
            }
            // request to get compatible parts for that bike id
            var req2 = new XMLHttpRequest();
            var req2Content = "?bikeId=" + id;
            req2.open("GET", "/select-compatible-parts" + req2Content, true);
            req2.addEventListener("load", function(){
                if( req2.status >= 200 && req2.status < 400){
                    var response = JSON.parse(req2.responseText);
                    var partsList = document.getElementById("parts-list");
                    for(var i = 0; i < response.results.length; i++){
                        var newPart = document.createElement("li");
                        newPart.textContent = response.results[i].partName;
                        partsList.appendChild(newPart);
                    }
                    // hide table if nothing in table
                    if(response.results.length == 0){
                        var newPart = document.createElement("li");
                        newPart.textContent = "No compatible parts on file for this bike model";
                        partsList.appendChild(newPart);
                    }
                } else {
                    console.log("select request to fill update form failed: incorrect input");
                }
                
            })
            req2.send(null);
        } else {
            console.log("select request to fill update form failed: incorrect input");
        }
        
    })
    req.send(null);
}


/* Function to disable all view buttons on page */
function disableButtons(){
    var viewButtonDisable = document.getElementsByClassName('bike-view-select');
    // deactivate table buttons 
    for( var j = 0; j < viewButtonDisable.length; j++){
        viewButtonDisable[j].setAttribute("disabled", "disabled");
    }
}


/* Function to enable all view buttons on page */
function enableButtons(){
    var viewButtonDisable = document.getElementsByClassName('bike-view-select');
    // reactivate table buttons 
    for( var j = 0; j < viewButtonDisable.length; j++){
        viewButtonDisable[j].removeAttribute("disabled");
    }
}