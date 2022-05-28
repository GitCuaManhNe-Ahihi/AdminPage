import React, { useContext } from "react";
import { TranslateContext } from "../../../Context/TranslateProvider";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
    },
  },
};

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
];

import { Line } from "react-chartjs-2";
export default function TrafficBar() {
  const { t } = useContext(TranslateContext);
  const data = {
    labels,
    datasets: [
      {
        label: t("traffic"),
        data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 100],
        borderColor: "yellow",
        backgroundColor: "yellow",
      },
    ],
  };
  return <Line style={{ borderColor: "red" }} options={options} data={data} />;
}
