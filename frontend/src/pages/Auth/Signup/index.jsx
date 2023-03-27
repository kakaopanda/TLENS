import React, {useState} from 'react'
import {Formik} from "formik";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';

import {Button, TextField, FormControl, MenuItem, Select, Typography, FormControlLabel, Checkbox} from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import "./signUp.scss"
import axios from 'axios';

const SignUp = () => {
  
  const navigate = useNavigate()

  const [selectedDate, setSelectedDate] = useState(null);
  const [isMember, setIsMember] = useState(false);

  // 생년월일 
  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log(date)
  };

  // 체크 박스
  const handleCheckboxChange = (event) => {
    setIsMember(event.target.checked);
    console.log(isMember)
  };

  const submit = async (values) => {
    const { email, username, password, sex, birthday, membership } = values;

    //signup data

    const signupData = {
      email: email,
      username: username,
      password: password,
      sex: sex,
      birthday: birthday,
      membership: membership,
    };

    try {
      const response = await axios.post("/api/signup", signupData);

      if (response.data.message === 0) {
        toast.success(
          <h3>
            회원가입이 완료되었습니다.
            <br />
            로그인 하세요😎
          </h3>,
          {
            position: "top-center",
            autoClose: 2000,
          }
        );
        setTimeout(() => {
          navigate("/auth");
        }, 2000);
      } else {
        toast.error(<h3>이미 있는 회원입니다.</h3>);
      }
    } catch (e) {
      // 서버에서 받은 에러 메시지 출력
      toast.error(e.response.data.message + "😭", {
        position: "top-center",
      });
    }
  };



  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("올바른 이메일 형식이 아닙니다!")
      .required("이메일을 입력하세요!"),
    username: Yup.string()
      .min(2, "닉네임은 최소 2글자 이상입니다!")
      .max(10, "닉네임은 최대 10글자입니다!")
      .matches(
        /^[가-힣a-zA-Z][^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]*$/,
        "닉네임에 특수문자가 포함되면 안되고 숫자로 시작하면 안됩니다!"
      )
      .required("닉네임을 입력하세요!"),
    password: Yup.string()
      .min(8, "비밀번호는 최소 8자리 이상입니다")
      .max(20, "비밀번호는 최대 20자리입니다!")
      .required("패스워드를 입력하세요!")
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[^\s]*$/,
        "알파벳, 숫자, 공백을 제외한 특수문자를 모두 포함해야 합니다!"
      ),
    password2: Yup.string()
      .oneOf([Yup.ref("password"), null], "비밀번호가 일치하지 않습니다!")
      .required("필수 입력 값입니다!"),
    sex: Yup.string()
      .required("필수 입력 값입니다!"),
  });


  return (
    <Formik
      initialValues={{
        email: "",
        username: "",
        password: "",
        password2: "",
        sex:"",
        birthday:"",
        membership:"",
      }}
      validationSchema={validationSchema}
      onSubmit={submit}
      validateOnMount={true}
    >
    {({values, handleSubmit, handleChange, errors}) => (
    <div className="signup-wrapper">
      <div className="container">
        <form 
        onSubmit={handleSubmit} autoComplete="off"
        >
          <div className="input-forms">
            <div className="input-forms-item">
              <div className="input-label">
                이메일 : 
              </div>
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
              {errors.email}
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
                  {errors.password}
                </div>
              <div className="input-forms-item">
                <div className="input-label">비밀번호 확인 : </div>
                <TextField
                  value={values.password2}
                  name="password2"
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
                  {errors.password2}
                </div>

              <div className="input-forms-item">
                <div className="input-label">닉네임 : </div>
                <TextField
                  value={values.username}
                  name="username"
                  variant="outlined"
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
                  {errors.username}
                </div>

              <div className="input-combo">
                <div className="input-label">성별 : </div>
                <FormControl>
                  <Select
                    value={values.sex}
                    name="sex"
                    label="성별"
                    variant="outlined"
                    onChange={handleChange}
                    style={{ height: '35px', width: '100%' }}
                  >
                    <MenuItem value={"male"}>남성</MenuItem>
                    <MenuItem value={"female"}>여성</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="error-message">{errors.sex}</div>
              <div className="input-datepicker">
                <div className="input-label">생년월일 : </div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={selectedDate}
                    label="생년월일을 입력해주세요"
                    onChange={handleDateChange}
                    // onChange={handleChange}
                    style={{ height: '100%' }} // 높이를 200px로 조정
                    slotProps={{
                      label: {
                          style: { fontSize: "10px"}
                      },
                      textField: {
                        helperText: 'MM / DD / YYYY',
                        style: { width: '320px' }
                      },
                    }}      
                    TextFieldProps={{
                      InputProps: {
                        style: { height: '5px' } // 높이를 auto로 설정하여 자동으로 조정하도록 합니다.
                      }
                    }}
                  />
                </LocalizationProvider>
              </div>
              

              <div className="membership-check" style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
                <FormControlLabel
                  control={<Checkbox checked={isMember} onChange={handleCheckboxChange} />}
                  label={<Typography style={{ fontWeight: "bold", marginLeft: "-5px", fontSize: "15px" }}>T:LENS 맴버쉽에 가입하시겠습니까?</Typography>}
                  labelPlacement="start"
                />
              </div>

              <div className='submit-button'>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  style={{width:'250px'}}
                >
                  회원가입
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
      )}
    </Formik>    
  )
}
export default SignUp
