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
-- Table `DB_GUI`.`User_info`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_GUI`.`User_info` (
  `userid` INT NOT NULL,
  `fName` VARCHAR(45) NULL,
  `lName` VARCHAR(45) NULL,
  `Height` INT NULL,
  `Weight` INT NULL,
  `Age` INT NULL,
  PRIMARY KEY (`userid`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_GUI`.`Login`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_GUI`.`Login` (
  `user_id` INT NOT NULL,
  `password` VARCHAR(45) NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_GUI`.`Workouts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_GUI`.`Workouts` (
  `workoutid` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `cardio` INT NULL,
  `upperBody` INT NULL,
  `lowerBody` INT NULL,
  `core` INT NULL,
  PRIMARY KEY (`workoutid`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_GUI`.`Ideal_body`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_GUI`.`Ideal_body` (
  `height` VARCHAR(45) NOT NULL,
  `weight` VARCHAR(45) NULL,
  PRIMARY KEY (`height`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_GUI`.`Disorders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_GUI`.`Disorders` (
  `type` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`type`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_GUI`.`Sleep`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_GUI`.`Sleep` (
  `type` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NULL,
  `description` VARCHAR(500) NULL,
  PRIMARY KEY (`type`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_GUI`.`Eating Disorders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_GUI`.`Eating Disorders` (
  `type` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NULL,
  `description` VARCHAR(240) NULL,
  PRIMARY KEY (`type`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_GUI`.`Allergies`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_GUI`.`Allergies` (
  `type` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NULL,
  `description` VARCHAR(240) NULL,
  PRIMARY KEY (`type`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_GUI`.`Account  Workouts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_GUI`.`Account  Workouts` (
  `userid` INT NOT NULL,
  `workoutid` INT NULL,
  `share` INT NULL,
  `cardioProg` INT NULL,
  `upperProg` INT NULL,
  `lowerProg` INT NULL,
  `coreProg` INT NULL,
  PRIMARY KEY (`userid`))
ENGINE = InnoDB;

USE `DB_GUI`;

DELIMITER $$
USE `DB_GUI`$$
CREATE DEFINER = CURRENT_USER TRIGGER `DB_GUI`.`Ideal_body_BEFORE_INSERT` BEFORE INSERT ON `Ideal_body` FOR EACH ROW
BEGIN

END
$$


DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `DB_GUI`.`User_info`
-- -----------------------------------------------------
START TRANSACTION;
USE `DB_GUI`;
INSERT INTO `DB_GUI`.`User_info` (`userid`, `fName`, `lName`, `Height`, `Weight`, `Age`) VALUES (123, 'Jane', 'Doe', 5.7, 160, 28);
INSERT INTO `DB_GUI`.`User_info` (`userid`, `fName`, `lName`, `Height`, `Weight`, `Age`) VALUES (456, 'John', 'Doe', 6.3, 210, 25);

COMMIT;


-- -----------------------------------------------------
-- Data for table `DB_GUI`.`Ideal_body`
-- -----------------------------------------------------
START TRANSACTION;
USE `DB_GUI`;
INSERT INTO `DB_GUI`.`Ideal_body` (`height`, `weight`) VALUES ('4\'6', '63-77');
INSERT INTO `DB_GUI`.`Ideal_body` (`height`, `weight`) VALUES ('4\'7', '68-84');
INSERT INTO `DB_GUI`.`Ideal_body` (`height`, `weight`) VALUES ('4\'8', '72-88');
INSERT INTO `DB_GUI`.`Ideal_body` (`height`, `weight`) VALUES ('4\'9', '77-94');
INSERT INTO `DB_GUI`.`Ideal_body` (`height`, `weight`) VALUES ('4\'10', '81-99');
INSERT INTO `DB_GUI`.`Ideal_body` (`height`, `weight`) VALUES ('4\'11', '86-105');
INSERT INTO `DB_GUI`.`Ideal_body` (`height`, `weight`) VALUES ('5\'0', '90-110');
INSERT INTO `DB_GUI`.`Ideal_body` (`height`, `weight`) VALUES ('5\'1', '95-116');
INSERT INTO `DB_GUI`.`Ideal_body` (`height`, `weight`) VALUES ('5\'2', '99-121');
INSERT INTO `DB_GUI`.`Ideal_body` (`height`, `weight`) VALUES ('5\'3', '104-127');
INSERT INTO `DB_GUI`.`Ideal_body` (`height`, `weight`) VALUES ('5\'4', '108-132');
INSERT INTO `DB_GUI`.`Ideal_body` (`height`, `weight`) VALUES ('5\'5', '113-138');
INSERT INTO `DB_GUI`.`Ideal_body` (`height`, `weight`) VALUES ('5\'6', '117-143');
INSERT INTO `DB_GUI`.`Ideal_body` (`height`, `weight`) VALUES ('5\'7', '122-149');
INSERT INTO `DB_GUI`.`Ideal_body` (`height`, `weight`) VALUES ('5\'8', '126-154');
INSERT INTO `DB_GUI`.`Ideal_body` (`height`, `weight`) VALUES ('5\'9', '131-160');
INSERT INTO `DB_GUI`.`Ideal_body` (`height`, `weight`) VALUES ('5\'10', '135-160');
INSERT INTO `DB_GUI`.`Ideal_body` (`height`, `weight`) VALUES ('5\'11', '136-172');
INSERT INTO `DB_GUI`.`Ideal_body` (`height`, `weight`) VALUES ('6\'0', '140-177');
INSERT INTO `DB_GUI`.`Ideal_body` (`height`, `weight`) VALUES ('6\'1', '144-182');
INSERT INTO `DB_GUI`.`Ideal_body` (`height`, `weight`) VALUES ('6\'2', '171-186');
INSERT INTO `DB_GUI`.`Ideal_body` (`height`, `weight`) VALUES ('6\'3', '152-192');
INSERT INTO `DB_GUI`.`Ideal_body` (`height`, `weight`) VALUES ('6\'4', '182-222');

COMMIT;


-- -----------------------------------------------------
-- Data for table `DB_GUI`.`Sleep`
-- -----------------------------------------------------
START TRANSACTION;
USE `DB_GUI`;
INSERT INTO `DB_GUI`.`Sleep` (`type`, `name`, `description`) VALUES ('sleep', 'insomnia', 'inability to sleep');
INSERT INTO `DB_GUI`.`Sleep` (`type`, `name`, `description`) VALUES ('sleep', 'sleep apnea', 'Sleep apnea is a common condition in the United States. It can occur when the upper airway becomes blocked repeatedly during sleep, reducing or completely stopping airflow. This is known as obstructive sleep apnea. If the brain does not send the signals needed to breathe, the condition may be called central sleep apnea.');
INSERT INTO `DB_GUI`.`Sleep` (`type`, `name`, `description`) VALUES ('sleep', 'restless leg syndrome', 'a disorder characterized by an unpleasant tickling or twitching sensation in the leg muscles when sitting or lying down, which is relieved only by moving the legs.');
INSERT INTO `DB_GUI`.`Sleep` (`type`, `name`, `description`) VALUES ('sleep', 'sleep walking', 'a phenomenon of combined sleep and wakefulness.');

COMMIT;


-- -----------------------------------------------------
-- Data for table `DB_GUI`.`Allergies`
-- -----------------------------------------------------
START TRANSACTION;
USE `DB_GUI`;
INSERT INTO `DB_GUI`.`Allergies` (`type`, `name`, `description`) VALUES ('food', 'Lactose', 'Milk,Cheese,Yogurt,Butter');
INSERT INTO `DB_GUI`.`Allergies` (`type`, `name`, `description`) VALUES ('food', 'Nut', 'Almonds,Peanuts,Cashew,Pine Nuts,Pecans,Pistachio');
INSERT INTO `DB_GUI`.`Allergies` (`type`, `name`, `description`) VALUES ('food', 'Peanuts', 'All products made of peanuts.');
INSERT INTO `DB_GUI`.`Allergies` (`type`, `name`, `description`) VALUES ('food', 'Citrus', 'Lemon,Orange,Lime,Grapefruit,Clementimes');
INSERT INTO `DB_GUI`.`Allergies` (`type`, `name`, `description`) VALUES ('food', 'Fish', 'Salmon,Tuna,Cod,Bass,Mussels,Oysters,Flounder,Haddock,Perch,Tilipia');
INSERT INTO `DB_GUI`.`Allergies` (`type`, `name`, `description`) VALUES ('food', 'Shellfish', 'Shrimp,Crawfish,Crab,Prawns');
INSERT INTO `DB_GUI`.`Allergies` (`type`, `name`, `description`) VALUES ('food', 'Eggs', 'all products that are made up of eggs.');
INSERT INTO `DB_GUI`.`Allergies` (`type`, `name`, `description`) VALUES ('food', 'Soy', 'Soybeans,Soy Sauce,Tofu');
INSERT INTO `DB_GUI`.`Allergies` (`type`, `name`, `description`) VALUES ('food', 'Corn', 'All products that are made up of corn.');
INSERT INTO `DB_GUI`.`Allergies` (`type`, `name`, `description`) VALUES ('food', 'Spices', 'Cinammon,Tumeric,Pepper,Salt,Celery,Mustard,Anis,Coriander,Cumin,Fennel,Parsley,Ragweed,Echinacea,Artichoke,Dandelions,Hibiscus');
INSERT INTO `DB_GUI`.`Allergies` (`type`, `name`, `description`) VALUES ('food', 'Gelatin', 'All products that contain gelatin.');
INSERT INTO `DB_GUI`.`Allergies` (`type`, `name`, `description`) VALUES ('food', 'Meat', 'Beef,Pork,Chicken,Turkey,Lamb,Goat,Fish');
INSERT INTO `DB_GUI`.`Allergies` (`type`, `name`, `description`) VALUES ('food', 'Seeds', 'Seasme,Sunflower,Poppy,Pumpkin');

COMMIT;
