import React from 'react';
import PropTypes from 'prop-types';

class SpaceTimePicker extends React.Component {

    constructor(props) {
        super(props);
        const datetime = new Date(props.value);
        this.state = {
            datetime: datetime,
            hours: 0,
            minutes: 0,
            seconds: 0,
        };
    }

    render() {
        return <div className="space-time-picker">
            <div className="hours">
                <input className="space-input"
                    value={ this.state.hours }
                    maxLength={2}
                    type="text"
                    onBlur={ this.checkHourValue }
                    onKeyPress={this.sanitizeInput}
                    onChange={ (e) => this.setState({hours: e.target.value}) } />
                <div className="arrows">
                    <span className="arrow up" onClick={ () => this.increaseHours(1) }></span>
                    <span className="arrow down" onClick={ () => this.increaseHours(-1) }></span>
                </div>
            </div>
            <span className="separator">:</span>
            <div className="minutes">
                <input onKeyPress={this.sanitizeInput}
                    disabled={ this.props.disabled }
                    onBlur={ this.checkMinuteValue }
                    className="space-input"
                    value={ this.state.minutes }
                    maxLength={ 2 }
                    onChange={ (e) => this.setState({minutes: e.target.value}) }
                    type="text" />
                <div className="arrows">
                    <span className="arrow up" onClick={ () => this.increaseMinutes(1) }></span>
                    <span className="arrow down" onClick={ () => this.increaseMinutes(-1) }></span>
                </div>
            </div>
            <span className="separator">:</span>
            <div className="seconds">
                <input onKeyPress={this.sanitizeInput}
                    disabled={this.props.disabled}
                    onBlur={ this.checkSecondValue }
                    className="space-input"
                    value={this.state.seconds}
                    onChange={ (e) => this.setState({seconds: e.target.value}) }
                    maxLength={2}
                    type="text" />
                <div className="arrows">
                    <span className="arrow up" onClick={ () => this.increaseSeconds(1) }></span>
                    <span className="arrow down" onClick={ () => this.increaseSeconds(-1) }></span>
                </div>
            </div>
            {
                this.props.hour12
                &&
                <div className="hour12">
                    <span className={`am-btn ${this.isAM() ? 'selected': ''}`}
                        onClick={ () => !this.isAM() ? this.increaseHours(12) : null  }>AM</span>
                    <span className={`pm-btn ${!this.isAM() ? 'selected': ''}`}
                        onClick={ () => this.isAM() ? this.increaseHours(-12) : null  }>PM</span>
                </div>
            }
            {
                !this.props.disabled &&
                <div className="confirm" onClick={this.onOkClick}>
                    <span className="ok-btn">OK</span>
                </div>
            }
        </div>;
    }

    componentDidMount() {
        this.init(); 
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.value
            && (!prevProps.value || this.props.value.getTime() !== prevProps.value.getTime())) {
            this.setState({ datetime: new Date(this.props.value) });
            this.init();
        }

        if (this.state.datetime
            && (!prevState.datetime || this.state.datetime.getTime() !== prevState.datetime.getTime())) {
            this.init();
        }
    }

    isAM = () => {
        const hours = this.state.datetime.getHours();
        return hours <= 12;
    }

    init = () => {
        const { datetime } = this.state;

        const currentHours = datetime.getHours();
        const currentMinutes = datetime.getMinutes();
        const currentSeconds = datetime.getSeconds();
        let hours = currentHours < 10 ? `0${currentHours}` : currentHours;
    
        if (this.props.hour12) {
          if (hours > 12) {
            const tmp = hours - 12;
            hours = tmp < 10 ? `0${tmp}` : tmp;
          } else if (hours === 0) {
            hours = 12;
          }
        }
        const minutes = currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes;
        const seconds = currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds;

        this.setState({
            hours,
            minutes,
            seconds,
        });
      }
  
      increaseHours = (value) => {
        if (this.props.disabled) {
          return;
        }
        const datetime = new Date(this.state.datetime);
        const hours = datetime.getHours() + value;
  
        datetime.setHours(hours);

        this.setState({ datetime });
      }
  
      increaseMinutes = (value) => {
        if (this.props.disabled) {
          return;
        }
        const datetime = new Date(this.state.datetime);
        const minutes = datetime.getMinutes() + value;
  
        datetime.setMinutes(minutes);
        this.setState({ datetime });
      }
  
      increaseSeconds = (value) => {
        if (this.props.disabled) {
          return;
        }
        const datetime = new Date(this.state.datetime);
        const seconds = datetime.getSeconds() + value;
  
        datetime.setSeconds(seconds);
        this.setState({ datetime });
      }
  
      sanitizeInput = (e) => {
        const charCode = (e.which) ? e.which : e.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
  
      checkHourValue = () => {
        let { hours } = this.state;
        if (hours > 24) {
          hours = 0;
        }
        const tmp = new Date(this.state.datetime);
        this.setState({ datetime: new Date(tmp.setHours(hours)) });
      }
  
      checkMinuteValue = () => {
        let { minutes } = this.state;
        if (minutes > 60) {
          minutes = 0;
        }
        const tmp = new Date(this.state.datetime);
        this.setState({ datetime: new Date(tmp.setMinutes(minutes)) });
      }
  
      checkSecondValue = () => {
        let { seconds } = this.state;
        if (seconds > 60) {
          seconds = 0;
        }
        const tmp = new Date(this.state.datetime);
        this.setState({ datetime: new Date(tmp.setSeconds(seconds)) });
      }
  
      onOkClick = () => {
        if (this.props.disabled) {
          return;
        }
        this.props.onOk(this.state.datetime);
      }
}

SpaceTimePicker.propTypes = {
    value: PropTypes.instanceOf(Date).isRequired,
    hour12: PropTypes.bool,
    disabled: PropTypes.bool,
    onOk: PropTypes.func,
};

SpaceTimePicker.defaultProps = {
    value: null,
    hour12: false,
    disabled: false,
    onOk: () => {},
};

export default SpaceTimePicker;
