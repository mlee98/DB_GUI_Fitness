-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema DB_GUI
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema DB_GUI
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `DB_GUI` ;
USE `DB_GUI` ;

-- -----------------------------------------------------
-- Table `DB_GUI`.`UserInfo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_GUI`.`UserInfo` (
  `UserId` VARCHAR(45) NOT NULL,
  `fName` VARCHAR(45) NULL,
  `lName` VARCHAR(45) NULL,
  `Height` VARCHAR(45) NULL,
  `Weight` VARCHAR(45) NULL,
  `Age` VARCHAR(45) NULL,
  `UserName` VARCHAR(45) NULL,
  PRIMARY KEY (`UserId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_GUI`.`Login`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_GUI`.`Login` (
  `Username` VARCHAR(45) NOT NULL,
  `Password` VARCHAR(45) NULL,
  PRIMARY KEY (`Username`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_GUI`.`Workouts`
-- -----------------------------------------------------



-- -----------------------------------------------------
-- Table `DB_GUI`.`Ideal_body`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_GUI`.`Ideal_body` (
  `Height` VARCHAR(45) NOT NULL,
  `Weight` VARCHAR(45) NULL,
  PRIMARY KEY (`Height`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_GUI`.`Disorders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_GUI`.`Disorders` (
  `Type` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Type`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_GUI`.`Sleep`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_GUI`.`Sleep` (
  `Name` VARCHAR(45) NOT NULL,
  `Description` VARCHAR(500) NULL,
  PRIMARY KEY (`Name`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_GUI`.`Eating Disorders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_GUI`.`Eating Disorders` (
  `Name` VARCHAR(45) NOT NULL,
  `Description` VARCHAR(240) NULL,
  PRIMARY KEY (`Name`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `DB_GUI`.`Account_Sleep` (
  `SleepID` INT NOT NULL AUTO_INCREMENT,
  `UserId` INT NOT NULL,
  `Name` VARCHAR(45) NOT NULL,
  `Share` TINYINT NOT NULL,
  PRIMARY KEY (`SleepID`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `DB_GUI`.`Account_Disorders` (
  `DisorderID` INT NOT NULL AUTO_INCREMENT,
  `UserId` INT NOT NULL,
  `Name` VARCHAR(45) NOT NULL,
  `Share` TINYINT NOT NULL,
  PRIMARY KEY (`DisorderID`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `DB_GUI`.`Account_Allergies` (
  `AllergyID` INT NOT NULL AUTO_INCREMENT,
  `UserId` INT NOT NULL,
  `Name` VARCHAR(45) NOT NULL,
  `Share` TINYINT NOT NULL,
  PRIMARY KEY (`AllergyID`))
ENGINE = InnoDB;



-- -----------------------------------------------------
-- Table `DB_GUI`.`Allergies`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_GUI`.`Allergies` (
  `Name` VARCHAR(45) NOT NULL,
  `Description` VARCHAR(240) NULL,
  PRIMARY KEY (`Name`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_GUI`.`Account  Workouts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_GUI`.`Account_Workouts` (
  `UserId` INT NOT NULL,
  `Primary_Area` INT NULL,
  `Share` TINYINT NULL,
  `cardioProg` INT NULL,
  `upperProg` INT NULL,
  `lowerProg` INT NULL,
  `coreProg` INT NULL,
  PRIMARY KEY (`UserId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_GUI`.`Ideal_Sleep`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_GUI`.`Ideal_Sleep` (
  `AgeRange` VARCHAR(45) NOT NULL,
  `HoursSleep` VARCHAR(45) NULL,
  PRIMARY KEY (`AgeRange`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `DB_GUI`.`UserInfo`
-- -----------------------------------------------------
START TRANSACTION;
USE `DB_GUI`;
INSERT INTO `DB_GUI`.`UserInfo` (`UserId`, `fName`, `lName`, `Height`, `Weight`, `Age`, `UserName`) VALUES ('123', 'Jane', 'Doe', '5.7', '160', '28', NULL);
INSERT INTO `DB_GUI`.`UserInfo` (`UserId`, `fName`, `lName`, `Height`, `Weight`, `Age`, `UserName`) VALUES ('456', 'John', 'Doe', '6.3', '210', '25', NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `DB_GUI`.`Workouts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_GUI`.`Workouts` (
  `WorkoutID` INT NOT NULL,
  `PlanDesc` VARCHAR(45) NULL,
  `Cardio` INT NULL,
  `UpperBody` INT NULL,
  `LowerBody` INT NULL,
  `Core` INT NULL,
  PRIMARY KEY (`WorkoutID`))
ENGINE = InnoDB;

START TRANSACTION;
USE `DB_GUI`;
INSERT INTO `DB_GUI`.`Workouts` (`WorkoutID`, `PlanDesc`, `Cardio`, `UpperBody`, `LowerBody`, `Core`) VALUES (1, 'Weight Loss', 60, 10, 10, 20);

COMMIT;


-- -----------------------------------------------------
-- Data for table `DB_GUI`.`Ideal_body`
-- -----------------------------------------------------
START TRANSACTION;
USE `DB_GUI`;
INSERT INTO `DB_GUI`.`Ideal_body` (`Height`, `Weight`) VALUES ('4\'6', '63-77');
INSERT INTO `DB_GUI`.`Ideal_body` (`Height`, `Weight`) VALUES ('4\'7', '68-84');
INSERT INTO `DB_GUI`.`Ideal_body` (`Height`, `Weight`) VALUES ('4\'8', '72-88');
INSERT INTO `DB_GUI`.`Ideal_body` (`Height`, `Weight`) VALUES ('4\'9', '77-94');
INSERT INTO `DB_GUI`.`Ideal_body` (`Height`, `Weight`) VALUES ('4\'10', '81-99');
INSERT INTO `DB_GUI`.`Ideal_body` (`Height`, `Weight`) VALUES ('4\'11', '86-105');
INSERT INTO `DB_GUI`.`Ideal_body` (`Height`, `Weight`) VALUES ('5\'0', '90-110');
INSERT INTO `DB_GUI`.`Ideal_body` (`Height`, `Weight`) VALUES ('5\'1', '95-116');
INSERT INTO `DB_GUI`.`Ideal_body` (`Height`, `Weight`) VALUES ('5\'2', '99-121');
INSERT INTO `DB_GUI`.`Ideal_body` (`Height`, `Weight`) VALUES ('5\'3', '104-127');
INSERT INTO `DB_GUI`.`Ideal_body` (`Height`, `Weight`) VALUES ('5\'4', '108-132');
INSERT INTO `DB_GUI`.`Ideal_body` (`Height`, `Weight`) VALUES ('5\'5', '113-138');
INSERT INTO `DB_GUI`.`Ideal_body` (`Height`, `Weight`) VALUES ('5\'6', '117-143');
INSERT INTO `DB_GUI`.`Ideal_body` (`Height`, `Weight`) VALUES ('5\'7', '122-149');
INSERT INTO `DB_GUI`.`Ideal_body` (`Height`, `Weight`) VALUES ('5\'8', '126-154');
INSERT INTO `DB_GUI`.`Ideal_body` (`Height`, `Weight`) VALUES ('5\'9', '131-160');
INSERT INTO `DB_GUI`.`Ideal_body` (`Height`, `Weight`) VALUES ('5\'10', '135-160');
INSERT INTO `DB_GUI`.`Ideal_body` (`Height`, `Weight`) VALUES ('5\'11', '136-172');
INSERT INTO `DB_GUI`.`Ideal_body` (`Height`, `Weight`) VALUES ('6\'0', '140-177');
INSERT INTO `DB_GUI`.`Ideal_body` (`Height`, `Weight`) VALUES ('6\'1', '144-182');
INSERT INTO `DB_GUI`.`Ideal_body` (`Height`, `Weight`) VALUES ('6\'2', '171-186');
INSERT INTO `DB_GUI`.`Ideal_body` (`Height`, `Weight`) VALUES ('6\'3', '152-192');
INSERT INTO `DB_GUI`.`Ideal_body` (`Height`, `Weight`) VALUES ('6\'4', '182-222');

COMMIT;


-- -----------------------------------------------------
-- Data for table `DB_GUI`.`Disorders`
-- -----------------------------------------------------
START TRANSACTION;
USE `DB_GUI`;
INSERT INTO `DB_GUI`.`Disorders` (`Type`) VALUES ('Eating_Disorders');
INSERT INTO `DB_GUI`.`Disorders` (`Type`) VALUES ('Sleep_Disorders');
INSERT INTO `DB_GUI`.`Disorders` (`Type`) VALUES ('Allergies');

COMMIT;


-- -----------------------------------------------------
-- Data for table `DB_GUI`.`Sleep`
-- -----------------------------------------------------
START TRANSACTION;
USE `DB_GUI`;
INSERT INTO `DB_GUI`.`Sleep` (`Name`, `Description`) VALUES ('Insomnia', 'Inability to sleep');
INSERT INTO `DB_GUI`.`Sleep` (`Name`, `Description`) VALUES ('Sleep apnea', 'Sleep apnea is a common condition in the United States. It can occur when the upper airway becomes blocked repeatedly during sleep, reducing or completely stopping airflow. This is known as obstructive sleep apnea. If the brain does not send the signals needed to breathe, the condition may be called central sleep apnea.');
INSERT INTO `DB_GUI`.`Sleep` (`Name`, `Description`) VALUES ('Restless leg syndrome', 'A disorder characterized by an unpleasant tickling or twitching sensation in the leg muscles when sitting or lying down, which is relieved only by moving the legs.');
INSERT INTO `DB_GUI`.`Sleep` (`Name`, `Description`) VALUES ('Sleep walking', 'A phenomenon of combined sleep and wakefulness.');

COMMIT;


-- -----------------------------------------------------
-- Data for table `DB_GUI`.`Eating Disorders`
-- -----------------------------------------------------
START TRANSACTION;
USE `DB_GUI`;
INSERT INTO `DB_GUI`.`Eating Disorders` (`Name`, `Description`) VALUES ('Binge Eating Disorder', 'The consumption of large quantities of food in a short period of time, typically as part of an eating disorder.');
INSERT INTO `DB_GUI`.`Eating Disorders` (`Name`, `Description`) VALUES ('Night Eating Disorder', 'Night eating syndrome (NES) is a condition that combines overeating at night with sleep problems.');
INSERT INTO `DB_GUI`.`Eating Disorders` (`Name`, `Description`) VALUES ('Bulima Nervosa', 'This is a serious, potentially life-threatening eating disorder characterized by a cycle of bingeing and compensatory behaviors such as self-induced vomiting designed to undo or compensate for the effects of binge eating.');
INSERT INTO `DB_GUI`.`Eating Disorders` (`Name`, `Description`) VALUES ('Anoxeria Nervosa', 'This is a psychological and potentially life-threatening eating disorder. Those suffering from this eating disorder are typically suffering from an extremely low body weight relative to their height and body type.');

COMMIT;


-- -----------------------------------------------------
-- Data for table `DB_GUI`.`Allergies`
-- -----------------------------------------------------
START TRANSACTION;
USE `DB_GUI`;
INSERT INTO `DB_GUI`.`Allergies` (`Name`, `Description`) VALUES ('Lactose', 'Milk,Cheese,Yogurt,Butter');
INSERT INTO `DB_GUI`.`Allergies` (`Name`, `Description`) VALUES ('Nut', 'Almonds,Peanuts,Cashew,Pine Nuts,Pecans,Pistachio');
INSERT INTO `DB_GUI`.`Allergies` (`Name`, `Description`) VALUES ('Peanuts', 'All products made of peanuts.');
INSERT INTO `DB_GUI`.`Allergies` (`Name`, `Description`) VALUES ('Citrus', 'Lemon,Orange,Lime,Grapefruit,Clementimes');
INSERT INTO `DB_GUI`.`Allergies` (`Name`, `Description`) VALUES ('Fish', 'Salmon,Tuna,Cod,Bass,Mussels,Oysters,Flounder,Haddock,Perch,Tilipia');
INSERT INTO `DB_GUI`.`Allergies` (`Name`, `Description`) VALUES ('Shellfish', 'Shrimp,Crawfish,Crab,Prawns');
INSERT INTO `DB_GUI`.`Allergies` (`Name`, `Description`) VALUES ('Eggs', 'all products that are made up of eggs.');
INSERT INTO `DB_GUI`.`Allergies` (`Name`, `Description`) VALUES ('Soy', 'Soybeans,Soy Sauce,Tofu');
INSERT INTO `DB_GUI`.`Allergies` (`Name`, `Description`) VALUES ('Corn', 'All products that are made up of corn.');
INSERT INTO `DB_GUI`.`Allergies` (`Name`, `Description`) VALUES ('Spices', 'Cinammon,Tumeric,Pepper,Salt,Celery,Mustard,Anis,Coriander,Cumin,Fennel,Parsley,Ragweed,Echinacea,Artichoke,Dandelions,Hibiscus');
INSERT INTO `DB_GUI`.`Allergies` (`Name`, `Description`) VALUES ('Gelatin', 'All products that contain gelatin.');
INSERT INTO `DB_GUI`.`Allergies` (`Name`, `Description`) VALUES ('Meat', 'Beef,Pork,Chicken,Turkey,Lamb,Goat,Fish');
INSERT INTO `DB_GUI`.`Allergies` (`Name`, `Description`) VALUES ('Seeds', 'Seasme,Sunflower,Poppy,Pumpkin');

COMMIT;


-- -----------------------------------------------------
-- Data for table `DB_GUI`.`Ideal_Sleep`
-- -----------------------------------------------------
START TRANSACTION;
USE `DB_GUI`;
INSERT INTO `DB_GUI`.`Ideal_Sleep` (`AgeRange`, `HoursSleep`) VALUES ('6-13', '10-11');
INSERT INTO `DB_GUI`.`Ideal_Sleep` (`AgeRange`, `HoursSleep`) VALUES ('14-17', '8.5-9.5');
INSERT INTO `DB_GUI`.`Ideal_Sleep` (`AgeRange`, `HoursSleep`) VALUES ('18-25', '7-9');
INSERT INTO `DB_GUI`.`Ideal_Sleep` (`AgeRange`, `HoursSleep`) VALUES ('26-64', '7-9');
INSERT INTO `DB_GUI`.`Ideal_Sleep` (`AgeRange`, `HoursSleep`) VALUES ('65+', '7-9');

COMMIT;
