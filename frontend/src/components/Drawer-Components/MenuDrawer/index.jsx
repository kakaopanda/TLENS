import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//MUI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import WebhookIcon from "@mui/icons-material/Webhook";
import WorkIcon from "@mui/icons-material/Work";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import SouthAmericaIcon from "@mui/icons-material/SouthAmerica";

const MenuDrawer = ({ anchor, toggleDrawer }) => {
  const navigate = useNavigate();

  return (
    <div>
      <Box
        sx={{
          width: 250,
        }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <Button onClick={navigate("/main")}>
          <img src={process.env.PUBLIC_URL + "tlens_logo.png"} alt="" />
        </Button>
        <Divider sx={{ backgroundColor: "#0066CC", height: "3px" }} />
        <List>
          {["분야별", "지역별"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
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
          {["기업 분석", "기자 분석"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
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
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InsertChartIcon color="primary" /> : null}
                </ListItemIcon>
                <ListItemText sx={{ color: "#0066CC" }} primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );
};

export default MenuDrawer;
