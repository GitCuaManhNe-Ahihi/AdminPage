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
} from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const dataOnceMonth = (statistical,genresId) => {
  const data = [];
  for (let i = 1; i <= 12; i++) {
    let d = 0;
    statistical.map((item) => 
      item.month === i && item.genresId == genresId ? d = item.count : 0
    );
    data.push(d);
  }
  return data;
}
const dataAllMonth = (statistical) => {
  const data = [];
  for (let i = 1; i <= 12; i++) {
    let d = 0;
   statistical.map((item) => item.month === i ? d += item.count : 0);
    data.push(d);
  }
  return data;

}
export default function Posts(props) {
    const { t } = useContext(TranslateContext);
    const {statisticalMoth} = props
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' ,
          },
          title: {
            display: true,
            text: t("post_statistics"),
          },
        },
      };
      
    const data = {
        labels,
        datasets: [
          {
            label:  t("article"),
            data: dataAllMonth(statisticalMoth),
            
            borderColor: 'rgb(255, 55, 32)',
            backgroundColor: 'rgb(255, 55, 32)',
          },
          {
              label:  t("news"),
              data: dataOnceMonth(statisticalMoth,2),
              
              borderColor:  'rgba(255, 99, 132, 0.7)',
              backgroundColor:  'rgba(255, 99, 132, 0.7)',
            },
            {
              label:t("world"),
              data: dataOnceMonth(statisticalMoth,3),
              
              borderColor: 'rgba(54, 162, 235, 0.7)',
              backgroundColor: 'rgba(54, 162, 235, 0.7)',
            },
            {
              label:  t("health"),
              data: dataOnceMonth(statisticalMoth,4),
              
              borderColor: 'rgba(255, 206, 86, 0.7)',
              backgroundColor: 'rgba(255, 206, 86, 0.7)',
            },
            {
              label:t("technology"),
              data: dataOnceMonth(statisticalMoth,5),
              
              borderColor: 'rgba(75, 192, 192, 0.7)',
              backgroundColor: 'rgba(75, 192, 192, 0.7)',
            },
            {
              label:  t("life"),
              data:dataOnceMonth(statisticalMoth,6),
              
              borderColor: 'rgba(153, 102, 255, 0.7)',
              backgroundColor: 'rgba(153, 102, 255, 0.7)',
            },
            {
              label: t("sport"),
              data: dataOnceMonth(statisticalMoth,7),
              
              borderColor: 'rgba(153, 202, 255, 0.7)',
              backgroundColor: 'rgba(153, 202, 255, 0.7)',
            },
            {
              label: t("entertainment"),
              data: dataOnceMonth(statisticalMoth,8),
              
              borderColor: 'rgba(155, 159, 64, 0.7)',
              backgroundColor: 'rgba(155, 159, 64, 0.7)',
            },
            {
              label: t("education"),
              data: dataOnceMonth(statisticalMoth,9),
              borderColor: 'rgba(235, 145, 11, 0.7)',
              backgroundColor: 'rgba(235, 145, 11, 0.7)',
            }
        ],
      };
  return (
    <Line options={options} data={data} />
  )
}
