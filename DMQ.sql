--SQL FILE FOR WEB APP DATABASE MANIPULATION FUNCTIONALITY

--CUSTOMERS HTML PAGE - RYAN--


--REPAIRS HTML PAGE - RYAN--


--EMPLOYEES HTML PAGE - RYAN--


--BIKES HTML PAGE - JAY--
--select bikeModels table for viewing

--view compatible parts for a bike model
----select to bikePartCompatibility to get ids of all compatible parts
----select queries for each compatible part to get name of part for Bike model part compatbility detail

--insert new bike model
----make select to parts table to populate insert form with all available parts
----upon submit, perform insert into bikeModels table as well as bikePartCompatibility table

--PARTS HTML PAGE - JAY--
--select parts table for viewing

--delete part
----delete respective rows in bikePartCompatibility

--insert part
----make select to bikeModels table to populate insert form with all serviceable bikes
----upon submit, perform insert into parts table as well as bikePartCompatibility table

--update part
----make select to bikeModels table to populate update form with all serviceable bikes
----make select query to bikePartCompatibility table to get bike_ids of currently compatible bikes to part so that 
----form check boxes can be preselected for compatible bikes
----upon submit, perform update into parts table 
------perform delete to all rows in bikePartCompatibility that contain the part_id to reset table
------perform insert of rows into bikePartCompatibility for the updated list of compatible bikes for that part