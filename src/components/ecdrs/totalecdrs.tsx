import React, { Fragment, useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import loadable from 'loadable-components';
import { Formik, Field, Form, ErrorMessage } from 'formik'
import axios from 'axios'
import moment from 'moment'
import "./totalecdrs.css";
import Spinner from '../../common/components/Spinner'
import DatePicker from './../../common/components/datePicker';
import { getTotalEcdrs } from "../../services/totalecdrs.services";
import TopCard from "../../common/components/TopCard";

import MultiSelectTable from "../../common/components/MultiSelectTable";
import { Layout, Modal, Input, Form as MyForm, Row, Col, Select, Alert, Button } from 'antd';




var numeral = require('numeral');
const table = require("react-bootstrap-table");
let { BootstrapTable, TableHeaderColumn } = table;





const TotalEcdrs: React.FC = () => {

  const [totalecdrse, setTotalEcdrs] = useState();
  const [graphData, setGraphData] = useState();
  const [loading, setLoading] = useState(0);

  const columns = [
  
    {
      title: 'Date',
      dataIndex: 'actionDate',
      width: '15%',
      editable: true,
    },
    {
      title: 'INBOSS Ecdrs',
      dataIndex: 'inBossEcdrs',
      width: '10%',
      editable: true,
    },
    {
      title: 'Gy Ecdrs',
      dataIndex: 'gyEcdrs',
      width: '10%',
      editable: true,
    },
    {
      title: 'Total Ecdrs',
      dataIndex: 'totalEcdrs',
      width: '10%',
      editable: true,
    }
  ];

  useEffect(() => {
    let total:number=0;
    getTotalEcdrs()
          .then((data: any) => {
         
            
            data.data.map((r:any) => {
              total = total + r.total
            })
            data.data.map((r:any) => {
              r.actionDate = moment(r.actionDate).format('DD-MMM-YYYY').toUpperCase();
              return r;
            })


            let gd=data.data.map((r:any) => r.totalEcdrs)
            setGraphData(gd)
        setTotalEcdrs(data);
            setLoading(1)
            
          });
  }, []);

    
  if (!loading) {
    return <Spinner />;
}

const _handleSubmit =() => {

    let gd=totalecdrse ? totalecdrse.data.map((r:any) => r.gyEcdrs):totalecdrse
    setGraphData(gd)
  console.log("BOOKING TIME VALUES*******")
  // localStorage.setItem('step3', JSON.stringify(values))
}
const _handleSubmitTotal =() => {

    let gd=totalecdrse ? totalecdrse.data.map((r:any) => r.totalEcdrs):totalecdrse
    setGraphData(gd)
  console.log("BOOKING TIME VALUES*******")
  // localStorage.setItem('step3', JSON.stringify(values))
}

//gyEcdrs
const initialValues = {
  startDate: '',
  endDate: ''
}

  let series = [{
    name: "Total",
    // data: totalecdrse? totalecdrse.data.map((r:any) => r.totalEcdrs): totalecdrse
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
      //categories: totalecdrse? totalecdrse.data.map((r:any) => r.actionDate):totalecdrse,

      categories: totalecdrse? totalecdrse.data.map((r:any) => {
        let date = moment(r.actionDate).format('DD-MMM-YYYY').toUpperCase();
        return date;
       }):totalecdrse,
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

  let totalEcdrs = 0;
  // for (let element of etope) {
  //   totalEtop = totalEtop + element.total;
  // }
  return (
    <Fragment>

      <div className="headings-style">
      <h4>Total Ecdrs Statistics</h4>  
      </div>
      <div className="row">
        <TopCard title="TOTAL NUMBER OF RECORDS" text={`${totalecdrse ? totalecdrse.data.length.toString() : totalecdrse}`} icon="box" class="primary" />
        
      </div>
    
      <Formik
      initialValues={initialValues}
      onSubmit={values => {
       // http://localhost:8086/zongPortal/Etop/Custom/11-APR-2020&12-APR-2020
        console.log("VALUES::::::", values)
        let start = moment(values.startDate).format('DD-MMM-YYYY').toUpperCase();
        let end = moment(values.endDate).format('DD-MMM-YYYY').toUpperCase();
        axios.get(`http://localhost:8086/zongPortal/TotalEcdrs/Custom/${start}&${end}`)
          .then((data:any)=>{
            setTotalEcdrs(data);
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
      

        <MultiSelectTable
      columns={columns}
      data={totalecdrse ? totalecdrse.data : totalecdrse}
    
      actions={
                <Button  size="middle" type="primary"
                  onClick={() => console.log("Add Data")}
                >
                  Add Data 
                </Button>
              }
      loading={false}
      //onDelete={handleDeleteOrg}
      //onDeleteSelected={handleDeleteSelected}
      // onEdit={(record) => {
      //   setFormObj(record);
      //   setRecordToEditId(record.id);
      //   setFlags({
      //     ...flags,
      //     orgModelVisible: true,
      //     isEditing: true
      //   });
      // }}
    />


     
      <div className= "form-container " id="chart">
      <div className='form-row'> 
              <div className='col-8'></div>
              <div className='col-2'>
                <button
                  type='button'
                  onClick={_handleSubmitTotal}
                  className='btn-graph '
                  >
                  Total Ecdrs
                </button>
              </div>
              <div className='col-2'>
                <button
                  type='button'
                  onClick={_handleSubmit}
                  className='btn-graph '
                  >
                  Gy Ecdrs
                </button>
              </div>
            </div>
        <LoadableChart options={optionsGraph} series={series} type="line" height={350} />
      </div>

    </Fragment >
  );
};

export default TotalEcdrs;

const LoadableChart = loadable(() => import('react-apexcharts'))