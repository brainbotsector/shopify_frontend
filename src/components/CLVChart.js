import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const CLVChart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClvData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/clv/cohorts`);
                setData(response.data);
            } catch (err) {
                setError('Error fetching CLV data');
                console.error('Error fetching CLV data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchClvData();
    }, []);

    if (loading) {
        return <p>Loading data...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    const chartData = {
        labels: data.map(item => item.cohortMonth),
        datasets: [
            {
                label: 'Customer Lifetime Value',
                data: data.map(item => item.averageCLV),
                borderColor: '#42A5F5',
                backgroundColor: 'rgba(66, 165, 245, 0.2)',
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        return `CLV: $${context.raw}`;
                    },
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Cohort Month',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Average CLV',
                },
                ticks: {
                    callback: (value) => `$${value}`,
                },
            },
        },
    };

    return (
        <div>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default CLVChart;
