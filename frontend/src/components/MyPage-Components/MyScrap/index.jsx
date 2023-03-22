import { Divider } from "@mui/material"
import "./myScrap.scss"

import DonutChart from "./DonutChart"
import ArticleScrap from "./ArticleScrap"

const MyScrap = () => {
  return (
    <div className="myscrap">
      <div className="basic-Info">
        <h2>안녕하세요! 강김문배박이 님.</h2>
        <Divider />
      </div>
      <div className="scrap-chart">
        <h2>"강김문배박이"의 스크랩 현황</h2>
        <DonutChart />
      </div>
      <div className="scrap-article">
        <ArticleScrap />
      </div>
    <Divider />


    </div>
  )
}
export default MyScrap