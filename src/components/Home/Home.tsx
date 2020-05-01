import React, { Fragment, useState, useEffect } from "react";
import loadable from 'loadable-components';
// import ReactApexChart from "react-apexcharts";
import TopCard from "../../common/components/TopIndexCard";
import { Rent } from './../../data/rent';
import { smsSubscription } from './../../data/smsSubscription';
import {
  getWeeklyRent,
  getWeeklyRetail,
  getWeeklySms,
  getWeeklyEtop,
  getWeeklyBusiness
} from '../../services/home.services'

import './index.css'
import moment from 'moment'






const Home: React.FC = () => {
  const [value, setValue] = useState([{}]);
  const [name, setName] = useState('');

  const setRent  = ()=>{
    //http://localhost:8081/zongPortal/Rent/Weekly
    console.log("INSIDE SET RENT")
    setName('Rent')
    getWeeklyRent()
    .then((data: any) => {
      setValue(data.data);
    });
  }

  const setSmsSubs = ()=>{
    //http://localhost:8082/zongPortal/SmsSubscriptions/Weekly
    console.log("INSIDE SET SMS")
    getWeeklySms()
    .then((data: any) => {
      setValue(data.data);
    });
  }
  const setBusinessOrders = ()=>{
    //http://localhost:8081/zongPortal/BusinessOrder/Weekly
    console.log("INSIDE SET BUSINESS")
    getWeeklyBusiness()
    .then((data: any) => {
      setValue(data.data);
    });
  }
  const setRetailer = ()=>{
    //http://localhost:8081/zongPortal/964Business/Weekly
    console.log("INSIDE SET 964")
    getWeeklyRetail()
    .then((data: any) => {
      setValue(data.data);
    });
  }
  const setEtop = ()=>{
    //http://localhost:8086/zongPortal/Etop/Weekly
    console.log("INSIDE SET ETOP")
    getWeeklyEtop()
    .then((data: any) => {
      setValue(data.data);
    });
  }
  
  let series = [{
    name: "Total",
    data: value? value.map((r:any) => r.total): value
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
      text: `${name} (Weekly Report)`,
      align: 'left'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    xaxis: {
      categories: value? value.map((r:any) => {
        let date = moment(r.action_date).format('DD-MMM-YYYY').toUpperCase();
        return date;
      }):value
      
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
      <h1 className="h3 mb-2 text-gray-800">Dashboard</h1>
      <p className="mb-4">Summary and overview of our admin stuff here</p>

      <div className="row">
        <div className="card-div col-4" onClick={setBusinessOrders}>
          <TopCard title="" text="BUSINESS ORDERS" icon="dollar-sign" class="primary"/>
        </div>
        <div className="card-div col-4" onClick={setRetailer}>
          <TopCard title="" text="964 STATS" icon="warehouse" class="danger" />
        </div>
        <div className="card-div col-4" onClick={setRent}>
          <TopCard title="" text="RENT STATS" icon="dollar-sign" class="success" />
        </div>
      </div>

      <div className="row card-row2">
        <div className="card-div col-4" onClick={setSmsSubs}>
          <TopCard title="" text="SMS SUBSCRIPTION" icon="dollar-sign" class="success" />
        </div>
        <div className="card-div col-4" onClick={setEtop}>
          <TopCard title="" text="ETOP Stats" icon="donate" class="primary" />
        </div>
      </div>

      <div id="chart" className="chart-class">
        <LoadableChart options={optionsGraph} series={series} type="line" height={350}/>
      </div>


    </Fragment>
  );
};

export default Home;

const LoadableChart = loadable(() => import('react-apexcharts'))

