import React, { useState } from 'react';
import './Home.scss';
import Calendar from '../Calendar/Calendar';
import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;

function Home() {
    const [selectedDate, setSelectedDate] = useState(null);

    const trainsBetweenStations = (from, to, date) => {
        const options = {
            method: 'GET',
            url: 'https://irctc1.p.rapidapi.com/api/v3/trainBetweenStations',
            params: {
                fromStationCode: from,
                toStationCode: to,
                dateOfJourney: date,
            },
            headers: {
                'X-RapidAPI-Host': 'irctc1.p.rapidapi.com',
                'X-RapidAPI-Key': '',
            },
        };

        axios(options)
            .then(response => console.log(response.data))
            .catch(error => console.error(error));
    };

    function convertDateFormat(inputDate) {
        const parsedDate = new Date(inputDate);

        const year = parsedDate.getFullYear();
        const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
        const day = String(parsedDate.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    const submitForm = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const from = formData.get('from');
        const to = formData.get('to');
        alert(`You searched for '${from}' to '${to}' on ` + convertDateFormat(selectedDate));
        console.warn(`You searched for '${from}' to '${to}' on ` + convertDateFormat(selectedDate));

        trainsBetweenStations(from, to, convertDateFormat(selectedDate));
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <form onSubmit={submitForm}>
            <div className='main'>
                <input type='text' name='from' className='fromInput' placeholder='From Station Code' />
                <input type='text' name='to' className='toInput' placeholder='To Station Code' />
                <Calendar onDateChange={handleDateChange} />
                <button className='searchButton' type='submit'>
                    Search
                </button>
            </div>
        </form>
    );
}

export default Home;
