import React, { Component } from 'react'
import { DateTimePicker } from 'react-widgets'

import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment'
import TimePicker from 'react-times'

// use material theme
import 'react-times/css/material/default.css'
import 'react-widgets/dist/css/react-widgets.css'
// or you can use classic theme
import 'react-times/css/classic/default.css'
Moment.locale('en')
momentLocalizer()

class DatePicker extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: props.field.name,
			date: props.value || new Date()
		}
	}

	handleChange = date => {
		this.setState({ date })
		this.props.form.setFieldValue(this.state.name, date)
	}

	handleSelect = date => {
		this.props.form.setFieldValue(this.state.name, {
			value: date
		})
	}

	handleToggle = data => {
		this.setState({ open: data })
	}

	handleInputClickDate = e => {
		if (e.target.tagName === 'INPUT') {
			this.setState({ open: 'date' })
		}
	}

	handleInputClickTime = e => {
		if (e.target.tagName === 'INPUT') {
			this.setState({ open: 'time' })
		}
	}

	//------------ clock pickerr methods----------------

	onTimeChange(options) {
		const { hour, minute, meridiem } = options
		let newState = Object.assign({}, this.state)
		newState.time['hour'] = hour
		newState.time['minutes'] = minute
		newState.time['meridiem'] = meridiem

		this.setState(newState)

		console.log(this.state.time)
	}

	onFocusChange(focusStatue) {
		// do something
	}
	handleFocusedChange() {
		this.setState({ focused: true })
	}
	render() {
		const {
			field: { name, ...field },
			form: { touched, errors },
			classes,
			options,
			placeholder = '',
			label,
			...rest
		} = this.props

		let { openTime, openDate, open, date } = this.state || {}

		const error = errors[name]
		const touch = touched[name]

		// format={'DD MMM YYYY hh:mm'}
		// timeFormat={'hh: mm '}
		return (
			<React.Fragment>
				<div className='row'>
					<div className='col-sm-6 mt-2'>
						<DateTimePicker
							open={open}
							defaultValue={date}
							onClick={this.handleInputClickDate}
							onToggle={this.handleToggle}
							format={'DD MMM YYYY'}
							value={this.state.date}
							onChange={this.handleChange}
							time={false}
							onFocus={() => this.setState({ open: 'date' })}
							step={15}
						/>
					</div>
				</div>
			</React.Fragment>
		)
	}
}

export default DatePicker

