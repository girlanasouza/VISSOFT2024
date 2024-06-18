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
      line: { color: "blue" },
    },
    {
      x: timestamps,
      y: pssValues,
      text: processes,
      type: "scatter",
      mode: "lines+markers",
      name: "PSS",
      line: { color: "red" },
    },
  ];

  const plotlyLayout = {
    title: "Consumption of RSS and PSS over Time",
    xaxis: {
      title: "Timestamp",
      tickangle: -45,
    },
    yaxis: {
      title: "Memory(MB)",
    },
    hovermode: "closest",
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
