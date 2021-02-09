--SQL FILE FOR DATABASE CREATION AND INSERTION OF SAMPLE DATA

--BikeModels Entity - JAY
--Table creation:
CREATE TABLE `BikeModels` (
`bikeId` int(11) NOT NULL AUTO_INCREMENT,
`make` varchar(255) NOT NULL,
`model` varchar(255) NOT NULL,
`year` int(11) NOT NULL,
PRIMARY KEY (`bikeId`)
) ENGINE=InnoDB;

--Sample data:
INSERT INTO BikeModels
SET
make = 'Trek',
model = 'Ticket',
year = '2012';
INSERT INTO BikeModels
SET
make = 'Specialized',
model = 'P1',
year = '2010';
INSERT INTO BikeModels
SET
make = 'Transition',
model = 'PBJ',
year = '2016';


--Parts Entity - JAY
--Table creation:
CREATE TABLE `Parts` (
`partId` int(11) NOT NULL AUTO_INCREMENT,
`partName` varchar(255) NOT NULL,
PRIMARY KEY (`partId`)
) ENGINE=InnoDB;

--Sample data:
INSERT INTO Parts
SET
partName = '23T Sprocket';
INSERT INTO Parts
SET
partName = 'Medium Chain';
INSERT INTO Parts
SET
partName = 'XL Grips';


--BikePartCompatibility Entity - JAY
--Table creation:

--Sample data:


--Customers Entity - RYAN
--Table creation:

--Sample data:


--Employees Entity - RYAN
--Table creation:

--Sample data:


--RepairJobs Entity - RYAN
--Table creation:

--Sample data:

