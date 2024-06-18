import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { ProcessAmPSS } from "../../utils/ProcessAmPSS";

export const MemoryConsumptionChart = ({ dataAmPss }) => {
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

  return (
    <React.Fragment>
      <Plot
        data={[
          {
            x: timestamps,
            y: pssValues,
            type: "scatter",
            mode: "lines",
            name: "PSS",
            line: { color: "blue" },
          },
          {
            x: timestamps,
            y: rssValues,
            type: "scatter",
            mode: "lines",
            name: "RSS",
            line: { color: "red" },
          },
        ]}
        layout={{
          title: "Memory Consumption Over Time",
          xaxis: { title: "Time" },
          yaxis: { title: "Memory Consumption (MB)" },
        }}
        style={{ width: "100%", height: "400px" }}
      />
    </React.Fragment>
  );
};
