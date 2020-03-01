import React, { Fragment, useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

import { getSms } from "../../services/sms.services";
import TopCard from "../../common/components/TopCard";
import { smsSubscription } from './../../data/smsSubscription';
const table = require("react-bootstrap-table");

let { BootstrapTable, TableHeaderColumn } = table;
function indexN(cell: any, row: any, enumObject: any, index: any) {
    return (<div>{index + 1}</div>)
}

const SmsSubscription: React.FC = () => {
        
    const [smsSub, setsmsSub] = useState();

    useEffect(() => {
        getSms()
            .then((data: any) => {
                setsmsSub(data);
            });
    }, []);

    let series = [{
        name: "OCS Hits Data",
        data: smsSub? smsSub.data.map((r:any) => r.total): smsSub
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
          categories: smsSub? smsSub.data.map((r:any) => r.getDate):smsSub,
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

    let smsTotal = 0;
    for (let element of smsSubscription) {
        smsTotal = smsTotal + element.total;
    }

    return (
        <Fragment>
            <h1 className="h3 mb-2 text-gray-800">OCS hits Voice</h1>

            <div className="row">
                <TopCard title="TOTAL RECORDS" text={smsSub ? smsSub.data.length.toString() : smsSub} icon="donate" class="primary" />
                <TopCard title="TOTAL AMOUNT" text={`Rs ${smsTotal}/-`} icon="calculator" class="danger" />
            </div>

            <BootstrapTable
                data={smsSub ? smsSub.data : smsSub}
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

export default SmsSubscription;