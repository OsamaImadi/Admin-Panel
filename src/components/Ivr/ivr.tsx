import React, { Fragment, useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import loadable from 'loadable-components';
import { Formik, Field, Form, ErrorMessage } from 'formik'
import axios from 'axios'
import moment from 'moment'
import "./ivr.css";
import DatePicker from './../../common/components/datePicker';
import Spinner from '../../common/components/Spinner'
import { getIVR } from "../../services/ivr.services";
import TopCard from "../../common/components/TopCard";
import { ivr } from './../../data/ivr';


var numeral = require('numeral');
const table = require("react-bootstrap-table");

let { BootstrapTable, TableHeaderColumn } = table;

//http://localhost:8087//zongPortal/IVR/Custom/01-APR-2020&02-APR-2020



const Ivr: React.FC = () => {

  const [ivre, setIvr] = useState();
  const [loading, setLoading] = useState(0);

  useEffect(() => {
    let total:number=0;

      getIVR()
        .then((data: any) => {

          data.data.map((r:any) => {
            total = total + r.total
          })
          data.data.map((r:any) => {
            r.actionDate = moment(r.actionDate).format('DD-MMM-YYYY').toUpperCase();
            return r;
          })


        setIvr(data);
            setLoading(1)
          });
  }, []);

    
  if (!loading) {
    return <Spinner />;
}

const initialValues = {
  startDate: '',
  endDate: ''
}

  let series = [{
    name: "Rent",
    data: ivre? ivre.data.map((r:any) => r.total): ivre
    // data: ivre? ivre.map((r:any) => r.total): ivre
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
      //categories: ivre? ivre.data.map((r:any) => r.action_date):ivre,

      categories: ivre? ivre.data.map((r:any) => {
        let date = moment(r.action_date).format('DD-MMM-YYYY').toUpperCase();
        return date;
       }):ivre,
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

  let totalEtop = 0;
  // for (let element of etope) {
  //   totalEtop = totalEtop + element.total;
  // }
  return (
    <Fragment>
      <div className="headings-style">
      <h4>IVR Statistics</h4>  
      </div>
      <div className="row">
        <TopCard title="TOTAL NUMBER OF RECORDS" text={`${ivre ? ivre.data.length.toString() : ivre}`} icon="box" class="primary" />
        
      </div>
      
      <Formik
      initialValues={initialValues}
      onSubmit={values => {
       // http://localhost:8086/zongPortal/Etop/Custom/11-APR-2020&12-APR-2020
        console.log("VALUES::::::", values)
        let start = moment(values.startDate).format('DD-MMM-YYYY').toUpperCase();
        let end = moment(values.endDate).format('DD-MMM-YYYY').toUpperCase();
        axios.get(`http://localhost:8087//zongPortal/IVR/Custom/${start}&${end}`)
          .then((data:any)=>{
            setIvr(data);
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

      <BootstrapTable className= "form-container " 
        data={ivre ? ivre.data : ivre}
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

      <div className= "form-container "  id="chart">
        <LoadableChart options={optionsGraph} series={series} type="line" height={350} />
      </div>

    </Fragment >
  );
};

export default Ivr;

const LoadableChart = loadable(() => import('react-apexcharts'))