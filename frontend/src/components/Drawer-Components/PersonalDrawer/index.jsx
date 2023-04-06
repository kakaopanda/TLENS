import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Divider } from "@mui/material";
import { ToastContainer } from "react-toastify";

// Components
import SubReportList from "../../MyPage-Components/MySubscribe/Sub-ReportList";
import "./personalDrawer.scss";

//Api
import { logout } from "../../../apis/users/";
import { getUserInfo } from "../../../apis/api/axiosinstance";

const PersonalDrawer = ({ anchor, toggleDrawer, handleNavigate }) => {
  const navigate = useNavigate();

  const Authorization = localStorage.getItem("Authorization");
  const isLoggedIn = Authorization !== null;

  const [userInfo, setUserInfo] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const id = localStorage.getItem("userId");
        const response = await getUserInfo(id);
        // 유저 정보 출력
        setUserInfo(response.data.content); // response 값을 userInfo에 설정합니다.
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserInfo();
  }, [userId]);

  // const logout = async () => {
  //   try {
  //     await authInstance.get('/users/logout');

  //   } catch (error) {
  //     console.log(error);

  //   }
  // };

  return (
    <div>
      <Box
        onClick={toggleDrawer(anchor, false)}
        sx={{ width: 300 }}
        role="presentation"
      >
        <ToastContainer />
        <div>
          {isLoggedIn ? (
            <h4>안녕하세요!! "{userInfo.nickname}" 님</h4>
          ) : (
            <div className="drawer-login">
              <Divider />
              <h5>
                <span className="t-lens">T:LENS</span>의 더 많은 서비스를
                원하시나요?
              </h5>
              <h5>지금 로그인해서 더 많은 서비스를 받아보세요</h5>
            </div>
          )}

          {isLoggedIn ? (
            <div>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                sx={{
                  width: "150px",
                  marginTop: "10px",
                  marginBottom: "20px",
                }}
                onClick={async () => {
                  await logout();
                  localStorage.removeItem("Authorization");
                  localStorage.removeItem("refresh-token");
                  localStorage.removeItem("userId");
                  navigate("/main");
                }}
              >
                로그아웃
              </Button>
            </div>
          ) : (
            <div>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                sx={{
                  width: "150px",
                  marginTop: "10px",
                  marginBottom: "20px",
                }}
                onClick={() => {
                  navigate("/auth");
                }}
              >
                로그인
              </Button>
            </div>
          )}
        </div>
        <Divider />
        <div>
          <Divider />
        </div>
        {isLoggedIn && <SubReportList key={userId} userInfo={userInfo} />}
        <Divider sx={{ marginTop: "5%" }} />
        <div>
          {isLoggedIn && (
            <Button
              style={{ fontWeight: "bold" }}
              onClick={() => navigate("/mypage")}
            >
              MyPage에서 구독 기자들을 확인하세요
            </Button>
          )}
        </div>
      </Box>
    </div>
  );
};

export default PersonalDrawer;
