import React, { useContext } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { TranslateContext } from "../../../Context/TranslateProvider";

ChartJS.register(ArcElement, Tooltip, Legend);
const convertVietoEng = (str) => {
  str = str.toLowerCase();
  switch (str) {
    case "thời sự":
      return "news";
    case "thế giới":
      return "world";
    case "sức khỏe":
      return "health";
    case "công nghệ":
      return "technology";
    case "đời sống":
      return "life";
    case "thể thao":
      return "sport";
    case "giải trí":
      return "entertainment";
    case "giáo dục":
      return "education";
  }
}
const mapColor = (str) => {
  switch (str) {
    case "news":
      return "rgba(255, 99, 132, 0.7)"
    case "world":
      return "rgba(54, 162, 235, 0.7)";
    case "health":
      return "rgba(255, 206, 86, 0.7)";
    case "technology":
      return "rgba(75, 192, 192, 0.7)";
    case "life":
      return "rgba(153, 102, 255, 0.7)";
    case "sport":
      return  "rgba(153, 202, 255, 0.7)";
    case "entertainment":
      return "rgba(155, 159, 64, 0.7)";
    case "education":
      return "rgba(235, 145, 11, 0.7)";
  }
}

export default function TypePost(props) {
  const { t } = useContext(TranslateContext);
  const statisticaldata = props.statisticalPost;
  const genresName = statisticaldata?.map((item) =>convertVietoEng(item.name))
  const labels = genresName.map((item) =>t(item));
  const datas = statisticaldata?.map((item) => item.count);
  const color = genresName?.map((item) =>mapColor(item));
  const data = {
    labels: labels,
    datasets: [
      {
        label: "# of Votes",
        data: datas,
        backgroundColor: color,
        borderColor: color.map((item) => (item+"").replace("0.7", "1")),
        borderWidth: 2,
      },
    ],
  };
  return <Pie data={data} />;
}
