import Adafruit_DHT
import pymongo
import RPi.GPIO as GPIO
import ADS1x15
from datetime import datetime

# MongoDB connection details
mongo_url = "mongodb://localhost:27017/"
mongo_db = "mydatabase"
mongo_collection = "mycollection"

# Sensor details
sensor = Adafruit_DHT.DHT22
sensor_pin = 4

# ADC details
adc = ADS1x15.ADS1115()
adc_channel = 0
adc_scale = 6.144  # Volts
adc_samples_per_second = 128
adc_gain = 2/3

# GPIO setup
GPIO.setmode(GPIO.BCM)
GPIO.setup(17, GPIO.OUT)

# Connect to MongoDB
client = pymongo.MongoClient(mongo_url)
db = client[mongo_db]
collection = db[mongo_collection]

# Read sensor data and insert into MongoDB
while True:
    # Read DHT22 sensor data
    humidity, temperature = Adafruit_DHT.read_retry(sensor, sensor_pin)

    # Read ADC data
    adc_value = adc.read_adc(adc_channel, gain=adc_gain) * (adc_scale / 32767.0)

    if humidity is not None and temperature is not None:
        data = {
            "timestamp": datetime.now(),
            "temperature": temperature,
            "humidity": humidity,
            "analog_value": adc_value
        }
        collection.insert_one(data)
        print("Data inserted into MongoDB:", data)
    else:
        print("Failed to retrieve data from sensor")

    # Toggle GPIO output
    GPIO.output(17, not GPIO.input(17))