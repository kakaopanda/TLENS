import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2>로그인 페이지 입니다.</h2>
      <Button variant="contained">로그인</Button>
      <Button onClick={() => navigate("/signup")} variant="contained">
        회원가입
      </Button>
    </div>
  );
};

export default Login;
