import AddchartOutlinedIcon from "@mui/icons-material/AddchartOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { Route, Routes, useNavigate,useParams } from "react-router-dom";
// import {LlMiniVarierntDrawer} from "@features/ui-components";
import {LlMiniVarierntDrawer,SwipeCompatibleDrawer} from "@features/ui-components";
import {AddLeasePage} from "@pages/add-lease-page";
import {SearchLeasePage} from "@pages/search-lease-page";
import "../assets/css/style.css";
import { EditCompstackPage } from "@pages/edit-compstack-page";
import { Grid, SwipeableDrawer } from "@mui/material";
import {useMediaQuery} from 'react-responsive';
const drawerWidth = 240;
const menus = [
  {
    title: "Search Lease",
    icon: <SearchIcon />,
    link: "/researchIQ",
    isLastMenu: false,
  },
  {
    title: "Add Lease",
    icon: <AddchartOutlinedIcon />,
    link: "/researchIQ/addlease",
    isLastMenu: true,
  },
  // {
  //   title: "Survays",
  //   icon: <FeedbackOutlinedIcon />,
  //   link: "survays",
  //   isLastMenu: true,
  // },
  // {
  //   title: "Reports",
  //   icon: <BarChartOutlinedIcon />,
  //   link: "reports",
  //   isLastMenu: true,
  // },
  // { title: "Maps", icon: <MapOutlinedIcon />, link: "maps", isLastMenu: true },
  
];

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Layout = () => {
  const navigate = useNavigate();

  const handleMenuClick = (link) => {
    navigate(link);
  };
  const isBigScreen = useMediaQuery({query: '(min-width: 768px)'});
  return (
    <>
    {/* <Grid container spacing={2}>
        <Grid item xs={12} >
       
            <Box
              sx={{
                p: 2,
              
                display: 'grid',
                gridTemplateColumns: { md: '1fr' },
                gap: 2,
              }}
            >
              <DrawerHeader />
          <Routes>
            <Route path="/researchIQ/addlease/:id" element={<AddLeasePage />} />
            <Route path="/researchIQ/addlease" element={<AddLeasePage />} />
            <Route path="/researchIQ" element={<SearchLeasePage />} />
            <Route path="/researchIQ/compstack" element={<EditCompstackPage />} />
          </Routes>
            </Box>
         
        </Grid>
    </Grid> */}
    
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        
        {isBigScreen?
        <LlMiniVarierntDrawer
          menus={menus}
          menuClickHandler={handleMenuClick}
        />:<SwipeCompatibleDrawer sides={['left']}  menus={menus}
        menuClickHandler={handleMenuClick}/>}

        <Box component="main" className="bodybg" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Routes>
            <Route path="/researchIQ/addlease/:id" element={<AddLeasePage />} />
            <Route path="/researchIQ/addlease" element={<AddLeasePage />} />
            <Route path="/researchIQ" element={<SearchLeasePage />} />
            <Route path="/researchIQ/compstack" element={<EditCompstackPage />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
};
export  {Layout};
