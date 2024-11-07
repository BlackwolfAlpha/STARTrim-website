from flask import Flask, jsonify, send_file
from twilio.rest import Client
from bs4 import BeautifulSoup

app = Flask(__name__)


def send_whatsapp_message(message):
    account_sid = 'ACc71f4e821ccbf4b78ab26aee70cd5b6d'
    auth_token = '327195935824b2030ab10bf52773aaee'
    client = Client(account_sid, auth_token)

    whatsapp_group_id = 'ELYqgO3VNCjE1DMWTlAKJe'

    message_instance = client.messages.create(
        from_='whatsapp:+14155238886',
        body=message,
        to=f'whatsapp:{whatsapp_group_id}'
    )

    print(message_instance.sid)


def check_and_send_post():
    with open('STARTrimHOME.html', 'r', encoding='utf-8') as file:
        html_content = file.read()

    soup = BeautifulSoup(html_content, 'html.parser')
    latest_post = soup.find('div', class_='post')

    title = latest_post.find('h3').text
    content = latest_post.find('p').text

    message = f"New Post: {title}\n\n{content}"
    return message


@app.route('/send_new_post', methods=['POST'])
def send_new_post():
    message = check_and_send_post()
    send_whatsapp_message(message)
    return jsonify({'message': message})


@app.route('/startrim_home')
def startrim_home():
    return send_file('STARTrimHOME.html')


if __name__ == '__main__':
    app.run(debug=True)
