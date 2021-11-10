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

-- get all textbook data
SELECT * FROM `Textbook`;

-- add a new textbook
INSERT INTO `Textbook` (`textbook_isbn`, `name`, `author`)
VALUES (:isbnInput, :nameInput, :authorInput);

-- update a textbook's data
UPDATE `Textbook` SET
	`textbook_isbn` = :isbnInput, 
    	`name` = :nameInput, 
    	`author` = :authorInput
WHERE `textbook_id` = :textbookIdInput;

-- delete a textbook
DELETE FROM `Textbook` WHERE `textbook_id` = :textbookIdInput;

-- filter textbooks by name
SELECT * FROM `Textbook` WHERE `name` LIKE CONCAT('%', :nameInput, '%');

-- filter textbooks by ISBN
SELECT * FROM `Textbook` WHERE `textbook_isbn` LIKE CONCAT('%', :isbnInput, '%');

-- filter textbooks by author
SELECT * FROM `Textbook` WHERE `author` LIKE CONCAT('%', :authorInput, '%');

/******** Instructor ********/

-- get all instructor information
SELECT * FROM `Instructor`;

-- add a new instructor
INSERT INTO `Instructor` (`first_name`, `last_name`, `email`)
VALUES (:firstNameInput, :lastNameInput, :emailInput);

-- update an instructor's data
UPDATE `Instructor` SET
	`first_name` = :firstNameInput, 
    	`last_name` = :lastNameInput, 
    	`email` = instructorEmail
WHERE `instructor_id` = :instructorId;

-- delete an instructor
DELETE FROM `Instructor` WHERE `instructor_id` = :instructorIdInput;

-- filter instructors by input name
SELECT * FROM `Instructor` WHERE CONCAT(`first_name`, ' ', `last_name`) LIKE CONCAT('%', :nameInput, '%');

/******** Course ********/

-- get all course information (old method: selects nondescriptive IDs)
SELECT * FROM `Course`;

-- get all course information (new method: selects Instructor.last_name and Textbook.name)
SELECT c.course_id, c.name, c.year, c.term, i.last_name as 'Instructor', t.name as 'Textbook Title' 
FROM Course c 
INNER JOIN Instructor i ON c.instructor_id = i.instructor_id 
INNER JOIN Textbook t ON c.textbook_id = t.textbook_id;

-- add a new course
INSERT INTO `Course` (`name`, `year`, `term`, `instructor_id`, `textbook_id`)
VALUES (:nameInput, :yearInput, :termInput, :instructorIdInput, :textbookIdInput);

-- delete a course
DELETE FROM `Course` WHERE `course_id` = :courseIdDeleteFromView;

-- update a course's data
UPDATE `Course` SET 
	`name` = :nameInput, 
    	`year` = :yearInput, 
    	`term` = :termInput, 
    	`instructor_id` = :instructorIdInput, 
    	`textbook_id` = :textbookIdInput;
WHERE `course_id` = :courseId;

-- filter courses by name
SELECT * FROM `Course` WHERE name LIKE CONCAT('%', :courseInput, '%');

-- filter a course by term and year
SELECT * FROM `Course` WHERE CONCAT (`year, ' ', `term`) LIKE CONCAT ('%', :yearInput, ' ', :termInput, '%')
