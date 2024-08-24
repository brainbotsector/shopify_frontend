# Dashboard Analytics Application

This React-based dashboard analytics application is designed to provide insightful visualizations and key performance metrics for business sales data. The dashboard includes various charts and maps that help visualize sales trends, customer growth, geographic distribution, and customer lifetime value (CLV).

## Project Structure

*Dashboard Component* : The main container for all charts and maps, organizing the flow of the application.

*TotalSalesChart* : A line chart displaying total sales over different time intervals (daily, monthly, quarterly, yearly).

*SalesGrowth* : A line chart that tracks the sales growth rate over time, providing insights into the business's expansion.

*NewCustomersBarChart* : A bar chart representing the number of new customers acquired within a selected date range.

*GeoDistributionMap* : A map visualization that shows the geographic distribution of customers globally.

*CLVChart* : A line chart illustrating the customer lifetime value over time, essential for understanding long-term customer profitability.

## Features

*Dynamic Date Selection* : Users can select start and end dates to filter the data displayed in the charts.

*Interval-Based Data Analysis* : Users can switch between different time intervals (daily, monthly, quarterly, yearly) to view data trends in various contexts.

*API Integration* : The application fetches sales and customer data from an API, making it dynamic and up-to-date with real-time data.

*Responsive Design* : The dashboard layout is optimized for different screen sizes, ensuring a seamless user experience on both desktop and mobile devices.

## How It Works

*Data Fetching* : The application uses Axios to make API calls to fetch orders and customer data. The data is processed and then passed to the respective chart components.

*Chart Rendering* : Each chart component (e.g., TotalSalesChart, SalesGrowth) processes the data based on the selected interval or date range and uses Chart.js to render the visualizations.

*User Interaction* : Users can interact with the dashboard by selecting different intervals or date ranges, triggering the charts to update and display the relevant data.

## Installation

git clone 

npm install

Run the application:

npm start
