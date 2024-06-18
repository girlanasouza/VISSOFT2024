import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { ProcessAmRSS } from "../../utils/ProcessAmRss";
import { ThemeTable } from "../ThemeTable";
import { TableBody } from "../TableBody";

export const TotalRSS = ({ dataRss }) => {
  const [data, setData] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dataCsv, setDataCsv] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  React.useEffect(() => {
    const createData = () => {
      const { elements, csvData } = ProcessAmRSS({ dataRss });
      setData(elements);
      setDataCsv(csvData);
    };

    createData(dataRss);
  }, [dataRss]);

  const columns = [
    { field: "pid", headerName: "PID", flex: 1 },
    { field: "process", headerName: "PROCESS", flex: 1 },
    { field: "rss", headerName: "RSS(MB)", flex: 1 },
    { field: "pss", headerName: "PSS(MB)", flex: 1 },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
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
