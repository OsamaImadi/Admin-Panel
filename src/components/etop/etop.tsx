import React, { Fragment, useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import loadable from 'loadable-components';
import { Formik, Field, Form, ErrorMessage } from 'formik'
import axios from 'axios'
import moment from 'moment'
import "./etop.css";
import Spinner from '../../common/components/Spinner'
import DatePicker from './../../common/components/datePicker';
import { getETOP } from "../../services/etop.services";
import TopCard from "../../common/components/TopCard";
import { etop } from '../../data/etop';

var numeral = require('numeral');
const table = require("react-bootstrap-table");
let { BootstrapTable, TableHeaderColumn } = table;


// function buttonFormatter(cell, row){
//   return '<BootstrapButton type="submit"></BootstrapButton>';
// }

const Etop: React.FC = () => {

  const [etope, setEtop] = useState();
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(0);

  useEffect(() => {
    let total:number=0;
    getETOP()
          .then((data: any) => {
            
            data.data.map((r:any) => {
              total = total + r.total
            })
            data.data.map((r:any) => {
              r.action_date = moment(r.action_date).format('DD-MMM-YYYY').toUpperCase();
              return r;
            })
            setTotal(total)
            setEtop(data);
            setLoading(1)
          });
  }, []);

    
  if (!loading) {
    return <Spinner />;
}

const _handleSubmit =( values:any) => {
  if(values.pickupDate){
    let strDate= values.pickupDate;
    values.pickupDateForText = strDate.toString()
  }
  console.log("BOOKING TIME VALUES*******",values)
  // localStorage.setItem('step3', JSON.stringify(values))
}

const initialValues = {
  startDate: '',
  endDate: ''
}

  let series = [{
    name: "ETOP",
    data: etope? etope.data.map((r:any) => r.total): etope
    // data: etope? etope.map((r:any) => r.total): etope

    


  }]
  let optionsGraph = {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: true
      }
    },

    annotations: {
      
      points: [{
        x: '12-APR-2020',
        y: 1575594,
        marker: {
          size: 8,
          fillColor: '#fff',
          strokeColor: 'red',
          radius: 2,
          cssClass: 'apexcharts-custom-class'
        },
        label: {
          borderColor: '#FF4560',
          offsetY: 0,
          style: {
            color: '#fff',
            background: '#FF4560',
          },
    
          text: 'Point Annotation',
        }
      }]
    },

    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      text: 'Graphical Representation',
      align: 'center'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    xaxis: {
      //categories: etope? etope.data.map((r:any) => r.action_date):etope,

      categories: etope? etope.data.map((r:any) => {
        let date = moment(r.action_date).format('DD-MMM-YYYY').toUpperCase();
        return date;
       }):etope,
    }, 
    // legend: {
    //   position: 'top',
    //   horizontalAlign: 'right',
    //   floating: true,
    //   offsetY: -25,
    //   offsetX: -5
    // }
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
      <h4>Etop Statistics</h4>  
      </div>
      <div className="row">
        <TopCard title="TOTAL NUMBER OF RECORDS" text={`${etope ? etope.data.length.toString() : etope}`} icon="box" class="primary" />
        <TopCard title="TOTAL" text={`${total}`} icon="box" class="primary" />
        
      </div>
    
      <Formik
      initialValues={initialValues}
      onSubmit={values => {
        let total = 0;
       // http://localhost:8086/zongPortal/Etop/Custom/11-APR-2020&12-APR-2020
        console.log("VALUES::::::", values)
        let start = moment(values.startDate).format('DD-MMM-YYYY').toUpperCase();
        let end = moment(values.endDate).format('DD-MMM-YYYY').toUpperCase();
        axios.get(`http://localhost:8086/zongPortal/Etop/Custom/${start}&${end}`)
          .then((data:any)=>{
            data.data.map((r:any) => {
              total = total + r.total
            })
            data.data.map((r:any) => {
              r.action_date = moment(r.action_date).format('DD-MMM-YYYY').toUpperCase();
              return r;
            })
            setTotal(total)
            setEtop(data);
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
      

      <div className= "form-container " id="chart">
        <LoadableChart options={optionsGraph} series={series} type="line" height={350} />
      </div>


      <div className="container">
  <div className="row">
    <div className="col-12">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th data-Field="action_date" data-sortable= "true">Date </th>
            <th data-Field="total" data-sortable= "true">Total </th>
            <th data-Field="sumOfDifference" data-sortable= "true">sumOfDifference </th>
           
          </tr>
        </thead>
        
      </table>
    </div>
  </div>
</div>


    </Fragment >
  );
};

export default Etop;



const LoadableChart = loadable(() => import('react-apexcharts'))