import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { CSVLink } from "react-csv";

import {
    Grid
  } from '@mui/material';
  
  // project import
  
import "bootstrap/dist/css/bootstrap.min.css"; 
import "bootstrap/dist/js/bootstrap.bundle.min.js"; 


import TableCell, { tableCellClasses } from '@mui/material/TableCell';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export const CpuInfo = ({ dataCpuInfo, fileUploadedCpu }) => {
    const [data, setData] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dataCsv, setDataCsv] = React.useState([]);
    const [summaryCpu, setSummaryCpu] = React.useState([]);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    
    React.useEffect(() => {
        const cpuInfoRE = /-+\s+CPU\s+INFO\s+\(top\s+-b\s+-n\s+1\s+-H\s+-s\s+6\s+-o\s+pid,tid,user,pr,ni,%cpu,s,virt,res,pcy,cmd,name\)\s+-+.*?\n\n/s;
        const cpuInfoMatch = cpuInfoRE.exec(fileUploadedCpu);

        if (cpuInfoMatch) {
            const dataCpu = cpuInfoMatch[0].split('\n');
            setSummaryCpu(dataCpu);
            // for (let i = 1; i < 5; i++) {
            //     dataSummary += dataCpu[i] + '\n';
            //     setSummaryCpu(dataSummary);
            // }
        }
        const createData = (dataCpuInfo) => {
            const elements = [];
            const pidDics = dataCpuInfo["PID"];
            const tidDics = dataCpuInfo["TID"];
            const userDics = dataCpuInfo["USER"];
            const prDics = dataCpuInfo["PR"];
            const niDics = dataCpuInfo["NI"];
            const perDics = dataCpuInfo["%CPU"];
            const sDics = dataCpuInfo["S"];
            const virtDics = dataCpuInfo["VIRT"];
            const resDics = dataCpuInfo["RES"];
            const psyDics = dataCpuInfo["PCY"];
            const cmdDics = dataCpuInfo["CMD"];
            const nameDics = dataCpuInfo["NAME"];

            let row=[];
            const csvData = [
                ["PID", "TID", "USER", "PR", "NI", "%CPU", "S", "VIRT", "RES", "PCY", "CMD", "NAME"]
            ];

            for (let k in pidDics) {
                row=[pidDics[k], tidDics[k], userDics[k], prDics[k], niDics[k], perDics[k], sDics[k], virtDics[k], resDics[k], psyDics[k],cmdDics[k], nameDics[k]];
                csvData.push(row);
                elements.push({
                    pid: pidDics[k],
                    tid: tidDics[k],
                    user: userDics[k],
                    pr: prDics[k],
                    ni_cpu: niDics[k],
                    per_cpu: perDics[k],
                    s_cpu: sDics[k],
                    virt_cpu: virtDics[k],
                    res_cpu: resDics[k],
                    psy_cpu: psyDics[k],
                    cmd_cpu: cmdDics[k],
                    name_cpu: nameDics[k]
                });
            }
            setData(elements);
            setDataCsv(csvData);
        };
        createData(dataCpuInfo);
    }, [dataCpuInfo, fileUploadedCpu]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <React.Fragment>
            <div className='container text-center mb-2'>
                <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <div class="card text-bg-light mb-3" style={{ maxWidth: '18rem' }}>
                            <div class="card-header text-bg-dark">THREADS</div>
                            <div class="card-body">
                                <p class="card-text font-monospace">{summaryCpu[1]}</p>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <div class="card text-bg-light mb-3" style={{ maxWidth: '18rem' }}>
                            <div class="card-header text-bg-dark">MEM</div>
                            <div class="card-body">
                                <p class="card-text font-monospace">{summaryCpu[2]}</p>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <div class="card text-bg-light mb-3" style={{ maxWidth: '18rem' }}>
                            <div class="card-header text-bg-dark">SWAP</div>
                            <div class="card-body">
                                <p class="card-text font-monospace">{summaryCpu[3]}</p>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <div class="card text-bg-light mb-3" style={{ maxWidth: '18rem' }}>
                            <div class="card-header text-bg-dark">INFO</div>
                            <div class="card-body">
                                <p class="card-text font-monospace">{summaryCpu[4]}</p>
                            </div>
                        </div>
                    </Grid>

                    <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />
                </Grid>

            </div>

            <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                <TableRow>
                    <StyledTableCell>PID</StyledTableCell>
                    <StyledTableCell>TID</StyledTableCell>
                    <StyledTableCell>USER</StyledTableCell>
                    <StyledTableCell>PR</StyledTableCell>
                    <StyledTableCell>NI</StyledTableCell>
                    <StyledTableCell>%CPU</StyledTableCell>
                    <StyledTableCell>S</StyledTableCell>
                    <StyledTableCell>VIRT</StyledTableCell>
                    <StyledTableCell>RES</StyledTableCell> 
                    <StyledTableCell>PCY</StyledTableCell>
                    <StyledTableCell>CMD</StyledTableCell>
                    <StyledTableCell>NAME</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <StyledTableRow key={row.pid}>
                        <StyledTableCell>{row.pid}</StyledTableCell>
                        <StyledTableCell>{row.tid}</StyledTableCell>
                        <StyledTableCell>{row.user}</StyledTableCell>
                        <StyledTableCell>{row.pr}</StyledTableCell>
                        <StyledTableCell>{row.ni_cpu}</StyledTableCell>
                        <StyledTableCell>{row.per_cpu}</StyledTableCell>
                        <StyledTableCell>{row.s_cpu}</StyledTableCell>
                        <StyledTableCell>{row.virt_cpu}</StyledTableCell>
                        <StyledTableCell>{row.res_cpu}</StyledTableCell>
                        <StyledTableCell>{row.psy_cpu}</StyledTableCell>
                        <StyledTableCell>{row.cmd_cpu}</StyledTableCell>
                        <StyledTableCell>{row.name_cpu}</StyledTableCell>
                    </StyledTableRow>
                ))}
                </TableBody>
            </Table> 
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <div className="d-flex justify-content-end">
                <button type="button" class="btn btn-dark">
                    <CSVLink className="text-decoration-none text-white fw-bold" data={dataCsv}>Download CSV</CSVLink>
                </button>
            </div>
           
        </React.Fragment>
    );
};
