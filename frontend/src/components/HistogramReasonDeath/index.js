import * as React from "react";
import Plot from "react-plotly.js";

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

function randomRGB() {
  return `rgb(${random(1, 255)}, ${random(1, 255)}, ${random(1, 255)})`;
}
export const HistogramReasonDeath = ({ dataReasonDeath }) => {
  const [dtHist, setDathist] = React.useState(null);

  React.useEffect(() => {
    const createData = (data) => {
      const elements = [];
      const tmpDt = {};
      const timeDics = data["TIME"];
      const pidDics = data["PID"];
      const processDics = data["PROCESS"];
      const reasonDics = data["REASON"];
      const subreasonDics = data["SUBREASON"];
      const importanceDics = data["IMPORTANCE"];

      for (let k in pidDics) {
        let tmp_reason = reasonDics[k];
        if (tmpDt[tmp_reason]) {
          tmpDt[tmp_reason]++;
        } else {
          tmpDt[tmp_reason] = 1;
        }

        elements.push({
          pid: pidDics[k],
          time: timeDics[k],
          process: processDics[k],
          reason: reasonDics[k],
          subreason: subreasonDics[k],
          importance: importanceDics[k],
        });
      } 

      const tmpArray = [];
      for (let k in tmpDt) {
        if (tmpDt[k] >= 5 ) {
          tmpArray.push({ label: k, value: tmpDt[k], color: randomRGB() });
        }
      }

      tmpArray.sort((a, b) => a.value - b.value);

      const labels = tmpArray.map((item) => item.label);
      const values = tmpArray.map((item) => item.value);
      const colors = tmpArray.map((item) => item.color);

      setDathist({ labels, values, colors });
    };

    createData(dataReasonDeath);
  }, [dataReasonDeath]);

  return (
    dtHist && (
      <Plot
        data={[
          {
            x: dtHist.values,  // Valores no eixo x
            y: dtHist.labels,  // Rótulos no eixo y
            type: "bar",
            orientation: "h", 
            marker: { color: dtHist.colors },
            text: dtHist.labels.map((label, index) => `${label} (${dtHist.values[index]})`),
            textposition: "auto",
            width: 0.9,
          },
        ]}
        layout={{
          title: "Top Reasons for Death and Their Occurrences",
          xaxis: { title: "", showticklabels: false, linecolor: "white", gridcolor: "white" },  
          yaxis: { title: "", showticklabels: false, linecolor: "white", gridcolor: "white" }, 
        }}
        style={{ width: "100%", height: "auto" }}
      />
    )
  );
};
