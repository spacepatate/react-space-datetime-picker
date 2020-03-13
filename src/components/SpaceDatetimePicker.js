import React from 'react';
import PropTypes from 'prop-types';

import {
    reverseFuncs,
    parseFuncs,
    isValidDate,
  } from './helper';

import SpaceDatePicker from './SpaceDatePicker';
import SpaceMonthPicker from './SpaceMonthPicker';
import SpaceYearPicker from './SpaceYearPicker';

const calendarMode = {
    DatePick: 1,
    MonthPick: 2,
    YearPick: 3,
};

class SpaceDatetimePicker extends React.Component {
    constructor(props) {
        super(props);

        let datetime = null;
        if (props.value && isValidDate(props.value)) {
            datetime = new Date(props.value);
        }
        this.state = {
            datetime, // current calendar dispalyed datetime
            mode: calendarMode.DatePick, // 1 calendar day pick | 2 months pick | 3 year pick
            label: null, // dispalyed datetime label in input
            displayPopover: false, // bool for popover visibility
            showClearBtn: false,
            popoverStyle: null,
            ref: React.createRef(),
            popoverRef: React.createRef(),
        };
    }

    componentDidUpdate(_, prevState) {
        // watch for datetime cahnge
        if (this.state.datetime
            && (!prevState.datetime || this.state.datetime.getTime() !== prevState.datetime.getTime())) {
            // if datetime changed, format the label to requested format
            let tmp = this.props.format;
            for (let i = 0; i < parseFuncs.length; i += 1) {
                const parseFunc = parseFuncs[i];
                if (this.props.format.includes(parseFunc.key)) {
                    tmp = parseFunc.handler(this.state.datetime, tmp);
                }
            }
            this.setState({ label: tmp, showClearBtn: !!tmp });
        }
        if (prevState.datetime && !this.state.datetime) {
            this.setState({ label: null, showClearBtn: false });
        }
    }

    render() {
        const showBtn = this.state.showClearBtn && !this.state.disabled;
        const { datetime } = this.state;
        const { showHome, showTime, weekday, locale, disabled, startingDay, month, hour12 } = this.props;
        const inputDisplay = this.props.customDisplay
    ? <span ref={this.state.ref} onClick={this.openPopover}>{ this.props.customDisplay }</span>
            : <div className="default-input" ref={this.state.ref}>
                <input className="space-input"
                    value={this.state.label ? this.state.label : ''}
                    onChange={this.onInputChange}
                    onClick={this.openPopover}
                    disabled={this.props.disabled}
                    placeholder={this.props.placeholder}
                    onBlur={this.onBlur} type="text" />
                {
                    showBtn && !this.props.disabled && <span className="clear-btn" onClick={this.onClearBtnClick}>&times;</span>
                }
            </div>;

        return <div className="space-datetime-picker">
            { inputDisplay }
            {
               this.state.displayPopover &&
               <div className="space-datetime-popover" ref={this.state.popoverRef}>
                    { this.state.mode === calendarMode.DatePick
                        && <SpaceDatePicker value={ datetime }
                            showTime={showTime}
                            showHome={showHome} 
                            weekday={weekday}
                            locale={locale}
                            disabled={disabled}
                            hour12={hour12}
                            startingDay={startingDay}
                            onYearChange={this.onDateChange}
                            onMonthChange={this.onDateChange}
                            onMonthPickTrigger={ this.onMonthPickTrigger }
                            onYearPickTrigger={ this.onYearPickTrigger }
                            onChange={this.onDateChange}
                            onSelect={this.onSelect}></SpaceDatePicker> }

                    {
                        this.state.mode === calendarMode.MonthPick
                        && <SpaceMonthPicker value={ datetime }
                            locale={locale}
                            disabled={disabled}
                            month={month}
                            onChange={this.onMonthChange}></SpaceMonthPicker>
                    }
                    {
                        this.state.mode === calendarMode.YearPick
                        && <SpaceYearPicker value={ datetime }
                            disabled={disabled}
                            onChange={this.onYearChange}>                    
                        </SpaceYearPicker>
                    }
                </div>
            }

        </div>;
    }
  
    onSelect = (datetime) => {
        this.setState({ datetime, displayPopover: false });
        document.removeEventListener('click', this.onClickHandler);
        if (!this.props.disabled) {
          this.props.onChange(datetime);
        }
    }

