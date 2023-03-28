import {Formik, ErrorMessage} from "formik";
import * as Yup from "yup";
import {Button, TextField, Divider} from "@mui/material";
import {useNavigate, useSearchParams} from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken } from "../../../redux/reducers/AuthReducer";


import "./login.scss";


const Login = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("올바른 이메일 형식이 아닙니다!")
      .required("이메일을 입력하세요!"),
    password: Yup.string()
      .required("패스워드를 입력하세요!")
  });
  const submit = async (values) => {
    const { email, password } = values;

    const loginData = {
      email: email,
      password: password,
    };

    //console.log(loginData);

    const { data } = await axios.post("/api/login", loginData);

    if (data.message === 0) {
      localStorage.setItem("userid", JSON.stringify(data.result[0].id));
      dispatch(setToken(data.jwt));
      const redirectUrl = searchParams.get("redirectUrl");
      toast.success(<h3>로그인 성공😎</h3>, {
        position: "top-center",
        autoClose: 2000,
      });

      // redirectUrl이 쿼리스트링으로 존재하면
      // 원래가고자 했던 페이지로 돌아가기
      setTimeout(() => {
        if (redirectUrl) {
          navigate(redirectUrl);
        } else {
          navigate("/main");
        }
      }, 2000);

      setTimeout(() => {
        navigate("/main");
      }, 2000);
    } else if (data.message === 1) {
      toast.error(<h3>로그인 실패😭</h3>, {
        position: "top-center",
        autoClose: 2000,
      });
    } else {
      // 서버에서 받은 에러 메시지 출력
      toast.error(<h3>다시 시도해주세요😭</h3>, {
        position: "top-center",
      });
    }
  };

  
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={submit}
      // 확인용
      // onSubmit={(values) => {
      //   console.log(values);
      // }}
    >
      {({values, handleSubmit, handleChange}) => (
        <div className="login-wrapper">
          <div >
            <form onSubmit={handleSubmit} autoComplete="off" className="container">
              <div className="input-forms">
                <img src="img/logo.png" alt="로고"/>
                <Divider
                  sx={{
                    border: "2px solid #0066CC"
                  }}
                />
                <div className="input-forms-item">
                  <div className="input-label">이메일 : </div>
                  <TextField
                    className="input-text"
                    value={values.email}
                    name="email"
                    variant="outlined"
                    onChange={handleChange}
                    InputProps={{
                      style: {
                        borderRadius: '50px',
                        height:'35px',
                        borderBlockColor: "#0066cc",
                      }
                    }}
                  />
                </div>
                <div className="error-message">
                  <ErrorMessage name="email"/>
                </div>
                <div className="input-forms-item">
                  <div className="input-label">비밀번호 : </div>
                  <TextField
                      sx={{
                        borderRadius: '50px',
                      }}
                      value={values.password}
                      name="password"
                      variant="outlined"
                      type="password"
                      onChange={handleChange}
                      InputProps={{
                        style: {
                          borderRadius: '50px',
                          height:'35px',
                        }
                      }}
                    />
                </div>
                <div className="error-message">
                  <ErrorMessage name="password"/>
                </div>
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  type="submit"
                  sx={{
                    borderRadius: "50px",
                    width: "150px",
                    marginTop: '20px'
                  }}
                  // onClick={navigate("/main")}
                >
                  로그인
                </Button>
              </div>
            </form>
          </div> 
        </div>
      )}
    </Formik>
  );
};

export default Login;