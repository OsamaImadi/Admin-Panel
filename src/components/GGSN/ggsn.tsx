import React, { Fragment, useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

import { getGgsn } from "../../services/ggsn.services";
import TopCard from "../../common/components/TopCard";
import { business } from './../../data/964Business';
import { ggsn } from './../../data/ggsn';
const table = require("react-bootstrap-table");

let { BootstrapTable, TableHeaderColumn } = table;


function indexN(cell: any, row: any, enumObject: any, index: any) {
    return (<div>{index + 1}</div>)
}



const Ggsn: React.FC = () => {

    
    
    const [ggsn, setggsn] = useState();

    useEffect(() => {
        getGgsn()
            .then((data: any) => {
                setggsn(data);
            });
    }, []);

    let series = [{
        name: "OCS Hits Data",
        data: ggsn? ggsn.data.map((r:any) => r.varianceValue): ggsn
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
          categories: ggsn? ggsn.data.map((r:any) => r.ggsnDate):ggsn,
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

    return (
        <Fragment>
            <h1 className="h3 mb-2 text-gray-800">GGSN</h1>

            <div className="row">
                <TopCard title="TOTAL RECORDS" text={ggsn ? ggsn.data.length.toString() : ggsn} icon="donate" class="primary" />
                {/* <TopCard title="TOTAL AMOUNT" text={`Rs ${ggsnTotal}/-`} icon="calculator" class="danger" /> */}
            </div>

            <BootstrapTable
                data={ggsn ? ggsn.data : ggsn}
                keyField="id"
                version="4"
                condensed
                striped
                hover
                pagination
                search
                options={options}
            >
                <TableHeaderColumn dataField="any" width="100" dataFormat={indexN}>S.No.</TableHeaderColumn>
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
            
            <div id="chart">
        <ReactApexChart options={optionsGraph} series={series} type="line" height={350} />
      </div>

        </Fragment>
    )
}

export default Ggsn;