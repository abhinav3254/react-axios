import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// rfce shortcut for creating boilerplate

function Calendar({ onDateChange }) {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        onDateChange(date);
    };

    return (
        <div className='calendar'>
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select a date"
            />
        </div>
    );
}

export default Calendar;
