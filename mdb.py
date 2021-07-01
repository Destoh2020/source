from flask import Flask
from flask import request
from flask_mysqldb import MySQL

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


if __name__ == '__main__':
    app.run()
