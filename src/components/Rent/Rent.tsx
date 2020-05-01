import React, { Fragment, useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import loadable from 'loadable-components';

import { Formik, Field, Form, ErrorMessage } from 'formik'
import axios from 'axios'
import moment from 'moment'

import DatePicker from './../../common/components/datePicker';
import Spinner from '../../common/components/Spinner'
import { getRent } from "../../services/rent.services";
import TopCard from "../../common/components/TopCard";
import "./Rent.css";
import { Rent } from '../../data/rent';
var numeral = require('numeral');
const table = require("react-bootstrap-table");

//http://localhost:8081//zongPortal/Rent/Custom/01-APR-2020&02-APR-2020

let { BootstrapTable, TableHeaderColumn } = table;

function indexN(cell: any, row: any, enumObject: any, index: any) {
  return (<div>{index + 1}</div>)
}


const Rents: React.FC = () => {

  const [rent, setRent] = useState();
  const [loading, setLoading] = useState(0);

  useEffect(() => {

    let total:number=0;

      getRent()
          .then((data: any) => {

            data.data.map((r:any) => {
              total = total + r.total
            })
            data.data.map((r:any) => {
              r.actionDate = moment(r.actionDate).format('DD-MMM-YYYY').toUpperCase();
              return r;
            })

            setRent(data);
            setLoading(1)
          });
  }, []);

    
  if (!loading) {
    return <Spinner />;
}

  let series = [{
    name: "Rent",
    data: rent? rent.data.map((r:any) => r.total): rent
    // data: rent? rent.map((r:any) => r.total): rent
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
      //categories: rent? rent.data.map((r:any) => r.createDate):rent,

      categories: rent? rent.data.map((r:any) => {
        let date = moment(r.action_date).format('DD-MMM-YYYY').toUpperCase();
        return date;
       }):rent,
    }
  }
  const initialValues = {
    startDate: '',
    endDate: ''
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

      <div className="headings-style">
      <h4>Rent Statistics</h4>  
      </div>

      <div className="row">
        <TopCard title="TOTAL NUMBER OF RECORDS" text={`${rent ? rent.data.length.toString() : rent}`} icon="box" class="primary" />
        
      </div>

  
      <Formik
      initialValues={initialValues}
      onSubmit={values => {
       // http://localhost:8086/zongPortal/Etop/Custom/11-APR-2020&12-APR-2020
        console.log("VALUES::::::", values)
        let start = moment(values.startDate).format('DD-MMM-YYYY').toUpperCase();
        let end = moment(values.endDate).format('DD-MMM-YYYY').toUpperCase();
        axios.get(`http://localhost:8081/zongPortal/Rent/Custom/${start}&${end}`)
          .then((data:any)=>{
            setRent(data);
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
            className=' btn-hire '
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
        data={rent ? rent.data : rent}
        // data={rent}
        keyField="id"
        version="4"
        condensed
     
        hover
        pagination
       
        options={options}
      >
      
      
        {/* <TableHeaderColumn dataField="any" width="200" dataFormat={indexN}>S.No.</TableHeaderColumn> */}
        <TableHeaderColumn
          dataField="action_date"
          dataSort
          width="200"
        >
          Date 
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="total"
          dataSort
          width="200"
        >
          Total
        </TableHeaderColumn>
      </BootstrapTable>

      <div className= "form-container " id="chart">
        <LoadableChart options={optionsGraph} series={series} type="line" height={350} />
      </div>

    </Fragment >
  );
};

export default Rents;

const LoadableChart = loadable(() => import('react-apexcharts'))
