import React, { Fragment, useState, useEffect } from "react";
import TopCard from "../../common/components/TopCard";
import { business } from './../../data/964Business';
import { getBusiness } from "../../services/business.services";
const table = require("react-bootstrap-table");

let { BootstrapTable, TableHeaderColumn } = table;

function indexN(cell: any, row: any, enumObject: any, index: any) {
    return (<div>{index + 1}</div>)
}

const Business: React.FC = () => {

    const [bzns, setBzns] = useState();


    useEffect(() => {
        getBusiness()
            .then((data: any) => {
                setBzns(data);
            });
    }, []);


    console.log("DATA IN BUSINESS------", bzns ? bzns.data : bzns)
    console.log(typeof bzns)

    const options = {
        sortIndicator: true,
        hideSizePerPage: true,
        paginationSize: 3,
        hidePageListOnlyOnePage: true,
        clearSearch: true,
        alwaysShowAllBtns: false,
        withFirstAndLast: false,
    };

    let businessTotal = 0;
    for (let element of bzns ? bzns.data : business) {
        businessTotal = businessTotal + element.total;
    }


    return (
        <Fragment>
            <h1 className="h3 mb-2 text-gray-800">964Business</h1>

            <div className="row">
                <TopCard title="TOTAL RECORDS" text={bzns ? bzns.data.length.toString() : bzns} icon="donate" class="primary" />
                <TopCard title="TOTAL AMOUNT" text={`Rs ${businessTotal}/-`} icon="calculator" class="danger" />
            </div>

            <BootstrapTable
                data={bzns ? bzns.data : bzns}
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
                    dataField="deductDate"
                    dataSort
                    width="100"
                >
                    deductDate
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

export default Business;