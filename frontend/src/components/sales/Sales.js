'use client'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'
import styles from './Sales.module.css'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const Sales = ({ data }) => {
  const labels = data.map(rep => rep.name)

  const getTotal = (deals, status) =>
    deals.filter(d => d.status === status).reduce((sum, d) => sum + d.value, 0)

  const closedWon = data.map(rep => getTotal(rep.deals, 'Closed Won'))
  const inProgress = data.map(rep => getTotal(rep.deals, 'In Progress'))
  const closedLost = data.map(rep => getTotal(rep.deals, 'Closed Lost'))

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Closed Won',
        data: closedWon,
        backgroundColor: '#22c55e',
      },
      {
        label: 'In Progress',
        data: inProgress,
        backgroundColor: '#3b82f6',
      },
      {
        label: 'Closed Lost',
        data: closedLost,
        backgroundColor: '#ef4444',
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Add this
    indexAxis: 'x',
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        ticks: {
          callback: value => `$${value}`,
        },
      },
    },
  }

  return (
    <div className={styles.wFull}>
      <h2 className={`text-2xl ${styles.mab5}`}>Sales</h2>
      <div className={`${styles.wFull} ${styles.chartContainer}`}>
        <div className='min-w-[600px] h-[300px]'>
          <Bar data={chartData} options={options} />
        </div>
      </div>
    </div>
  )
}
export default Sales