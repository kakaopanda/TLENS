import * as React from "react";
import "./Header.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Input from "@mui/joy/Input";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import WebhookIcon from "@mui/icons-material/Webhook";
import WorkIcon from "@mui/icons-material/Work";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import SouthAmericaIcon from "@mui/icons-material/SouthAmerica";

const Header = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    top: false,
    left: false,
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
      navigate("/");
    } else if (text === "지역별") {
      navigate("/region");
    } else if (text === "언론사 분석") {
      navigate("/repoter");
    } else if (text === "기업 분석") {
      navigate("/company");
    } else {
      navigate("/");
    }
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem>
          <ListItemButton
            onClick={() => {
              navigate("/");
            }}
          >
            <img src={process.env.PUBLIC_URL + "tlens_logo.png"} alt="" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider sx={{ backgroundColor: "#0066CC", height: "3px" }} />
      <List>
        {["분야별", "지역별"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              onClick={() => {
                handleNavigate(text);
              }}
            >
              <ListItemIcon>
                {index % 2 === 0 ? (
                  <TextFieldsIcon color="primary" />
                ) : (
                  <SouthAmericaIcon color="primary" />
                )}
              </ListItemIcon>
              <ListItemText sx={{ color: "#0066CC" }} primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["기업 분석", "언론사 분석"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              onClick={() => {
                handleNavigate(text);
              }}
            >
              <ListItemIcon>
                {index % 2 === 0 ? (
                  <WebhookIcon color="primary" />
                ) : (
                  <WorkIcon color="primary" />
                )}
              </ListItemIcon>
              <ListItemText sx={{ color: "#0066CC" }} primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider />
      </List>
      <List>
        {["통계자료"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              onClick={() => {
                handleNavigate(text);
              }}
            >
              <ListItemIcon>
                {index % 2 === 0 ? <InsertChartIcon color="primary" /> : null}
              </ListItemIcon>
              <ListItemText sx={{ color: "#0066CC" }} primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const [keyword, setKeyword] = useState("");

  // 검색 키워드 상태관리
  const handleKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const toggleDrawer1 = (anchor, open) => (event) => {
    if (event.key === "Enter") {
      setState({ ...state, [anchor]: open });
      navigate("/search", { state: keyword });
    }
  };

  const search = (anchor) => (
    <Box sx={{ width: "auto" }} role="presentation">
      <br />
      <br />
      <Button>키워드1</Button>
      <Button>키워드2</Button>
      <Button>키워드3</Button>
      <Button>키워드4</Button>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "70%" }}>
          <Input
            sx={{ marginLeft: "10%", marginRight: "1%" }}
            color="primary"
            variant="outlined"
            placeholder="ex)삼성전자, 카카오, 네이버"
            onChange={handleKeyword}
            onKeyUp={toggleDrawer1(anchor, false)}
          />
        </Box>
        <IconButton
          size="large"
          edge="start"
          color="primary"
          sx={{ marginRight: "5%" }}
        >
          <SearchIcon />
        </IconButton>
      </Box>
      <br />
      <br />
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
              navigate("/");
            }}
          >
            <img src={process.env.PUBLIC_URL + "tlens_logo.png"} alt="" />
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
            <IconButton size="large" edge="start" color="primary">
              <PersonIcon />
            </IconButton>
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
