import React, { Fragment, useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";


import { getRent } from "../../services/rent.services";
import TopCard from "../../common/components/TopCard";
import "./Rent.css";
import { Rent } from '../../data/rent';

const table = require("react-bootstrap-table");
let { BootstrapTable, TableHeaderColumn } = table;

function indexN(cell: any, row: any, enumObject: any, index: any) {
  return (<div>{index + 1}</div>)
}


const Rents: React.FC = () => {

  const [rent, setRent] = useState();

  useEffect(() => {
      getRent()
          .then((data: any) => {
            setRent(data);
          });
  }, []);


  let series = [{
    name: "Rent",
    data: rent? rent.data.map((r:any) => r.total): rent
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
      categories: rent? rent.data.map((r:any) => r.createDate):rent,
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
  for (let element of Rent) {
    totalRent = totalRent + element.total;
  }
  return (
    <Fragment>
      <h1 className="h3 mb-2 text-gray-800">Rent</h1>
      <div className="row">
        <TopCard title="TOTAL NUMBER OF RECORDS" text={`${rent ? rent.data.length.toString() : rent}`} icon="box" class="primary" />
        <TopCard title="TOTAL RENT" text={`Rs. ${totalRent}/-`} icon="warehouse" class="danger" />
      </div>

      <BootstrapTable
        data={rent ? rent.data : rent}
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
