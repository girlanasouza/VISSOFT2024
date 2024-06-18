export const ProcessKillInfo = ({ dataAmKill }) => {
  const elements = [];
  const timeDics = dataAmKill["TIMESTAMP"];
  const pidDics = dataAmKill["PID"];
  const processDics = dataAmKill["PROCESS"];
  const importanceDics = dataAmKill["IMPORTANCE"];
  const subreasonDics = dataAmKill["SUBREASON"];
  let row = [];
  const csvData = [["pid", "time", "process", "subreason", "importance"]];

  for (let k in pidDics) {
    row = [
      pidDics[k],
      timeDics[k],
      processDics[k],
      subreasonDics[k],
      importanceDics[k],
    ];
    csvData.push(row);
    elements.push({
      pid: pidDics[k],
      time: timeDics[k],
      process: processDics[k],
      subreason: subreasonDics[k],
      importance: importanceDics[k],
    });
  }
  return { elements, csvData };
};
