--SQL FILE FOR DATABASE CREATION AND INSERTION OF SAMPLE DATA

--BikeModels Entity - JAY
--Table creation:

--Sample data:


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

