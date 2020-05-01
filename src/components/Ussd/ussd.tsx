import React, { Fragment, useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import loadable from 'loadable-components';
import { Formik, Field, Form, ErrorMessage } from 'formik'
import axios from 'axios'
import moment from 'moment'
import "./ussd.css";
import DatePicker from './../../common/components/datePicker';
import Spinner from '../../common/components/Spinner'
import { getUSSD } from "../../services/ussd.services";
import TopCard from "../../common/components/TopCard";
import { ussd } from './../../data/ussd';

var numeral = require('numeral');
const table = require("react-bootstrap-table");
let { BootstrapTable, TableHeaderColumn } = table;

//http://localhost:8087//zongPortal/USSD/Custom/01-APR-2020&02-APR-2020



const Ussd: React.FC = () => {

  const [ussde, setUssd] = useState();
  const [loading, setLoading] = useState(0);

  useEffect(() => {
    getUSSD()
          .then((data: any) => {
            data.data.map((r:any) => {
              r.action_date = moment(r.action_date).format('DD-MMM-YYYY').toUpperCase();
              return r;
            })
        setUssd(data);
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
    name: "USSD",
    data: ussde? ussde.data.map((r:any) => r.total): ussde
    // data: ussde? ussde.map((r:any) => r.total): ussde
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
      //categories: ussde? ussde.data.map((r:any) => r.action_date):ussde,

      categories: ussde? ussde.data.map((r:any) => {
        let date = moment(r.action_date).format('DD-MMM-YYYY').toUpperCase();
        return date;
       }):ussde,
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
      <h4>USSD Statistics</h4>  
      </div>

      <div className="row">
        <TopCard title="TOTAL NUMBER OF RECORDS" text={`${ussde ? ussde.data.length.toString() : ussde}`} icon="box" class="primary" />
        
      </div>

      
      <Formik
      initialValues={initialValues}
      onSubmit={values => {
       // http://localhost:8086/zongPortal/Etop/Custom/11-APR-2020&12-APR-2020
        console.log("VALUES::::::", values)
        let start = moment(values.startDate).format('DD-MMM-YYYY').toUpperCase();
        let end = moment(values.endDate).format('DD-MMM-YYYY').toUpperCase();
        axios.get(`http://localhost:8087//zongPortal/USSD/Custom/${start}&${end}`)
          .then((data:any)=>{
            setUssd(data);
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
        data={ussde ? ussde.data : ussde}
        // data={ussde}
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

export default Ussd;

const LoadableChart = loadable(() => import('react-apexcharts'))