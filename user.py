
user_continue = True
while user_continue:
    num1 = int(input('Please enter first number: '))
    num2 = int(input('Please enter second number: '))
    operator = input('Please enter operator: ')

    if operator == '+':
        ans = num1 + num2
        print('Answer is:', ans)

    if operator == '-':
        ans = num1 - num2
        print('Answer is:', ans)

    if operator == '*':
        ans = num1 * num2
        print('Answer is:', ans)

    if operator == '/':
        ans = num1 / num2
        print('Answer is:', ans)

    user_response = input('Do you want to continue?Y/N: ')
    if user_response == 'Y':
        user_continue = True

    else:
        user_continue = False

