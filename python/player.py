from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS

app = Flask(__name__)

app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'dest2015'
app.config['MYSQL_DB'] = 'projects'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)
CORS(app)


@app.route('/register', methods=['POST'])
def register():
    new_user = request.json
    user_id = new_user['id']
    first_name = new_user['firstName']
    middle_name = new_user['middleName']
    last_name = new_user['lastName']
    email = new_user['email']
    birth_date = new_user['birthDate']
    gender = new_user['gender']
    address = new_user['address']
    postal_code = new_user['postalCode']
    mobile = new_user['mobile']
    password = new_user['password']
    confirm_password = new_user['confirmPassword']
    county = new_user['county']
    club = new_user['club']

    try:
        insert_query = f"INSERT INTO players(ID, FirstName, MiddleName, LastName, Email, BirthDate, Gender, " \
                       f"Address, PostalCode, Mobile, Password, ConfirmPassword, County, Club) VALUES " \
                       f"('{user_id}','{first_name}','{middle_name}','{last_name}','{email}','{birth_date}','{gender}'," \
                       f"'{address}','{postal_code}','{mobile}','{password}','{confirm_password}','{county}','{club}')"
        print(insert_query)

        cur = mysql.connection.cursor()
        cur.execute(insert_query)
        mysql.connection.commit()

        response_message = [True, 'Player successfully registered']
        return jsonify(response_message)
    except Exception as e:
        response_message = [False, f'An error occurred while registering player: {e}']
        return jsonify(response_message)


if __name__ == '__main__':
    app.run()
