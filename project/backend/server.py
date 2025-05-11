from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
import numpy as np
from PIL import Image
import io

app = Flask(__name__)

# Load the model
model = load_model('models/bestmodel.keras')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get image from request
        image_file = request.files['image']
        image_bytes = image_file.read()
        image = Image.open(io.BytesIO(image_bytes))
        
        # Preprocess image (adjust according to your model's requirements)
        image = image.resize((224, 224))  # adjust size as needed
        image_array = np.array(image)
        image_array = image_array / 255.0  # normalize
        image_array = np.expand_dims(image_array, axis=0)
        
        # Get form data
        form_data = request.form.to_dict()
        
        # Make prediction
        prediction = model.predict(image_array)
        
        return jsonify({
            'prediction': 'PCOS Detected' if prediction[0] > 0.5 else 'No PCOS Detected',
            'confidence': float(prediction[0])
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
