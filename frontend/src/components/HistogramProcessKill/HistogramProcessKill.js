import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomRGB() {
  return `rgb(${random(1, 255)}, ${random(1, 255)}, ${random(1, 255)})`;
}

export const HistogramProcessKill = ({ dataAmKill }) => {
  const [dtHist, setDathist] = useState(null);

  useEffect(() => {
    const createData = (data) => {
      const elements = [];
      const tmpDt = {};
      const timeDics = data["TIMESTAMP"];
      const pidDics = data["PID"];
      const processDics = data["PROCESS"];
      const importanceDics = data["IMPORTANCE"];
      const subreasonDics = data["SUBREASON"];

      for (let k in pidDics) {
        const count_proc = processDics[k];
        if (tmpDt[count_proc]) {
          tmpDt[count_proc]++;
        } else {
          tmpDt[count_proc] = 1;
        }

        elements.push({
          pid: pidDics[k],
          time: timeDics[k],
          process: processDics[k],
          subreason: subreasonDics[k],
          importance: importanceDics[k],
        });
      }

      const topFiveProcesses = Object.entries(tmpDt)
      .sort((a, b) => b[1] - a[1]) 
      .slice(0, 5);

      const sortedProcesses = topFiveProcesses.sort((a, b) => a[1] - b[1]);
      const labels = sortedProcesses.map(([process]) => process);
      const values = sortedProcesses.map(([, count]) => count);
      const colors = labels.map(() => randomRGB());

      setDathist({ labels, values, colors });
    };

    if (dataAmKill) {
      createData(dataAmKill);
    }
  }, [dataAmKill]);

  return (
    dtHist && (
      <Plot
        data={[
          {
            x: dtHist.values,
            y: dtHist.labels, 
            type: "bar",
            orientation: "h", 
            marker: { 
              color: dtHist.colors ,
              width: 0.8,
            },
            text: dtHist.labels.map((label, index) => `${label} (${dtHist.values[index]})`),
            textposition: 'auto', 
            cliponaxis: false,
          },
        ]}
        layout={{
          title: "Top 5 Processes Most Frequently Killed (Ordered by Count)",
          xaxis: { title: "", showticklabels: false, linecolor: "white", gridcolor: "white" },  
          yaxis: { title: "", showticklabels: false, linecolor: "white", gridcolor: "white" }, 
        }}
        style={{ width: "100%", height: "400px" }}
      />
    )
  );
};
