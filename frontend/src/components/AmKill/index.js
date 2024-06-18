import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { ThemeTable } from "../ThemeTable";
import { ProcessKillInfo } from "../../utils/ProcessKillInfo";
import { TableBody } from "../TableBody";

export const AmKill = ({ dataAmKill }) => {
  const [data, setData] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dataCsv, setDataCsv] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  React.useEffect(() => {
    const createData = (dataAmKill) => {
      const { elements, csvData } = ProcessKillInfo({ dataAmKill });
      setData(elements);
      setDataCsv(csvData);
    };
    createData(dataAmKill);
  }, [dataAmKill]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const columns = [
    { field: "pid", headerName: "PID", flex: 1 },
    { field: "time", headerName: "TIMESTAMP", flex: 1 },
    { field: "process", headerName: "PROCESS", flex: 1 },
    { field: "subreason", headerName: "SUBREASON", flex: 1 },
    { field: "importance", headerName: "IMPORTANCE", flex: 1 },
  ];

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
