import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const SalesGrowthRateChart = ({ interval }) => {
  const [growthData, setGrowthData] = useState({
    labels: [],
    datasets: [{
      label: 'Sales Growth Rate (%)',
      data: [],
      borderColor: 'rgba(255,99,132,1)',
      backgroundColor: 'rgba(255,99,132,0.2)',
    }]
  });

  const chartRef = useRef(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/orders`)
      .then(response => {
        const orders = response.data;
        const processedData = processGrowthRateData(orders, interval);
        setGrowthData(processedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

    const chartInstance = chartRef.current?.chartInstance;

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [interval]);

  const processGrowthRateData = (orders, interval) => {
    const sales = {};
    orders.forEach(order => {
      const totalPrice = parseFloat(order.total_price_set.shop_money.amount);
      const date = new Date(order.created_at);
      let key;

      switch (interval) {
        case 'daily':
          key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
          break;
        case 'monthly':
          key = `${date.getFullYear()}-${date.getMonth() + 1}`;
          break;
        case 'quarterly':
          key = `${date.getFullYear()}-Q${Math.floor(date.getMonth() / 3) + 1}`;
          break;
        case 'yearly':
          key = `${date.getFullYear()}`;
          break;
        default:
          key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      }

      if (!sales[key]) {
        sales[key] = 0;
      }
      sales[key] += totalPrice;
    });

    const labels = Object.keys(sales);
    const data = [];
    for (let i = 1; i < labels.length; i++) {
      const currentSales = sales[labels[i]];
      const previousSales = sales[labels[i - 1]];
      const growthRate = ((currentSales - previousSales) / previousSales) * 100;
      data.push(growthRate);
    }

    return {
      labels: labels.slice(1), 
      datasets: [{
        label: 'Sales Growth Rate (%)',
        data,
        borderColor: 'rgba(255,99,132,1)',
        backgroundColor: 'rgba(255,99,132,0.2)',
      }]
    };
  };

  return (
    <div>
      <h2>Sales Growth Rate Over Time ({interval})</h2>
      <Line
        ref={chartRef}
        data={growthData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `${context.raw.toFixed(2)}%`;
                }
              }
            }
          }
        }}
      />
    </div>
  );
};

export default SalesGrowthRateChart;
