export const ProcessReasonInfo = ({ dataReasonDeath }) => {
  const elements = [];
  const timeDics = dataReasonDeath["TIME"];
  const pidDics = dataReasonDeath["PID"];
  const processDics = dataReasonDeath["PROCESS"];
  const reasonDics = dataReasonDeath["REASON"];
  const subreasonDics = dataReasonDeath["SUBREASON"];
  const importanceDics = dataReasonDeath["IMPORTANCE"];
  let row = [];
  const csvData = [
    ["pid", "time", "process", "reason", "subreason", "importance"],
  ];

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
      reason: reasonDics[k],
      subreason: subreasonDics[k],
      importance: importanceDics[k],
    });
  }
  return { elements, csvData };
};
