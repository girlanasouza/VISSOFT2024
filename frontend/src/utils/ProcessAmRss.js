export const ProcessAmRSS = ({ dataRss }) => {
  const elements = [];
  const pidDics = dataRss["PID"];
  const processDics = dataRss["PROCESS"];
  const rssDics = dataRss["RSS(MB)"];
  const pssDics = dataRss["PSS(MB)"];
  let row = [];
  const csvData = [["pid", "process", "rss", "pss"]];

  for (let k in pidDics) {
    row = [pidDics[k], processDics[k], rssDics[k], pssDics[k]];
    csvData.push(row);
    elements.push({
      pid: pidDics[k],
      process: processDics[k],
      rss: rssDics[k],
      pss: pssDics[k],
    });
  }
  return { elements, csvData };
};
