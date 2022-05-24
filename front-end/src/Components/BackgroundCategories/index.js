import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

// import Redux stuff here
import { selectDrawerState, toggleDrawerOn, toggleDrawerOff } from '../Redux/Reducers/BackgroundImage/BackgroundImageSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function TemporaryDrawer() {
  // Redux stuff here
  const dispatch = useDispatch();
  // Our redux state here for "isDrawerOn" state
  const isDrawerOn = useSelector(selectDrawerState);

  const toggleDrawer = () => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    // change the "isDrawerOpen" state here to false
    dispatch(toggleDrawerOff());  
    console.log(isDrawerOn);
  };

  const list = () => (
    <Box
      //sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      sx={{ width: "auto" }}
      role="presentation"
      // make onClick and onKeyDown change "isDrawerOpen" to false
      // onClick={() => dispatch(toggleDrawerOff())}
      // onKeyDown={ () => dispatch(toggleDrawerOff())}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
          <Drawer
            anchor={'left'}
            open={isDrawerOn}
            transitionDuration={1000}
            onClose={() => dispatch(toggleDrawerOff())}
          >
            {list()}
          </Drawer>
    </div>
  );
}

