--SQL FILE FOR WEB APP DATABASE MANIPULATION FUNCTIONALITY

--CUSTOMERS HTML PAGE - RYAN--


--REPAIRS HTML PAGE - RYAN--


--EMPLOYEES HTML PAGE - RYAN--


--BIKES HTML PAGE - JAY--
--select bikeModels table for viewing in order to populate table on page
SELECT * FROM `BikeModels`;

--view compatible parts for a bike model
----may need to use join to obtain all compatible parts
----select to bikePartCompatibility to get ids of all compatible parts
----select queries for each compatible part to get name of part for Bike model part compatbility detail

--insert new bike model
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
INSERT INTO BikePartCompatibility
SET
bikeId = 
(SELECT bikeId from BikeModels
WHERE make = :make AND model = :model AND year = :year),
partId = :partId;

--PARTS HTML PAGE - JAY--
--select parts table for viewing in order to populate table on page
SELECT * FROM `Parts`;

--delete part with colon : character being used to denote variable that will have data from backend code
DELETE
FROM Parts
WHERE partId = :partId;

--insert part
----make select to bikeModels table to populate insert form with all serviceable bikes
----upon submit, perform insert into parts table as well as bikePartCompatibility table

--update part
----may need to use join to obtain all compatible bikes
----make select to bikeModels table to populate update form with all serviceable bikes
----make select query to bikePartCompatibility table to get bike_ids of currently compatible bikes to part so that 
----form check boxes can be preselected for compatible bikes
----upon submit, perform update into parts table 
------perform delete to all rows in bikePartCompatibility that contain the part_id to reset table
------perform insert of rows into bikePartCompatibility for the updated list of compatible bikes for that part
------build insert query in loop to insert all rows