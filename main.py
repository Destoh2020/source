import datetime
import sys
fullName = input('Please enter your full names: ')
userName = input('Please enter Your user name: ')
yearDate = int(input('Please enter year of birth: '))
currentYear = datetime.datetime.now()
print('The current year is:', currentYear.year)
age = int(currentYear.year - yearDate)
print('Your age is:', age)


if age >= 18:
    status = "eligible"
else:
    status = 'not eligible'

print('You are', status, 'to vote')

if status == 'eligible':
    user_continue = True
    while user_continue:
        num1 = int(input('Please enter first number: '))
        num2 = int(input('Please enter second number: '))
        operator = input('Please enter operator: ')
        ans = 0

        if operator == '+':
            ans = num1 + num2

        if operator == '-':
            ans = num1 - num2

        if operator == '*':
            ans = num1 * num2

        if operator == '/':
            ans = num1 / num2

        print('Answer is:', ans)

        user_response = input('Do you want to continue?Y/N: ')
        if user_response == 'Y':
            user_continue = True

        else:
            user_continue = False

else:
    sys.exit()





