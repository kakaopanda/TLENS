import { useNavigate } from "react-router-dom";
import { Box, Button, Divider } from "@mui/material";
import { ToastContainer } from "react-toastify";

// Components
import SubReportList from "../../MyPage-Components/MySubscribe/Sub-ReportList";
import "./personalDrawer.scss"

//Api
import {logout} from "../../../apis/users/"

const PersonalDrawer = ( ) => {
  const navigate = useNavigate();
  
  const Authorization = localStorage.getItem("Authorization")
  const isLoggedIn = Authorization !== null;

  // const logout = async () => {
  //   try {
  //     await authInstance.get('/users/logout');
  
  //   } catch (error) {
  //     console.log(error);
  
  
  //   }
  // };

  return (
    <div>
      <Box sx={{ width: 300 }} role="presentation">
        <ToastContainer />
        <div>
          {isLoggedIn ? (
            <h4>안녕하세요!! "강김박배문이" 님</h4>
          ) : (
            <div className="drawer-login">
              <Divider />
              <h5><span className="t-lens">T:LENS</span>의 더 많은 서비스를 원하시나요?</h5>
              <h5>지금 로그인해서 더 많은 서비스를 받아보세요</h5>
            </div>
          )}

          {isLoggedIn ?
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
                  // localStorage.removeItem("Authorization");
                  // localStorage.removeItem("refresh-token");
                  navigate("/main");
                }}
              >
                로그아웃
              </Button>
            </div> 
          : 
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
          }  
        </div>
        <Divider />
        <div>
          <Divider />
        </div>
        {isLoggedIn && <SubReportList />}
        <div>
          {isLoggedIn && (
            <Button
              style={{ fontWeight: "bold" }}
              onClick={() => navigate("/mypage")}
            >
              내가 구독한 기자의 최신기사 확인하기
            </Button>
          )}
        </div>
      </Box>
    </div>
  );
};

export default PersonalDrawer;
