import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import './index.css'
const zongLogo = require('../../assets/Zong-logo.png')

const LeftMenu: React.FC = () => {

    let [leftMenuVisibility, setLeftMenuVisibility] = useState(false);

    function changeLeftMenuVisibility() {
        setLeftMenuVisibility(!leftMenuVisibility);
    }

    function getCollapseClass() {
        return (leftMenuVisibility) ? "" : "collapsed";
    }

    return (
        <Fragment>
            <div className="toggle-area">
                <button className="btn btn-primary toggle-button" onClick={() => changeLeftMenuVisibility()}>
                    {/* <i className="fas fa-bolt"></i> */}

                </button>
            </div>

            <ul className={`navbar-nav bg-gradient-primary-green sidebar sidebar-dark accordion ${getCollapseClass()}`}
                id="collapseMenu">

                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                    <div className="sidebar-brand-icon icon-green rotate-n-15">
                        {/* <i className="fas fa-bolt"></i> */}
                        <img className='zong-logo' src={zongLogo} alt='zong-logo' />
                    </div>
                </a>

                <hr className="sidebar-divider my-0" />

                <li className="nav-item active">

                    <Link className="nav-link" to="Home">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                    </Link>
                </li>

                <hr className="sidebar-divider" />
                <div className="sidebar-heading">
                    Weekly
                </div>


                <li className="nav-item">
                    <Link className="nav-link" to={`/orders`}>
                        <i className="fas fa-fw fa-dollar-sign"></i>
                        <span>Business Orders</span>
                    </Link>
                </li>


                <li className="nav-item">
                    <Link className="nav-link" to={`/ggsn`}>
                        <i className="fas fa-fw fa-dollar-sign"></i>
                        <span>GGSN</span>
                    </Link>
                </li>


                <hr className="sidebar-divider" />
                <div className="sidebar-heading">
                    Boss Hits in Million
                </div>

                <li className="nav-item">
                    <Link className="nav-link" to={`/rent`}>
                        <i className="fas fa-fw fa-dollar-sign"></i>
                        <span>Rent</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to={`/business`}>
                        <i className="fas fa-fw fa-dollar-sign"></i>
                        <span>964Business</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to={`/ocs-hits-data`}>
                        <i className="fas fa-fw fa-dollar-sign"></i>
                        <span>OCS Hits Data</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to={`/ocs-hits-sms`}>
                        <i className="fas fa-fw fa-dollar-sign"></i>
                        <span>OCS Hits SMS</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to={`/ocs-hits-voice`}>
                        <i className="fas fa-fw fa-dollar-sign"></i>
                        <span>OCS Hits Voice</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to={`/sms`}>
                        <i className="fas fa-fw fa-dollar-sign"></i>
                        <span>SMS Subscriptions</span>
                    </Link>
                </li>

                <hr className="sidebar-divider" />

                {/* <div className="sidebar-heading">
                    GGSN
                </div> */}


                {/* <li className="nav-item">
                    <Link className="nav-link" to={`/users`}>
                        <i className="fas fa-fw fa-user"></i>
                        <span>Users</span>
                    </Link>
                </li> */}

                <hr className="sidebar-divider d-none d-md-block" />
            </ul>
        </Fragment>
    );
};

export default LeftMenu;
