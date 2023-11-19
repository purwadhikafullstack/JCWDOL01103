import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const options = {
  plugins: {
    legend: {
      position: "bottom",
    },
  },
}

export const data = {
  labels,
  datasets: [
    {
      label: "Total User",
      data: [1000, 300, 500, 100, 50, 500, 700, 600, 800, 100, 950, 140],
      backgroundColor: "#2196F3",
      borderColor: "#2196F3",
    },
  ],
}

const LineChart = () => {
  return <Line options={options} data={data} />
}

export default LineChart
