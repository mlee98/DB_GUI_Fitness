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
  `height` INT NOT NULL,
  `weight` INT NULL,
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
  `description` VARCHAR(240) NULL,
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


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
