import React, { Fragment, useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import loadable from 'loadable-components';
import { Formik, Field, Form, ErrorMessage } from 'formik'
import axios from 'axios'
import moment from 'moment'
import "./ggsn.css";
import DatePicker from './../../common/components/datePicker';
import Spinner from '../../common/components/Spinner'
import { getGgsn } from "../../services/ggsn.services";
import TopCard from "../../common/components/TopCard";
import { business } from './../../data/964Business';
// import { ggsn } from './../../data/ggsn';
const table = require("react-bootstrap-table");

let { BootstrapTable, TableHeaderColumn } = table;


function indexN(cell: any, row: any, enumObject: any, index: any) {
    return (<div>{index + 1}</div>)
}


const Ggsn: React.FC = () => {

    const [ggsn, setggsn] = useState();
    const [graphData, setGraphData] = useState();
    const [loading, setLoading] = useState(0);

    useEffect(() => {
      let total:number=0;

        getGgsn()
            .then((data: any) => {

              data.data.map((r:any) => {
                total = total + r.total
              })
              data.data.map((r:any) => {
                r.actionDate = moment(r.actionDate).format('DD-MMM-YYYY').toUpperCase();
                return r;
              })
  

              let gd=data.data.map((r:any) => r.varianceValue)
              setGraphData(gd)
                setggsn(data);
                setLoading(1)
            });
    }, []);

    if (!loading) {
        return <Spinner />;
    }

    const _handleSubmit =() => {

      let gd=ggsn ? ggsn.data.map((r:any) => r.varianceValue):ggsn
      setGraphData(gd)
    console.log("BOOKING TIME VALUES*******")
    // localStorage.setItem('step3', JSON.stringify(values))
  }
  const _handleSubmitTotal =() => {
  
      let gd=ggsn ? ggsn.data.map((r:any) => r.bossUsageTb):ggsn
      setGraphData(gd)
    console.log("BOOKING TIME VALUES*******")
    // localStorage.setItem('step3', JSON.stringify(values))
  }
  

    const initialValues = {
        startDate: '',
        endDate: ''
      }


    let series = [{
        name: "Value",
        // data: ggsn? ggsn.data.map((r:any) => r.varianceValue): ggsn
        data:graphData
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
          text: 'Graphical Representation',
          align: 'left'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        xaxis: {
          categories: ggsn? ggsn.data.map((r:any) => r.actionDate):ggsn,
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
           <div className="headings-style">
      <h4>GGSN</h4>  
      </div>
            <div className="row">
                <TopCard title="TOTAL RECORDS" text={ggsn ? ggsn.data.length.toString() : ggsn} icon="donate" class="primary" />
                {/* <TopCard title="TOTAL AMOUNT" text={`Rs ${ggsnTotal}/-`} icon="calculator" class="danger" /> */}
            </div>

           
      <Formik
      initialValues={initialValues}
      onSubmit={values => {
       // http://localhost:8086/zongPortal/Etop/Custom/11-APR-2020&12-APR-2020
        console.log("VALUES::::::", values)
        let start = moment(values.startDate).format('DD-MMM-YYYY').toUpperCase();
        let end = moment(values.endDate).format('DD-MMM-YYYY').toUpperCase();
        axios.get(`http://localhost:8086/zongPortal/Etop/Custom/${start}&${end}`)
          .then((data:any)=>{
            setggsn(data);
          })

      }}
      >
        {({ errors, touched, values, handleSubmit }) => (
          <Form
          translate="yes"
          >
       <div className=" second-heading-style ">
        <h5 >Date Range</h5>
        </div>

        <div className=' form-container form-row mt-3'>
        <div className='col-5'>
          <Field
            name='startDate'
            component={DatePicker}
            placeholder='Enter Start Date'
          />
        </div>
        <div className='col-5'>
          <Field
            name='endDate'
            component={DatePicker}
            placeholder='Enter End Date'
          />
        </div>
        <div className='col-2 ml-0 pl-0'>
          <button
            type='submit'
            onClick={()=>handleSubmit}
            className='btn-hire '
            >
            Query
          </button>
       </div>
      </div>
          </Form>
      
        )}
      </Formik>

      <div className=" second-heading-style ">
        <h5 >Data Values</h5>
        </div>
      
            <BootstrapTable className= "form-container "
                data={ggsn ? ggsn.data : ggsn}
                keyField="id"
                version="4"
                condensed
                hover
                pagination
               
                options={options}
            >
                {/* <TableHeaderColumn dataField="any" width="100" dataFormat={indexN}>S.No.</TableHeaderColumn> */}
                <TableHeaderColumn
                    dataField="actionDate"
                    width="100"
                >
                    Ggsn Date
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataField="cdrCountTb"
                    width="100"
                >
                    Cdr Count
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataField="bossUsageTb"
                    width="100"
                >
                    Boss Usage
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataField="ggsnUsageTb"
                    width="100"
                >
                    Ggsn Usage
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataField="freeFb"
                    width="100"
                >
                    Free Fb
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataField="ggsnUsageWoFbTb"
                    width="100"
                >
                    Ggsn Usage Wo Fb
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataField="diffBossGgsn"
                    width="100"
                >
                    Diff Boss Ggsn
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataField="varianceValue"
                    width="100"
                >
                    Variance Value
                </TableHeaderColumn>
            </BootstrapTable>
        
            <div  className= "form-container "id="chart">
            <div className='form-row'> 
              <div className='col-8'></div>
              <div className='col-2'>
                <button
                  type='button'
                  onClick={_handleSubmitTotal}
                  className='btn-graph '
                  >
                  Data Volume (TB)
                </button>
              </div>
              <div className='col-2'>
                <button
                  type='button'
                  onClick={_handleSubmit}
                  className='btn-graph '
                  >
                  Variance Value
                </button>
              </div>
            </div>
        <ReactApexChart options={optionsGraph} series={series} type="line" height={350} />
      </div>

        </Fragment>
    )
}

export default Ggsn;

// const LoadableChart = loadable(() => import('react-apexcharts'))