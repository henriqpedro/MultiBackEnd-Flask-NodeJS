from flask import Flask, request, jsonify
import pandas as pd
import math

app = Flask(__name__)

def format_field(value):
    if isinstance(value, int) | isinstance(value, float):
        if math.isnan(value):
            return "NULL"
        return str(value)
    return "'" + str(value) + "'"

@app.route('/upload/', methods=['POST'])
def upload():
    filePath = request.json['path']           
    if filePath:
        table = pd.ExcelFile(filePath).sheet_names[0]
        df = pd.read_excel(filePath, table)
        attributes = ", ".join(df.columns)
        sql = ""
        for index, row in df[0:].iterrows():
            values = ", ".join(map(format_field, row.values))
            sql += "INSERT INTO " + table + " (" + attributes + ") VALUES (" + values + ");\n"
        return jsonify(sql), 200
    return jsonify("Arquivo não encontrado!"), 400

if __name__ == "__main__":
    app.run(debug=True)