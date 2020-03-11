import React from 'react';
import PropTypes from 'prop-types';

const yearsGrid = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [9, 10, 11],
  ];
class SpaceYearPicker extends React.Component {
    constructor(props) {
        super(props);

        const datetime = props.value ? new Date(props.value) : new Date();

        this.state = {
            years: [],
            startingYear: null,
            datetime,
        };
        setTimeout(() => {
            this.init()
        });
    }

    render() {
        const yearsGrid = [];

        for (let i = 0; i < this.state.years.length; i += 1) {
            const yearsList = [];

            for (let j = 0; j < this.state.years[i].length; j += 1) {
                const year = this.state.years[i][j];
                yearsList.push(
                    <div className={`year ${year.getFullYear() === this.state.datetime.getFullYear() ? 'current-year' : ''}`}
                        key={`year-${year}`}>
                        <span onClick={ () => this.selectYear(year) }>
                            { this.formatedYearLabel(year) }
                        </span>
                    </div>
                );
            }
            yearsGrid.push(
                <div className="years-list" key={`year-list-${i}`}>
                    { yearsList }
                </div>
            );
        }
        return <div className="space-year-picker">
            <div className="header">
                <span className="prev-10year-btn" onClick={this.selectPrev10Year}></span>
                <div className="current-10years-label">
                    { this.state.years && this.state.years.length > 0 && this.formatedCurrent10YearsLabel() }
                </div>
                <span className="next-10year-btn" onClick={this.selectNext10Year}></span>
            </div>
            <div className="years-grid">
                { yearsGrid }
            </div>
        </div>;
    }

    componentDidUpdate(prevProps) {
        if (this.props.value && (!prevProps.value || this.props.value.getTime() !== prevProps.value.getTime())) {
            this.setState({ datetime: new Date(this.props.value) })
            setTimeout(() => {
                this.init()
            });
        }
    }

    init = () => {
        const { datetime } = this.state;
        const yearStr = datetime.getFullYear().toString();
        const lastDigit = yearStr.substr(3, 1);
        const diff = Number.parseInt(lastDigit, 10) - (-1);

        const startingYear = new Date(datetime.getFullYear() - diff,
            datetime.getMonth(),
            datetime.getDate(),
            datetime.getHours(),
            datetime.getMinutes(),
            datetime.getSeconds()
        );
        this.setState({ startingYear });
        this.initYears(startingYear);
    }

    initYears = (startingYear) => {
        const years = [];
        const { datetime } = this.state;
        for (let i = 0; i < yearsGrid.length; i += 1) {
          const tempYears = [];
          const currentYears = yearsGrid[i];
          for (let j = 0; j < currentYears.length; j += 1) {
            const tmpYear = new Date(
              startingYear.getFullYear() + currentYears[j],
              datetime.getMonth(),
              datetime.getDate(),
              datetime.getHours(),
              datetime.getMinutes(),
              datetime.getSeconds(),
            );
            tempYears.push(tmpYear);
          }
          years.push(tempYears);
        }
        this.setState({ years, });
    }

    formatedYearLabel = (year) => {
        return year.getFullYear();
    }
  
    formatedCurrent10YearsLabel = () => {
        const start = this.state.years[0][1];
        const end = this.state.years[3][1];
        return `${start.getFullYear()} - ${end.getFullYear()}`;
    }

    selectPrev10Year = () => {
        const { startingYear, datetime } = this.state;
        const tmp = new Date(
          startingYear.getFullYear() - 10,
          datetime.getMonth(),
          datetime.getDate(),
          datetime.getHours(),
          datetime.getMinutes(),
          datetime.getSeconds(),
        );
        this.setState({ startingYear: tmp });
        this.initYears(tmp);
    }
  
    selectNext10Year = () => {
        const { startingYear, datetime } = this.state;
        const tmp = new Date(
          startingYear.getFullYear() + 10,
          datetime.getMonth(),
          datetime.getDate(),
          datetime.getHours(),
          datetime.getMinutes(),
          datetime.getSeconds(),
        );

        this.setState({ startingYear: tmp });
        this.initYears(tmp);
    }
  
    selectYear = (year) => {
        if (this.props.disabled) {
            return;
        }
        this.props.onChange(year);
    }
}

SpaceYearPicker.propTypes = {
    value: PropTypes.instanceOf(Date),
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
};

SpaceYearPicker.defaultProps = {
    value: null,
    disabled: false,
    onChange: () => {},
};

export default SpaceYearPicker;
