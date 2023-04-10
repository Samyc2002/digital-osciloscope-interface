# import Adafruit_DHT
import time
import json
import random
import pymongo
import requests
import numpy as np

# import RPi.GPIO as GPIO
# import ADS1x15
from datetime import datetime

# MongoDB connection details
mongo_url = "mongodb://localhost:27017/"
mongo_db = "mydatabase"
mongo_collection = "mycollection"

# Sensor details
# sensor = Adafruit_DHT.DHT22
# sensor_pin = 4

# ADC details
# adc = ADS1x15.ADS1115()
adc_channel = 0
adc_scale = 6.144  # Volts
adc_samples_per_second = 128
adc_gain = 2 / 3

# GPIO setup
# GPIO.setmode(GPIO.BCM)
# GPIO.setup(17, GPIO.OUT)

# Connect to MongoDB
client = pymongo.MongoClient(mongo_url)
db = client[mongo_db]
collection = db[mongo_collection]

# Define the time points for one cycle of the ECG signal
fs = 1000 # Sample rate in Hz
t = np.arange(0, 1, 1/fs)

# Generate baseline drift and add it to the signal
baseline = np.cumsum(np.random.randn(len(t)))
ecg = baseline + np.random.randn(len(t)) * 0.5

# Add P-wave
p_start = int(0.1 * fs)
p_end = int(0.15 * fs)
p_wave = np.linspace(0, 1, p_end - p_start)
ecg[p_start:p_end] += p_wave

# Add QRS complex
q_start = int(0.15 * fs)
q_end = int(0.4 * fs)
qrs_wave = np.concatenate([np.linspace(0, 1, int((q_end-q_start)*0.4)),
                            np.linspace(1, 0.2, int((q_end-q_start)*0.1)),
                            np.linspace(0.2, -0.3, int((q_end-q_start)*0.2)),
                            np.linspace(-0.3, 0, int((q_end-q_start)*0.3))])
ecg[q_start:q_start+len(qrs_wave)] += qrs_wave

# Add T-wave
t_start = int(0.4 * fs)
t_end = int(0.5 * fs)
t_wave = np.linspace(0, 1, t_end - t_start)
ecg[t_start:t_end] += t_wave

# Add R-peak
r_peak = np.max(ecg[q_start:q_end])
r_peak_index = np.argmax(ecg[q_start:q_end]) + q_start
ecg[r_peak_index-2:r_peak_index+3] += [0, r_peak/2, r_peak, r_peak/2, 0]

# Add ST-segment
st_start = int(0.5 * fs)
st_end = int(0.6 * fs)
st_segment = np.linspace(0, -0.5, st_end - st_start)
ecg[st_start:st_end] += st_segment

# Add noise
ecg += np.random.normal(0, 0.1, len(ecg))

# Read sensor data and insert into MongoDB
while True:
    # Read DHT22 sensor data
    # humidity, temperature = Adafruit_DHT.read_retry(sensor, sensor_pin)

    # Read ADC data
    # adc_value = adc.read_adc(adc_channel, gain=adc_gain) * (adc_scale / 32767.0)

    headers = {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0MWM3M2FmYTM2NWYxYTE1ODE0N2QiLCJuYW1lIjoiU2FtcmlkZGhhIENoYXR0b3BhZGh5YXkiLCJhdmF0YXIiOiIiLCJ3b3JrX21haWwiOiIyMDAwMjAwNDBAaWl0ZGguYWMuaW4iLCJwaG9uZSI6OTY3NDk1MDMwNywiY3JlYXRlZF9hdCI6IjIwMjMtMDMtMTdUMDc6NDY6MzAuMTMxWiIsInVwZGF0ZWRfYXQiOiIyMDIzLTAzLTE3VDA3OjQ2OjMwLjEzMVoiLCJwYXNzd29yZCI6IkFETUlOMTIzNCIsImlzQWN0aXZlIjpmYWxzZSwiaGVhcnREYXRhIjpbXSwiX192IjowLCJpYXQiOjE2NzkwNDIxMDV9.jAw6EYKl7N1x2l96TPBtFxQO0-CVLArif-g3upgVRKw",
        "Content-Type": "application/json",
    }

    for i in ecg:
        # payload = json.dumps({"value": t[i]})
        # response = requests.post(
        #     "https://d392-14-139-150-66.in.ngrok.io/heartData",
        #     headers=headers,
        #     data=payload,
        #     verify=False,
        #     )
        # print(response.json())
        # time.sleep(1)
        payload = json.dumps({"value": i})
        response = requests.post(
            "https://d392-14-139-150-66.in.ngrok.io/heartData",
            headers=headers,
            data=payload,
            verify=False,
        )
        print(response.json())
        # time.sleep(1)


    # if humidity is not None and temperature is not None:
    #     print("Data inserted into MongoDB:", data)
    # else:
    #     print("Failed to retrieve data from sensor")

    # Toggle GPIO output
    # GPIO.output(17, not GPIO.input(17))
