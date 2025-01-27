import React from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ExpenseIncome = () => {
  // Dummy data for charts
  const incomeData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Income',
        data: [5000, 6000, 7000, 8000, 7500, 8500],
        borderColor: 'green',
        backgroundColor: 'rgba(0, 128, 0, 0.1)',
        fill: true,
      }
    ]
  };

  const expenseData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Expense',
        data: [2000, 2500, 2300, 2100, 2200, 2400],
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        fill: true,
      }
    ]
  };

  const barChartData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Income vs Expense',
        data: [5000, 6000, 7000, 8000, 7500],
        backgroundColor: ['green', 'blue', 'orange', 'red', 'purple'],
      }
    ]
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Expense and Income Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Income Line Chart */}
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6">Income Over Time</Typography>
            <Line data={incomeData} />
          </Paper>
        </Grid>
        
        {/* Expense Line Chart */}
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6">Expense Over Time</Typography>
            <Line data={expenseData} />
          </Paper>
        </Grid>

        {/* Bar Chart - Income vs Expense */}
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6">Income vs Expense (Bar Chart)</Typography>
            <Bar data={barChartData} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ExpenseIncome;
