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
  `UserId` INT NOT NULL,
  `fName` VARCHAR(45) NULL,
  `lName` VARCHAR(45) NULL,
  `Height` VARCHAR(45) NULL,
  `Weight` VARCHAR(45) NULL,
  `Age` VARCHAR(45) NULL,
  `UserName` VARCHAR(45) NULL,
  `Public` TINYINT NULL,
  `Diet` VARCHAR(45) NULL,
  PRIMARY KEY (`UserId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_GUI`.`Login`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_GUI`.`Login` (
  `UserId` INT NOT NULL,
  `Password` VARCHAR(45) NULL,
  `Username` VARCHAR(45) NULL,
  PRIMARY KEY (`UserId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_GUI`.`Fitness_Tracker`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_GUI`.`Fitness_Tracker` (
  `UserId` INT NOT NULL,
  `WorkoutPlan` INT NULL,
  `Date` DATE NULL,
  `PercentToDo` INT NULL,
  `Goal` INT NULL,
  PRIMARY KEY (`UserId`))
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
-- Table `DB_GUI`.`Disorders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_GUI`.`Disorders` (
  `Type` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Type`))
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
  PRIMARY KEY (`Name`))
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
  PRIMARY KEY (`UserId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_GUI`.`Workouts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_GUI`.`Workouts` (
  `WorkoutPlan` INT NOT NULL,
  `Primary Area` VARCHAR(45) NULL,
  `Exercise1` VARCHAR(45) NULL,
  `Exercise2` VARCHAR(45) NULL,
  `Exercise3` VARCHAR(45) NULL,
  `Exercise4` VARCHAR(45) NULL,
  `Rep1` INT NULL,
  `Rep2` INT NULL,
  `Rep3` INT NULL,
  `Rep4` INT NULL,
  PRIMARY KEY (`WorkoutPlan`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_GUI`.`Diet_Plan`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_GUI`.`Diet_Plan` (
  `Name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Name`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_GUI`.`Snack`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_GUI`.`Snack` (
  `idSnack` INT NOT NULL AUTO_INCREMENT,
  `Vegan` VARCHAR(45) NULL,
  `Low-Carb` VARCHAR(45) NULL,
  `Gluten-free` VARCHAR(45) NULL,
  `Lactose` VARCHAR(45) NULL,
  `Normal` VARCHAR(45) NULL,
  PRIMARY KEY (`idSnack`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_GUI`.`Dinner`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_GUI`.`Dinner` (
  `idDinner` INT NOT NULL AUTO_INCREMENT,
  `Normal` VARCHAR(45) NULL,
  `Lactose` VARCHAR(45) NULL,
  `Gluten-free` VARCHAR(45) NULL,
  `Low-Carb` VARCHAR(45) NULL,
  `Citrus-free` VARCHAR(45) NULL,
  `Fish-free` VARCHAR(45) NULL,
  `Low-Fat` VARCHAR(45) NULL,
  `Vegan` VARCHAR(45) NULL,
  `High-Protein` VARCHAR(45) NULL,
  `Egg-free` VARCHAR(45) NULL,
  `Nut-free` VARCHAR(45) NULL,
  PRIMARY KEY (`idDinner`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_GUI`.`Lunch`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_GUI`.`Lunch` (
  `idLunch` INT NOT NULL AUTO_INCREMENT,
  `Normal` VARCHAR(45) NULL,
  `Lactose` VARCHAR(45) NULL,
  `Gluten-free` VARCHAR(45) NULL,
  `Low-Carb` VARCHAR(45) NULL,
  `Citrus-free` VARCHAR(45) NULL,
  `Fish-free` VARCHAR(45) NULL,
  `Low-Fat` VARCHAR(45) NULL,
  `Vegan` VARCHAR(45) NULL,
  `High-Protein` VARCHAR(45) NULL,
  `Egg-free` VARCHAR(45) NULL,
  `Nut-free` VARCHAR(45) NULL,
  PRIMARY KEY (`idLunch`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_GUI`.`Breakfast`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_GUI`.`Breakfast` (
  `idBreakfast` INT NOT NULL AUTO_INCREMENT,
  `Normal` VARCHAR(45) NULL,
  `Lactose` VARCHAR(45) NULL,
  `Gluten-free` VARCHAR(45) NULL,
  `Low-Carb` VARCHAR(45) NULL,
  `Citrus-free` VARCHAR(45) NULL,
  `Fish-free` VARCHAR(45) NULL,
  `Low-Fat` VARCHAR(45) NULL,
  `Vegan` VARCHAR(45) NULL,
  `High-Protein` VARCHAR(45) NULL,
  `Egg-free` VARCHAR(45) NULL,
  `Nut-free` VARCHAR(45) NULL,
  PRIMARY KEY (`idBreakfast`))
ENGINE = InnoDB;



-- -----------------------------------------------------
-- Table `DB_GUI`.`Completed_Workouts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_GUI`.`Completed_Workouts` (
  `workoutID` INT NOT NULL AUTO_INCREMENT,
  `UserId` INT NULL,
  `WorkoutPlan` INT NULL,
  `Date` DATE NULL,
  PRIMARY KEY (`workoutID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_GUI`.`Account_Allergies`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_GUI`.`Account_Allergies` (
  `AllergyId` INT NOT NULL AUTO_INCREMENT,
  `UserId` INT NOT NULL,
  `Name` VARCHAR(240) NULL,
  PRIMARY KEY (`AllergyId`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


-- -----------------------------------------------------
-- Data for table `DB_GUI`.`Fitness_Tracker`
-- -----------------------------------------------------
START TRANSACTION;
USE `DB_GUI`;
INSERT INTO `DB_GUI`.`Fitness_Tracker` (`UserId`, `WorkoutPlan`, `Date`, `PercentToDo`, `Goal`) VALUES (1, Weight Loss, '60', 10, 10);

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
INSERT INTO `DB_GUI`.`Disorders` (`Type`) VALUES ('Allergies');

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


COMMIT;


-- -----------------------------------------------------
-- Data for table `DB_GUI`.`Workouts`
-- -----------------------------------------------------
START TRANSACTION;
USE `DB_GUI`;
INSERT INTO `DB_GUI`.`Workouts` (`WorkoutPlan`, `Primary Area`, `Exercise1`, `Exercise2`, `Exercise3`, `Exercise4`, `Rep1`, `Rep2`, `Rep3`, `Rep4`) VALUES (1, 'Core', 'Crunches', 'Plank', 'Dips', 'Stairstepper', NULL, NULL, NULL, NULL);
INSERT INTO `DB_GUI`.`Workouts` (`WorkoutPlan`, `Primary Area`, `Exercise1`, `Exercise2`, `Exercise3`, `Exercise4`, `Rep1`, `Rep2`, `Rep3`, `Rep4`) VALUES (2, 'Core', 'Crunches', 'Flutterkicks', 'Curls', 'Erg', NULL, NULL, NULL, NULL);
INSERT INTO `DB_GUI`.`Workouts` (`WorkoutPlan`, `Primary Area`, `Exercise1`, `Exercise2`, `Exercise3`, `Exercise4`, `Rep1`, `Rep2`, `Rep3`, `Rep4`) VALUES (3, 'Core', 'Plank', 'Russian Twists', 'Erg', 'Lunges', NULL, NULL, NULL, NULL);
INSERT INTO `DB_GUI`.`Workouts` (`WorkoutPlan`, `Primary Area`, `Exercise1`, `Exercise2`, `Exercise3`, `Exercise4`, `Rep1`, `Rep2`, `Rep3`, `Rep4`) VALUES (4, 'Core', 'Plank', 'Flutterkicks', 'Elliptical', 'Squats', NULL, NULL, NULL, NULL);
INSERT INTO `DB_GUI`.`Workouts` (`WorkoutPlan`, `Primary Area`, `Exercise1`, `Exercise2`, `Exercise3`, `Exercise4`, `Rep1`, `Rep2`, `Rep3`, `Rep4`) VALUES (5, 'Arms', 'Dips', 'Curls', 'Calf Raises', 'Plank', NULL, NULL, NULL, NULL);
INSERT INTO `DB_GUI`.`Workouts` (`WorkoutPlan`, `Primary Area`, `Exercise1`, `Exercise2`, `Exercise3`, `Exercise4`, `Rep1`, `Rep2`, `Rep3`, `Rep4`) VALUES (6, 'Arms', 'Dips', 'Pushups', 'Leg Presses', 'Russian Twists', NULL, NULL, NULL, NULL);
INSERT INTO `DB_GUI`.`Workouts` (`WorkoutPlan`, `Primary Area`, `Exercise1`, `Exercise2`, `Exercise3`, `Exercise4`, `Rep1`, `Rep2`, `Rep3`, `Rep4`) VALUES (7, 'Arms', 'Chinups', 'Curls', 'Treadmill', 'Squats', NULL, NULL, NULL, NULL);
INSERT INTO `DB_GUI`.`Workouts` (`WorkoutPlan`, `Primary Area`, `Exercise1`, `Exercise2`, `Exercise3`, `Exercise4`, `Rep1`, `Rep2`, `Rep3`, `Rep4`) VALUES (8, 'Arms', 'Chinups', 'Pushups', 'Elliptical', 'Lunges', NULL, NULL, NULL, NULL);
INSERT INTO `DB_GUI`.`Workouts` (`WorkoutPlan`, `Primary Area`, `Exercise1`, `Exercise2`, `Exercise3`, `Exercise4`, `Rep1`, `Rep2`, `Rep3`, `Rep4`) VALUES (9, 'Legs', 'Squats', 'Lunges', 'Chinups', 'Crunches', NULL, NULL, NULL, NULL);
INSERT INTO `DB_GUI`.`Workouts` (`WorkoutPlan`, `Primary Area`, `Exercise1`, `Exercise2`, `Exercise3`, `Exercise4`, `Rep1`, `Rep2`, `Rep3`, `Rep4`) VALUES (10, 'Legs', 'Squats', 'Calf Raises', 'Pushups', 'Flutterkicks', NULL, NULL, NULL, NULL);
INSERT INTO `DB_GUI`.`Workouts` (`WorkoutPlan`, `Primary Area`, `Exercise1`, `Exercise2`, `Exercise3`, `Exercise4`, `Rep1`, `Rep2`, `Rep3`, `Rep4`) VALUES (11, 'Legs', 'Lunges', 'Leg Presses', 'Treadmill', 'Curls', NULL, NULL, NULL, NULL);
INSERT INTO `DB_GUI`.`Workouts` (`WorkoutPlan`, `Primary Area`, `Exercise1`, `Exercise2`, `Exercise3`, `Exercise4`, `Rep1`, `Rep2`, `Rep3`, `Rep4`) VALUES (12, 'Legs', 'Lunges', 'Calf Raises', 'Stairstepper', 'Dips', NULL, NULL, NULL, NULL);
INSERT INTO `DB_GUI`.`Workouts` (`WorkoutPlan`, `Primary Area`, `Exercise1`, `Exercise2`, `Exercise3`, `Exercise4`, `Rep1`, `Rep2`, `Rep3`, `Rep4`) VALUES (13, 'Cardio', 'Treadmill', 'Elliptical', 'Pushups', 'Russian Twists', NULL, NULL, NULL, NULL);
INSERT INTO `DB_GUI`.`Workouts` (`WorkoutPlan`, `Primary Area`, `Exercise1`, `Exercise2`, `Exercise3`, `Exercise4`, `Rep1`, `Rep2`, `Rep3`, `Rep4`) VALUES (14, 'Cardio', 'Treadmill', 'Stairstepper', 'Curls', 'Flutterkicks', NULL, NULL, NULL, NULL);
INSERT INTO `DB_GUI`.`Workouts` (`WorkoutPlan`, `Primary Area`, `Exercise1`, `Exercise2`, `Exercise3`, `Exercise4`, `Rep1`, `Rep2`, `Rep3`, `Rep4`) VALUES (15, 'Cardio', 'Elliptical', 'Stairstepper', 'Crunches', 'Calf Raises', NULL, NULL, NULL, NULL);
INSERT INTO `DB_GUI`.`Workouts` (`WorkoutPlan`, `Primary Area`, `Exercise1`, `Exercise2`, `Exercise3`, `Exercise4`, `Rep1`, `Rep2`, `Rep3`, `Rep4`) VALUES (16, 'Cardio', 'Elliptical', 'Erg', 'Plank', 'Leg Presses', NULL, NULL, NULL, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `DB_GUI`.`Diet_Plan`
-- -----------------------------------------------------
START TRANSACTION;
USE `DB_GUI`;
INSERT INTO `DB_GUI`.`Diet_Plan` (`Name`) VALUES ('Normal');
INSERT INTO `DB_GUI`.`Diet_Plan` (`Name`) VALUES ('Nut-free');
INSERT INTO `DB_GUI`.`Diet_Plan` (`Name`) VALUES ('Low-fat');
INSERT INTO `DB_GUI`.`Diet_Plan` (`Name`) VALUES ('Gluten-free');
INSERT INTO `DB_GUI`.`Diet_Plan` (`Name`) VALUES ('Low-Carbs');
INSERT INTO `DB_GUI`.`Diet_Plan` (`Name`) VALUES ('High-Protein');
INSERT INTO `DB_GUI`.`Diet_Plan` (`Name`) VALUES ('Citrus-free');
INSERT INTO `DB_GUI`.`Diet_Plan` (`Name`) VALUES ('Lactose');
INSERT INTO `DB_GUI`.`Diet_Plan` (`Name`) VALUES ('Vegan');
INSERT INTO `DB_GUI`.`Diet_Plan` (`Name`) VALUES ('Egg-free');





COMMIT;


-- -----------------------------------------------------
-- Data for table `DB_GUI`.`Snack`
-- -----------------------------------------------------
START TRANSACTION;
USE `DB_GUI`;
INSERT INTO `DB_GUI`.`Snack` (`idSnack`, `Vegan`, `Low-Carb`, `Gluten-free`, `Lactose`, `Normal`) VALUES (1, 'Carrots', 'Dates', 'Kale', 'Avocado', 'Chips');
INSERT INTO `DB_GUI`.`Snack` (`idSnack`, `Vegan`, `Low-Carb`, `Gluten-free`, `Lactose`, `Normal`) VALUES (2, 'Mango', 'Blueberries', 'Avocado', 'Watermelon', 'Popcorn');
INSERT INTO `DB_GUI`.`Snack` (`idSnack`, `Vegan`, `Low-Carb`, `Gluten-free`, `Lactose`, `Normal`) VALUES (3, 'Apricots', 'Apple', 'Carrots', 'Apple', 'Appplesauce');
INSERT INTO `DB_GUI`.`Snack` (`idSnack`, `Vegan`, `Low-Carb`, `Gluten-free`, `Lactose`, `Normal`) VALUES (4, 'Celery', 'Banana', 'Celery', 'Popcorn', 'Pineapple');
INSERT INTO `DB_GUI`.`Snack` (`idSnack`, `Vegan`, `Low-Carb`, `Gluten-free`, `Lactose`, `Normal`) VALUES (5, 'Celery', 'Banana', 'Celery', 'Popcorn', 'Pineapple');

COMMIT;


-- -----------------------------------------------------
-- Data for table `DB_GUI`.`Dinner`
-- -----------------------------------------------------
START TRANSACTION;
USE `DB_GUI`;
INSERT INTO `DB_GUI`.`Dinner` (`idDinner`, `Normal`, `Lactose`, `Gluten-free`, `Low-Carb`, `Citrus-free`, `Fish-free`, `Low-Fat`, `Vegan`, `High-Protein`, `Egg-free`, `Nut-free`) VALUES (1, 'Pizza', 'Lighter Chicken Pot Pie', 'Vegan Chili', 'Barbacoa Tacos', 'Spinach Ricotta Lasgna', 'Steak and Garlic Potatoes', 'Pepperoni Pizza', 'Zucchini Pasta', 'Thai Turkey Wraps', 'Autumn Pear Salad', 'Roasted Vegetable Enchiladas');
INSERT INTO `DB_GUI`.`Dinner` (`idDinner`, `Normal`, `Lactose`, `Gluten-free`, `Low-Carb`, `Citrus-free`, `Fish-free`, `Low-Fat`, `Vegan`, `High-Protein`, `Egg-free`, `Nut-free`) VALUES (2, 'Tacos', 'Cashew Alfredo Pasta', 'Zucchini Crust Pizza', 'Roast Beef Salad', 'Egg Fried Rice', 'Kale Mushroom Frittata', 'Lemon-Olive Chicken', 'Veggie Kabobs', 'Healthy Turkey Chili', 'Butternut Squash', 'Lemon & Herb Lamb Chops');
INSERT INTO `DB_GUI`.`Dinner` (`idDinner`, `Normal`, `Lactose`, `Gluten-free`, `Low-Carb`, `Citrus-free`, `Fish-free`, `Low-Fat`, `Vegan`, `High-Protein`, `Egg-free`, `Nut-free`) VALUES (3, 'Stir Fry', 'Baja Fish Tacos', 'Cashew Potato Pasta Salad', 'BBQ Chicken', 'Sausage and Cheese Spaghetti', 'Chicken Chili', 'Teriyaki Chicken & Soba Noodles', 'Pesto Veggie Pasta', 'Sesame Beef', 'Bacon Ranch Turkey Wrap', 'Chicken & Sausage with Bowties');
INSERT INTO `DB_GUI`.`Dinner` (`idDinner`, `Normal`, `Lactose`, `Gluten-free`, `Low-Carb`, `Citrus-free`, `Fish-free`, `Low-Fat`, `Vegan`, `High-Protein`, `Egg-free`, `Nut-free`) VALUES (4, 'Burritos', 'Thai Stirfry', 'Greek Stuffed Chicken', 'Cheesy Jalapeno Chicken', 'Shakshuka', 'Baked Cheese Crepes', 'Roast Dijon Chicken', 'Mushroom Burger', 'Tuna Salad with Avocado', 'Cobb Salad Pita Pockets', 'Cranberry Glazed Turkey Breast');
INSERT INTO `DB_GUI`.`Dinner` (`idDinner`, `Normal`, `Lactose`, `Gluten-free`, `Low-Carb`, `Citrus-free`, `Fish-free`, `Low-Fat`, `Vegan`, `High-Protein`, `Egg-free`, `Nut-free`) VALUES (5, 'Steak and Potatoes', 'Tandoori Chicken', 'Cranberry Balasmic Chicken', 'Grilled Halloumi Salad', 'Chicken Salad & Brussel Sprouts', 'Mac & Cheese Soup', 'Shrimp a la Grecque', 'Spring Minestrone', 'Greek-Braised Cod with Tomatoes', 'Sesame Noodles', 'Honey Mustard Garlic Rack-of-Lamb');

COMMIT;


-- -----------------------------------------------------
-- Data for table `DB_GUI`.`Lunch`
-- -----------------------------------------------------
START TRANSACTION;
USE `DB_GUI`;
INSERT INTO `DB_GUI`.`Lunch` (`idLunch`, `Normal`, `Lactose`, `Gluten-free`, `Low-Carb`, `Citrus-free`, `Fish-free`, `Low-Fat`, `Vegan`, `High-Protein`, `Egg-free`, `Nut-free`) VALUES (1, 'Turkey Sandwhich', 'Blueberry Pork Corn Tacos', 'Gluten-free Quinoa Burgers', 'Caprese Avocado Salad', 'Pesto Pizza', 'Southwest Black Bean Pasta', 'Asian Noodle Salad', 'Cobb Salad', 'Portobello Stuffed Pizza', 'Chicken Caesar Ciabatta Sandwhich', 'Sunbutter & Banana Sandwhich');
INSERT INTO `DB_GUI`.`Lunch` (`idLunch`, `Normal`, `Lactose`, `Gluten-free`, `Low-Carb`, `Citrus-free`, `Fish-free`, `Low-Fat`, `Vegan`, `High-Protein`, `Egg-free`, `Nut-free`) VALUES (2, 'Chicken Salad', 'Shrimp & Avocado Taco Salad', 'Portobello and Zucchini Taco', 'Shrimp & Cauliflower Salad', 'Sausage and Tomato Pasta', 'BLT Croissant ', 'Mediterranean Orzo Salad', 'Tempeh Bowl', 'Chickpea Spinach Salad', 'Kale Salad with Vinaigrette', 'Pasta Salad');
INSERT INTO `DB_GUI`.`Lunch` (`idLunch`, `Normal`, `Lactose`, `Gluten-free`, `Low-Carb`, `Citrus-free`, `Fish-free`, `Low-Fat`, `Vegan`, `High-Protein`, `Egg-free`, `Nut-free`) VALUES (3, 'Chorizo Risotto', 'Spicy Noodles', 'Creamy Cashew Potato and Pasta Salad', 'California Turkey and Bacon Lettuce Wrap', 'Chickpea Avocado & Feta Salad', 'Humus & Veggie Wraps', 'Spinach Artichoke Quiche Cup', 'Crispy Tofu Bowl', 'Avocado Greek Yogurt Chicken Salad', 'Southwest Hummus Wraps', 'Cold Noddle Salad');
INSERT INTO `DB_GUI`.`Lunch` (`idLunch`, `Normal`, `Lactose`, `Gluten-free`, `Low-Carb`, `Citrus-free`, `Fish-free`, `Low-Fat`, `Vegan`, `High-Protein`, `Egg-free`, `Nut-free`) VALUES (4, 'Lamb Kabobs', 'Cajun Chickpea Sweet Potato Burgers', 'Grilled Stuff Bacon Cheeseburger', 'Chicken and Asparagus Lemon Stir Fry', 'Pesto Chicken Pasta', 'Cucumber Turkey Wraps', 'Baked Tofu Sushi Bowl', 'Curried Lentils', 'Salmon Quinoa Bowl', 'Three Bean Salad', 'Tortilla Wrap');
INSERT INTO `DB_GUI`.`Lunch` (`idLunch`, `Normal`, `Lactose`, `Gluten-free`, `Low-Carb`, `Citrus-free`, `Fish-free`, `Low-Fat`, `Vegan`, `High-Protein`, `Egg-free`, `Nut-free`) VALUES (5, 'Crab Pasta', 'Tropical Rice Bowls', 'BLT Chopped Salad', 'Salmon Chickpea Salad', 'Loaded Baked Potato', 'Chicken Salad Sandwhich', 'Tuna and Chickpea Pita Sandwiches', 'Avocado Salad', 'Southwestern Veggie Hummus Wraps', 'Chicken Pesto Sandwhich', 'Quesadillas');

COMMIT;


-- -----------------------------------------------------
-- Data for table `DB_GUI`.`Breakfast`
-- -----------------------------------------------------
START TRANSACTION;
USE `DB_GUI`;
INSERT INTO `DB_GUI`.`Breakfast` (`idBreakfast`, `Normal`, `Lactose`, `Gluten-free`, `Low-Carb`, `Citrus-free`, `Fish-free`, `Low-Fat`, `Vegan`, `High-Protein`, `Egg-free`, `Nut-free`) VALUES (1, 'Pancakes', 'Almond Butter Toast', 'Muffins', 'Flourless Egg and Cheese Breakfast Muffins', 'Eggs Benedict', 'Goat Cheese Oatmeal', 'Zucchini Breakfast Bowl', 'Vegan Pancakes', 'Baked Eggs Avocados', 'Creamy Coconut-Citrus Waffle', 'Breakfast Tacos');
INSERT INTO `DB_GUI`.`Breakfast` (`idBreakfast`, `Normal`, `Lactose`, `Gluten-free`, `Low-Carb`, `Citrus-free`, `Fish-free`, `Low-Fat`, `Vegan`, `High-Protein`, `Egg-free`, `Nut-free`) VALUES (2, 'Waffles', 'Oatmeal', 'Scones', 'Cream Cheese Pancakes', 'Eggplant and Walnut Frittata', 'Blueberry Power Smoothie', 'Apple Breakfast Porridge', 'Quinoa Breakfast Cereal', 'Feta Egg Toast', 'Sunflower Granola', 'Breakfast Soup');
INSERT INTO `DB_GUI`.`Breakfast` (`idBreakfast`, `Normal`, `Lactose`, `Gluten-free`, `Low-Carb`, `Citrus-free`, `Fish-free`, `Low-Fat`, `Vegan`, `High-Protein`, `Egg-free`, `Nut-free`) VALUES (3, 'Crepes', 'Spiced Pumpkin Tea Bread', 'Chocolate Chip Pancakes', 'Spinach, Mushroom and Feta Crustless Quiche', 'Grilled Banana-Pear Pancake', 'Greek Cucumber and Chickpea Bowl', 'Breakfast Salad', 'Flourless Pumpkin Muffins', 'Poached Eggs with Tomato', 'Cucumber Toast', 'Waffles');
INSERT INTO `DB_GUI`.`Breakfast` (`idBreakfast`, `Normal`, `Lactose`, `Gluten-free`, `Low-Carb`, `Citrus-free`, `Fish-free`, `Low-Fat`, `Vegan`, `High-Protein`, `Egg-free`, `Nut-free`) VALUES (4, 'French Toast', 'Fresh Fruit Muesli', 'Waffles', 'Cream Cheese Muffins', 'French Baked Toast', 'Bacon Veggie Skillet', 'Blueberry Oatmeal', 'Vegan French Toast', 'Peanut Butter Oats', 'Blueberry-Orange Parfaits', 'Crepes');
INSERT INTO `DB_GUI`.`Breakfast` (`idBreakfast`, `Normal`, `Lactose`, `Gluten-free`, `Low-Carb`, `Citrus-free`, `Fish-free`, `Low-Fat`, `Vegan`, `High-Protein`, `Egg-free`, `Nut-free`) VALUES (5, 'Bacon and Eggs', 'Quinoa Porridge', 'Quinoa Bowl', 'Coconut Chia Pudding', 'Blue Cheese Quiche', 'Softened Plums with Vanilla Yogurt', 'BLT Breakfast Salad', 'Avocado Toast', 'Cottage Cheese with Fruit and Toast', 'Pomegranate-Farro Salad', 'Doughnuts');

COMMIT;


-- -----------------------------------------------------
-- Data for table `DB_GUI`.`Workouts`
-- -----------------------------------------------------
START TRANSACTION;
USE `DB_GUI`;
INSERT INTO `DB_GUI`.`Workouts` (`WorkoutPlan`, `PrimaryArea`, `Exercise1`, `Exercise2`, `Exercise3`, `Exercise4`,`Rep1`,`Rep2`,`Rep3`,`Rep4`) VALUES (1, 'Core', 'Crunches', 'Plank', 'Dips', 'Stairstepper',50,1,15,10);
INSERT INTO `DB_GUI`.`Workouts` (`WorkoutPlan`, `PrimaryArea`, `Exercise1`, `Exercise2`, `Exercise3`, `Exercise4`,`Rep1`,`Rep2`,`Rep3`,`Rep4`) VALUES (2, 'Core', 'Crunches', 'Flutterkicks', 'Curls', 'Erg',50,1,30,10);
INSERT INTO `DB_GUI`.`Workouts` (`WorkoutPlan`, `PrimaryArea`, `Exercise1`, `Exercise2`, `Exercise3`, `Exercise4`,`Rep1`,`Rep2`,`Rep3`,`Rep4`) VALUES (3, 'Core', 'Plank', 'Russian Twists', 'Erg', 'Lunges',1,1,10,30);
INSERT INTO `DB_GUI`.`Workouts` (`WorkoutPlan`, `PrimaryArea`, `Exercise1`, `Exercise2`, `Exercise3`, `Exercise4`,`Rep1`,`Rep2`,`Rep3`,`Rep4`) VALUES (4, 'Core', 'Plank', 'Flutterkicks', 'Elliptical', 'Squats',1,1,10,25);
INSERT INTO `DB_GUI`.`Workouts` (`WorkoutPlan`, `PrimaryArea`, `Exercise1`, `Exercise2`, `Exercise3`, `Exercise4`,`Rep1`,`Rep2`,`Rep3`,`Rep4`) VALUES (5, 'Arms', 'Dips', 'Curls', 'Calf Raises', 'Plank',15,30,30,1);
INSERT INTO `DB_GUI`.`Workouts` (`WorkoutPlan`, `PrimaryArea`, `Exercise1`, `Exercise2`, `Exercise3`, `Exercise4`,`Rep1`,`Rep2`,`Rep3`,`Rep4`) VALUES (6, 'Arms', 'Dips', 'Pushups', 'Leg Presses', 'Russian Twists',15,30,20,1);
INSERT INTO `DB_GUI`.`Workouts` (`WorkoutPlan`, `PrimaryArea`, `Exercise1`, `Exercise2`, `Exercise3`, `Exercise4`,`Rep1`,`Rep2`,`Rep3`,`Rep4`) VALUES (7, 'Arms', 'Chinups', 'Curls', 'Treadmill', 'Squats', 15,30,10,20);
INSERT INTO `DB_GUI`.`Workouts` (`WorkoutPlan`, `PrimaryArea`, `Exercise1`, `Exercise2`, `Exercise3`, `Exercise4`,`Rep1`,`Rep2`,`Rep3`,`Rep4`) VALUES (8, 'Arms', 'Chinups', 'Pushups', 'Elliptical', 'Lunges',15,30,10,20);
INSERT INTO `DB_GUI`.`Workouts` (`WorkoutPlan`, `PrimaryArea`, `Exercise1`, `Exercise2`, `Exercise3`, `Exercise4`,`Rep1`,`Rep2`,`Rep3`,`Rep4`) VALUES (9, 'Legs', 'Squats', 'Lunges', 'Chinups', 'Crunches',20,20,15,50);
INSERT INTO `DB_GUI`.`Workouts` (`WorkoutPlan`, `PrimaryArea`, `Exercise1`, `Exercise2`, `Exercise3`, `Exercise4`,`Rep1`,`Rep2`,`Rep3`,`Rep4`) VALUES (10, 'Legs', 'Squats', 'Calf Raises', 'Pushups', 'Flutterkicks',20,15,20,1);
INSERT INTO `DB_GUI`.`Workouts` (`WorkoutPlan`, `PrimaryArea`, `Exercise1`, `Exercise2`, `Exercise3`, `Exercise4`,`Rep1`,`Rep2`,`Rep3`,`Rep4`) VALUES (11, 'Legs', 'Lunges', 'Leg Presses', 'Treadmill', 'Curls',20,15,10,30);
INSERT INTO `DB_GUI`.`Workouts` (`WorkoutPlan`, `PrimaryArea`, `Exercise1`, `Exercise2`, `Exercise3`, `Exercise4`,`Rep1`,`Rep2`,`Rep3`,`Rep4`) VALUES (12, 'Legs', 'Lunges', 'Calf Raises', 'Stairstepper', 'Dips',20,20,10,15);
INSERT INTO `DB_GUI`.`Workouts` (`WorkoutPlan`, `PrimaryArea`, `Exercise1`, `Exercise2`, `Exercise3`, `Exercise4`,`Rep1`,`Rep2`,`Rep3`,`Rep4`) VALUES (13, 'Cardio', 'Treadmill', 'Elliptical', 'Pushups', 'Russian Twists',10,10,20,1);
INSERT INTO `DB_GUI`.`Workouts` (`WorkoutPlan`, `PrimaryArea`, `Exercise1`, `Exercise2`, `Exercise3`, `Exercise4`,`Rep1`,`Rep2`,`Rep3`,`Rep4`) VALUES (14, 'Cardio', 'Treadmill', 'Stairstepper', 'Curls', 'Flutterkicks',10,10,30,1);
INSERT INTO `DB_GUI`.`Workouts` (`WorkoutPlan`, `PrimaryArea`, `Exercise1`, `Exercise2`, `Exercise3`, `Exercise4`,`Rep1`,`Rep2`,`Rep3`,`Rep4`) VALUES (15, 'Cardio', 'Elliptical', 'Stairstepper', 'Crunches', 'Calf Raises',10,10,50,20);
INSERT INTO `DB_GUI`.`Workouts` (`WorkoutPlan`, `PrimaryArea`, `Exercise1`, `Exercise2`, `Exercise3`, `Exercise4`,`Rep1`,`Rep2`,`Rep3`,`Rep4`) VALUES (16, 'Cardio', 'Elliptical', 'Erg', 'Plank', 'Leg Presses',10,10,1,15);

COMMIT;


