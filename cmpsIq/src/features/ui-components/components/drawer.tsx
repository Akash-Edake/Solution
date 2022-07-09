// // Name : Drawer Component
// // Author : Tejas Sawant.
// // Date: 05/05/2022
// //START OF Drawer Component

import React from "react";
import PropTypes from "prop-types";

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  Box,
  IconButton,
  Icon,
} from "@mui/material";

import InboxIcon from "@mui/icons-material/Inbox";
// import MailIcon from "@mui/icons-material/Mail";
// import Divider from "@mui/material/Divider";

type Anchor = "top" | "left" | "bottom" | "right";

// type LLDrawerProps = {
//   actions: any;
//   direction: Anchor;
//   DrawerList: [];
//   DrawerItemFunc: Function;
// };

export function LLDrawer(props: any) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {props.DrawerList.map((text, index) => (
          <ListItem
            button
            key={index}
            onClick={() => {
              alert(text);
            }}
            {...props}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <IconButton size="small" onClick={toggleDrawer(props.direction, true)}>
        <Icon fontSize="small">{props?.actions}</Icon>
      </IconButton>
      <div>
        {(["left", "right", "top", "bottom"] as const).map((anchor) => (
          <React.Fragment key={anchor}>
            {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
              {...props}
            >
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>
    </>
  );
}

LLDrawer.propTypes = {
  actions: PropTypes.any.isRequired,
  direction: PropTypes.oneOf(["right", "left", "top", "bottom"]).isRequired,
};

//END of Drawer Component.
