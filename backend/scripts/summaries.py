import re

def getModelDeviceName(file):
    moldelNameRE = re.compile('\[ro.product.model\]:\s+\[(.*?)\]\n')
    return moldelNameRE