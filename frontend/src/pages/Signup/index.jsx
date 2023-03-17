import React from 'react'
import {Formik} from "formik";
import * as Yup from "yup";
import {Button, TextField, FormControl, MenuItem, Select} from "@mui/material";
import "./signUp.scss"

const SignUp = () => {

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("올바른 이메일 형식이 아닙니다!")
      .required("이메일을 입력하세요!!"),
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
      }}
      validationSchema={validationSchema}
      validateOnMount={true}
    >
    {({values, handleSubmit, handleChange, errors}) => (
    <div className="signup-wrapper">
      <div className="container">
        <div className="box1">
          <img className='logo' src="img/logo.png" alt="로고"/>
          <div>가치 중립적 정보 제공</div>
          <div>뉴스 트랜드 분석 및 시각화</div>
          <div>기사 작성 패턴 분석</div>
          {/* 빈 공간을 위해서 한 칸 비워두자 */}
          <div></div>
        </div>
        <div className="box2">
          <form 
          onSubmit={handleSubmit} autoComplete="off"
          >
            <div className="input-forms">
              <div className="input-forms-item">
                <div className="input-label">
                  이메일 : 
                </div>
                  <TextField
                    value={values.email}
                    name="email"
                    variant="outlined"
                    onChange={handleChange}
                  />
                  <div className="error-message">
                    {errors.email}
                  </div>
                </div>
                <div className="input-forms-item">
                  <div className="input-label">비밀번호</div>
                  <TextField
                    sx={{
                      borderRadius: '50px',
                    }}
                    value={values.password}
                    name="password"
                    variant="outlined"
                    type="password"
                    onChange={handleChange}
                  />
                  <div className="error-message">
                    {errors.password}
                  </div>
                </div>
                <div className="input-forms-item">
                  <div className="input-label">비밀번호 확인</div>
                  <TextField
                    value={values.password2}
                    name="password2"
                    variant="outlined"
                    type="password"
                    onChange={handleChange}
                  />
                  <div className="error-message">
                    {errors.password2}
                  </div>
                </div>
                <div className="input-forms-item">
                  <div className="input-label">닉네임</div>
                  <TextField
                    value={values.username}
                    name="username"
                    variant="outlined"
                    onChange={handleChange}
                  />
                  <div className="error-message">
                    {errors.username}
                  </div>
                </div>
                <div className="input-forms-item">
                  <div className="input-label">성별을 입력해주세요</div>
                  <FormControl>
                    <Select
                      value={values.sex}
                      name="sex"
                      label="sex"
                      variant="outlined"
                      onChange={handleChange}
                    >
                      <MenuItem value={"male"}>남성</MenuItem>
                      <MenuItem value={"female"}>여성</MenuItem>
                    </Select>
                  </FormControl>
                  <div className="error-message">{errors.sex}</div>
                </div>
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  type="submit"
                >
                  회원가입
                </Button>
                <div>당신을 위한 가장 담백한 뉴스 트렌드 분석 서비스</div> 
              </div>
            </form>
          </div>
        </div>
      </div>
      )}
    </Formik>    
  )
}
export default SignUp
