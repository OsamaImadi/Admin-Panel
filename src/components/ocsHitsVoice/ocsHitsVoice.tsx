import React, { Fragment, useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

import { getOcsVoice } from "../../services/ocsVoice.services";
import TopCard from "../../common/components/TopCard";
import { ocsHitVoice } from './../../data/ocsHitVoice';
const table = require("react-bootstrap-table");

let { BootstrapTable, TableHeaderColumn } = table;
function indexN(cell: any, row: any, enumObject: any, index: any) {
    return (<div>{index + 1}</div>)
}



const OcsHitsVoice: React.FC = () => {

        
    const [ocsVoice, setocsVoice] = useState();

    useEffect(() => {
        getOcsVoice()
            .then((data: any) => {
                setocsVoice(data);
            });
    }, []);

    let series = [{
        name: "OCS Hits Data",
        data: ocsVoice? ocsVoice.data.map((r:any) => r.total): ocsVoice
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
          categories: ocsVoice? ocsVoice.data.map((r:any) => r.getDate):ocsVoice,
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

    let ocsHitVoiceTotal = 0;
    for (let element of ocsHitVoice) {
        ocsHitVoiceTotal = ocsHitVoiceTotal + element.total;
    }

    return (
        <Fragment>
            <h1 className="h3 mb-2 text-gray-800">OCS hits Voice</h1>

            <div className="row">
                <TopCard title="TOTAL RECORDS" text={ocsVoice ? ocsVoice.data.length.toString() : ocsVoice} icon="donate" class="primary" />
                <TopCard title="TOTAL AMOUNT" text={`Rs ${ocsHitVoiceTotal}/-`} icon="calculator" class="danger" />
            </div>

            <BootstrapTable
                data={ocsVoice ? ocsVoice.data : ocsVoice}
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

export default OcsHitsVoice;