import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//MUI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Input from "@mui/joy/Input";

const SearchDrawer = ({ anchor, toggleDrawer }) => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");

  // 검색 키워드 상태관리
  const handleKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const enterkey = () => {
    if (window.event.keyCode === 13) {
      toggleDrawer(anchor, false);
    }
  };

  return (
    <div>
      <Box
        sx={{
          width: "auto",
        }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <Button>
          <img src={process.env.PUBLIC_URL + "tlens_logo.png"} alt="" />
        </Button>
        <Divider sx={{ backgroundColor: "#0066CC", height: "2px" }} />
        <br />
        <Box sx={{ marginLeft: "5%", marginRight: "5%" }}>
          <Input
            placeholder="ex)삼성전자, 카카오, 네이버"
            onChange={handleKeyword}
            onKeyUp={enterkey}
          />
        </Box>
        <br />
      </Box>
    </div>
  );
};

export default SearchDrawer;
