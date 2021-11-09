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