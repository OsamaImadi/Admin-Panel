import React, { Fragment } from "react";
import LeftMenu from "../LeftMenu/LeftMenu";
import { Switch, Route } from "react-router";
import Users from "../Users/Users";
import Rent from "../Rent/Rent";
import Orders from "../Orders/Orders";
import Home from "../Home/Home";
import Business from './../964Business/964Business';
import Ggsn from './../GGSN/ggsn';
import OcsHitsData from './../ocsHitsData/ocsHitsData';
import OcsHitsSms from './../OcsHitsSms/ocsHitsSms';
import OcsHitsVoice from './../ocsHitsVoice/ocsHitsVoice';
import SmsSubscription from './../smsSubscription/smsSubscription';

const Admin: React.FC = () => {

  return (
    <Fragment>
      <LeftMenu />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <div className="container-fluid">
            <Switch>
              <Route path={`/users`}><Users /></Route>
              <Route path={`/rent`}><Rent /></Route>
              <Route path={`/business`}><Business /></Route>
              <Route path={`/ggsn`}><Ggsn /></Route>
              <Route path={`/ocs-hits-data`}><OcsHitsData /></Route>
              <Route path={`/ocs-hits-sms`}><OcsHitsSms /></Route>
              <Route path={`/ocs-hits-voice`}><OcsHitsVoice /></Route>
              <Route path={`/orders`}><Orders /></Route>
              <Route path={`/sms`}><SmsSubscription /></Route>
              <Route path="/"><Home /></Route>
            </Switch>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Admin;
