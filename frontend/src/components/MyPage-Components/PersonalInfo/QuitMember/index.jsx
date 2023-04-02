import React, {useState} from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import './quitMember.scss'

const QuitMember = ({ onClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);
  const [inputText, setInputText] = useState('');

  function authenticatePassword() {
    const validPassword = "password123"; // 유효한 비밀번호
    if (currentPassword === validPassword) {
      setIsAuthed(true);
    } else {
      alert("비밀번호가 일치하지 않습니다.");
      setCurrentPassword("");
    }
  }
  const handleCurrentPasswordChange = (event) => {
    setCurrentPassword(event.target.value);
  };

  const handleAuthSubmit = (event) => {
    event.preventDefault();
    authenticatePassword();
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (inputText === '저는 다시 한번 트렌즈의 서비스를 이용하겠습니다') {
      // 탈퇴 처리 로직
      alert('탈퇴되었습니다.');
      onClose(); // 모달 닫기
    } else {
      alert('올바른 문구를 입력해주세요.');
    }
    setInputText('');
  }

  return(
    <Modal open={true} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          width: '30vw',
        }}
      >
        <div className="quit-verification" >
          <Typography className="quit-text" style={{ fontWeight: 'bold', textAlign: 'center',  fontSize: '20px' }}>회원 탈퇴하기</Typography>
        </div>
        {!isAuthed ? (
          <form onSubmit={handleAuthSubmit} className="password-form">
            <Typography className="password-text" style={{ fontWeight: 'bold', marginBottom: '5px', marginTop: '5px' }}>
              회원탈퇴를 위해서 비밀번호를 인증해주십시오.
            </Typography>
            <TextField
              className="password-fields"
              type="password"
              label="현재 비밀번호"
              value={currentPassword}
              onChange={handleCurrentPasswordChange}
              fullWidth
              required
              InputProps={{
                style: {
                  borderRadius: '50px',
                  justifyContent: 'center',
                  height: '50px',
                }
              }}
            />
            <div className="auth-button">
              <Button onClick={authenticatePassword} className="button" type="submit" variant="contained" color="primary" sx={{ mt: 5, justifyContent: 'center', width: '160px'}}>
                인증하기
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <Typography className="password-text" style={{ fontWeight: 'bold', marginBottom: '5px', marginTop: '5px' }}>
              매크로 방지를 위해서 아래 문구를 입력해주세요
            </Typography>
            <Typography className="password-text" style={{ fontWeight: 'bold', marginBottom: '5px', marginTop: '5px', color: '#0066cc' }}>
              저는 다시 한번 트렌즈의 서비스를 이용하겠습니다
            </Typography>
            <TextField
              placeholder="저는 다시 한번 트렌즈의 서비스를 이용하겠습니다"
              type="text" 
              value={inputText} 
              onChange={handleInputChange}
              fullWidth
              InputProps={{
                classes: { root: "blue-outline" },
                style: {
                  borderRadius: '50px',
                  justifyContent: 'center',
                  height: '50px',
                }
              }}
            />
            <div className="auth-button">
              <Button onClick={authenticatePassword} className="button" type="submit" variant="contained" color="primary" sx={{ mt: 5, justifyContent: 'center', width: '160px'}}>
                탈퇴하기
              </Button>
            </div>
          </form>
        )}
      </Box>
    </Modal>
  )
}

export default QuitMember