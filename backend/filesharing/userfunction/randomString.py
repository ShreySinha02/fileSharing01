import random
import math
def randomstring():
    s="123456789abcdefghijklmnopqrstuvwxyz#$*"
    result=""

    for i in range(9):
        index=math.floor(random.random()*len(s))
        result+=s[index]
    return result
        

  
