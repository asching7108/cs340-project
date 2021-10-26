import names
import random
import mysql.connector

db = mysql.connector.connect(
    host="classmysql.engr.oregonstate.edu",
    user="cs340_sherwcha",
    passwd="4541",
    database="cs340_sherwcha"
)

my_cursor = db.cursor()


class StudentObject:
    def __init__(self, student_type):

        if random.randint(0, 1) == 0:
            self._gender = 'male'
        else:
            self._gender = 'female'

        self._first_name = names.get_first_name(self._gender)
        self._last_name = names.get_last_name()
        self._email = str(self._last_name + self._first_name).lower() + "@sdit.edu"
        self._type = student_type

    def get_first_name(self):
        return self._first_name

    def get_last_name(self):
        return self._last_name

    def get_email(self):
        return self._email

    def get_type(self):
        return self._type


# Make 100 Freshmen
for elements in range(0, 100):
    test_student = StudentObject('Freshman')
    test_fname = str(StudentObject.get_first_name(test_student))
    test_lname = str(StudentObject.get_last_name(test_student))
    test_email = str(StudentObject.get_email(test_student))
    test_type = str(StudentObject.get_type(test_student))
    my_cursor.execute("INSERT INTO Student (first_name, last_name, email, type) VALUES \n"
                      "('" + test_fname + "', '" + test_lname + "', '" + test_email + "', '" + test_type + "');")

# Make 75 Sophomores
for elements in range(0, 75):
    test_student = StudentObject('Sophomore')
    test_fname = str(StudentObject.get_first_name(test_student))
    test_lname = str(StudentObject.get_last_name(test_student))
    test_email = str(StudentObject.get_email(test_student))
    test_type = str(StudentObject.get_type(test_student))
    my_cursor.execute("INSERT INTO Student (first_name, last_name, email, type) VALUES \n"
                      "('" + test_fname + "', '" + test_lname + "', '" + test_email + "', '" + test_type + "');")

# Make 50 Juniors
for elements in range(0, 50):
    test_student = StudentObject('Junior')
    test_fname = str(StudentObject.get_first_name(test_student))
    test_lname = str(StudentObject.get_last_name(test_student))
    test_email = str(StudentObject.get_email(test_student))
    test_type = str(StudentObject.get_type(test_student))
    my_cursor.execute("INSERT INTO Student (first_name, last_name, email, type) VALUES \n"
                      "('" + test_fname + "', '" + test_lname + "', '" + test_email + "', '" + test_type + "');")

# Make 30 Seniors
for elements in range(0, 30):
    test_student = StudentObject('Senior')
    test_fname = str(StudentObject.get_first_name(test_student))
    test_lname = str(StudentObject.get_last_name(test_student))
    test_email = str(StudentObject.get_email(test_student))
    test_type = str(StudentObject.get_type(test_student))
    my_cursor.execute("INSERT INTO Student (first_name, last_name, email, type) VALUES \n"
                      "('" + test_fname + "', '" + test_lname + "', '" + test_email + "', '" + test_type + "');")

# Make 45 Post-Baccs
for elements in range(0, 45):
    test_student = StudentObject('Post-Bacc')
    test_fname = str(StudentObject.get_first_name(test_student))
    test_lname = str(StudentObject.get_last_name(test_student))
    test_email = str(StudentObject.get_email(test_student))
    test_type = str(StudentObject.get_type(test_student))
    my_cursor.execute("INSERT INTO Student (first_name, last_name, email, type) VALUES \n"
                      "('" + test_fname + "', '" + test_lname + "', '" + test_email + "', '" + test_type + "');")

db.commit()
