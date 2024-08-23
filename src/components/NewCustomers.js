import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const NewCustomersBarChart = ({ startDate, endDate }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'New Customers',
      data: [],
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 1,
    }]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formattedStartDate = startDate.toISOString().split('T')[0];
        const formattedEndDate = endDate.toISOString().split('T')[0];

        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/customers/new-customers-over-time`, {
          params: {
            startDate: formattedStartDate,
            endDate: formattedEndDate
          }
        });
        
        const data = response.data;
        
        const labels = data.map(entry => `${entry._id.year}-${String(entry._id.month).padStart(2, '0')}-${String(entry._id.day).padStart(2, '0')}`);
        const counts = data.map(entry => entry.count);

        setChartData({
          labels,
          datasets: [{
            label: 'New Customers',
            data: counts,
            backgroundColor: 'rgba(75,192,192,0.2)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
          }]
        });
      } catch (error) {
        console.error('Error fetching new customers data:', error);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  return (
    <div>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `Count: ${context.raw}`;
                }
              }
            }
          },
          scales: {
            x: {
              beginAtZero: true
            },
            y: {
              beginAtZero: true
            }
          }
        }}
      />
    </div>
  );
};

export default NewCustomersBarChart;
