--SQL FILE FOR WEB APP DATABASE MANIPULATION FUNCTIONALITY

--CUSTOMERS HTML PAGE - RYAN--

-- Insert into Customers table 
----colon : character being used to denote variable that will have data from backend code
INSERT INTO Customers
SET
firstName = :firstName,
lastName = :lastName,
email = :email;

-- View all customers
SELECT * FROM Customers;


--REPAIRS HTML PAGE - RYAN--
-- Insert into RepairJobs table
----colon : character being used to denote variable that will have data from backend code
INSERT INTO RepairJobs
SET
repairType = :repairType,
doneDateDesired = :doneDateDesired,
customerId = customerId,
bikeId = :bikeId,
employeeId = :employeeId;

-- View RepairJobs by repairType
-- Plaeholder value will be retreived from search bar
SELECT * FROM RepairJobs WHERE repairType LIKE 'Placeholder%';

--EMPLOYEES HTML PAGE - RYAN--
-- Insert into Customers table 
----colon : character being used to denote variable that will have data from backend code
INSERT INTO Employees
SET
employeeFirstName = :employeeFirstName,
employeeLastName = :employeeLastName;

-- View all employees
SELECT * FROM Employees;


--BIKES HTML PAGE - JAY--
--SELECT bikeModels table for viewing in order to populate table on page
SELECT * FROM `BikeModels`;

--SELECT compatible parts for a bike model for viewing on page
--colon : character being used to denote variable that will have data from backend code
----First obtain details for bike selected
SELECT * FROM `BikeModels`
WHERE bikeId = :bikeId;
----Then perform the following select query to create list of parts that are compatible with the selected bike
SELECT partName FROM Parts
WHERE partId IN
	(SELECT partId FROM BikePartCompatibility
    WHERE bikeId = :bikeId);

--INSERT new bike model
----make select to parts table to populate insert form with all available parts - partId will be the html id for the part checkbox
SELECT * FROM `Parts`;
----upon submit, perform insert into bikeModels table as well as bikePartCompatibility table
----colon : character being used to denote variable that will have data from backend code
INSERT INTO BikeModels
SET
make = :make,
model = :model,
year = :year;
---For each selected compatible part in insert form, insert compatibility relationship into into bikePartCompatibility table using the below queries
---backend code will build a large query that contains the below query FOR EACH checked box of compatible part
---- NEED TO CHANGE THIS QUERY
INSERT INTO BikePartCompatibility
SET
bikeId = 
(SELECT bikeId from BikeModels
WHERE make = :make AND model = :model AND year = :year),
partId = :partId;


--PARTS HTML PAGE - JAY--
--SELECT parts table for viewing in order to populate table on page
SELECT * FROM `Parts`;

--DELETE part with colon : character being used to denote variable that will have data from backend code
DELETE
FROM Parts
WHERE partId = :partId;

--INSERT part
----make select to bikeModels table to populate insert form with all serviceable bikes - bikeId will be the html id for the bike checkbox
SELECT * FROM `BikeModels`;
----upon submit, perform insert into parts table as well as bikePartCompatibility table
----colon : character being used to denote variable that will have data from backend code
INSERT INTO Parts
SET
partName = :partName;
---For each selected compatible bike in insert form, insert compatibility relationship into into bikePartCompatibility table using the below queries
---backend code will build a large query that contains the below query FOR EACH checked box of compatible bike
---- NEED TO CHANGE THIS QUERY
INSERT INTO BikePartCompatibility
SET
bikeId = :bikeId,
partId = 
(SELECT partId from Parts
WHERE partName = :partName);

--UPDATE part
----First obtain details for part selected on page
----colon : character being used to denote variable that will have data from backend code
SELECT * FROM `Parts`
WHERE partId = :partId;
----Obtain list of all serviceable bikes in order to populate update form with checkboxes
SELECT * FROM `BikeModels`
----Pre-check checkboxes of all bike models that are currently set to be compatible with the part being updated - save bikeId in html id for each checkbox
----Then perform the following select query to create list of bikes that are compatible with the selected part
---- NEED TO CHANGE THIS QUERY
SELECT * FROM BikeModels
WHERE bikeId IN
	(SELECT bikeId FROM BikePartCompatibility
    WHERE partId = :partId);
----upon submit, perform update into parts table 
UPDATE Parts
SET
partName = :partName;
WHERE partId = :partId;
------perform delete to all rows in bikePartCompatibility that contain the part_id to reset table
DELETE
FROM BikePartCompatibility
WHERE partId = :partId;
---For each selected compatible bike in update form, insert compatibility relationship into into bikePartCompatibility table using the below queries
---backend code will build a large query that contains the below query FOR EACH checked box of compatible bikes
INSERT INTO BikePartCompatibility
SET
bikeId = :bikeId,
partId = 
(SELECT partId from Parts
WHERE partName = :partName);