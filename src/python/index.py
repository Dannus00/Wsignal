import matplotlib.pyplot as plt
import numpy as np
from scipy.io import loadmat

x=loadmat('a01m.mat')

ecg =(x['val']-0)/200
ecg=np.transpose(ecg)
fs=100
tm=1/fs
t=np.linspace(0,np.size(ecg),np.size(ecg))*tm

plt.plot(t,ecg)
plt.show()
