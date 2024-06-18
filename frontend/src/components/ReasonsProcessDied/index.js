import * as React from "react";
import { CSVLink } from "react-csv";
import { DataGrid } from "@mui/x-data-grid";
import { ProcessReasonInfo } from "../../utils/ProcessReasonInfo";
import { ThemeProvider } from "@mui/material/styles";
import { ThemeTable } from "../ThemeTable";

export const ReasonsProcessDied = ({ dataReasonDeath }) => {
  const [data, setData] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dataCsv, setDataCsv] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  React.useEffect(() => {
    const processData = () => {
      const { elements, csvData } = ProcessReasonInfo({ dataReasonDeath });
      setData(elements);
      setDataCsv(csvData);
    };
    processData();
  }, [dataReasonDeath]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // "pid", "time", "process", "reason", "subreason", "importance" Importance
  const columns = [
    { field: "time", headerName: "TIMESTAMP", flex: 1 },
    { field: "pid", headerName: "PID", flex: 1 },
    { field: "process", headerName: "PROCESS", flex: 1 },
    { field: "reason", headerName: "REASON", flex: 1 },
    { field: "subreason", headerName: "SUBREASON", flex: 1 },
    { field: "importance", headerName: "IMPORTANCE", flex: 1 },
  ];

  const rows = data.map((row, index) => ({
    id: index,
    ...row,
  }));

  return (
    <ThemeProvider theme={ThemeTable}>
      <React.Fragment>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pagination
            pageSize={rowsPerPage}
            rowCount={data.length}
            page={page}
            onPageChange={(params) => handleChangePage(params.page)}
            pageSizeOptions={[5, 10, 25]}
            onPageSizeChange={(params) =>
              handleChangeRowsPerPage(params.pageSize)
            }
          />
        </div>
        <div className="d-flex justify-content-end mt-2">
          <button type="button" class="btn btn-dark">
            <CSVLink
              className="text-decoration-none text-white fw-bold"
              data={dataCsv}
            >
              Download CSV
            </CSVLink>
          </button>
        </div>
      </React.Fragment>
    </ThemeProvider>
  );
};
