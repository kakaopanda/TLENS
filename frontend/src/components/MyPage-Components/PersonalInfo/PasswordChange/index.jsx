import { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import './passwordChange.scss'

const PasswordChangeModal = ({ onClose, userInfo }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);


  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function authenticatePassword() {

    // const validPassword = userInfo.password; // 유효한 비밀번호
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

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }
    // 비밀번호 변경 API 호출 등의 로직을 구현합니다.
    onClose();
  };

  const handleAuthSubmit = (event) => {
    event.preventDefault();
    authenticatePassword();
  };
  
  return (
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
        <div className="password-verification" >
          <Typography className="password-text" style={{ fontWeight: 'bold', textAlign: 'center',  fontSize: '20px' }}>비밀번호 입력하기</Typography>
        </div>
        {!isAuthed ? (
          <form onSubmit={handleAuthSubmit} className="password-form">
           <Typography className="password-text" style={{ fontWeight: 'bold', marginBottom: '5px' }}>사용중이신 비밀번호를 입력해주십시오.</Typography>
            <TextField
              className="password-fields"
              type="password"
              label="현재 비밀번호"
              value={currentPassword}
              onChange={handleCurrentPasswordChange}
              fullWidth
              required
              InputProps={{
                classes: { root: "blue-outline" },
                style: {
                  borderRadius: '50px',
                  justifyContent: 'center',
                  width: '100%',
                  height: '45px',
                }
              }}
            />
            <div className="auth-button">
              <Button onClick={authenticatePassword} className="button" type="submit" variant="contained" color="primary" sx={{ mt: 2, justifyContent: 'center', width: '160px'}}>
              인증하기
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleFormSubmit} className="password-form">
            <Typography className="password-text" style={{ fontWeight: 'bold', marginTop: '5px' }}>새 비밀번호</Typography>
            <TextField
              className="password-fields"
              type="password"
              label="새 비밀번호"
              value={password}
              onChange={handlePasswordChange}
              fullWidth
              required
              InputProps={{
                style: {
                  borderRadius: '50px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: '45px',
                }
              }}
            />
             <Typography className="password-text" style={{ fontWeight: 'bold', marginBottom: '5px', marginTop: '15px' }}>비밀번호 확인</Typography>
            <TextField
              className="password-fields"
              type="password"
              label="새 비밀번호 확인"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              fullWidth
              required
              InputProps={{
                style: {
                  borderRadius: '50px',
                  justifyContent: 'center',
                  width: '100%',
                  height: '45px',
                }
              }}
            />
            <div className="auth-button">
              <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                변경하기
              </Button>
            </div>
          </form>
        )}
      </Box>
    </Modal>
  );
};

export default PasswordChangeModal;
