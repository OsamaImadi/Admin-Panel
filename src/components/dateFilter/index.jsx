import React, { Component } from "react";
import moment from "moment";
import { DateRange, defaultRanges } from "react-date-range";
import { theme } from "./theme";
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";

class RangeFilter extends Component {
  state = {
    startDate: "",
    endDate: "",
    dateRangeState: false,
    calendarState: false
  };
  toggleDateRangeState = () => {
    this.setState({
      dateRangeState: !this.state.dateRangeState
    });
  };

  close = () => {
    this.toggleDateRangeState();
    this.cleanFiltered();
  };

  handleSelect = range => {
    const startDate = moment(range.startDate).format("MM/DD/YYYY");
    const endDate = moment(range.endDate).format("MM/DD/YYYY");
    this.setState({
      startDate,
      endDate
    });
  };

  filter = event => {
    console.log("event --------------", event);
    this.props.filterHandler({ callback: this.isFiltered });
    this.toggleDateRangeState();
  };

  isFiltered = targetValue => {
    console.log("target value", targetValue);
    const { startDate, endDate } = this.state;
    const targetDate = moment(parseInt(targetValue)).format("MM/DD/YYYY");
    if (startDate && endDate) {
      return targetDate >= startDate && targetDate <= endDate;
    }
  };

  cleanFiltered = () => {
    this.setState({
      startDate: "",
      endDate: ""
    });
    this.props.filterHandler();
  };

  render() {
    return (
      <div>
        <div>
          <input
            ref="startDate"
            type="text"
            className="filter form-control"
            value={
              this.state.endDate && this.state.startDate
                ? `${this.state.startDate} - ${this.state.endDate}`
                : ""
            }
            readOnly
            placeholder="Filter by Date..."
            id="open"
          />
        </div>
        <Popover
          placement="top-start"
          toggle={this.toggleDateRangeState}
          isOpen={this.state.dateRangeState}
          target="open"
          className="custom-popover"
        >
          <PopoverHeader>Filter By Date</PopoverHeader>
          <PopoverBody>
            <DateRange
              onInit={this.handleSelect}
              onChange={this.handleSelect}
              ranges={{
                ...defaultRanges
              }}
              linkedCalendars={true}
              calendars={1}
              theme={theme}
            />
            <hr />
            <div className="d-flex justify-content-end">
              <button className="btn btn-secondary mr-2" onClick={this.close}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={this.filter}>
                Apply
              </button>
            </div>
          </PopoverBody>
        </Popover>
      </div>
    );
  }
}

export const getDateFilter = (filterHandler, customFilterParameters) => {
  return <RangeFilter filterHandler={filterHandler} />;
};
