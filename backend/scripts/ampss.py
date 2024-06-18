import re
import pandas as pd
import plotly.express as px
from scripts import amrss

# INFORMATION EXTRACT TOTAL PSS BY PROCESS
def totalPssRss(file):
    reg_total_process = re.compile(r'(Total\s+[A-Z]+\s+by\s+[a-zA-Z ]+:.*?)\n\n', flags=re.DOTALL)
    process_consume_pss , process_name_pss, process_id_pss = [], [], []
    re_pss_process = re.compile(r'([0-9,]+[A-Z]:.*?\))(?:\n|)', flags=re.DOTALL)
    data_to_process_pss = re_pss_process.findall(reg_total_process.findall(file)[3])

    process_consume_rss, process_name_rss, process_id_rss = [],[],[]
    re_rss_process = re.compile(r'([0-9,]+[A-Z]:.*?\))(?:\n|)', flags=re.DOTALL)
    data_to_process = reg_total_process.findall(file)[0]

    for line in re_rss_process.findall(data_to_process):
        values = line.replace(",", "").replace("K", "").replace(":", "").replace("(", "").replace(")", "").split()
        process_consume_rss.append(round(float(values[0])/1024))

        process_name_rss.append(values[1])
        process_id_rss.append(values[3])

    for line in data_to_process_pss:
        values = line.replace(",", "").replace("K", "").replace(":", "").replace("(", "").replace(")", "").split()
        pid = values[3]
        consume_pss = (round(float(values[0])/1024))
        name_pss = values[1]
        process_consume_pss.append(consume_pss)
        process_name_pss.append(name_pss)
        process_id_pss.append(pid)
    
    data_ampss = {
        'PID': process_id_pss,
        # 'Process':process_name_pss,
        'PSS(MB)': process_consume_pss
    }

    df_amRss = amrss.totalRss(file)
    df_amPss = pd.DataFrame(data_ampss)
    df_merged = pd.merge(df_amRss,df_amPss,on='PID', how='inner')

    return df_merged

def processInfoPss(line, values1, values2):
    values1 = line.replace('[', '').replace(']','').replace('  ', ' ').replace(': ',' ').split(' ')
    values2 = line.replace('[', '').replace(']','').replace('  ', ' ').split(' ')[-1].split(',')
    return values1, values2

def am_pss(file):
    re_proc_am_pss = re.compile(r'([0-9\-]* [.:0-9]*  [0-9]*  [0-9]*  [0-9]* [A-Z] am_pss.*?)\n', flags= re.S)
    timestamp_am_pss, date_am_pss , pid_am_pss, name_am_pss, pss_am_pss, rss_am_pss = [], [], [], [], [], []
    values_proc_am_pss_p1 = ""
    values_proc_am_pss_p2 = ""
    date_re = re.compile(r'dumpstate:\s+(\d{4}\-\d{2}\-\d{2})\s+\d{2}:\d{2}:\d{2}')
    date_value=date_re.findall(file)[0]
    for line in re_proc_am_pss.findall(file):
        values_proc_am_pss_p1, values_proc_am_pss_p2 = processInfoPss(line, values_proc_am_pss_p1, values_proc_am_pss_p2)
        time_value = (re.search(r'\d{2}:\d{2}:\d{2}\.\d{3}', values_proc_am_pss_p1[1]).group())
        timestamp_am_pss.append(time_value)
        date_am_pss.append(date_value)
        pid_am_pss.append(values_proc_am_pss_p2[0])
        name_am_pss.append(values_proc_am_pss_p2[2])
        pss_am_pss.append((int(int(values_proc_am_pss_p2[3])/1048576)))
        rss_am_pss.append((int(int(values_proc_am_pss_p2[6])/1048576)))

    data_ampss = {
        'DATE': date_am_pss,
        'TIMESTAMP': timestamp_am_pss,
        'PID': pid_am_pss,
        'PROCESS': name_am_pss,
        'PSS': pss_am_pss,
        'RSS': rss_am_pss
    }
    df_amPss = pd.DataFrame(data_ampss)
    return df_amPss
