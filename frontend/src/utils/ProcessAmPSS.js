export const ProcessAmPSS = ({ dataAmPss }) => {
  const elements = [];
  const dateDics = dataAmPss["DATE"];
  const timestampDics = dataAmPss["TIMESTAMP"];
  const pidDics = dataAmPss["PID"];
  const processDics = dataAmPss["PROCESS"];
  const pssDics = dataAmPss["PSS"];
  const rssDics = dataAmPss["RSS"];

  let row = [];
  const csvData = [["date", "time", "pid", "process", "pss", "rss", "pssError", "rssError"]];

  for (let k in pidDics) {
    const pssError = pssDics[k] * 0.05; // 5% do valor de PSS como erro
    const rssError = rssDics[k] * 0.05; // 5% do valor de RSS como erro

    row = [
      dateDics[k],
      timestampDics[k],
      pidDics[k],
      processDics[k],
      pssDics[k],
      rssDics[k],
      pssError,
      rssError
    ];
    csvData.push(row);
    elements.push({
      date: dateDics[k],
      time: timestampDics[k],
      pid: pidDics[k],
      process: processDics[k],
      pss: pssDics[k],
      rss: rssDics[k],
      pssError: pssError,
      rssError: rssError
    });
  }
  return { elements, csvData };
};
