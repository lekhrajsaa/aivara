import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import StyledDropzone from "./Upload";
import { decomposeColor } from "@mui/material";

import PreviewMultipleImages from "./multiplefile";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const tabStyle = {
    default_tab:{
        color: '#68C222',
        width: '33.3%',
        backgroundColor: '#FFFFFF',
        fontSize: 15
    },
    active_tab:{
        color: '#395D89',
        width: '33.3%',
        backgroundColor: '#FFFFFF',
        fontSize: 15
    }
};

  return (
    <Box sx={{ width: "100%" }}>
      <div
        style={{
          marginLeft: "10%",
          marginTop: "2%",
          marginRight: "10%",
          marginBottom: "1%",
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            
            TabIndicatorProps={{style: {background:'white'}}}
           
          >
            <Tab
              label="Generate"
            
              style={{
                
                textTransform: "capitalize",
                fontWeight: "800",
                fontFamily: "Sora",
                fontSize: "110%",
                color: ' #395D89',
                marginLeft:"4%"
              }}
            />
            <Tab
              label="In review"
           
              style={{
                textTransform:"initial",
                fontWeight: "400",
                fontFamily: "Sora",
                fontSize: "110%",
                color:'#8A8A8A',
                marginLeft:"1%"
              }}
            />
            <Tab
              label="Previous reports"
            
              style={{
                textTransform:"initial",
                fontWeight: "400",
                fontFamily: "Sora",
                fontSize: "110%",
                color:'#8A8A8A',
                marginLeft:"1%"
              
              }}
            />
          </Tabs>
        </Box>
      </div>
      <TabPanel value={value} index={0}>
        <StyledDropzone />
      
      </TabPanel>
      <TabPanel value={value} index={1}></TabPanel>
      <TabPanel value={value} index={2}></TabPanel>
    </Box>
  );
}
