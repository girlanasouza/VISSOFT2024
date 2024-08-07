import re
import pandas as pd
import plotly.express as px
from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
import json
import os

from scripts import ampss, amrss, interruption, cpuinfo
from flask import Flask, request, jsonify

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] =  "/app/backend/upload" # Defina o caminho para a pasta de upload
CORS(app, support_credentials=True)
file = ""

def readFile(nome_arquivo):
    global file
    with open(nome_arquivo, 'r',encoding='latin-1') as arquivo:
        file = arquivo.read()
    return file

@app.route('/upload', methods=['POST'])
@cross_origin(supports_credentials=True)
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    uploaded_file = request.files['file']
    if uploaded_file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    file_path = os.path.join(app.config['UPLOAD_FOLDER'], uploaded_file.filename)
    try:
        # Ensure the upload folder exists
        os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
        uploaded_file.save(file_path)
        readFile(file_path)
        return jsonify({'message': 'File uploaded successfully'}), 200
    except Exception as e:
        print(f"Error reading the file: {e}")
        return jsonify({'error': 'Failed to read the file'}), 500
    
@app.route('/file', methods=['GET'])
@cross_origin(supports_credentials=True)
def getFile():
    try:
        return file
    except:
        print("Error in the file uploaded!!!")
        return None


@app.route('/amPss', methods=['GET'])
@cross_origin(supports_credentials=True)
def getJsonAmPss():
    try:
        content = ampss.am_pss(file)
        return jsonify(content.to_dict())
    except:
        print("Erro on the file uploade!!!")
        return None

@app.route('/reasonDeath', methods=['GET'])
@cross_origin(supports_credentials=True)
def getJsonReasonDeath():
    try:
        content = interruption.reasonDeath(file)
        return jsonify(content.to_dict())
    except:
        print("Erro in the file uploade!!!")
        return None

@app.route('/TotalMemory', methods=['GET'])
@cross_origin(supports_credentials=True)
def getTotalMemory():
    try:
        content = ampss.totalPssRss(file)
        return jsonify(content.to_dict())
    except:
        print("Erro in the file uploade!!!")
        return None

@app.route('/amKill', methods=['GET'])
@cross_origin(supports_credentials=True)
def getAmKill():
    try:
        content =interruption.amKill(file)
        return jsonify(content.to_dict())
    except:
        print("Erro in the file uploade!!!")
        return None

@app.route('/CpuInfo', methods=['GET'])
@cross_origin(supports_credentials=True)
def getCpuInfo():
    try:
        df_cpu_info = cpuinfo.generateDfCpuInfo(file)
        return jsonify(df_cpu_info.to_dict())
    except:
        print("Erro in the file uploade!!!")
        return None
if __name__=='__main__': 
    app.run(debug=False)
    