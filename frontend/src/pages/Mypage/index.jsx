import React, {useState, useEffect} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PersonalInfo from '../../components/MyPage-Components/PersonalInfo';
import MyScrap from '../../components/MyPage-Components/MyScrap';
import MySubscribe from '../../components/MyPage-Components/MySubscribe';
import {getUserInfo} from "../../apis/api/axiosinstance";


const MyPage = () => {
  const [value, setValue] = useState(0);
  const [userInfo, setUserInfo] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const id = localStorage.getItem("userId");
        const response = await getUserInfo(id);
        console.log(response); // 유저 정보 출력
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchUserInfo();
  }, [userId]);

  function TabPanel(props) {
    const { children, value, index} = props;
    return (
      <div hidden = {value !== index} style={{width: '88%'}}>
        {<div>{children}</div >}
      </div>
    );
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{  
      backgroundColor: 'white',
      padding: 10,
      borderRadius: '15px',
      height: '90vh',
    }}>
      <Box
        sx={{ flexGrow: 1, bgcolor: 'parent', display: 'flex', height: '100%' }}
      >
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 2, borderColor: 'divider', minWidth: '12vw'}}
        >
          <Tab label="Personal Info" sx={{height: '6vh'}}/>
          <Tab label="My Scrap" sx={{height: '6vh'}}/>
          <Tab label="My Subscribe" sx={{height: '6vh'}}/>

        </Tabs>

        <TabPanel value={value} index={0} className='Test'>
          {<PersonalInfo userInfo={userInfo} />}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {<MyScrap />}
        </TabPanel>
        <TabPanel value={value} index={2}>
          {<MySubscribe />}
        </TabPanel>
      </Box>

    </div>
  );
}

export default MyPage;
