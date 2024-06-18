import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { ProcessAmPSS } from "../../utils/ProcessAmPSS";
import { ThemeTable } from "../ThemeTable";
import { TableBody } from "../TableBody";

export const TableAMPSS = ({ dataAmPss }) => {
  const [page, setPage] = React.useState(0);
  const [data, setData] = React.useState([]);
  const [dataCsv, setDataCsv] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  React.useEffect(() => {
    const processData = () => {
      const { elements, csvData } = ProcessAmPSS({ dataAmPss });
      setData(elements);
      setDataCsv(csvData);
    };

    processData();
  }, [dataAmPss]);

  const columns = [
    { field: "date", headerName: "DATE", flex: 1 },
    { field: "time", headerName: "TIMESTAMP", flex: 1 },
    { field: "pid", headerName: "PID", flex: 1 },
    { field: "process", headerName: "PROCESS", flex: 1 },
    { field: "pss", headerName: "PSS(MB)", flex: 1 },
    { field: "rss", headerName: "RSS(MB)", flex: 1 },
  ];

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (pageSize) => {
    setRowsPerPage(pageSize);
    setPage(0);
  };

  return (
    <ThemeProvider theme={ThemeTable}>
      <TableBody
        columns={columns}
        rowsPerPage={rowsPerPage}
        data={data}
        page={page}
        dataCsv={dataCsv}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </ThemeProvider>
  );
};
