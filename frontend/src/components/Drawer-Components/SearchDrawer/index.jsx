import * as React from "react";
import { useNavigate } from "react-router-dom";

//MUI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Input from "@mui/joy/Input";

const SearchDrawer = ({ anchor, toggleDrawer1 }) => {
  const navigate = useNavigate();

  const handleKeyword = (e) => {
    if (e.key === "Enter") {
      navigate(`/search/${e.target.value}`);
      toggleDrawer1(anchor, false);
      
    }
  };

  return (
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
            autoFocus={true}
            onKeyPress={handleKeyword}
          />
        </Box>
        {/* <IconButton
          size="large"
          edge="start"
          color="primary"
          sx={{ marginRight: "5%" }}
        >
          <SearchIcon />
        </IconButton> */}
      </Box>
      <br />
      <br />
    </Box>
  );
};

export default SearchDrawer;
