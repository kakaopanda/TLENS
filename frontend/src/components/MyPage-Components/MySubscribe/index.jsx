import { Divider } from "@mui/material"
import "./mySubscribe.scss"
import KeywordList from "./KyewordList"
import SubJournalist from "./Sub-Journalist"

const MySubscribe = () => {
  return (
    <div className="mySubscribe">
      <div className="basic-Info">
        <h2>안녕하세요! 강김문배박이 님.</h2>
        <Divider sx={{ borderBottomWidth: "3px" }} />
      </div>
      <div className="keyword-selector">
        <h2>"강김문배박이"의 T:LENS 키워드</h2>
        <KeywordList />
      </div>
      <Divider sx={{ borderBottomWidth: "3px" }} />
      <div className="subscribing-journalists">
        <SubJournalist />
      </div>

    </div>
  )
}
export default MySubscribe