import React, { Fragment, useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

import { getOcsSms } from "../../services/ocsSms.services";
import TopCard from "../../common/components/TopCard";
import { ocsHitSms } from './../../data/ocsHitSms';
const table = require("react-bootstrap-table");

let { BootstrapTable, TableHeaderColumn } = table;

function indexN(cell: any, row: any, enumObject: any, index: any) {
    return (<div>{index + 1}</div>)
}



const OcsHitsSms: React.FC = () => {

    
    const [ocsSms, setocsSms] = useState();

    useEffect(() => {
        getOcsSms()
            .then((data: any) => {
                setocsSms(data);
            });
    }, []);

    let series = [{
        name: "OCS Hits Data",
        data: ocsSms? ocsSms.data.map((r:any) => r.total): ocsSms
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
          categories: ocsSms? ocsSms.data.map((r:any) => r.getDate):ocsSms,
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

    let ocsHitSmsTotal = 0;
    for (let element of ocsHitSms) {
        ocsHitSmsTotal = ocsHitSmsTotal + element.total;
    }

    return (
        <Fragment>
            <h1 className="h3 mb-2 text-gray-800">OCS hits SMS</h1>

            <div className="row">
                <TopCard title="TOTAL RECORDS" text={ocsSms ? ocsSms.data.length.toString() : ocsSms} icon="donate" class="primary" />
                <TopCard title="TOTAL AMOUNT" text={`Rs ${ocsHitSmsTotal}/-`} icon="calculator" class="danger" />
            </div>

            <BootstrapTable
                data={ocsSms ? ocsSms.data : ocsSms}
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

            <div id="chart">
        <ReactApexChart options={optionsGraph} series={series} type="line" height={350} />
      </div>

        </Fragment>
    )
}

export default OcsHitsSms;