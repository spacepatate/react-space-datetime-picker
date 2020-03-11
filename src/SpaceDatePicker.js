import React from 'react';
import PropTypes from 'prop-types';

import SpaceTimePicker from './SpaceTimePicker';

import {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday,
  } from './WeekDayEnum';
const daysOfWeekOrder = [Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday];
const dateRangeMode = 'date-range';

class SpaceDatePicker extends React.Component {
    constructor(props) {
        super(props);

        let datetime = new Date();

        if (props.value) {
            datetime = new Date(props.value);
        } else if (props.startingDate) {
            datetime = new Date(props.startingDate);
        }

        this.week = [];
        this.tmpCalendar = [];

        this.state = {
            calendar: [], // array to hold sub-array of weeks,
            datetime, // holder of currently displayed day in calendar
            datetimeBis: null, // instance of other datetime in date-range mode
            weekDays: [], // array to hold week day locale strings, /ex: Mon, Thu, Wes...
            currentOverDate: null, // currently mouse overed day date object in calendar, used in date-range mode
            hidePrevBtns: false, // used in date-range mode
            hideNextBtns: false, // used in date-range mode 
        };
    }

    componentDidMount() {
        this.initWeekDays();
        this.init();
    }

    render() {
        const { hideNextBtns, hidePrevBtns, datetime, } = this.state;
        const { showHome } = this.props;

        const weekDays = [];
        const calendar = []

        // 
        for (let i = 0; i < this.state.weekDays.length; i += 1) {
            const day = this.state.weekDays[i];
            weekDays.push(
                <div className="week-day" key={`week-day-${i}`} > { day } </div>
            );
        }

        for (const week of this.state.calendar) {
            const tmp = [];
            for (const day of week) {
                tmp.push(
                    <div className={`day
                        ${this.isPrevMonth(day) ? 'prev-month' : '' }
                        ${this.isNextMonth(day) ? 'next-month' : '' }
                        ${this.isCurrentDate(day) ? 'current-day' : '' }
                        ${this.isSelectedDate(day) ? 'selected' : '' }
                        ${this.isDayInRange(day) ? 'day-in-range' : '' } `}
                        onClick={() => this.selectDate(day)}
                        key={day.getTime()}
                        onMouseOver={() => this.onMouseoverDate(day) }>
                        <span>{ this.formatedDayLabel(day) }</span>
                    </div>
                );
            }
            calendar.push(
                <div className="weeks" key={`week-${calendar.length}`}>
                    { tmp }
                </div>
            );
        }

        return <div className="space-date-day-picker">
        <div className="header">
            { !hidePrevBtns && <span className="prev-year-btn" onClick={ this.selectPrevYear }></span> }
            { !hideNextBtns && <span className="prev-month-btn" onClick={ this.selectPrevMonth }></span> }
            <div className="current-month-year-label">
                <div onClick={this.changeToMonthPicker} className="month-label">
                    { this.getCurrentMonthLabel() }
                </div>
                <div onClick={ this.changeToYearPicker } className="year-label">
                    { datetime.getFullYear() }
                </div>
            </div>
            { !hideNextBtns && <span className="next-month-btn" onClick={ this.selectNextMonth }></span> }
            { !hidePrevBtns && <span className="next-year-btn" onClick={ this.selectNextYear }></span> }
            { showHome && <span className="icon home" onClick={ this.gotoCurrentDdate }></span> }
        </div>
        <div className="week-days">
            { weekDays }
        </div>
        <div className="days-grid">
            { calendar }
        </div>
        {
            this.props.showTime && this.state.datetime &&
            <div className="time-picker">
            <SpaceTimePicker disabled={this.props.disabled}
              value={ this.state.datetime } hour12={ this.props.hour12} onOk={ this.onTimeSelect }></SpaceTimePicker>
          </div>
        }
      </div>;
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.props.value
            && (!prevProps.value
                || this.props.value.getTime() !== prevProps.value.getTime())) {
            // Check if props value has been changed
            if (this.props.mode !== dateRangeMode) {
                this.setState({ datetime: this.props.value });
                return;
            }
            if (this.props.rightRangeDatePicker
                && this.props.rangeDatetimes
                && this.props.rangeDatetimes.startDatetime
                && this.props.rangeDatetimes.endDatetime
                && this.props.rangeDatetimes.endDatetime.getTime() === this.props.value.getTime()
                && this.props.value.getMonth() !== this.props.datetime.getMonth()) {
                return;
            }
            if (this.props.leftRangeDatePicker
                && this.props.rangeDatetimes
                && this.props.rangeDatetimes.startDatetime
                && this.props.rangeDatetimes.startDatetime.getTime() === this.props.value.getTime()
                && this.props.value.getMonth() !== this.props.datetime.getMonth()) {
                return;
            }
            this.setState({ datetime: this.props.value });
        }
        if (this.state.datetime
            && (this.state.datetime.getFullYear() !== prevState.datetime.getFullYear()
                || this.state.datetime.getMonth() !== prevState.datetime.getMonth())) {
            this.setState({
                calendar: [],
            });
            setTimeout(() => {
                this.init();   
            });
        }
    }

    init = () => {
        this.week = [];
        this.tmpCalendar = [];
        this.insertPrevMonthDays();
        this.insertCurrentMonthDays();
        this.insertNextMonthDays();

        this.setState({
            calendar: this.tmpCalendar,
        });
    }
    
    // Compare 2 dates to get months count diff, used in date-range mode
    getMonthsDiff(dateFrom, dateTo) {
        return dateTo.getMonth() - dateFrom.getMonth() + (12 * (dateTo.getFullYear() - dateFrom.getFullYear()));
    }

    // Hide prev btns if it's in date-range mode
    checkPrevBtnsVisibility = () => {
        if (this.props.mode !== dateRangeMode) {
            return;
        }
        if (!this.props.rightRangeDatePicker) {
            this.setState({ hidePrevBtns: false });
            return;
        }
        if ((this.getMonthsDiff(this.props.startingDate, this.state.datetime) > 0)
            || (this.state.datetimeBis && this.getMonthsDiff(this.state.datetimeBis, this.state.datetime) > 1)) {
            this.setState({ hidePrevBtns: false });
            return;
        }
        this.setState({ hidePrevBtns : true });
    }

    // Hide next btns if it's in date-range mode
    checkNextBtnsVisibility = () => {
        if (this.props.mode !== dateRangeMode) {
            return;
        }
        if (!this.props.leftRangeDatePicker) {
            this.setState({ hideNextBtns: false });
            return;
        }

        const { datetime, datetimeBis } = this.state;
        const { startingDate } = this.props;

        if (this.getMonthsDiff(datetime, startingDate) > 0) {
            if (datetimeBis && this.getMonthsDiff(datetime, datetimeBis) <= 1) {
                this.setState({ hideNextBtns: true });
                return;
            }
            this.setState({ hideNextBtns: false });
            return;
        }
        if (this.getMonthsDiff(datetime, datetimeBis) > 1) {
            this.setState({ hideNextBtns: true });
            return;
        }
        this.setState({ hideNextBtns: false });
    }

    onMouseoverDate = (datetime) => {
        if (this.props.mode !== dateRangeMode) {
            return;
        }
        const { rangeDatetimes } = this.props;
        if (rangeDatetimes.startDatetime && rangeDatetimes.endDatetime) {
            return;
        }
        // $emit event
        this.props.onDateOver(datetime);
        this.setState({ currentOverDate: datetime });
    }

    getFirstDayOfMonth = () => {
        return new Date(this.state.datetime.getFullYear(), this.state.datetime.getMonth(), 1);
    }

    getFirstDayOfWeek = () => {
        const index = daysOfWeekOrder.findIndex((day) => day === this.props.startingDay);
        return daysOfWeekOrder[index];
    }

    getLastDayOfMonth = () => {
        return new Date(this.state.datetime.getFullYear(), this.state.datetime.getMonth() + 1, 0);
    }

    getCurrentMonthLabel = () => {
        return this.state.datetime.toLocaleString(this.props.locale, { month: this.props.month });
    }

    getDateNow() {
        return new Date();
    }

    initWeekDays = () => {
        const tmpDaysOfWeekOrder = [...daysOfWeekOrder];
        const index = tmpDaysOfWeekOrder.findIndex((day) => day === this.props.startingDay);
        const tmp = tmpDaysOfWeekOrder.splice(index);

        let weekDaysOrder = [...tmp];

        if (index > 0) {
            const tmp2 = tmpDaysOfWeekOrder.splice(0, index);
            weekDaysOrder = [...tmp, ...tmp2];
        }
        const currentDay = new Date();
        const { locale, weekday } = this.props;
        const weekDays = [];

        for (let i = 0; i < weekDaysOrder.length; i += 1) {
            const day = currentDay.getDay();
            const distance = weekDaysOrder[i] - day;
            const tmp3 = new Date(currentDay.setDate(currentDay.getDate() + distance));
            const label = tmp3.toLocaleDateString(locale, { weekday, });
            // get translated day and insert into weekdays
            weekDays.push(label);
        }
        this.setState({ weekDays, });
    }

    insertPrevMonthDays = () => {
        const firstDateOfMonth = this.getFirstDayOfMonth().getDay() === 0 ? 7 : this.getFirstDayOfMonth().getDay();
        const { datetime } = this.state;

        if (this.getFirstDayOfWeek() === firstDateOfMonth) {
            return; 
        }
        let diff = firstDateOfMonth - this.getFirstDayOfWeek();
        while (diff > 0) {
            // get first day of the month
            const date = new Date(datetime.getFullYear(), datetime.getMonth(), 1, datetime.getHours(), datetime.getMinutes(), datetime.getSeconds());
            // get the starting day of calendar from diff
            date.setDate(date.getDate() - diff);
            this.week.push((date));
            diff -= 1;
        }
        if (this.week.length >= 7) {
            this.tmpCalendar.push(this.week);
            this.week = [];
        }
    }

    insertCurrentMonthDays = () => {
        const { datetime } = this.state;

        for (let i = this.getFirstDayOfMonth().getDate();
            i <= this.getLastDayOfMonth().getDate(); i += 1) {
            const date = new Date(datetime.getFullYear(), datetime.getMonth(), i, datetime.getHours(), datetime.getMinutes(), datetime.getSeconds());
            if (this.week.length >= 7) {
                this.tmpCalendar.push(this.week);
                this.week = [];
            }
            this.week.push((date));
        }
        if (this.week.length >= 7) {
            this.tmpCalendar.push(this.week);
            this.week = [];
        }
    }

    insertNextMonthDays = () => {
        const lastDayOfMonthDay = this.getLastDayOfMonth().getDay() === 0 ? 7 : this.getLastDayOfMonth().getDay();
        if (lastDayOfMonthDay >= 7) {
            return;
        }
        const diff2 = 7 - lastDayOfMonthDay;
        const { datetime } = this.state;
        for (let i = 0; i < diff2; i += 1) {
            const date = new Date(datetime.getFullYear(), datetime.getMonth() + 1, 0, datetime.getHours(), datetime.getMinutes(), datetime.getSeconds());
            date.setDate(date.getDate() + i + 1);
            if (this.week.length >= 7) {
                this.tmpCalendar.push(this.week);
                this.week = [];
            }
            this.week.push((date));
        }
        if (this.week.length >= 7) {
            this.tmpCalendar.push(this.week);
            this.week = [];
        }
    }

    formatedDayLabel = (day) => {
        if (this.props.day === 'numeric') {
            return day.getDate();
        }
        return (day.getDate() < 10) ? `0${day.getDate()}` : day.getDate();
    }

    selectDate = (date) => {
        if (this.props.disabled) {
          return;
        }
        // Prevent to select days of prev/next month in date-range mode
        if (this.props.mode === dateRangeMode
            && (this.isPrevMonth(date) || this.isNextMonth(date))) {
          return;
        }
        if (this.props.showTime) {
            this.props.onChange({ datetime: date, });
        } else {
            this.props.onSelect(date);
        }
    }

    selectMonth = (month) => {
        const tmp = new Date(this.state.datetime);
        const datetime = new Date(tmp.setMonth(month));
        // this.setState({ datetime, });
        this.props.onMonthChange({
            leftRangeDatePicker: this.props.leftRangeDatePicker,
            rightRangeDatePicker: this.props.rightRangeDatePicker,
            datetime,
        });
    }

    selectPrevMonth = () => {
        const { datetime } = this.state;
        const currentMonth = datetime.getMonth();

        if (currentMonth - 1 < 0) {
            // if the last month of last year is selected
          const newDatetime = new Date(datetime.getFullYear(), 11, datetime.getDate(), datetime.getHours(), datetime.getMinutes(), datetime.getSeconds());
          this.setState({ datetime: newDatetime });
        }
        return this.selectMonth(currentMonth - 1);
    }
  
    selectNextMonth = () => {
        const { datetime } = this.state;
        const currentMonth = datetime.getMonth();

        if (currentMonth + 1 > 11) {
            // selected the next month of next year
            const newDatetime = new Date(datetime.getFullYear(), 0, datetime.getDate(), datetime.getHours(), datetime.getMinutes(), datetime.getSeconds());
            this.setState({ datetime: newDatetime });
        }
        return this.selectMonth(currentMonth + 1);
    }

    selectPrevYear = () => {
        const { datetime } = this.state;
        const tmp = new Date(datetime.getTime());
        const newDatetime = new Date(tmp.setYear(tmp.getFullYear() - 1));
        this.setState({ datetime: newDatetime });
    }
  
    selectNextYear = () => {
        const { datetime } = this.state;
        const tmp = new Date(datetime.getTime());
        const newDatetime = new Date(tmp.setYear(tmp.getFullYear() + 1));

        this.props.onYearChange({ datetime: newDatetime })
    }
  
    changeToMonthPicker = () => {
        if (this.props.disabled) {
          return;
        }
        // this.$emit('modeChange', ModeEnum.MonthPick);
        this.props.onMonthPickTrigger();
    }
  
    changeToYearPicker = () => {
        if (this.props.disabled) {
            return;
        }
        // this.$emit('modeChange', ModeEnum.YearPick);
        this.props.onYearPickTrigger();
    }
  
    gotoCurrentDdate = () => {
        this.props.onChange({ datetime: new Date() });
    }
  
    onTimeSelect = (datetime) => {
        if (this.props.disabled) {
          return;
        }
        // this.$emit('select', datetime);
        this.props.onSelect(datetime);
    }

    // Date in range
    isDayInRange = (date) => {
        const { rangeDatetimes } = this.props;

        // if no start datetime and end datetime being selected, no need to check further
        if (this.props.mode !== dateRangeMode
            || (!rangeDatetimes.startDatetime && !rangeDatetimes.endDatetime)) {
            return false;
        }
        // when only start datetime or end datetime is being selected
        if ((rangeDatetimes.startDatetime && !rangeDatetimes.endDatetime)
            || (!rangeDatetimes.startDatetime && rangeDatetimes.endDatetime)) {
            const pivotDate = rangeDatetimes.startDatetime
            ? rangeDatetimes.startDatetime : rangeDatetimes.endDatetime;
            // if current date is between the pivot date and current overed date
            if (date.getTime() < pivotDate.getTime() && date.getTime() > this.currentOverDate.getTime()) {
                return true;
            }
            if (date.getTime() > pivotDate.getTime() && date.getTime() < this.currentOverDate.getTime()) {
                return true;
            }
        }
        if (date.getTime() > this.rangeDatetimes.startDatetime && date.getTime() < this.rangeDatetimes.endDatetime) {
            return true;
        }
        return false;
    }

    isPrevMonth = (date) => {
        const { datetime } = this.state;
        return (date.getMonth() < datetime.getMonth()
                && date.getFullYear() === datetime.getFullYear())
            || (date.getFullYear() < datetime.getFullYear());
    }
  
    isNextMonth = (date) => {
        const { datetime } = this.state;
        return date.getMonth() > datetime.getMonth()
          && date.getFullYear() >= datetime.getFullYear();
    }
  
    isCurrentDate(date) {
        const currentDatetime = new Date();
        return date.getFullYear() === currentDatetime.getFullYear()
            && date.getMonth() === currentDatetime.getMonth()
            && date.getDate() === currentDatetime.getDate();
    }
  
    isSameDay(d1, d2) {
        return (d1.getFullYear() === d2.getFullYear()
            && d1.getMonth() === d2.getMonth()
            && d1.getDate() === d2.getDate());
    }
    
    isSelectedDate = (date) => {
        if (this.props.mode === dateRangeMode) {
            const { rangeDatetimes } = this.props;

            if (!rangeDatetimes.startDatetime && !rangeDatetimes.endDatetime) {
                return false;
            }
            if (rangeDatetimes.startDatetime && this.isSameDay(date, rangeDatetimes.startDatetime)) {
                return true;
            }
            if (rangeDatetimes.endDatetime && this.isSameDay(date, rangeDatetimes.endDatetime)) {
                return true;
            }
            return false;
        }
        const { datetime } = this.state;
        return date.getFullYear() === datetime.getFullYear()
            && date.getMonth() === datetime.getMonth()
            && date.getDate() === datetime.getDate();
    }
}

SpaceDatePicker.propTypes = {
    value: PropTypes.instanceOf(Date),
    rangeDatetimes: PropTypes.object,
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
    onSelect: PropTypes.func,
    // range datetimes only
    mode: PropTypes.string,
    leftRangeDatePicker: PropTypes.bool,
    rightRangeDatePicker: PropTypes.bool,
    startingDate: PropTypes.instanceOf(Date),
    onDateOver: PropTypes.func,
    onYearChange: PropTypes.func,
    onMonthChange: PropTypes.func,
    onMonthPickTrigger: PropTypes.func,
    onYearPickTrigger: PropTypes.func,
};

SpaceDatePicker.defaultProps = {
    value: null,
    placeholder: null,
    rangeDatetimes: null,
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
    mode: 'default', // default | range-date
    startingDate: null,
    leftRangeDatePicker: false,
    rightRangeDatePicker: false,
    onDateOver: () => {},
    onChange: () => {},
    onSelect: () => {},
    onMonthChange: () => {},
    onYearChange: () => {},
    onMonthPickTrigger: () => {},
    onYearPickTrigger: () => {},
};

export default SpaceDatePicker;