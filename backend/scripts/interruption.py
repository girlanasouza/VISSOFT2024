import re
import pandas as pd
import plotly.express as px

def processar_info_kill(line, date, values):
    date = line.replace('[', '').replace(']','').replace('  ', ' ').replace(': ',' ').split(' ')
    values = line.replace('[', '').replace(']','').replace('  ', ' ').replace(' : ',' ').replace(': ',' ').replace(' #', '#').split(' ')
    return date, values

def amKill(file):
    re_proc_kill = re.compile(r'([0-9\-]* [.:0-9]*  [0-9]*  [0-9]*  [0-9]* [A-Z] am_kill.*?)\n', flags=re.M|re.S)
    log_proc_kill = re_proc_kill.findall(file)
    timestamp_proc_kill,pid_proc_kill, name_proc_kill, imp_kill, subreason_kill = [],[],[],[],[]
    date=""
    values=""
    for line in log_proc_kill:
        date, values = processar_info_kill(line, date, values)
        timestamp_proc_kill.append(date[0]+" "+re.search(r'\d{2}:\d{2}',date[1]).group())
        filter_line=re.search(r'am_kill.*?\[(\d+),(\d+),(.*?),(\d+),(.*?)\]', line)
        pid_proc_kill.append(filter_line.group(2))
        name_proc_kill.append(filter_line.group(3))
        imp_kill.append(filter_line.group(4))
        subreason_kill.append(filter_line.group(5))
    proc_kill_df = {
        'TIMESTAMP': timestamp_proc_kill,
        'PID': pid_proc_kill,
        'PROCESS': name_proc_kill,
        'IMPORTANCE': imp_kill,
        'SUBREASON': subreason_kill
    }
    proc_kill_df = pd.DataFrame(proc_kill_df)
    return (proc_kill_df)

def dictDeathReason():
    dict_reason = {}
    dict_reason['UNKNOWN']=0
    dict_reason['EXIT_SELF']=1
    dict_reason['SIGNALED']=2
    dict_reason['LOW_MEMORY']=3
    dict_reason['APP CRASH']=4
    dict_reason['CRASH_NATIVE']=5
    dict_reason['ANR']=6
    dict_reason['INITIALIZATION_FAILURE']=7
    dict_reason['PERMISSION CHANGE']=8
    dict_reason['EXCESSIVE RESOURCE USAGE']=9
    dict_reason['USER REQUESTED']=10
    dict_reason['USER STOPPED']=11
    dict_reason['DEPENDENCY DIED']=12
    dict_reason['OTHER KILLS BY SYSTEM']=13
    dict_reason['FREEZER']=14
    dict_reason['PACKAGE STATE CHANGE']=15
    dict_reason['PACKAGE UPDATED']=16
    return dict_reason

def reasonDeath(file):
    re_rDied = re.compile(r'(ACTIVITY MANAGER PROCESS EXIT INFO.*?)\n\n',flags=re.S)
    pid_reason , name_proc_reason , reason , sub_reason = [], [], [], []
    timestamp_reason , impor_reason= [], []
    date_process = re.split(r':\n', re_rDied.search(file).group(0))[1:]
    for line in date_process:
        pid_match = re.search(r'pid=(\d+)', line)
        name_proc_match = re.search(r'process=([\.a-zA-Z]+)', line)
        timestamp_match = re.search(r'timestamp=(\d{4}\-\d{2}\-\d{2}\s+\d{2}\:\d{2}\:\d{2}\.\d{3})', line, flags=re.S)
        reason_match = re.search(r'reason=\d+\s+\(([\w\s]+)\)', line, flags=re.S)
        sub_reason_match = re.search(r'subreason=\d+\s+\(([\w\s]+)\)', line, flags=re.S)
        impor_reason_match = re.search(r'importance=([0-9,]+)', line)
        pid_reason.append(pid_match.group(1) if pid_match else 'NO_PID')
        name_proc_reason.append(name_proc_match.group(1) if name_proc_match else 'NO_NAME') 
        timestamp_reason.append(timestamp_match.group(1) if timestamp_match else 'NO_TIMESTAMP') 
        reason.append(reason_match.group(1) if reason_match else 'NO_REASON')
        sub_reason.append(sub_reason_match.group(1) if sub_reason_match else 'NO_SUBREASON')
        impor_reason.append(impor_reason_match.group(1) if impor_reason_match else 'NO_IMPORTANCE')

    proc_rDied_df = {
    'TIME':timestamp_reason,
    'PID': pid_reason,
    'PROCESS': name_proc_reason,
    'REASON': reason,
    'SUBREASON':sub_reason,
    'IMPORTANCE': impor_reason
    }

    proc_rDied_df = pd.DataFrame(proc_rDied_df)
    return proc_rDied_df