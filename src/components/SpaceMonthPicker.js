import React from 'react';
import PropTypes from 'prop-types';

const months = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [9, 10, 11],
  ];
  
class SpaceMonthPicker extends React.Component {
    constructor(props) {
        super(props);

        const datetime = props.value ? new Date(props.value) : new Date();
        this.state = {
            months,
            datetime: datetime,
        };
    }

    render() {

        const monthsGrid = [];

        for (let i = 0; i < this.state.months.length; i += 1) {
            const monthsList = [];

            for (let j = 0; j < this.state.months[i].length; j += 1) {
                const month = this.state.months[i][j];
                monthsList.push(
                    <div className={`month ${month === this.state.datetime.getMonth() ? 'current-month' : ''}`}
                        key={`month-${month}`}>
                        <span onClick={ () => this.selectMonth(month) }>{ this.formatedMonthLabel(month) }</span>
                    </div>
                );
            }
            monthsGrid.push(
                <div className="months-list" key={`month-list-${i}`}>
                    { monthsList }
                </div>
            );
        }

        return <div className="space-date-month-picker">
            <div className="header">
                <span className="prev-year-btn" onClick={this.selectPrevYear}></span>
                <div className="current-year-label">
                    { this.state.datetime.getFullYear() }
                </div>
                <span className="next-year-btn" onClick={this.selectNextYear}></span>
            </div>
            <div className="months-grid">
                { monthsGrid }
            </div>
        </div>;
    }

    componentDidUpdate(prevProps) {
        if (this.props.value && (!prevProps.value || this.props.value.getTime() !== prevProps.value.getTime())) {
            this.setState({ datetime: new Date(this.props.value) })
        }
    }

    // get locale month label
    formatedMonthLabel = (month) => {
        const datetime = new Date(this.state.datetime.getFullYear(), month, 1);
        return datetime.toLocaleDateString(this.props.locale, { month: this.props.month });
    }

    selectMonth = (selectedMonth) => {
        if (this.disabled) {
            return;
        }
        const tmp = this.state.datetime.setMonth(selectedMonth);
        // this.setState({ datetime: new Date(tmp) })
        this.props.onChange(new Date(tmp));
    }

    selectPrevYear = () => {
        const year  = this.state.datetime.getFullYear() - 1;
        const tmp = (new Date(this.state.datetime)).setYear(year);
        this.setState({
            datetime: new Date(tmp),
        });
    }

    selectNextYear = () => {
        const year  = this.state.datetime.getFullYear() + 1;
        const tmp = (new Date(this.state.datetime)).setYear(year);
        this.setState({
            datetime: new Date(tmp),
        });
    }
}

SpaceMonthPicker.propTypes = {
    value: PropTypes.instanceOf(Date),
    locale: PropTypes.string,
    month: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
};

SpaceMonthPicker.defaultProps = {
    value: null,
    locale: undefined,
    month: 'short', // numeric | 2-digit | long | short | narrow
    disabled: false,
    onChange: () => {},
};

export default SpaceMonthPicker;
