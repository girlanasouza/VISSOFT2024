import * as React from "react";
import { CSVLink } from "react-csv";
import { DataGrid } from "@mui/x-data-grid";

export const TableBody = ({
  columns,
  rowsPerPage,
  data,
  page,
  dataCsv,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const rows = data.map((row, index) => ({
    id: index,
    ...row,
  }));
  return (
    <React.Fragment>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pagination
          pageSize={rowsPerPage}
          rowCount={data.length}
          page={page}
          onPageChange={(params) => onPageChange(params.page)}
          pageSizeOptions={[5, 10, 25]}
          onPageSizeChange={(params) => onRowsPerPageChange(params.pageSize)}
        />
      </div>
      <div className="d-flex justify-content-end mt-2">
        <button type="button" className="btn btn-dark">
          <CSVLink
            className="text-decoration-none text-white fw-bold"
            data={dataCsv}
          >
            Download CSV
          </CSVLink>
        </button>
      </div>
    </React.Fragment>
  );
};
