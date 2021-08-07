from flask import Flask
from flask import request, jsonify
from flask_mysqldb import MySQL
import string
import random

app = Flask(__name__)

app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'CGVVEwrHh8at9EouLkXb'
app.config['MYSQL_DB'] = 'hellopy'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)


@app.route('/login')
def login():
    username = request.args.get('username', None)
    password = request.args.get('password', None)

    if username is None:
        response_message = [False, 'Username was not provided']
        return response_message

    if password is None:
        response_message = [False, 'password was not provided']
        return response_message

    query = 'SELECT ID, FirstName, LastName from users WHERE Username=%s and Password=%s'
    cur = mysql.connection.cursor()
    cur.execute(query, (username, password))
    user = cur.fetchone()
    if user is not None and len(user) > 0:
        response_message = [True, 'You have successfully logged in', user]
        return response_message

    else:
        response_message = [False, 'No user was found with the given credentials']
        return response_message


@app.route('/signup', methods=['POST'])
def sign_up():
    new_user = request.json
    user_id = new_user['id']
    first_name = new_user['firstName']
    last_name = new_user['lastName']
    username = new_user['username']
    password = new_user['password']

    try:
        insert_query = f"INSERT INTO users(ID, FirstName, LastName, Username, Password) VALUES ('{user_id}','{first_name}','{last_name}','{username}','{password}')"
        print(insert_query)

        cur = mysql.connection.cursor()
        cur.execute(insert_query)
        mysql.connection.commit()

        response_message = [True, 'User added successfully']
        return jsonify(response_message)
    except Exception as e:
        response_message = [False, f'An error occurred while adding user: {e}']
        return jsonify(response_message)


@app.route('/forgotPassword')
def forgot_password():
    username = request.args.get('username', None)

    if username is None:
        response_message = [False, 'Username was not provided']
        return jsonify(response_message)

    # check that the username exists in the DB
    query = 'SELECT ID, FirstName, LastName from users WHERE Username=%s'
    cur = mysql.connection.cursor()
    cur.execute(query, (username,))
    user = cur.fetchone()

    # if the username exists, send an email to the user with the reset link
    # we dont have an email address at the moment so we will just pretend we are sending the link
    # Also change the password so that no one ca login with the old password once reset password has been triggered
    if user is not None and len(user) > 0:
        letters = string.ascii_letters
        temp_password = ''.join(random.choice(letters) for i in range(6))
        update_query = f"UPDATE users SET Password='{temp_password}', PasswordReset=1 WHERE Username='{username}'"
        print(update_query)

        cur.execute(update_query)
        mysql.connection.commit()

        # send the email with reset link here
        link = f"http://localhost:5000/resetPassword?username={username}"

        response_message = [True, 'You have successfully reset your password. an email has been sent with link', link]
        return jsonify(response_message)
    else:
        response_message = [False, 'No user was found with that username']
        return jsonify(response_message)


@app.route('/resetPassword')
def reset_password():
    username = request.args.get('username', None)
    temp_password = request.args.get('oldPassword', None)
    new_password = request.args.get('newPassword', None)

    if username is None:
        response_message = [False, 'Username was not provided']
        return jsonify(response_message)

    if temp_password is None:
        response_message = [False, 'Old password was not provided']
        return jsonify(response_message)

    if new_password is None:
        response_message = [False, 'New password was not provided']
        return jsonify(response_message)

    # check that the username exists in the DB
    query = 'SELECT ID, FirstName, LastName, Password, PasswordReset from users WHERE Username=%s'
    cur = mysql.connection.cursor()
    cur.execute(query, (username,))
    user = cur.fetchone()

    # check if user has PasswordReset enabled
    print(user['PasswordReset'])
    if user['PasswordReset'] != 1:
        response_message = [False, 'User has not requested password reset']
        return jsonify(response_message)

    # check if the password given as old password is same to he temporary password that was generated
    if user['Password'] != temp_password:
        response_message = [False, 'The current password provided does not match']
        return jsonify(response_message)

    # update the user with the new password and disable PasswordReset field
    update_query = f"UPDATE users SET Password='{new_password}', PasswordReset=0 WHERE Username='{username}'"
    print(update_query)

    cur.execute(update_query)
    mysql.connection.commit()

    response_message = [True, 'You have successfully changed your password']
    return jsonify(response_message)


if __name__ == '__main__':
    app.run()