    openPopover = (e) => {
        this.setState({
            displayPopover: true,
        });
        const el = this.state.ref.current;
        if (!el) {
            return;
        }
        const viewportOffset = el.getBoundingClientRect();
        const popoverPositionLeft = viewportOffset.left;
        const popoverPositionTop = viewportOffset.top + viewportOffset.height;
        this.setState({ popoverStyle: {
            position: 'absolute',
            left: `${popoverPositionLeft}px`,
            top: `${popoverPositionTop}px`,
            'z-index': 100,
          } });
        e.stopPropagation();
        e.preventDefault();
        document.addEventListener('click', this.onClickHandler);
    }

    onClickHandler = (e) => {
        if (!this.state.popoverRef.current) {
            return;
        }
        const viewportOffset = this.state.popoverRef.current.getBoundingClientRect();
        const zoneX = viewportOffset.x + viewportOffset.width;
        const zoneY = viewportOffset.y + viewportOffset.height;
        if (e.clientX < viewportOffset.x
            || e.clientX > zoneX
            || e.clientY < viewportOffset.y
            || e.clientY > zoneY) {
          this.setState({ displayPopover: false });
          document.removeEventListener('click', this.onClickHandler);
          if (isValidDate(this.state.datetime) && !this.props.disabled) {
            this.props.onChange(this.state.datetime);
          }
          this.setState({ mode: calendarMode.DatePick });
        }
    }

    onDateChange = ({ datetime }) => {
        this.setState({ datetime, });
    }

    onMonthChange = (datetime) => {
        this.setState({ datetime, mode: calendarMode.DatePick });
    }

    onYearChange = (datetime) => {
        this.setState({ datetime, mode: calendarMode.DatePick });
    }

    onMonthPickTrigger = () => {
        this.setState({ mode: calendarMode.MonthPick });
    }

    onYearPickTrigger = () => {
        this.setState({ mode: calendarMode.YearPick });
    }

    onBlur = () => {
        let datetime = new Date();
        if (!this.state.label) {
            this.props.onChange(null);
            return;
        }
        for (let i = 0; i < reverseFuncs.length; i += 1) {
            const parseFunc = reverseFuncs[i];
            if (this.props.format.includes(parseFunc.key)) {
                const tmp = parseFunc.handler(this.state.label, this.props.format, datetime);
                datetime = new Date(tmp);
            }
        }
        if (isValidDate(datetime) && !this.props.disabled) {
            this.setState({
                datetime,
            });
            this.props.onChange(datetime);
        }
    }

    onClearBtnClick = () => {
        this.setState({
            displayPopover: false,
            label: null,
            datetime: null,
        });
        this.props.onChange(null);
    }

    onInputChange = (e) => {
        this.setState({
            label: e.target.value,
        });
    }
}

SpaceDatetimePicker.propTypes = {
    value: PropTypes.instanceOf(Date),
    placeholder: PropTypes.string,
    format: PropTypes.string,
    locale: PropTypes.string,
    showTime: PropTypes.bool,
    hour12: PropTypes.bool,
    weekday: PropTypes.string,
    year: PropTypes.string,
    month: PropTypes.string,
    day: PropTypes.string,
    hour: PropTypes.string,
    minute: PropTypes.string,
    second: PropTypes.string,
    showHome: PropTypes.bool,
    disabled: PropTypes.bool,
    startingDay: PropTypes.number,
    onChange: PropTypes.func,
    customDisplay: PropTypes.any,
};

SpaceDatetimePicker.defaultProps = {
    value: null,
    placeholder: null,
    format: 'YYYY-MM-DD',
    locale: undefined,
    showTime: false,
    hour12: false,
    weekday: 'narrow', // long | short | narrow
    year: 'numeric', // numeric (ex: 2012) | 2-digit (ex: 12)
    month: 'short', // long | short | narrow
    day: '2-digit', // numeric (ex: 1) | 2-digit (ex: 01)
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    showHome: true,
    disabled: false,
    startingDay: 1, // 1 monday | 2 thuesday | 3 wensday... | 0 sunday
    onChange: () => null,
    customDisplay: null,
};

export default SpaceDatetimePicker;