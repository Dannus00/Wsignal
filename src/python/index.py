import sys 
import json
import matplotlib.pyplot as plt
import numpy as np
from scipy.io import loadmat

x=loadmat(sys.argv[1])

ecg =(x['val']-0)/200
fs=100
tm=1/fs
t=np.linspace(0,np.size(ecg),np.size(ecg))*tm
strXY = ""
for i in range(len(ecg[0])):
    strXY = strXY + str(t[i]) + "," + str(ecg[0, i]) + " "
print(strXY)
dictionary = {

    "data" : strXY
}

with open("src/JSON/sample.json", "w") as outfile:
    json.dump(dictionary, outfile)
