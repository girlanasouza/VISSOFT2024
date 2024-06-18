import re
import pandas as pd
import plotly.express as px
from scripts import ampss

def totalRss(data):
    reg_total_process = re.compile(r'(Total\s+[A-Z]+\s+by\s+[a-zA-Z ]+:.*?)\n\n', flags=re.DOTALL)
    re_rss_process = re.compile(r'([0-9,]+[A-Z]:.*?\))(?:\n|)', flags=re.DOTALL)
    process_consume_rss, process_name_rss, process_id_rss = [],[],[]

    re_rss_process = re.compile(r'([0-9,]+[A-Z]:.*?\))(?:\n|)', flags=re.DOTALL)
    data_to_process = reg_total_process.findall(data)[0]

    for line in re_rss_process.findall(data_to_process):
        values = line.replace(",", "").replace("K", "").replace(":", "").replace("(", "").replace(")", "").split()

        process_consume_rss.append(round(float(values[0])/1024))
        process_name_rss.append(values[1])
        process_id_rss.append(values[3])

    data_amrss = {
        'PID': process_id_rss,
        'PROCESS': process_name_rss,
        'RSS(MB)': process_consume_rss
    }

    df_amRss = pd.DataFrame(data_amrss)

    return df_amRss
