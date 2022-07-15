import React, { useEffect, useState } from 'react';
import DateRangeSelector from 'react-daterangeselector';
import 'react-daterangeselector/dist/styles.min.css';

function Calender({ setFilteredDate , data }) {

    const [array, setarray] = useState(data)

    const todaay = new Date();
    const ONE_DAYIN_MS = 86400000;
    const TODAY_IN_MS = new Date(`${todaay.getFullYear()}-${todaay.getMonth() + 1}-${todaay.getDate()}`).getTime(); // at 12am
    const NEXT_DAT_IN_MS = TODAY_IN_MS + ONE_DAYIN_MS - 1; //today at 11.59.00

    // filterDateByTimestamp(startValue, endValue) {

    //     if( startValue > endValue ) {
    //         console.log("looking back")
    //     } else {
    //         console.log("looking forward")
    //     }
    // }

    function filterDateByTimestamp(startValue, endValue) {
        console.log(array, "okay")

        if (startValue > endValue) {

            const filteredOutput = data.filter(item => {
                console.log(item)

                let temp = item.customTimeStamp;
                let tempDate = new Date(temp);
                console.log(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate())

                if (temp >= endValue && temp <= startValue) {
                    // console.log("matched", item)
                    return true;
                }
                return false;
            });

            console.log(filteredOutput, " new calender ", startValue, " to ", endValue)
        } else {
            const filteredOutput = data.filter(item => {
                let temp = item.customTimeStamp;
                let tempDate = new Date(temp);

                if (temp <= endValue && temp >= startValue) {
                    // console.log("matched", item)
                    return true;
                }
                return false;
            });

            console.log(filteredOutput, " new calender ", startValue, " to ", endValue)
        }
    }

    // console.log(data)

    function callback(start, end) {

        let startDate = new Date(start._d);
        let endDate = new Date(end._d);

        let startDateTimestamp = startDate.getTime();
        let endDateTimestamp = endDate.getTime();

        filterDateByTimestamp(startDateTimestamp, endDateTimestamp)

    }

    useEffect(() => {
      setarray(data)
    }, [data])
    
    return (
        <>
            <DateRangeSelector
                inputComponent={<input type='text' name='dates' className='form-control pull-right' />}
                options={{
                    opens: 'right',
                    buttonClasses: ['btn btn-sm'],
                    applyClass: 'btn-primary',
                    separator: ' to ',
                    format: 'L',
                    dateLimit: { days: 90 },
                    ranges: {
                        Today: [new Date(NEXT_DAT_IN_MS), new Date(TODAY_IN_MS)],
                        Yesterday: [new Date(NEXT_DAT_IN_MS), new Date(TODAY_IN_MS - ONE_DAYIN_MS)],
                        'Last 7 Days': [new Date(NEXT_DAT_IN_MS), new Date(NEXT_DAT_IN_MS - 7 * ONE_DAYIN_MS)],
                        'Last 28 Days': [new Date(NEXT_DAT_IN_MS), new Date(NEXT_DAT_IN_MS - 28 * ONE_DAYIN_MS)],
                        'Last 60 Days': [new Date(NEXT_DAT_IN_MS), new Date(NEXT_DAT_IN_MS - 60 * ONE_DAYIN_MS)],
                        'Last 90 Days': [new Date(NEXT_DAT_IN_MS), new Date(NEXT_DAT_IN_MS - 90 * ONE_DAYIN_MS)],
                        'Last 120 Days': [new Date(NEXT_DAT_IN_MS), new Date(NEXT_DAT_IN_MS - 120 * ONE_DAYIN_MS)],
                        'Last 180 Days': [new Date(NEXT_DAT_IN_MS), new Date(NEXT_DAT_IN_MS - 180 * ONE_DAYIN_MS)],
                        'Last 1 year': [new Date(NEXT_DAT_IN_MS), new Date(NEXT_DAT_IN_MS - 365 * ONE_DAYIN_MS)]
                    },
                    locale: {
                        applyLabel: 'Update',
                        cancelLabel: 'Clear',
                        fromLabel: 'Start date',
                        toLabel: 'End date',
                        customRangeLabel: 'Custom'
                    },
                    minDate: new Date('2022-01-01T00:00:00.000Z'),
                    alwaysShowCalendars: true
                }}
                callback={callback}
            />
        </>
    );
}

export default Calender;