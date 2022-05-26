import * as React from 'react';

// import Material UI Stuff here
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import RocketIcon from '@mui/icons-material/Rocket';
import PetsIcon from '@mui/icons-material/Pets';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import SurfingIcon from '@mui/icons-material/Surfing';
import { Typography } from '@mui/material';

// import custom css file here
import "./BackgroundCategories.css";

// Import ImageKit APIs here
import { IKImage } from 'imagekitio-react';
import { urlEndpoint } from "../../Routes/index.js";

// import Redux stuff here
// import { selectDrawerState, toggleDrawerOff, changeSpaceImage, selectSpaceImageState, changeSpaceImageId } from '../Redux/Reducers/BackgroundImage/BackgroundImageSlice';
import { useDispatch, useSelector } from 'react-redux';
import * as REDUX from "../Redux/Reducers/BackgroundImage/BackgroundImageSlice.js";

// ------------------------------------- Drawer (Material UI) Feature/Component ------------------------------------------------------------------------------------
// styling for Drawer
export const TemporaryDrawer = () => {
  // Redux stuff here
  const dispatch = useDispatch();
  // Our redux state here for "isDrawerOn" state
  const isDrawerOn = useSelector(REDUX.selectDrawerState);

  const list = () => (
    <Box
      sx={{ width: "auto", height: "10vh" }}
      role="presentation"
      // make onClick and onKeyDown change "isDrawerOpen" to false
      // onClick={() => dispatch(toggleDrawerOff())}
      onKeyDown={ () => dispatch(REDUX.toggleDrawerOff())}
    >
      <Stack direction="row" spacing={20} justifyContent="center" alignItems="center" height="100%">
        <Stack direction="column" spacing={1} justifyContent="center" alignItems="center">
          <Typography variant="button" display="block">
            Space
          </Typography>
          <IconButton aria-label="space" onClick={() => dispatch(REDUX.changeSpaceImage())}>
            <RocketIcon/>
          </IconButton>
        </Stack>
        <Stack direction="column" spacing={1} justifyContent="center" alignItems="center">
        <Typography variant="button" display="block">
            Wildlife
          </Typography>
          <IconButton aria-label="Wildlife" onClick={() => dispatch(REDUX.changeWildlifeImage())}>
            <PetsIcon/>
          </IconButton>
        </Stack>
        <Stack direction="column" spacing={1} justifyContent="center" alignItems="center">
        <Typography variant="button" display="block">
            City
          </Typography>
          <IconButton aria-label="City" onClick={()=> dispatch(REDUX.changeCityImage())}>
            <LocationCityIcon/>
          </IconButton>
        </Stack>
        <Stack direction="column" spacing={1} justifyContent="center" alignItems="center">
        <Typography variant="button" display="block">
            Beach
          </Typography>
          <IconButton aria-label="Beach" onClick={()=> dispatch(REDUX.changeBeachImage())}>
            <SurfingIcon/>
          </IconButton>
        </Stack>     
      </Stack>
    </Box>
  );

  return (
    <div>
      <Drawer
        anchor={'bottom'}
        open={isDrawerOn}
        onClose={() => dispatch(REDUX.toggleDrawerOff())}
      >
        {list()}
      </Drawer>
    </div>
  );
}

// ----------------------------------- Background Images Feature/Component ------------------------------------------------------------------------------------------

// rng component for calculating 
// const rng = () => {
//   return Math.floor(Math.random() * 5) + 1;
// }

// Imagekit API here for conditional rendering
// IKImage component refers to the component to retrieve/store images using Imagekit.io API
// link -> https://docs.imagekit.io/getting-started/quickstart-guides/react

export const BackgroundImage = () => {
  // redux stuff here
  const dispatch = useDispatch();
  // selectors here
  // observer pattern is used here
  const isSpaceSelected = useSelector(REDUX.selectSpace);
  const updatedSpaceImageId = useSelector(REDUX.updatedSpaceImageId);
  const isWildlifeSelected = useSelector(REDUX.selectWildlife);
  const updatedWildlifeImageId = useSelector(REDUX.updatedWildlifeImageId);
  const isBeachSelected = useSelector(REDUX.selectBeach);
  const updatedBeachImageId = useSelector(REDUX.updatedBeachImageId);
  const isCitySelected = useSelector(REDUX.selectCity);
  const updatedCityImageId = useSelector(REDUX.updatedCityImageId);

  // relative path for ImageKitAPI
  var path;
  // check what is selected
  if(isSpaceSelected) {
    path = "../Categories/Space/" + updatedSpaceImageId + ".jpg";
  } else if (isWildlifeSelected) {
    path = "../Categories/Wildlife/" + updatedWildlifeImageId + ".jpg";
  } else if (isBeachSelected) {
    path = "../Categories/Beach/" + updatedBeachImageId + ".jpg";
  } else if (isCitySelected) {
    path = "../Categories/City/" + updatedCityImageId + ".jpg";
    console.log(path);
  } else {
    // when the user dosn't select anything else
    path = "../Categories/Wildlife/" + updatedWildlifeImageId + ".jpg"
  }

  return(
      <React.Fragment>
          <IKImage 
              urlEndpoint={urlEndpoint}
              path={path}
              width="100%"
              height="100%"
              id="background"
              // Example API URL -> https://ik.imagekit.io/acerizm/KanbanWarriors/Categories/Space/1.jpg
          />
      </React.Fragment>
  )
}

// --------------------------- Exporting Components ---------------------------------------------
