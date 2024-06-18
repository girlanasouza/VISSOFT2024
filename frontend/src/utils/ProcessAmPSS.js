export const ProcessAmPSS = ({ dataAmPss }) => {
  const elements = [];
  const dateDics = dataAmPss["DATE"];
  const timestampDics = dataAmPss["TIMESTAMP"];
  const pidDics = dataAmPss["PID"];
  const processDics = dataAmPss["PROCESS"];
  const pssDics = dataAmPss["PSS"];
  const rssDics = dataAmPss["RSS"];

  let row = [];
  const csvData = [["date", "time", "pid", "process", "pss", "rss"]];

  for (let k in pidDics) {
    row = [
      dateDics[k],
      timestampDics[k],
      pidDics[k],
      processDics[k],
      pssDics[k],
      rssDics[k],
    ];
    csvData.push(row);
    elements.push({
      date: dateDics[k],
      time: timestampDics[k],
      pid: pidDics[k],
      process: processDics[k],
      pss: pssDics[k],
      rss: rssDics[k],
    });
  }
  return { elements, csvData };
};
