import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CLVChart from "./CLVChart";
import "./Dashboard.css";
import GeoDistributionMap from "./GeoMap";
import NewCustomersBarChart from "./NewCustomers";
import SalesGrowth from "./SalesGrowth";
import TotalSalesChart from "./TotalSalesChart";

const Dashboard = () => {
  const [totalSalesInterval, setTotalSalesInterval] = useState("monthly");
  const [salesGrowthInterval, setSalesGrowthInterval] = useState("monthly");
  const [startDate, setStartDate] = useState(new Date("2000-08-01"));
  const [endDate, setEndDate] = useState(new Date("2024-08-31"));

  
  const clvData = {
    totalSpent: 5515284.5,
    customerCount: 1000,
    cohortMonth: "2024-08",
    averageCLV: 5515.2845,
  };

  return (
    <div className="dashboard-container">
      <div className="chart-section">
        <h2>Total Sales</h2>
        <p>
          This chart displays the total sales data over different time
          intervals.
        </p>
        <div className="button-group">
          <button onClick={() => setTotalSalesInterval("daily")}>Daily</button>
          <button onClick={() => setTotalSalesInterval("monthly")}>
            Monthly
          </button>
          <button onClick={() => setTotalSalesInterval("quarterly")}>
            Quarterly
          </button>
          <button onClick={() => setTotalSalesInterval("yearly")}>
            Yearly
          </button>
        </div>
        <TotalSalesChart interval={totalSalesInterval} />
      </div>

      <div className="chart-section">
        <h2>Sales Growth</h2>
        <p>Analyze how sales have grown over different periods.</p>
        <div className="button-group">
          <button onClick={() => setSalesGrowthInterval("daily")}>Daily</button>
          <button onClick={() => setSalesGrowthInterval("monthly")}>
            Monthly
          </button>
          <button onClick={() => setSalesGrowthInterval("quarterly")}>
            Quarterly
          </button>
          <button onClick={() => setSalesGrowthInterval("yearly")}>
            Yearly
          </button>
        </div>
        <SalesGrowth interval={salesGrowthInterval} />
      </div>

      <div className="chart-section">
        <h2>New Customers Added Over Time</h2>
        <p>
          This chart shows the number of new customers added between the
          selected dates.
        </p>
        <div className="date-picker-group">
          <label>Start Date:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
          <label>End Date:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
          />
        </div>
        <NewCustomersBarChart startDate={startDate} endDate={endDate} />
      </div>

      <div className="map-section">
        <h2>Customer Geo Distribution</h2>
        <p>Visualize where your customers are located around the globe.</p>
        <GeoDistributionMap />
      </div>

      <div className="map-section">
        <h2>Customer Lifetime Value Over Time</h2>
        <p>
          This chart estimates the total value a customer brings over their
          entire relationship with the business.
        </p>
        <div className="clv-data">
          <p>
            <strong>Cohort Month:</strong> {clvData.cohortMonth}
          </p>
          <p>
            <strong>Customer Count:</strong> {clvData.customerCount}
          </p>
          <p>
            <strong>Total Spent:</strong> ${clvData.totalSpent.toLocaleString()}
          </p>
          <p>
            <strong>Average CLV:</strong> ${clvData.averageCLV.toFixed(2)}
          </p>
        </div>
        <CLVChart data={clvData} />
      </div>
    </div>
  );
};

export default Dashboard;
