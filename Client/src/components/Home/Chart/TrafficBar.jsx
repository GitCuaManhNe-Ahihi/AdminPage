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

const labels = ['100', '200', '300', '400', '500'];

import { Line } from "react-chartjs-2";
export default function TrafficBar() {
  const { t } = useContext(TranslateContext);
  const data = {
    labels,
    datasets: [
      {
        label: t("traffic"),
        data: [0.17, 0.20, 0.22, 0.29, 83.44],
        borderColor: "yellow",
        backgroundColor: "yellow",
      },
    ],
  };
  return <Line style={{ borderColor: "red" }} options={options} data={data} />;
}
