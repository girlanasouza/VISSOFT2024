import React, { useEffect, useState } from "react";
import { AmKill } from "../AmKill";
import { Summary } from "../Summary";
import { TotalRSS } from "../TotalRSS";
import { TableAMPSS } from "../TableAMPSS";
import { ChartLineAmPSSRSS } from "../ChartLineAmPSSRSS";
import { ReasonsProcessDied } from "../ReasonsProcessDied";
import { HistogramReasonDeath } from "../HistogramReasonDeath";
import { HistogramProcessKill } from "../HistogramProcessKill/HistogramProcessKill";
import { BarChartAmPSS } from "../BarChartAmPSS";


import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../../styles/styles.css";

export const Analysis = () => {
  const [dataRss, setDataRss] = useState({});
  const [dataAmPss, setDataAmPss] = useState({});
  const [dataAmKill, setDataAmKill] = useState({});
  const [fileUploaded, setFileUploaded] = useState("");
  const [dataReasonDeath, setDataReasonDeath] = useState({});

  useEffect(() => {
    fetchData("TotalMemory", setDataRss);
    fetchData("amPss", setDataAmPss);
    fetchData("amKill", setDataAmKill);
    fetchData("reasonDeath", setDataReasonDeath);
    fetchFileUploaded();
  }, []);

  const fetchData = async (endpoint, setData) => {
    try {
      const response = await fetch(`/${endpoint}`);
      const dataJson = await response.json();
      setData(dataJson);
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}:`, error);
    }
  };

  const fetchFileUploaded = async () => {
    try {
      const response = await fetch("/file");
      const fileResponse = await response.text();
      setFileUploaded(fileResponse);
    } catch (error) {
      console.error("Error fetching uploaded file:", error);
    }
  };

  return (
    <div className="container mt-5">
      <Summary fileUploaded={fileUploaded} />

      {/* Visão Geral de Uso de Memória */}
      {/* <div className="section  mt-5" id="totalRss">
        <SectionHeader
          title="TOTAL RESIDENT SET SIZE (RSS) and PROPORTIONAL SET SIZE (PSS) by process"
          description={
            <>
              <p>
                <strong>Resident Set Size (RSS)</strong> refers to the total
                amount of memory (in bytes) used by a process in RAM, including
                both the executable code and the data structures it has
                allocated. This includes both shared and private memory pages.
              </p>
              <p>
                <strong>Proportional Set Size (PSS)</strong> is a more refined
                measure of memory usage, especially in cases where multiple
                processes share memory resources. It divides the shared memory
                evenly among all the processes that are using it, providing a
                more accurate representation of each process's "fair share" of
                memory.
              </p>
            </>
          }
        />
        <TotalRSS dataRss={dataRss} />
      </div> */}

      {/* Event Log AM PSS */}
      <div className="section" id="reasonDeath">
        <SectionHeader title="EVENT LOG TAG AM_PSS" />
        <p>Report collection of memory used by a process</p>
        <ChartLineAmPSSRSS dataAmPss={dataAmPss} />
        {/* <MemoryConsumptionChart dataAmPss={dataAmPss} /> */}
        {/* <ErrorBarAmPSS dataAmPss={dataAmPss} /> */}
        
        
        <div className="mt-5">
          <BarChartAmPSS dataAmPss={dataAmPss}/>
        </div>

        <div className="mt-5">
          <TableAMPSS dataAmPss={dataAmPss} />
        </div>
      </div>

      {/*  Event Log AM KILL*/}
      <div className="section" id="amKill">
        <SectionHeader title="EVENT LOG TAG AM KILL" />
        <p>The horizontal graph shows the five most frequently terminated processes, ordered by number of occurrences from smallest to largest. Each bar represents a specific process, with the length of the bar indicating how often the process was terminated. </p>
        <HistogramProcessKill dataAmKill={dataAmKill}/>
        <AmKill dataAmKill={dataAmKill} />
        
      </div>

      {/* Motivos de Encerramento de Processos */}
      <div className="section" id="reasonDeath">
        <SectionHeader title="APPLICATION EXIT INFO" />
        <p>The horizontal graph shows the main causes of death, ordered by the frequency with which they occur. Each bar represents a specific reason, and the length of the bar indicates the number of occurrences of that reason. </p>
        <HistogramReasonDeath dataReasonDeath={dataReasonDeath} />
        <ReasonsProcessDied dataReasonDeath={dataReasonDeath} />
      </div>
    </div>
  );
};

const SectionHeader = ({ title, description }) => (
  <div className="section-header">
    <h3>{title}</h3>
    <hr />
    {description && (
      <div>
        <div className="d-flex justify-content-end mb-2">
          <a
            data-bs-toggle="collapse"
            href={`#${title.replace(/\s+/g, "")}`}
            role="button"
            aria-expanded="false"
            aria-controls={title.replace(/\s+/g, "")}
            className="collapse-toggle"
          >
            <i className="bi bi-plus-circle text-dark"></i>
          </a>
        </div>
        <div className="collapse multi-collapse" id={title.replace(/\s+/g, "")}>
          {description}
        </div>
      </div>
    )}
  </div>
);
