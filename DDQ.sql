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
CREATE TABLE `BikePartCompatibility` (
`compatibilityId` int(11) NOT NULL AUTO_INCREMENT,
`bikeId` int(11),
`partId` int(11),
PRIMARY KEY (`compatibilityId`),
CONSTRAINT `BikePartCompatibility_ibfk_1` FOREIGN KEY (`bikeId`) REFERENCES `BikeModels` (`bikeId`),
CONSTRAINT `BikePartCompatibility_ibfk_2` FOREIGN KEY (`partId`) REFERENCES `Parts` (`partId`)
) ENGINE=InnoDB;

--Sample data:
INSERT INTO BikePartCompatibility
SET
bikeId = 
(SELECT bikeId from BikeModels
WHERE make = 'Specialized' AND model = 'P1' AND year = '2010'),
partId = 
(SELECT partId from Parts
WHERE partName = '23T Sprocket');
INSERT INTO BikePartCompatibility
SET
bikeId = 
(SELECT bikeId from BikeModels
WHERE make = 'Trek' AND model = 'Ticket' AND year = '2012'),
partId = 
(SELECT partId from Parts
WHERE partName = '23T Sprocket');
INSERT INTO BikePartCompatibility
SET
bikeId = 
(SELECT bikeId from BikeModels
WHERE make = 'Transition' AND model = 'PBJ' AND year = '2016'),
partId = 
(SELECT partId from Parts
WHERE partName = 'Medium Chain');
INSERT INTO BikePartCompatibility
SET
bikeId = 
(SELECT bikeId from BikeModels
WHERE make = 'Transition' AND model = 'PBJ' AND year = '2016'),
partId = 
(SELECT partId from Parts
WHERE partName = 'XL Grips');


--Customers Entity - RYAN
--Table creation:

--Sample data:


--Employees Entity - RYAN
--Table creation:

--Sample data:


--RepairJobs Entity - RYAN
--Table creation:

--Sample data:

