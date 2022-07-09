// Custom Pop Over
// Author Name:Pratik Tiwari
// Date:05/05/2022

// Start of the component
import React from "react";
import PropTypes from "prop-types";

import { Info } from "@mui/icons-material";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";

// type LLCustomPopOverProps = { data: string };

export function LLCustomPopOver(props: any) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <IconButton
        sx={{ pr: 2 }}
        aria-label="Info"
        onClick={() => {}}
        edge="end"
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <Info />
      </IconButton>

      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>{props.data}</Typography>
      </Popover>
    </div>
  );
}

LLCustomPopOver.propTypes = {
  data: PropTypes.string.isRequired,
};

// End of the Component
