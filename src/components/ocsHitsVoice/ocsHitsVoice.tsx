import React, { Fragment, useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { Formik, Field, Form, ErrorMessage } from 'formik'
import axios from 'axios'
import moment from 'moment'
import "./ocsVoice.css";
import DatePicker from './../../common/components/datePicker';
import Spinner from '../../common/components/Spinner'
import { getOcsVoice } from "../../services/ocsVoice.services";
import TopCard from "../../common/components/TopCard";
import { ocsHitVoice } from './../../data/ocsHitVoice';
const table = require("react-bootstrap-table");
var numeral = require('numeral');

// http://localhost:8084/zongPortal/OcsHits/Voice/Custom/11-APR-2020&12-APR-2020


let { BootstrapTable, TableHeaderColumn } = table;
function indexN(cell: any, row: any, enumObject: any, index: any) {
    return (<div>{index + 1}</div>)
}



const OcsHitsVoice: React.FC = () => {

        
    const [ocsVoice, setocsVoice] = useState();
    const [loading, setLoading] = useState(0);

    useEffect(() => {

      let total:number=0;

        getOcsVoice()
            .then((data: any) => {
            

              data.data.map((r:any) => {
                total = total + r.total
              })
              data.data.map((r:any) => {
                r.actionDate = moment(r.actionDate).format('DD-MMM-YYYY').toUpperCase();
                return r;
              })

                setocsVoice(data);
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
        name: "OCS Voice Hits",
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
         // categories: ocsVoice? ocsVoice.data.map((r:any) => r.action_date):ocsVoice,

          categories: ocsVoice? ocsVoice.data.map((r:any) => {
            let date = moment(r.action_date).format('DD-MMM-YYYY').toUpperCase();
            return date;
           }):ocsVoice,

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
            <div className="headings-style">
      <h4>OCS Authentication (Voice)</h4>  
      </div>

            <div className="row">
                <TopCard title="TOTAL RECORDS" text={ocsVoice ? ocsVoice.data.length.toString() : ocsVoice} icon="donate" class="primary" />
                
            </div>
            
      <Formik
      initialValues={initialValues}
      onSubmit={values => {
       // http://localhost:8086/zongPortal/Etop/Custom/11-APR-2020&12-APR-2020
        console.log("VALUES::::::", values)
        let start = moment(values.startDate).format('DD-MMM-YYYY').toUpperCase();
        let end = moment(values.endDate).format('DD-MMM-YYYY').toUpperCase();
        axios.get(`http://localhost:8084/zongPortal/OcsHits/Voice/Custom/${start}&${end}`)
          .then((data:any)=>{
            setocsVoice(data);
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



            <BootstrapTable  className= "form-container "
                data={ocsVoice ? ocsVoice.data : ocsVoice}
                keyField="id"
                version="4"
                condensed
               
                hover
                pagination
                
                options={options}
            >
                {/* <TableHeaderColumn dataField="any" width="100" dataFormat={indexN}>S.No.</TableHeaderColumn> */}
                <TableHeaderColumn
                    dataField="action_date"
                    dataSort
                    width="100"
                >
                    Date
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataField="total"
                    dataSort
                    width="100"
                >
                    Total
                </TableHeaderColumn>
            </BootstrapTable>
            <div   className= "form-container " id="chart">
        <ReactApexChart options={optionsGraph} series={series} type="line" height={350} />
      </div>

        </Fragment>
    )
}

export default OcsHitsVoice;