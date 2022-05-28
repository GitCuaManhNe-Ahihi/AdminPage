import React, { useContext } from "react";
import { TranslateContext } from "../../../Context/TranslateProvider";
import classes from "./SelectType.module.scss";
const typeSearch = [
  {
    id: 2,
    name: "news",
  },
  {
    id: 3,
    name: "world",
  },
  {
    id: 4,
    name: "health",
  },
  {
    id: 5,
    name: "technology",
  },
  {
    id: 6,
    name: "life",
  },
  {
    id: 7,
    name: "sport",
  },
  {
    id: 8,
    name: "entertainment",
  },
  {
    id: 9,
    name:"education",
  }
];
const yearSearch = [
  {
    id: 1,
    name: 2018,
  },
  {
    id: 2,
    name: 2019,
  },
  {
    id: 3,
    name: 2020,
  },
];
export default function SelectType({ type, onChange,classstyle,setGenres,valueGenres }) {
  const { t } = useContext(TranslateContext);
  const handleOnchange = (e) =>{
    type?null:setGenres(e.target.value)
  }
  return (
    <>
      <select
        className={`${classes["form-control"]} ${classes[classstyle]}`}
        onChange={handleOnchange}
        defaultValue={valueGenres?valueGenres:0}
      >
        <option key={0} value={1}>
          {t('all')}
        </option>
        {(type ? yearSearch.sort((a, b) => b.name - a.name) : typeSearch).map(
          (item) => {
            return (
              <option key={item.id} value={item.id}>
                {t(`${item.name}`)}
              </option>
            );
          }
        )}
      </select>
    </>
  );
}
