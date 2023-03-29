import * as React from "react";
import "./Header.scss";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../redux/reducers/AuthReducer";

// 로그아웃 : 토큰 유효화 과정에 따라서 다르게 설정할 것
import { jwtUtils } from "../../utils/jwtUtils";

//Component
import SubReportList from "../../components/MyPage-Components/MySubscribe/Sub-ReportList";
import MenuDrawer from "../../components/Drawer-Components/MenuDrawer";
import SearchDrawer from "../../components/Drawer-Components/SearchDrawer";

//MUI
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import Drawer from "@mui/material/Drawer";
import UploadIcon from "@mui/icons-material/Upload";
import Divider from "@mui/material/Divider";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.Auth.token);
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (jwtUtils.isAuth(token)) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [token]);
  // 비동기로 처리!
  const logout = async () => {
    await dispatch(setToken(""));
    alert("로그아웃 되었습니다😎");
    navigate("/main");
  };

  const [state, setState] = useState({
    top: false,
    left: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  // TOP버튼
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleNavigate = (text) => {
    if (text === "분야별") {
      navigate("/main");
    } else if (text === "지역별") {
      navigate("/region");
    } else if (text === "언론사 분석") {
      navigate("/reporter");
    } else if (text === "기업 분석") {
      navigate("/company");
    } else {
      navigate("/statistics");
    }
  };

  const list = (anchor) => (
    <MenuDrawer
      anchor={anchor}
      toggleDrawer={toggleDrawer}
      handleNavigate={handleNavigate}
    />
  );

  const [keyword, setKeyword] = useState("");

  // 검색 키워드 상태관리
  const handleKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const toggleDrawer1 = (anchor, open) => (event) => {
    if (event.key === "Enter") {
      setState({ ...state, [anchor]: open });
      navigate(`/search/${keyword}`);
    }
  };

  const search = (anchor) => (
    <SearchDrawer
      anchor={anchor}
      toggleDrawer1={toggleDrawer1}
      handleKeyword={handleKeyword}
    />
  );

  const personalInfo = (anchor) => (
    <Box
      sx={{ width: 300 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div>
        <h4>안녕하세요!! "강김박배문이" 님</h4>
        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          sx={{
            width: "150px",
            marginTop: "10px",
            marginBottom: "10px",
          }}
          onClick={logout}
        >
          로그아웃
        </Button>
      </div>
      <Divider />
      <div>
        <h4>내가 구독한 기자</h4>
        <Divider />
      </div>
      <SubReportList />
      <div>
        <Button
          style={{ fontWeight: "bold" }}
          onClick={() => navigate("/mypage")}
        >
          내가 구독한 기자의 최신기사 확인하기 =>
        </Button>
      </div>
    </Box>
  );

  return (
    <div className="Header-main">
      <AppBar position="static" color="inherit">
        <Toolbar>
          <React.Fragment key={"left"}>
            <IconButton
              onClick={toggleDrawer("left", true)}
              size="large"
              edge="start"
              color="primary"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor={"left"}
              open={state["left"]}
              onClose={toggleDrawer("left", false)}
            >
              {list("left")}
            </Drawer>
          </React.Fragment>
          <Button
            onClick={() => {
              navigate("/main");
            }}
          >
            <img src={"/images/tlens_logo.png"} alt="" />
          </Button>
          <Box>
            <React.Fragment key={"top"}>
              <IconButton
                size="large"
                edge="start"
                color="primary"
                sx={{ marginRight: "10px" }}
                onClick={toggleDrawer("top", true)}
              >
                <SearchIcon />
              </IconButton>
              <Drawer
                anchor={"top"}
                open={state["top"]}
                onClose={toggleDrawer("top", false)}
              >
                {search("top")}
              </Drawer>
            </React.Fragment>

            <React.Fragment key={"right"}>
              <IconButton
                size="large"
                edge="start"
                color="primary"
                sx={{ marginRight: "10px" }}
                onClick={toggleDrawer("right", true)}
              >
                <PersonIcon />
              </IconButton>
              <Drawer
                anchor={"right"}
                open={state["right"]}
                onClose={toggleDrawer("right", false)}
              >
                {personalInfo("right")}
              </Drawer>
            </React.Fragment>

            {/* <IconButton
              onClick={() => {
                navigate("/auth");
              }}
              size="large"
              edge="start"
              color="primary"
            >
              <PersonIcon />
            </IconButton> */}
          </Box>
        </Toolbar>
      </AppBar>
      <div
        style={{
          position: "fixed",
          right: "3%",
          bottom: "3%",
        }}
      >
        <IconButton
          size="large"
          edge="start"
          color="primary"
          onClick={scrollToTop}
        >
          <UploadIcon fontSize="large" />
        </IconButton>
      </div>
    </div>
  );
};

export default Header;
