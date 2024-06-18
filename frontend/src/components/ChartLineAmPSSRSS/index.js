import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { ProcessAmPSS } from "../../utils/ProcessAmPSS";

export const ChartLineAmPSSRSS = ({ dataAmPss }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const createData = (dataAmPss) => {
      const { elements } = ProcessAmPSS({ dataAmPss });
      setData(elements);
    };
    createData(dataAmPss);
  }, [dataAmPss]);

  const timestamps = data.map((entry) => entry.time);
  const rssValues = data.map((entry) => entry.rss);
  const pssValues = data.map((entry) => entry.pss);
  const processes = data.map((entry) => entry.process);

  const plotlyData = [
    {
      x: timestamps,
      y: rssValues,
      text: processes,
      type: "scatter",
      mode: "lines+markers",
      name: "RSS",
      marker: {color: "red", size: 6},
      line: { color: "black", dash: "dash" ,  width: 1},

    },
    {
      x: timestamps,
      y: pssValues,
      text: processes,
      type: "scatter",
      mode: "lines+markers",
      name: "PSS",
      marker: {color: "blue", size: 6},
      line: { color: "black" , dash: "dash" , width: 1},
    },
  ];

  const plotlyLayout = {
    title: {
      text: "Consumption of RSS and PSS over Time",
      font: {
        color: "#000000", // Cor da fonte do título
      },
    },
  
    hovermode: "closest",
    paper_bgcolor: "#ffffff", // Cor de fundo da área do gráfico
    plot_bgcolor: "#ffffff", // Cor de fundo da área de plotagem
    font: {
      color: "#000000", // Cor da fonte do restante do gráfico (legenda, etc.)
    },
  };

  return (
    <React.Fragment>
      <Plot
        data={plotlyData}
        layout={plotlyLayout}
        style={{ width: "100%", height: "100%" }}
      />
    </React.Fragment>
  );
};
