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
CONSTRAINT `BikePartCompatibility_ibfk_2` FOREIGN KEY (`partId`) REFERENCES `Parts` (`partId`) ON DELETE CASCADE
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
CREATE TABLE `Customers` (
`customerId` int(11) NOT NULL AUTO_INCREMENT,
`firstName` varchar(255) NOT NULL,
`lastName` varchar(255) NOT NULL,
`email` varchar(255) NOT NULL,
PRIMARY KEY (`customerId`)
) ENGINE=InnoDB;

--Sample data:
INSERT INTO Customers
SET
firstName = 'Bob',
lastName = 'Jones',
email = 'bjones@gmail.com';
INSERT INTO Customers
SET
firstName = 'Sean',
lastName = 'Kent',
email = 'skent@gmail.com';
INSERT INTO Customers
SET
firstName = 'Chris',
lastName = 'Brown',
email = 'cbrown@gmail.com';

--Employees Entity - RYAN
--Table creation:
CREATE TABLE `Employees` (
`employeeId` int(11) NOT NULL AUTO_INCREMENT,
`employeeFirstName` varchar(255) NOT NULL,
`employeeLastName` varchar(255) NOT NULL,
PRIMARY KEY (`employeeId`)
) ENGINE=InnoDB;

--Sample data:
INSERT INTO Employees
SET
employeeFirstName = 'Jill',
employeeLastName = 'Johnson';
INSERT INTO Employees
SET
employeeFirstName = 'Jean',
employeeLastName = 'Wallace';
INSERT INTO Employees
SET
employeeFirstName = 'Nathan',
employeeLastName = 'Norwood';


--RepairJobs Entity - RYAN
--Table creation:
CREATE TABLE `RepairJobs` (
`repairId` int(11) NOT NULL AUTO_INCREMENT,
`repairType` varchar(255) NOT NULL,
`customerId` int(11),
`bikeId` int(11),
`employeeId` int(11),
PRIMARY KEY (`repairId`),
CONSTRAINT `RepairJobs_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `Customers` (`CustomerId`),
CONSTRAINT `RepairJobs_ibfk_2` FOREIGN KEY (`bikeId`) REFERENCES `BikeModels` (`bikeId`),
CONSTRAINT `RepairJobs_ibfk_3` FOREIGN KEY (`employeeId`) REFERENCES `Employees` (`employeeId`)
) ENGINE=InnoDB;

--Sample data:
INSERT INTO RepairJobs
SET
repairType = 'Sprocket',
customerId = 
(SELECT customerId FROM Customers
WHERE firstName = 'Bob' AND lastName = 'Jones' AND email = 'bjones@gmail.com'),
bikeId = 
(SELECT bikeId FROM BikeModels 
WHERE make = 'Trek' AND model = 'Ticket' AND year = '2012'),
employeeId = 
(SELECT employeeId FROM Employees
WHERE employeeFirstName = 'Jill' AND employeeLastName = 'Johnson');
INSERT INTO RepairJobs
SET
repairType = 'Chain',
customerId = 
(SELECT customerId FROM Customers
WHERE firstName = 'Sean' AND lastName = 'Kent' AND email = 'skent@gmail.com'),
bikeId = 
(SELECT bikeId FROM BikeModels 
WHERE make = 'Specialized' AND model = 'P1' AND year = '2010'),
employeeId = 
(SELECT employeeId FROM Employees
WHERE employeeFirstName = 'Jean' AND employeeLastName = 'Wallace');
INSERT INTO RepairJobs
SET
repairType = 'Handle Bars',
customerId = 
(SELECT customerId FROM Customers
WHERE firstName = 'Chris' AND lastName = 'Brown' AND email = 'cbrown@gmail.com'),
bikeId = 
(SELECT bikeId FROM BikeModels 
WHERE make = 'Transition' AND model = 'PBJ' AND year = '2016'),
employeeId = 
(SELECT employeeId FROM Employees
WHERE employeeFirstName = 'Nathan' AND employeeLastName = 'Norwood');