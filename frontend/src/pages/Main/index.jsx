import * as React from "react";
import { useState } from "react";
import MainChart from "../../components/Main-Components/MainChart";

// MUI
import Box from "@mui/material/Box";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import Divider from "@mui/material/Divider";

// MUI Icons
import AppsIcon from "@mui/icons-material/Apps";
import HandshakeIcon from "@mui/icons-material/Handshake";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import LanguageIcon from "@mui/icons-material/Language";
import GroupsIcon from "@mui/icons-material/Groups";
import StarIcon from "@mui/icons-material/Star";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import ImportantDevicesOutlinedIcon from "@mui/icons-material/ImportantDevicesOutlined";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import SolarPowerIcon from "@mui/icons-material/SolarPower";

const Main = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <Box
        sx={{
          flexGrow: 1,
          maxWidth: { xs: "100%" },
          bgcolor: "background.paper",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          aria-label="visible arrows tabs example"
          sx={{
            [`& .${tabsClasses.scrollButtons}`]: {
              "&.Mui-disabled": { opacity: 0.3 },
            },
          }}
        >
          <Tab
            icon={<AppsIcon fontSize="large" />}
            sx={{ width: "10%" }}
            label="전체"
            value="1"
          />
          <Tab
            icon={<HandshakeIcon fontSize="large" />}
            sx={{ width: "10%" }}
            label="정치"
            value="2"
          />
          <Tab
            icon={<MonetizationOnIcon fontSize="large" />}
            sx={{ width: "10%" }}
            label="경제"
            value="3"
          />
          <Tab
            icon={<LanguageIcon fontSize="large" />}
            sx={{ width: "10%" }}
            label="국제"
            value="4"
          />
          <Tab
            icon={<GroupsIcon fontSize="large" />}
            sx={{ width: "10%" }}
            label="사회"
            value="5"
          />
          <Tab
            icon={<StarIcon fontSize="large" />}
            sx={{ width: "10%" }}
            label="문화"
            value="6"
          />
          <Tab
            icon={<AutoAwesomeOutlinedIcon fontSize="large" />}
            sx={{ width: "10%" }}
            label="연예"
            value="7"
          />
          <Tab
            icon={<EmojiEventsOutlinedIcon fontSize="large" />}
            sx={{ width: "10%" }}
            label="스포츠"
            value="8"
          />
          <Tab
            icon={<ScienceOutlinedIcon fontSize="large" />}
            sx={{ width: "10%" }}
            label="과학"
            value="9"
          />
          <Tab
            icon={<SolarPowerIcon fontSize="large" />}
            sx={{ width: "10%" }}
            label="환경"
            value="10"
          />
          <Tab
            icon={<ImportantDevicesOutlinedIcon fontSize="large" />}
            sx={{ width: "10%" }}
            label="IT"
            value="11"
          />
        </Tabs>
        <Divider />
      </Box>
      <TabPanel value={value}>
        <MainChart value={value} />
      </TabPanel>
    </TabContext>
  );
};

export default Main;
