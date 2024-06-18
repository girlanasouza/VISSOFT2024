import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { ProcessAmPSS } from "../../utils/ProcessAmPSS";

export const BarChartAmPSS = ({ dataAmPss }) => {
  const [data, setData] = useState([]);
  const [selectedProcess, setSelectedProcess] = useState(null);

  useEffect(() => {
    const createData = (dataAmPss) => {
      const { elements } = ProcessAmPSS({ dataAmPss });
      setData(elements);
    };
    createData(dataAmPss);
  }, [dataAmPss]);

  const handleProcessChange = (processName) => {
    setSelectedProcess(processName);
  };

  // Filtrando os dados conforme o processo selecionado
  const filteredData = selectedProcess
    ? data.filter((entry) => entry.process === selectedProcess)
    : data;

  const timestamps = filteredData.map((entry) => entry.time);
  const rssValues = filteredData.map((entry) => entry.rss);
  const pssValues = filteredData.map((entry) => entry.pss);
  const processesValues = filteredData.map((entry) => entry.pid);

  const plotlyData = [
    {
      x: timestamps,
      y: rssValues,
      text: processesValues,
      type: "scatter",
      mode: "lines+markers",
      name: "RSS",
      marker: { color: "red" },
    },
    {
      x: timestamps,
      y: pssValues,
      text:processesValues,
      type: "scatter",
      mode: "lines+markers",
      name: "PSS",
      marker: { color: "blue" },
    },
  ];

  const plotlyLayout = {
    title: "RSS and PSS Values over Time by Process",
    barmode: "group", 
    xaxis: {
      title: "Timestamp",
      tickangle: -45,
    },
    yaxis: {
      title: "Memory(MB)",
    },
  };

  return (
    <React.Fragment>
      <div class="form-floating">
        {/* <label>Select Process:</label>{" "} */}
        <select class="form-select" id="floatingSelect" onChange={(e) => handleProcessChange(e.target.value)}>
          <option value="">All Processes</option>
          {data.map((entry) => (
            <option key={entry.process} value={entry.process}>
              {entry.process}
            </option>
          ))}
        </select>
        <label for="floatingSelect">Select Process</label>{" "}

      </div>
      <Plot
        data={plotlyData}
        layout={plotlyLayout}
        style={{ width: "100%", height: "100%" }}
      />
    </React.Fragment>
  );
};
