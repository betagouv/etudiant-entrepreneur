// The MIT License (MIT) Copyright (c) 2015 @djidja8
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import React, { Component, PropTypes } from 'react'

const Multistep = class MultiStep extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showPreviousBtn: false,
      showNextBtn: true,
      compState: 0,
      navState: this.getNavStates(0, this.props.steps.length)
    }
    this.hidden = {
      display: 'none'
    }
    this.handleOnClick = this.handleOnClick.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
  }

  getNavStates(indx, length) {
    let styles = []
    for (let i = 0; i < length; i++) {
      if (i < indx) {
        styles.push('done')
      }
      else if (i === indx) {
        styles.push('doing')
      }
      else {
        styles.push('todo')
      }
    }
    return { current: indx, styles: styles }
  }

  checkNavState(currentStep) {
    if (currentStep > 0 && currentStep !== this.props.steps.length - 1) {
      this.setState({
        showPreviousBtn: true,
        showNextBtn: true
      })
    }
    else if (currentStep === 0) {
      this.setState({
        showPreviousBtn: false,
        showNextBtn: true
      })
    }
    else {
      this.setState({
        showPreviousBtn: true,
        showNextBtn: false
      })
    }
  }

  setNavState(next) {
    if (this.props.canNavigate(this.state.compState)) {
      this.setState({ navState: this.getNavStates(next, this.props.steps.length) })
      if (next < this.props.steps.length) {
        this.setState({ compState: next })
      }
      this.checkNavState(next)
    }
  }

  handleKeyDown(evt) {
    if (evt.which === 13) {
      this.next()
    }
  }

  handleOnClick(evt) {
    if (evt.currentTarget.value === (this.props.steps.length - 1) &&
      this.state.compState === (this.props.steps.length - 1)) {
      this.setNavState(this.props.steps.length)
    }
    else {
      this.setNavState(evt.currentTarget.value)
    }
  }

  next(event) {
    event.preventDefault()
    this.setNavState(this.state.compState + 1)
  }

  previous(event) {
    event.preventDefault()
    if (this.state.compState > 0) {
      this.setNavState(this.state.compState - 1)
    }
  }

  getStepName(stepIndex) {
    if (stepIndex >= 0 && stepIndex < this.props.steps.length) {
      return this.props.steps[stepIndex].name
    }
    return ''
  }

  getClassName(className, i) {
    const suffix = (this.props.steps[i].hasError) ? 'error' : this.state.navState.styles[i]
    return className + "-" + suffix
  }

  renderSteps() {
    return this.props.steps.map((s, i) => (
      <li className={this.getClassName("progtrckr", i)} onClick={this.handleOnClick} key={i} value={i}>
        <em>{i + 1}</em>
        <span>{this.props.steps[i].name}</span>
      </li>
    ))
  }

  render() {

    return (
      <div className="container" onKeyDown={this.handleKeyDown}>
        <div className="row">
          <div>
            <ol className="progtrckr">
              {this.renderSteps()}
            </ol>
          </div>
          <div className="pull-right">
            <button
              type="submit"
              className="btn btn-primary save"
              onClick={this.props.save}>Sauvegarder</button>
          </div>
        </div>
        {this.props.steps[this.state.compState].component}
        <div className="fixed clearfix">
          <button style={this.state.showPreviousBtn ? {} : this.hidden}
            type="submit"
            className="btn btn-info prev-step"
            onClick={this.previous}><span className="glyphicon glyphicon-menu-left"></span>{this.getStepName(this.state.compState - 1)}</button>
          <button style={this.state.showNextBtn ? {} : this.hidden}
            type="submit"
            className="btn btn-info next-step"
            onClick={this.next}>{this.getStepName(this.state.compState + 1)}<span className="glyphicon glyphicon-menu-right"></span></button>
        </div>
      </div>
    )
  }
}

Multistep.propTypes = {
  steps: PropTypes.array.isRequired,
  save: PropTypes.func.isRequired,
  canNavigate: PropTypes.func.isRequired
}

export default Multistep
