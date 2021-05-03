from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
import uuid
import datetime

app = Flask(__name__)

app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'qwerty'
app.config['MYSQL_DB'] = 'projects'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)
CORS(app)


@app.route('/')
def hello_world():
    return 'Welcome to SMS API'


@app.route('/addDefaultGroups')
def add_default_user_groups():
    admin_group_id = uuid.uuid4()
    admin_group_name = 'Admin'
    admin_group_description = 'The Administrator group'

    teacher_group_id = uuid.uuid4()
    teacher_group_name = 'Teachers'
    teacher_group_description = 'The group encompassing all teachers'

    student_group_id = uuid.uuid4()
    student_group_name = 'Students'
    student_group_description = 'The group encompassing all students'

    try:
        add_user_group(admin_group_id, admin_group_name, admin_group_description)
        add_user_group(teacher_group_id, teacher_group_name, teacher_group_description)
        add_user_group(student_group_id, student_group_name, student_group_description)

        response = {
            'status': True,
            'message': 'Default user groups added successfully'
        }
        return jsonify(response)
    except Exception as e:
        response = {
            'status': False,
            'message': f'An error occurred while adding default user groups: {e}'
        }
        return jsonify(response)


@app.route('/addDefaultUser')
def add_default_admin_user():
    try:
        add_user('Admin', 'admin', 'admin', 'Admin', 'User')

        response = {
            'status': True,
            'message': 'Default user added successfully'
        }
        return jsonify(response)
    except Exception as e:
        response = {
            'status': False,
            'message': f'An error occurred while adding default user: {e}'
        }
        return jsonify(response)


@app.route('/login')
def login():
    username = request.args.get('username', None)
    password = request.args.get('password', None)

    if username is None:
        response = {
            'status': False,
            'message': 'Username was not provided'
        }
        return jsonify(response)

    if password is None:
        response = {
            'status': False,
            'message': 'Password was not provided'
        }
        return jsonify(response)

    query = 'SELECT id, userGroupId, firstName, lastName from users WHERE Username=%s and Password=%s and Status=1'
    cur = mysql.connection.cursor()
    cur.execute(query, (username, password))
    user = cur.fetchone()
    if user is not None and len(user) > 0:
        response = {
            'status': True,
            'message': 'You have successfully logged in',
            'user': user
        }
        return jsonify(response)

    else:
        response = {
            'status': False,
            'message': 'No user was found with the given credentials'
        }
    return jsonify(response)


@app.route('/users')
def get_teachers():
    group_name = request.args.get('groupName', None)
    if group_name is None:
        return jsonify([])
    query = "SELECT id, username, firstName, lastName, status FROM users " \
            f"WHERE usergroupid = (SELECT ID FROM usergroup WHERE NAME = '{group_name}')"
    cur = mysql.connection.cursor()
    cur.execute(query)
    teachers = cur.fetchall()
    return jsonify(teachers)


@app.route('/addUser', methods=['POST'])
def add_teacher():
    new_user = request.json
    group_name = new_user['groupName']
    first_name = new_user['firstName']
    last_name = new_user['lastName']
    username = new_user['username']
    password = new_user['password']

    try:
        add_user(group_name, username, password, first_name, last_name)

        response = {
            'status': True,
            'message': 'User added successfully'
        }
        return jsonify(response)
    except Exception as e:
        response = {
            'status': False,
            'message': f'An error occurred while adding user: {e}'
        }
        return jsonify(response)


@app.route('/deleteUser')
def delete_user():
    user_id = request.args.get('userId', None)
    if user_id is None:
        response = {
            'status': False,
            'message': 'UserId was not provided'
        }
        return jsonify(response)

    query = f"DELETE FROM users WHERE ID = '{user_id}'"
    try:
        cur = mysql.connection.cursor()
        cur.execute(query)
        mysql.connection.commit()

        response = {
            'status': True,
            'message': 'User deleted successfully'
        }
        return jsonify(response)
    except Exception as e:
        response = {
            'status': False,
            'message': f'An error occurred while adding user: {e}'
        }
        return jsonify(response)


def add_user_group(group_id, group_name, group_description):
    created_on = datetime.datetime.now()
    status = 1
    query = f"INSERT INTO usergroup(ID, Name, Description, CreatedOn, Status) VALUES ('{group_id}'," \
            f"'{group_name}','{group_description}','{created_on}','{status}')"

    cur = mysql.connection.cursor()
    cur.execute(query)
    mysql.connection.commit()


def add_user(group_name, username, password, first_name, last_name):
    query = f"SELECT ID FROM usergroup WHERE NAME = '{group_name}'"
    cur = mysql.connection.cursor()
    cur.execute(query)
    user_group = cur.fetchone()

    group_id = user_group['ID']
    user_id = uuid.uuid4()
    created_on = datetime.datetime.now()
    status = 1

    insert_query = f"INSERT INTO users(ID, UserGroupID, Username, Password, FirstName, LastName, CreatedOn, Status) " \
                   f"VALUES ('{user_id}','{group_id}','{username}','{password}','{first_name}'," \
                   f"'{last_name}','{created_on}','{status}')"

    cur.execute(insert_query)
    mysql.connection.commit()


if __name__ == '__main__':
    app.run()
