import {Formik, ErrorMessage} from "formik";
import * as Yup from "yup";
import {Button, TextField, Divider} from "@mui/material";
import {useNavigate} from "react-router-dom";

import "./login.scss";



const Login = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("올바른 이메일 형식이 아닙니다!")
      .required("이메일을 입력하세요!"),
    password: Yup.string()
      .required("패스워드를 입력하세요!")
  });
  
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
    >
      {({values, handleSubmit, handleChange}) => (
        <div className="login-wrapper">
          <form onSubmit={handleSubmit} autoComplete="off">
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
                  width: "150px"
                }}
              >
                로그인
              </Button>
            </div>
          </form>
        </div>
      )}
    </Formik>
  );
};

export default Login;