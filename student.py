from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS

app = Flask(__name__)

app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'dest2015'
app.config['MYSQL_DB'] = 'school'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)
cors = CORS(app)


@app.route('/new', methods=['POST'])
def new():
    new_student = request.json
    school = new_student['school']
    full_name = new_student['fullName']
    birth_date = new_student['birthDate']
    nemis = new_student['nemis']
    level = new_student['level']
    nationality = new_student['nationality']
    gender = new_student['gender']

    try:
        insert_query = f"INSERT INTO students(School, FullName, BirthDate, Nemis, Level, Nationality, Gender) " \
                       f"VALUES('{school}','{full_name}','{birth_date}','{nemis}','{level}','{nationality}', '{gender}')"
        print(insert_query)

        cur = mysql.connection.cursor()
        cur.execute(insert_query)
        mysql.connection.commit()

        response_message = [True, 'Student successfully registered']
        return jsonify(response_message)

    except Exception as e:
        response_message = [False, f'An error occurred while registering Student: {e}']
        return jsonify(response_message)


if __name__ == '__main__':
    app.run()
