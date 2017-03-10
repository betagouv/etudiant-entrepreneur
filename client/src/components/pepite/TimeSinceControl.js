import React, { PropTypes } from 'react'
import Moment from 'moment'

const TimeSinceControl = ({ textDate }) => {
  const date = new Moment.utc(textDate)
  return (
    <div title={date.format('Do MMMM YYYY')}>
      {date.fromNow(true)}
    </div>
  )
}

TimeSinceControl.propTypes = {
  textDate: PropTypes.string.isRequired,
}

export default TimeSinceControl
