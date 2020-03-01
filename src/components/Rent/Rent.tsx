import React, { Fragment } from "react";
import ReactApexChart from "react-apexcharts";

import TopCard from "../../common/components/TopCard";
import "./Rent.css";
import { rent } from '../../data/rent';
// import { getDrivers } from "../../services/business.services";

const table = require("react-bootstrap-table");
let { BootstrapTable, TableHeaderColumn } = table;

function indexN(cell: any, row: any, enumObject: any, index: any) {
  return (<div>{index + 1}</div>)
}


const Rents: React.FC = () => {

  let series = [{
    name: "Rent",
    data: rent.map(r => r.total)
  }]
  let optionsGraph = {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      text: 'Rent By Date',
      align: 'left'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    xaxis: {
      categories: rent.map(r => r.createDate),
    }
  }

  const options = {
    sortIndicator: true,
    hideSizePerPage: true,
    paginationSize: 3,
    hidePageListOnlyOnePage: true,
    clearSearch: true,
    alwaysShowAllBtns: false,
    withFirstAndLast: false,
  };
  let totalRent = 0;
  for (let element of rent) {
    totalRent = totalRent + element.total;
  }
  return (
    <Fragment>
      <h1 className="h3 mb-2 text-gray-800">Rent</h1>
      <div className="row">
        <TopCard title="TOTAL NUMBER OF RECORDS" text={`${rent.length}`} icon="box" class="primary" />
        <TopCard title="TOTAL RENT" text={`Rs. ${totalRent}/-`} icon="warehouse" class="danger" />
      </div>

      <BootstrapTable
        data={rent}
        keyField="id"
        version="4"
        condensed
        striped
        hover
        pagination
        search
        options={options}
      >
        <TableHeaderColumn dataField="any" width="200" dataFormat={indexN}>#</TableHeaderColumn>
        <TableHeaderColumn
          dataField="total"
          dataSort
          width="200"
        >
          Total
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="createDate"
          dataSort
          width="200"
        >
          Create Date
        </TableHeaderColumn>
      </BootstrapTable>

      <div id="chart">
        <ReactApexChart options={optionsGraph} series={series} type="line" height={350} />
      </div>

    </Fragment >
  );
};

export default Rents;
