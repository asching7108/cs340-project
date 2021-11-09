/******** Student ********/

-- get all student data
SELECT * FROM `Student`;

-- add a new student
INSERT INTO `Student` (`first_name`, `last_name`, `email`, `type`)
VALUES (:firstNameInput, :lastNameInput, :emailInput, :typeInput);

-- update a student's data
UPDATE `Student` SET
	`first_name` = :firstNameInput,
	`last_name`= :lastNameInput,
	`email` = :emailInput,
	`type` = :typeInput
WHERE `id`= :studentId;

-- delete a student
DELETE FROM `Student` WHERE `id` = :studentId;

-- get all students under the input program type
SELECT * FROM `Student` WHERE `type` = :typeInput;

-- get all students associated with the input name
SELECT * FROM `Student` WHERE CONCAT(`first_name`, ' ', `last_name`) like CONCAT('%', :nameInput, '%');

/******** Course_Student ********/

-- get a list of courses to populate the course dropdown
SELECT c.`name`, c.`year`, c.`term` FROM `Course`;

-- get all students enrolled in the input course
SELECT s.* FROM `Course_Student` cs
INNER JOIN `Student` s ON cs.`student_id` = s.`student_id`
WHERE cs.`course_id` = :courseId;

-- add a new course student relationship
INSERT INTO `Course_Student` (`course_id`, `student_id`) VALUES (:courseId, :studentId);

-- delete a course student relationship
DELETE FROM `Course_Student` WHERE `course_id` = :courseId AND `student_id` = :studentId;

/******** Textbook ********/

-- get all textbook information for the list view
SELECT * FROM `Textbook`;

-- insert a textbook into the textbook table
INSERT INTO `Textbook` (`textbook_isbn`, `name`, `author`)
VALUES (:isbnInput, :nameInput, :authorInput);

-- delete a textbook from the textbook table
DELETE FROM `Textbook`
WHERE textbook_id = :textBookIdDeleteFromView;

-- edit a textbook from the textbook table
UPDATE `Textbook`
SET `textbook_isbn` = :isbnInput, 
    `name` = :nameInput, 
    `author` = :authorInput
WHERE `textbook_id` = :textbook_id;

/******** Instructor ********/

-- get all instructor information
SELECT * FROM `Instructor`;

-- add a new instructor
INSERT INTO `Instructor` (`first_name`, `last_name`, `email`)
VALUES (:firstNameInput, :lastNameInput, :emailInput);

-- delete an instructor from the instructor table
DELETE FROM `Instructor` WHERE instructor_id = :instructorIdDeleteFromView;

-- edit an instructor from the instructor table
UPDATE `Instructor`
SET `first_name` = :firstNameInput, 
    `last_name` = :lastNameInput, 
    `email` = instructorEmail
WHERE `instructor_id` = :instructorId;

/******** Course ********/

-- get all course information
SELECT * FROM `Course`;

-- insert a new course into the course table
INSERT INTO `Course` (`name`, `year`, `term`, `instructor_id`, `textbook_id`)
VALUES (:nameInput, :yearInput, :termInput, :instructorIdInput, :textbookIdInput);

-- delete a course from the course table
DELETE FROM `Course` WHERE course_id = :courseIdDeleteFromView;

-- edit a course from the course table
UPDATE `Course`
SET `name` = :nameInput, 
    `year` = :yearInput, 
    `term` = :termInput, 
    `instructor_id` = :instructorIdInput, 
    `textbook_id` = :textbookIdInput;
