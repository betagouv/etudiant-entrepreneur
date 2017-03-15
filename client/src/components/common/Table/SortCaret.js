import React, { Component, PropTypes } from 'react'
import Const from './Const'

const SortCaret = ({order}) => {
  return (
    <span className="order">
      {(order !== Const.SORT_ASC) &&<span className="dropdown">
        <span className="caret"></span>
      </span>}
      {(order !== Const.SORT_DESC) &&<span className="dropup">
        <span className="caret"></span>
      </span>}
    </span>
  )
}

SortCaret.propTypes = {
  order: PropTypes.string
}

export default SortCaret
