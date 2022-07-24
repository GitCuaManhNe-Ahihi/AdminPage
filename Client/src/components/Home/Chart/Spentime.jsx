import {
  BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title,
  Tooltip
} from 'chart.js';
import React, { useContext, useEffect } from "react";
import { Bar } from 'react-chartjs-2';
import { TranslateContext } from "../../../Context/TranslateProvider";
import { analytics, logEvent } from "../../../Service/firebase";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
    },
  },
};

const labels = ['100', '200', '300', '400', '500'];


export default function Spentime() {
  const { t } = useContext(TranslateContext);
  const data = {
    labels,
    datasets: [
      {
        label: t("usage_time"),
        data: [0.17, 0.20, 0.22, 0.29, 83.44],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };
  useEffect(()=>{
  logEvent(analytics,'page_view',{'page_location':'http://localhost:6887/'},(err,res)=>{
    if(err){
      console.log(err)
      }
      else{
        console.log(res)
      }
    })
  },[])
  return (
    <Bar options={options} data={data} />
  )
}
