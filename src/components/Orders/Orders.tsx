import React, { Fragment, Dispatch } from "react";
import TopCard from "../../common/components/TopCard";
import { orders } from './../../data/orders';
const table = require("react-bootstrap-table");

let { BootstrapTable, TableHeaderColumn } = table;

function indexN(cell: any, row: any, enumObject: any, index: any) {
    return (<div>{index + 1}</div>)
}



const Orders: React.FC = () => {

    const options = {
        sortIndicator: true,
        hideSizePerPage: true,
        paginationSize: 3,
        hidePageListOnlyOnePage: true,
        clearSearch: true,
        alwaysShowAllBtns: false,
        withFirstAndLast: false,
    };

    let ordersTotal = 0;
    for (let element of orders) {
        ordersTotal = ordersTotal + element.total;
    }

    return (
        <Fragment>
            <h1 className="h3 mb-2 text-gray-800">Business Orders</h1>

            <div className="row">
                <TopCard title="TOTAL BUSINESS ORDERS" text={orders.length.toString()} icon="donate" class="primary" />
                <TopCard title="TOTAL AMOUNT" text={`Rs ${ordersTotal}/-`} icon="calculator" class="danger" />
            </div>

            <BootstrapTable
                data={orders}
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
                    dataField="boDate"
                    dataSort
                    width="100"
                >
                    boDate
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataField="total"
                    dataSort
                    width="100"
                >
                    Total
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataField="dff"
                    dataSort
                    width="100"
                >
                    dff
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataField="bo3MinCnt"
                    dataSort
                    width="100"
                >
                    bo3MinCnt
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataField="bo1MinCnt"
                    dataSort
                    width="100"
                >
                    bo1MinCnt
                </TableHeaderColumn>
            </BootstrapTable>

        </Fragment>
    )
}

export default Orders;