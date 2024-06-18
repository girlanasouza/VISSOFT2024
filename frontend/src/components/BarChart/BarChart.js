import Plot from "react-plotly.js";
import React, { useState, useEffect } from "react";
import { ProcessAmPSS } from "../../utils/ProcessAmPSS";

export const BarChart = ({ dataAmPss }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const createData = (dataAmPss) => {
      const { elements } = ProcessAmPSS({ dataAmPss });
      setData(elements);
    };
    createData(dataAmPss);
  }, [dataAmPss]);

  const rssValues = data.map((entry) => entry.rss);
  const pssValues = data.map((entry) => entry.pss);
  const processNames = data.map((entry) => entry.process);

  return (
    <Plot
      data={[
        {
          x: processNames,
          y: pssValues,
          type: "bar",
          name: "PSS",
          marker: { color: "blue" },
        },
        {
          x: processNames,
          y: rssValues,
          type: "bar",
          name: "RSS",
          marker: { color: "red" },
        },
      ]}
      layout={{
        title: "Memory Consumption by Process",
        barmode: "group",
        xaxis: { title: "Process", tickangle: -45 },
        yaxis: { title: "Memory Consumption (MB)" },
      }}
      style={{ width: "100%", height: "100%" }}
    />
  );
};
