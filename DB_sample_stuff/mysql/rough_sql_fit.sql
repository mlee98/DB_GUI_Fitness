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
-- Table `DB_GUI`.`Disorders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_GUI`.`Disorders` (
  `Type` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Type`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_GUI`.`UserInfo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_GUI`.`UserInfo` (
  `UserId` INT NOT NULL,
  `fName` VARCHAR(45) NULL,
  `lName` VARCHAR(45) NULL,
  `Height` VARCHAR(45) NULL,
  `Weight` VARCHAR(45) NULL,
  `Age` VARCHAR(45) NULL,
  `UserName` VARCHAR(45) NULL,
  `Disability` VARCHAR(45) NULL,
  `Disorders_Type` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`UserId`, `Disorders_Type`),
  INDEX `fk_UserInfo_Disorders1_idx` (`Disorders_Type` ASC),
  CONSTRAINT `fk_UserInfo_Disorders1`
    FOREIGN KEY (`Disorders_Type`)
    REFERENCES `DB_GUI`.`Disorders` (`Type`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_GUI`.`Workouts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_GUI`.`Workouts` (
  `WorkoutPlan#` INT NOT NULL,
  `Primary Area` VARCHAR(45) NULL,
  `Exercise1` VARCHAR(45) NULL,
  `Exercise2` VARCHAR(45) NULL,
  `Exercise3` VARCHAR(45) NULL,
  `Exercise4` VARCHAR(45) NULL,
  PRIMARY KEY (`WorkoutPlan#`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_GUI`.`Fitness_Tracker`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_GUI`.`Fitness_Tracker` (
  `WorkoutPlan#` INT NOT NULL,
  `PlanDesc` VARCHAR(45) NULL,
  `Cardio` VARCHAR(45) NULL,
  `UpperBody` VARCHAR(45) NULL,
  `LowerBody` VARCHAR(45) NULL,
  `Core` VARCHAR(45) NULL,
  `Workouts_WorkoutPlan#` INT NOT NULL,
  PRIMARY KEY (`WorkoutPlan#`, `Workouts_WorkoutPlan#`),
  INDEX `fk_Fitness_Tracker_Workouts1_idx` (`Workouts_WorkoutPlan#` ASC),
  CONSTRAINT `fk_Fitness_Tracker_Workouts1`
    FOREIGN KEY (`Workouts_WorkoutPlan#`)
    REFERENCES `DB_GUI`.`Workouts` (`WorkoutPlan#`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_GUI`.`Diet_Plan`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_GUI`.`Diet_Plan` (
  `Plan#` VARCHAR(45) NOT NULL,
  `Name` VARCHAR(45) NULL,
  PRIMARY KEY (`Plan#`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_GUI`.`Ideal_body`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_GUI`.`Ideal_body` (
  `Height` VARCHAR(45) NOT NULL,
  `Weight` VARCHAR(45) NULL,
  PRIMARY KEY (`Height`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_GUI`.`Account_Workous`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_GUI`.`Account_Workous` (
  `UserId` INT NOT NULL,
  `Primary_Area` INT NULL,
  `Share` TINYINT NULL,
  `cardioProg` TINYINT NULL,
  `upperProg` INT NULL,
  `lowerProg` INT NULL,
  `coreProg` INT NULL,
  `Fitness_Tracker_WorkoutPlan#` INT NOT NULL,
  `Diet_Plan_Plan#` VARCHAR(45) NOT NULL,
  `Ideal_body_Height` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`UserId`, `Fitness_Tracker_WorkoutPlan#`, `Diet_Plan_Plan#`),
  INDEX `fk_Account_Workous_Fitness_Tracker1_idx` (`Fitness_Tracker_WorkoutPlan#` ASC),
  INDEX `fk_Account_Workous_Diet_Plan1_idx` (`Diet_Plan_Plan#` ASC),
  INDEX `fk_Account_Workous_Ideal_body1_idx` (`Ideal_body_Height` ASC),
  CONSTRAINT `fk_Account_Workous_Fitness_Tracker1`
    FOREIGN KEY (`Fitness_Tracker_WorkoutPlan#`)
    REFERENCES `DB_GUI`.`Fitness_Tracker` (`WorkoutPlan#`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Account_Workous_Diet_Plan1`
    FOREIGN KEY (`Diet_Plan_Plan#`)
    REFERENCES `DB_GUI`.`Diet_Plan` (`Plan#`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Account_Workous_Ideal_body1`
    FOREIGN KEY (`Ideal_body_Height`)
    REFERENCES `DB_GUI`.`Ideal_body` (`Height`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_GUI`.`Login`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_GUI`.`Login` (
  `Username` VARCHAR(45) NOT NULL,
  `Password` VARCHAR(45) NULL,
  `Userid` INT NULL,
  `UserInfo_UserId` INT NOT NULL,
  `Account_Workous_UserId` INT NOT NULL,
  PRIMARY KEY (`Username`, `UserInfo_UserId`, `Account_Workous_UserId`),
  INDEX `fk_Login_UserInfo_idx` (`UserInfo_UserId` ASC),
  INDEX `fk_Login_Account_Workous1_idx` (`Account_Workous_UserId` ASC),
  CONSTRAINT `fk_Login_UserInfo`
    FOREIGN KEY (`UserInfo_UserId`)
    REFERENCES `DB_GUI`.`UserInfo` (`UserId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Login_Account_Workous1`
    FOREIGN KEY (`Account_Workous_UserId`)
    REFERENCES `DB_GUI`.`Account_Workous` (`UserId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_GUI`.`Eating Disorders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_GUI`.`Eating Disorders` (
  `Name` VARCHAR(45) NOT NULL,
  `Description` VARCHAR(240) NULL,
  `Type` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Type`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_GUI`.`Allergies`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_GUI`.`Allergies` (
  `Name` VARCHAR(45) NOT NULL,
  `Description` VARCHAR(240) NULL,
  `Allergies` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Allergies`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_GUI`.`VeganPlan`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_GUI`.`VeganPlan` (
  `Meal#` INT NOT NULL,
  `Breakfast` VARCHAR(45) NULL,
  `Lunch` VARCHAR(45) NULL,
  `Dinner` VARCHAR(45) NULL,
  `Snack` VARCHAR(45) NULL,
  PRIMARY KEY (`Meal#`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_GUI`.`Nut-free`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_GUI`.`Nut-free` (
  `Meal#` INT NOT NULL,
  `Breakfast` VARCHAR(45) NULL,
  `Lunch` VARCHAR(45) NULL,
  `Dinner` VARCHAR(45) NULL,
  `Snack` VARCHAR(45) NULL,
  PRIMARY KEY (`Meal#`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_GUI`.`HighProtein`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_GUI`.`HighProtein` (
  `Meal#` INT NOT NULL,
  `Breakfast` VARCHAR(45) NULL,
  `Lunch` VARCHAR(45) NULL,
  `Dinner` VARCHAR(45) NULL,
  `Snack` VARCHAR(45) NULL,
  PRIMARY KEY (`Meal#`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_GUI`.`LowFat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_GUI`.`LowFat` (
  `Meal#` INT NOT NULL,
  `Breakfast` VARCHAR(45) NULL,
  `Lunch` VARCHAR(45) NULL,
  `Dinner` VARCHAR(45) NULL,
  `Snack` VARCHAR(45) NULL,
  PRIMARY KEY (`Meal#`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_GUI`.`Gluten-Free`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_GUI`.`Gluten-Free` (
  `Meal#` INT NOT NULL,
  `Breakfast` VARCHAR(45) NULL,
  `Lunch` VARCHAR(45) NULL,
  `Dinner` VARCHAR(45) NULL,
  `Snack` VARCHAR(45) NULL,
  PRIMARY KEY (`Meal#`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_GUI`.`Normal`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_GUI`.`Normal` (
  `Meal#` INT NOT NULL AUTO_INCREMENT,
  `Breakfast` VARCHAR(45) NULL,
  `Lunch` VARCHAR(45) NULL,
  `Dinner` VARCHAR(45) NULL,
  `Snack` VARCHAR(45) NULL)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_GUI`.`NoCarbs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_GUI`.`NoCarbs` (
  `Meal#` INT NOT NULL AUTO_INCREMENT,
  `Breakfast` VARCHAR(45) NULL,
  `Lunch` VARCHAR(45) NULL,
  `Dinner` VARCHAR(45) NULL,
  `Snack` VARCHAR(45) NULL)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `DB_GUI`.`Disorders`
-- -----------------------------------------------------
START TRANSACTION;
USE `DB_GUI`;
INSERT INTO `DB_GUI`.`Disorders` (`Type`) VALUES ('Eating_Disorders');
INSERT INTO `DB_GUI`.`Disorders` (`Type`) VALUES ('Allergies');

COMMIT;


-- -----------------------------------------------------
-- Data for table `DB_GUI`.`UserInfo`
-- -----------------------------------------------------
START TRANSACTION;
USE `DB_GUI`;
INSERT INTO `DB_GUI`.`UserInfo` (`UserId`, `fName`, `lName`, `Height`, `Weight`, `Age`, `UserName`, `Disability`, `Disorders_Type`) VALUES (123, 'Jane', 'Doe', '5.7', '160', '28', NULL, NULL, DEFAULT);
INSERT INTO `DB_GUI`.`UserInfo` (`UserId`, `fName`, `lName`, `Height`, `Weight`, `Age`, `UserName`, `Disability`, `Disorders_Type`) VALUES (456, 'John', 'Doe', '6.3', '210', '25', NULL, NULL, DEFAULT);

COMMIT;


-- -----------------------------------------------------
-- Data for table `DB_GUI`.`Workouts`
-- -----------------------------------------------------
START TRANSACTION;
USE `DB_GUI`;
INSERT INTO `DB_GUI`.`Workouts` (`WorkoutPlan#`, `Primary Area`, `Exercise1`, `Exercise2`, `Exercise3`, `Exercise4`) VALUES (1, 'Core', 'Crunches', 'Plank', 'Dips', 'Stairstepper');
INSERT INTO `DB_GUI`.`Workouts` (`WorkoutPlan#`, `Primary Area`, `Exercise1`, `Exercise2`, `Exercise3`, `Exercise4`) VALUES (2, 'Core', 'Crunches', 'Flutterkicks', 'Curls', 'Erg');
INSERT INTO `DB_GUI`.`Workouts` (`WorkoutPlan#`, `Primary Area`, `Exercise1`, `Exercise2`, `Exercise3`, `Exercise4`) VALUES (3, 'Core', 'Plank', 'Russian Twists', 'Erg', 'Lunges');
INSERT INTO `DB_GUI`.`Workouts` (`WorkoutPlan#`, `Primary Area`, `Exercise1`, `Exercise2`, `Exercise3`, `Exercise4`) VALUES (4, 'Core', 'Plank', 'Flutterkicks', 'Elliptical', 'Squats');
INSERT INTO `DB_GUI`.`Workouts` (`WorkoutPlan#`, `Primary Area`, `Exercise1`, `Exercise2`, `Exercise3`, `Exercise4`) VALUES (5, 'Arms', 'Dips', 'Curls', 'Calf Raises', 'Plank');
INSERT INTO `DB_GUI`.`Workouts` (`WorkoutPlan#`, `Primary Area`, `Exercise1`, `Exercise2`, `Exercise3`, `Exercise4`) VALUES (6, 'Arms', 'Dips', 'Pushups', 'Leg Presses', 'Russian Twists');
INSERT INTO `DB_GUI`.`Workouts` (`WorkoutPlan#`, `Primary Area`, `Exercise1`, `Exercise2`, `Exercise3`, `Exercise4`) VALUES (7, 'Arms', 'Chinups', 'Curls', 'Treadmill', 'Squats');
INSERT INTO `DB_GUI`.`Workouts` (`WorkoutPlan#`, `Primary Area`, `Exercise1`, `Exercise2`, `Exercise3`, `Exercise4`) VALUES (8, 'Arms', 'Chinups', 'Pushups', 'Elliptical', 'Lunges');
INSERT INTO `DB_GUI`.`Workouts` (`WorkoutPlan#`, `Primary Area`, `Exercise1`, `Exercise2`, `Exercise3`, `Exercise4`) VALUES (9, 'Legs', 'Squats', 'Lunges', 'Chinups', 'Crunches');
INSERT INTO `DB_GUI`.`Workouts` (`WorkoutPlan#`, `Primary Area`, `Exercise1`, `Exercise2`, `Exercise3`, `Exercise4`) VALUES (10, 'Legs', 'Squats', 'Calf Raises', 'Pushups', 'Flutterkicks');
INSERT INTO `DB_GUI`.`Workouts` (`WorkoutPlan#`, `Primary Area`, `Exercise1`, `Exercise2`, `Exercise3`, `Exercise4`) VALUES (11, 'Legs', 'Lunges', 'Leg Presses', 'Treadmill', 'Curls');
INSERT INTO `DB_GUI`.`Workouts` (`WorkoutPlan#`, `Primary Area`, `Exercise1`, `Exercise2`, `Exercise3`, `Exercise4`) VALUES (12, 'Legs', 'Lunges', 'Calf Raises', 'Stairstepper', 'Dips');
INSERT INTO `DB_GUI`.`Workouts` (`WorkoutPlan#`, `Primary Area`, `Exercise1`, `Exercise2`, `Exercise3`, `Exercise4`) VALUES (13, 'Cardio', 'Treadmill', 'Elliptical', 'Pushups', 'Russian Twists');
INSERT INTO `DB_GUI`.`Workouts` (`WorkoutPlan#`, `Primary Area`, `Exercise1`, `Exercise2`, `Exercise3`, `Exercise4`) VALUES (14, 'Cardio', 'Treadmill', 'Stairstepper', 'Curls', 'Flutterkicks');
INSERT INTO `DB_GUI`.`Workouts` (`WorkoutPlan#`, `Primary Area`, `Exercise1`, `Exercise2`, `Exercise3`, `Exercise4`) VALUES (15, 'Cardio', 'Elliptical', 'Stairstepper', 'Crunches', 'Calf Raises');
INSERT INTO `DB_GUI`.`Workouts` (`WorkoutPlan#`, `Primary Area`, `Exercise1`, `Exercise2`, `Exercise3`, `Exercise4`) VALUES (16, 'Cardio', 'Elliptical', 'Erg', 'Plank', 'Leg Presses');

COMMIT;


-- -----------------------------------------------------
-- Data for table `DB_GUI`.`Fitness_Tracker`
-- -----------------------------------------------------
START TRANSACTION;
USE `DB_GUI`;
INSERT INTO `DB_GUI`.`Fitness_Tracker` (`WorkoutPlan#`, `PlanDesc`, `Cardio`, `UpperBody`, `LowerBody`, `Core`, `Workouts_WorkoutPlan#`) VALUES (1, 'Weight Loss', '60', '10', '10', '20', DEFAULT);

COMMIT;


-- -----------------------------------------------------
-- Data for table `DB_GUI`.`Diet_Plan`
-- -----------------------------------------------------
START TRANSACTION;
USE `DB_GUI`;
INSERT INTO `DB_GUI`.`Diet_Plan` (`Plan#`, `Name`) VALUES ('1', 'Normal');
INSERT INTO `DB_GUI`.`Diet_Plan` (`Plan#`, `Name`) VALUES ('2', 'Nut-free');
INSERT INTO `DB_GUI`.`Diet_Plan` (`Plan#`, `Name`) VALUES ('3', 'Lowfat');
INSERT INTO `DB_GUI`.`Diet_Plan` (`Plan#`, `Name`) VALUES ('4', 'Gluten-free');
INSERT INTO `DB_GUI`.`Diet_Plan` (`Plan#`, `Name`) VALUES ('5', 'No Carbs');
INSERT INTO `DB_GUI`.`Diet_Plan` (`Plan#`, `Name`) VALUES ('6', 'High Protein');

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
-- Data for table `DB_GUI`.`Eating Disorders`
-- -----------------------------------------------------
START TRANSACTION;
USE `DB_GUI`;
INSERT INTO `DB_GUI`.`Eating Disorders` (`Name`, `Description`, `Type`) VALUES ('Binge Eating Disorder', 'The consumption of large quantities of food in a short period of time, typically as part of an eating disorder.', 'Eating Disorder');
INSERT INTO `DB_GUI`.`Eating Disorders` (`Name`, `Description`, `Type`) VALUES ('Night Eating Disorder', 'Night eating syndrome (NES) is a condition that combines overeating at night with sleep problems.', 'Eating Disorder');
INSERT INTO `DB_GUI`.`Eating Disorders` (`Name`, `Description`, `Type`) VALUES ('Bulima Nervosa', 'This is a serious, potentially life-threatening eating disorder characterized by a cycle of bingeing and compensatory behaviors such as self-induced vomiting designed to undo or compensate for the effects of binge eating.', 'Eating Disorder');
INSERT INTO `DB_GUI`.`Eating Disorders` (`Name`, `Description`, `Type`) VALUES ('Anoxeria Nervosa', 'This is a psychological and potentially life-threatening eating disorder. Those suffering from this eating disorder are typically suffering from an extremely low body weight relative to their height and body type.', 'Eating Disorder');

COMMIT;


-- -----------------------------------------------------
-- Data for table `DB_GUI`.`Allergies`
-- -----------------------------------------------------
START TRANSACTION;
USE `DB_GUI`;
INSERT INTO `DB_GUI`.`Allergies` (`Name`, `Description`, `Allergies`) VALUES ('Lactose', 'Milk,Cheese,Yogurt,Butter', 'Allergy');
INSERT INTO `DB_GUI`.`Allergies` (`Name`, `Description`, `Allergies`) VALUES ('Nut', 'Almonds,Peanuts,Cashew,Pine Nuts,Pecans,Pistachio', 'Allergy');
INSERT INTO `DB_GUI`.`Allergies` (`Name`, `Description`, `Allergies`) VALUES ('Peanuts', 'All products made of peanuts.', 'Allergy');
INSERT INTO `DB_GUI`.`Allergies` (`Name`, `Description`, `Allergies`) VALUES ('Citrus', 'Lemon,Orange,Lime,Grapefruit,Clementimes', 'Allergy');
INSERT INTO `DB_GUI`.`Allergies` (`Name`, `Description`, `Allergies`) VALUES ('Fish', 'Salmon,Tuna,Cod,Bass,Mussels,Oysters,Flounder,Haddock,Perch,Tilipia', 'Allergy');
INSERT INTO `DB_GUI`.`Allergies` (`Name`, `Description`, `Allergies`) VALUES ('Shellfish', 'Shrimp,Crawfish,Crab,Prawns', 'Allergy');
INSERT INTO `DB_GUI`.`Allergies` (`Name`, `Description`, `Allergies`) VALUES ('Eggs', 'all products that are made up of eggs.', 'Allergy');
INSERT INTO `DB_GUI`.`Allergies` (`Name`, `Description`, `Allergies`) VALUES ('Soy', 'Soybeans,Soy Sauce,Tofu', 'Allergy');

COMMIT;


-- -----------------------------------------------------
-- Data for table `DB_GUI`.`VeganPlan`
-- -----------------------------------------------------
START TRANSACTION;
USE `DB_GUI`;
INSERT INTO `DB_GUI`.`VeganPlan` (`Meal#`, `Breakfast`, `Lunch`, `Dinner`, `Snack`) VALUES (1, 'Vegan Pancakes', 'Salad', 'Zucchini', 'Almonds');
INSERT INTO `DB_GUI`.`VeganPlan` (`Meal#`, `Breakfast`, `Lunch`, `Dinner`, `Snack`) VALUES (2, 'Quinoa Breakfast Cereal', 'Tempeh Bowl', 'Veggie Kabobs', 'Apple');
INSERT INTO `DB_GUI`.`VeganPlan` (`Meal#`, `Breakfast`, `Lunch`, `Dinner`, `Snack`) VALUES (3, 'Flourless Pumpkin Muffins', 'Crispy Tofu Bowl', 'Pesto Pasta', 'Grapes');
INSERT INTO `DB_GUI`.`VeganPlan` (`Meal#`, `Breakfast`, `Lunch`, `Dinner`, `Snack`) VALUES (4, 'Vegan French Toast', 'Curried Lentils', 'Spring Minestrone', 'Carrots');
INSERT INTO `DB_GUI`.`VeganPlan` (`Meal#`, `Breakfast`, `Lunch`, `Dinner`, `Snack`) VALUES (5, 'Avocado Toast', 'Avocado Salad', 'Mushroom Burger', 'Strawberries');

COMMIT;


-- -----------------------------------------------------
-- Data for table `DB_GUI`.`Nut-free`
-- -----------------------------------------------------
START TRANSACTION;
USE `DB_GUI`;
INSERT INTO `DB_GUI`.`Nut-free` (`Meal#`, `Breakfast`, `Lunch`, `Dinner`, `Snack`) VALUES (1, 'Breakfast Tacos', 'Sunbutter and banana sandwhich', 'Roasted Vegetable Enchiladas', 'Pretzels');
INSERT INTO `DB_GUI`.`Nut-free` (`Meal#`, `Breakfast`, `Lunch`, `Dinner`, `Snack`) VALUES (2, 'Breakfast Soup', 'Pasta Salad', 'Lemon and Herb Lamb Chops', 'Roasted Chickpeas');
INSERT INTO `DB_GUI`.`Nut-free` (`Meal#`, `Breakfast`, `Lunch`, `Dinner`, `Snack`) VALUES (3, 'Waffles', 'Cold Noddle Salad', 'Chicken and Sausage with Bowties', 'Popcorn');
INSERT INTO `DB_GUI`.`Nut-free` (`Meal#`, `Breakfast`, `Lunch`, `Dinner`, `Snack`) VALUES (4, 'Crepes', 'Tortilla Wrap', 'Cranberry Glazed Turkey Breast', 'Rice Crackers');
INSERT INTO `DB_GUI`.`Nut-free` (`Meal#`, `Breakfast`, `Lunch`, `Dinner`, `Snack`) VALUES (5, 'Doughnuts', 'Quesadillas', 'Honey Mustard Garlic Rack-of-Lamb', 'Sunchips');

COMMIT;


-- -----------------------------------------------------
-- Data for table `DB_GUI`.`HighProtein`
-- -----------------------------------------------------
START TRANSACTION;
USE `DB_GUI`;
INSERT INTO `DB_GUI`.`HighProtein` (`Meal#`, `Breakfast`, `Lunch`, `Dinner`, `Snack`) VALUES (1, 'Baked Eggs Avocados', 'Portobello Stuffed Pizza', 'Protein-Style Thai Turkey Wraps', 'Jerky');
INSERT INTO `DB_GUI`.`HighProtein` (`Meal#`, `Breakfast`, `Lunch`, `Dinner`, `Snack`) VALUES (2, 'Feta Egg Toast', 'Chickpea Spinach Salad', 'Best Healthy Turkey Chili', 'Trail Mix');
INSERT INTO `DB_GUI`.`HighProtein` (`Meal#`, `Breakfast`, `Lunch`, `Dinner`, `Snack`) VALUES (3, 'Poached Eggs with Tomato', 'Avocado Greek Yogurt Chicken Salad', 'Sesame Beef', 'Tuna');
INSERT INTO `DB_GUI`.`HighProtein` (`Meal#`, `Breakfast`, `Lunch`, `Dinner`, `Snack`) VALUES (4, 'Cottage Cheese with Fruit and Toast', 'Salmon Quinoa Bowl', 'Mexican Tuna Salad With Avocado', 'Peanut Butter Celery Sticks');
INSERT INTO `DB_GUI`.`HighProtein` (`Meal#`, `Breakfast`, `Lunch`, `Dinner`, `Snack`) VALUES (5, 'Peanut Butter Oats', 'Southwestern Veggie Hummus Wraps', 'Greek-Braised Cod With Tomatoes and Kalamata Olives', 'Turkey Roll ups');

COMMIT;


-- -----------------------------------------------------
-- Data for table `DB_GUI`.`LowFat`
-- -----------------------------------------------------
START TRANSACTION;
USE `DB_GUI`;
INSERT INTO `DB_GUI`.`LowFat` (`Meal#`, `Breakfast`, `Lunch`, `Dinner`, `Snack`) VALUES (1, 'Zucchini Breakfast Bowl', 'Asian Noodle Salad', 'Pepperoni Pizza', 'Peanut Butter & Celery');
INSERT INTO `DB_GUI`.`LowFat` (`Meal#`, `Breakfast`, `Lunch`, `Dinner`, `Snack`) VALUES (2, 'Apple Breakfast Porridge', 'Mediterranean Orzo Salad', 'Lemon-Olive Grilled Chicken', 'Cottage Cheese');
INSERT INTO `DB_GUI`.`LowFat` (`Meal#`, `Breakfast`, `Lunch`, `Dinner`, `Snack`) VALUES (3, 'Breakfast Salad', 'Spinach Artichoke Quiche Cup', 'Shrimp à la Grecque', 'Rice Cake and Almond Butter');
INSERT INTO `DB_GUI`.`LowFat` (`Meal#`, `Breakfast`, `Lunch`, `Dinner`, `Snack`) VALUES (4, 'Blueberry Oatmeal', 'Baked Tofu Sushi Bowl', 'Teriyaki Chicken and Soba Noodles', 'Choclate Banana');
INSERT INTO `DB_GUI`.`LowFat` (`Meal#`, `Breakfast`, `Lunch`, `Dinner`, `Snack`) VALUES (5, 'BLT Breakfast Salad', 'Tuna and Chickpea Pita Sandwiches', 'Roast Dijon Chicken and Vegetables', 'Almonds');

COMMIT;


-- -----------------------------------------------------
-- Data for table `DB_GUI`.`Gluten-Free`
-- -----------------------------------------------------
START TRANSACTION;
USE `DB_GUI`;
INSERT INTO `DB_GUI`.`Gluten-Free` (`Meal#`, `Breakfast`, `Lunch`, `Dinner`, `Snack`) VALUES (1, 'Muffins', 'Gluten-free Quinoa Burgers', 'Vegan Chili', 'Apples');
INSERT INTO `DB_GUI`.`Gluten-Free` (`Meal#`, `Breakfast`, `Lunch`, `Dinner`, `Snack`) VALUES (2, 'Scones', 'Portobello and Zucchini Taco', 'Zucchini Crust Pizza', 'Frozen Grapes');
INSERT INTO `DB_GUI`.`Gluten-Free` (`Meal#`, `Breakfast`, `Lunch`, `Dinner`, `Snack`) VALUES (3, 'Chocolate Chip Pancakes', 'Creamy Cashew Potato and Pasta Salad', 'Buffalo Chicken Tenders', 'Carrots');
INSERT INTO `DB_GUI`.`Gluten-Free` (`Meal#`, `Breakfast`, `Lunch`, `Dinner`, `Snack`) VALUES (4, 'Waffles', 'Grilled Stuff Bacon Cheeseburger', 'Greek Stuffed Chicken', 'Cucumbers');
INSERT INTO `DB_GUI`.`Gluten-Free` (`Meal#`, `Breakfast`, `Lunch`, `Dinner`, `Snack`) VALUES (5, 'Quinoa Bowl', 'BLT Chopped Salad', 'Cranberry Balasmic Chicken', 'Celery');

COMMIT;


-- -----------------------------------------------------
-- Data for table `DB_GUI`.`Normal`
-- -----------------------------------------------------
START TRANSACTION;
USE `DB_GUI`;
INSERT INTO `DB_GUI`.`Normal` (`Meal#`, `Breakfast`, `Lunch`, `Dinner`, `Snack`) VALUES (1, 'Pancakes', 'Turkey Sandwhich', 'Pizza', 'Apples');
INSERT INTO `DB_GUI`.`Normal` (`Meal#`, `Breakfast`, `Lunch`, `Dinner`, `Snack`) VALUES (2, 'Waffles', 'Chicken Salad', 'Tacos', 'Chips');
INSERT INTO `DB_GUI`.`Normal` (`Meal#`, `Breakfast`, `Lunch`, `Dinner`, `Snack`) VALUES (3, 'Crepes', 'Chorizo Risotto', 'Burritos', 'Popcorn');
INSERT INTO `DB_GUI`.`Normal` (`Meal#`, `Breakfast`, `Lunch`, `Dinner`, `Snack`) VALUES (4, 'French Toast', 'Lamb Kabobs', 'Stir Fry', 'Watermelon');
INSERT INTO `DB_GUI`.`Normal` (`Meal#`, `Breakfast`, `Lunch`, `Dinner`, `Snack`) VALUES (5, 'Bacon and Eggs', 'Crab', 'Steak and Potatoes', 'Strawberries');

COMMIT;


-- -----------------------------------------------------
-- Data for table `DB_GUI`.`NoCarbs`
-- -----------------------------------------------------
START TRANSACTION;
USE `DB_GUI`;
INSERT INTO `DB_GUI`.`NoCarbs` (`Meal#`, `Breakfast`, `Lunch`, `Dinner`, `Snack`) VALUES (1, 'Flourless Egg and Cottage Cheese Savory Breakfast Muffins', 'Caprese Avocado Salad', 'Barbacoa', 'Black Pepper Beef Jerky');
INSERT INTO `DB_GUI`.`NoCarbs` (`Meal#`, `Breakfast`, `Lunch`, `Dinner`, `Snack`) VALUES (2, 'Cream Cheese Pancakes', 'Shrimp & Cauliflower Salad', 'Roast Beef Salad', 'Cloud Bread');
INSERT INTO `DB_GUI`.`NoCarbs` (`Meal#`, `Breakfast`, `Lunch`, `Dinner`, `Snack`) VALUES (3, 'Cream Cheese Pancakes', 'California Turkey and Bacon Lettuce Wraps', 'BBQ Chicken Cobb Salad', 'Crispy Parmesan Tomato Chips');
INSERT INTO `DB_GUI`.`NoCarbs` (`Meal#`, `Breakfast`, `Lunch`, `Dinner`, `Snack`) VALUES (4, 'Spinach, Mushroom and Feta Crustless Quiche', 'Chicken and Asparagus Lemon Stir Fry', 'Veggie “Sushi” Rolls', 'Avocado Crisps');
INSERT INTO `DB_GUI`.`NoCarbs` (`Meal#`, `Breakfast`, `Lunch`, `Dinner`, `Snack`) VALUES (5, 'Coconut Chia Pudding', 'Salmon Chickpea Salad', 'Grilled Halloumi Salad', 'Cheesy Jalapeno Mushroom Bites');

COMMIT;
