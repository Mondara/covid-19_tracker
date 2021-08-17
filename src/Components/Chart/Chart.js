import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { fetchDailyData } from '../../api';

import styles from './Chart.module.css';

const Charts = ({ data: { cases, deaths, recovered }, country }) => {

    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setDailyData(await fetchDailyData());
        }

        fetchData();
    }, []);

    const lineChart = (
        dailyData.length
            ? (
                <Line
                    data={{
                        labels: Object.keys(dailyData[0]),
                        datasets: [{
                            data: Object.values(dailyData[0]),
                            label: 'Infected',
                            borderColor: 'rgba(0, 0, 255, 0.5)',
                            fill: true,
                        },
                        {
                            data: Object.values(dailyData[1]),
                            label: 'Recovered',
                            borderColor: 'rgba(0, 255, 0, 0.5)',
                            fill: true,
                        }, {
                            data: Object.values(dailyData[2]),
                            label: 'Deaths',
                            borderColor: 'red',
                            backgroundColor: 'rgba(255, 0, 0, 0.5)',
                            fill: true,
                        }],
                    }}

                />
            ) : null
    );

    const barChart = (
        cases
            ? (
                <Bar
                    data={{
                        labels: ['Infected', 'Recovered', 'Deaths'],
                        datasets: [{
                            label: 'People',
                            backgroundColor: [
                                'rgba(0, 0, 255, 0.5)',
                                'rgba(0, 255, 0, 0.5)',
                                'rgba(255, 0, 0, 0.5)'
                            ],
                            data: [cases, recovered, deaths]

                        }]
                    }}
                    options={{
                        legend: { display: false },
                        title: { display: true, text: `Current state in ${country}` }
                    }}
                />
            ) : null
    )

    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}

export default Charts