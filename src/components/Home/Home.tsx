import React, { Fragment } from "react";
import TopCard from "../../common/components/TopCard";
import { Rent } from './../../data/rent';
import { smsSubscription } from './../../data/smsSubscription';
import { ggsn } from './../../data/ggsn';

const Home: React.FC = () => {

  return (
    <Fragment>
      <h1 className="h3 mb-2 text-gray-800">Dashboard</h1>
      <p className="mb-4">Summary and overview of our admin stuff here</p>

      <div className="row">
        <TopCard title="TOTAL RENT" text={`${Rent.length}`} icon="box" class="primary" />
        <TopCard title="TOTAL SMS SUBSCRIPTIONS" text={`${smsSubscription.length}`} icon="warehouse" class="danger" />
        <TopCard title="TOTAL GGSN" text={`${ggsn.length}`} icon="dollar-sign" class="success" />
        <TopCard title="TOTAL GGSN" text={`${ggsn.length}`} icon="dollar-sign" class="success" />
      </div>

      <div className="row">
        <TopCard title="SALES" text={`${ggsn.length}`} icon="donate" class="primary" />
        <TopCard title="ORDER AMOUNT" text={`${ggsn.length}`} icon="calculator" class="danger" />
      </div>


    </Fragment>
  );
};

export default Home;
