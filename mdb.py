from flask import Flask
from flask import request
from flask_mysqldb import MySQL

app = Flask(__name__)

app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'qwerty'
app.config['MYSQL_DB'] = 'projects'
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


if __name__ == '__main__':
    app.run()
