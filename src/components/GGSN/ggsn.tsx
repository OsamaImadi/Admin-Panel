import React, { Fragment } from "react";
import TopCard from "../../common/components/TopCard";
import { business } from './../../data/964Business';
import { ggsn } from './../../data/ggsn';
const table = require("react-bootstrap-table");

let { BootstrapTable, TableHeaderColumn } = table;


function indexN(cell: any, row: any, enumObject: any, index: any) {
    return (<div>{index + 1}</div>)
}



const Ggsn: React.FC = () => {

    const options = {
        sortIndicator: true,
        hideSizePerPage: true,
        paginationSize: 3,
        hidePageListOnlyOnePage: true,
        clearSearch: true,
        alwaysShowAllBtns: false,
        withFirstAndLast: false,
    };

    return (
        <Fragment>
            <h1 className="h3 mb-2 text-gray-800">GGSN</h1>

            <div className="row">
                <TopCard title="TOTAL RECORDS" text={ggsn.length.toString()} icon="donate" class="primary" />
                {/* <TopCard title="TOTAL AMOUNT" text={`Rs ${ggsnTotal}/-`} icon="calculator" class="danger" /> */}
            </div>

            <BootstrapTable
                data={ggsn}
                keyField="id"
                version="4"
                condensed
                striped
                hover
                pagination
                search
                options={options}
            >
                <TableHeaderColumn dataField="any" width="100" dataFormat={indexN}>#</TableHeaderColumn>
                <TableHeaderColumn
                    dataField="ggsnDate"
                    width="100"
                >
                    ggsnDate
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataField="cdrCountTb"
                    width="100"
                >
                    cdrCountTb
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataField="bossUsageTb"
                    width="100"
                >
                    bossUsageTb
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataField="ggsnUsageTb"
                    width="100"
                >
                    ggsnUsageTb
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataField="freeFb"
                    width="100"
                >
                    freeFb
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataField="ggsnUsageWoFbTb"
                    width="100"
                >
                    ggsnUsageWoFbTb
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataField="diffBossGgsn"
                    width="100"
                >
                    diffBossGgsn
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataField="varianceValue"
                    width="100"
                >
                    varianceValue
                </TableHeaderColumn>
            </BootstrapTable>

        </Fragment>
    )
}

export default Ggsn;