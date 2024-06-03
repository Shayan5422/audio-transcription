from flask import Flask, request, jsonify
import requests
from flask_cors import CORS
import logging

app = Flask(__name__)
CORS(app)

# Set your OpenAI API key here
OPENAI_API_KEY = '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'
OPENAI_API_URL = 'https://api.openai.com/v1/audio/transcriptions'

# Configure logging
logging.basicConfig(level=logging.DEBUG)

@app.route('/api/transcribe', methods=['POST'])
def transcribe_audio():
    if 'file' not in request.files:
        app.logger.error('No file part in the request')
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']

    try:
        # Use the requests library to call the OpenAI API for transcription
        app.logger.info('Sending file to OpenAI API for transcription')
        headers = {
            'Authorization': f'Bearer {OPENAI_API_KEY}'
        }
        files = {
            'file': (file.filename, file.stream, file.mimetype)
        }
        data = {
            'model': 'whisper-1'
        }
        response = requests.post(OPENAI_API_URL, headers=headers, files=files, data=data)
        
        if response.status_code != 200:
            raise Exception(f'OpenAI API request failed with status {response.status_code}: {response.text}')
        
        app.logger.info('Received response from OpenAI API')
        return jsonify(response.json())
    except Exception as e:
        app.logger.error(f'Error transcribing audio: {e}')
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)
