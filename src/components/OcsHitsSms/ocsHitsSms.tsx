import React, { Fragment } from "react";
import TopCard from "../../common/components/TopCard";
import { ocsHitSms } from './../../data/ocsHitSms';
const table = require("react-bootstrap-table");

let { BootstrapTable, TableHeaderColumn } = table;

function indexN(cell: any, row: any, enumObject: any, index: any) {
    return (<div>{index + 1}</div>)
}



const OcsHitsSms: React.FC = () => {

    const options = {
        sortIndicator: true,
        hideSizePerPage: true,
        paginationSize: 3,
        hidePageListOnlyOnePage: true,
        clearSearch: true,
        alwaysShowAllBtns: false,
        withFirstAndLast: false,
    };

    let ocsHitSmsTotal = 0;
    for (let element of ocsHitSms) {
        ocsHitSmsTotal = ocsHitSmsTotal + element.total;
    }

    return (
        <Fragment>
            <h1 className="h3 mb-2 text-gray-800">OCS hits SMS</h1>

            <div className="row">
                <TopCard title="TOTAL RECORDS" text={ocsHitSms.length.toString()} icon="donate" class="primary" />
                <TopCard title="TOTAL AMOUNT" text={`Rs ${ocsHitSmsTotal}/-`} icon="calculator" class="danger" />
            </div>

            <BootstrapTable
                data={ocsHitSms}
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
                    dataField="getDate"
                    dataSort
                    width="100"
                >
                    getDate
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataField="total"
                    dataSort
                    width="100"
                >
                    Total
                </TableHeaderColumn>
            </BootstrapTable>

        </Fragment>
    )
}

export default OcsHitsSms;