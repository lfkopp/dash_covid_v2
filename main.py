from flask import Flask,render_template,url_for

app = Flask(__name__)
app.secret_key = 'secretkey123456'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/covidimetro')
def covidimetro():
    return render_template('covidimetro.html')

@app.route('/semanal')
def semanal():
    return render_template('semanal.html')

@app.route('/covidimetro2')
def covidimetro2():
    return render_template('covidimetro2.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True)
