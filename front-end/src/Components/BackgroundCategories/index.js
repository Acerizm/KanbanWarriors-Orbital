import * as React from 'react';
import * as CSS from "./css.js";

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

//Import Youtube here
import YouTube from 'react-youtube';

// import Redux stuff here
// import { selectDrawerState, toggleDrawerOff, changeSpaceImage, selectSpaceImageState, changeSpaceImageId } from '../Redux/Reducers/BackgroundImage/BackgroundImageSlice';
import { useDispatch, useSelector } from 'react-redux';
import * as REDUX from "../Redux/Reducers/BackgroundImage/BackgroundImageSlice.js";

// import AJAX stuff here
import axios from "axios";

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
const rng = () => {
  return Math.floor(Math.random() * 100) + 1;
}

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
  // ----------------------- for future
  // Maybe move all this logic to the backend in the future

  // relative path for ImageKitAPI
  var path;
  let background;
  // for youtube
  const [videoId,setVideoId] = React.useState("");
  // check what is selected
  if(isSpaceSelected) {
    path = "../Categories/Space/" + updatedSpaceImageId + ".jpg";
    background = <ImageKitBackground urlEndpoint={urlEndpoint} path={path}/>
  } else if (isWildlifeSelected) { 
    let randomRng = rng();
    console.log(randomRng);
    if(randomRng <= 10) {
      path = "../Categories/Wildlife/" + updatedWildlifeImageId + ".jpg";
      background = <ImageKitBackground urlEndpoint={urlEndpoint} path={path}/>
    } else {
      // get the video from our api using Axios/AJAX
      axios.get("http://159.223.91.154:500/api/Videos/GetRandomVideoFromCategory?category=Wildlife")
        .then((response) => {
          setVideoId(response.data);
        }
      );
      background = <Youtube2Background videoId={videoId}/>
    }
  } else if (isBeachSelected) {
    path = "../Categories/Beach/" + updatedBeachImageId + ".jpg";
    background = <ImageKitBackground urlEndpoint={urlEndpoint} path={path}/>
  } else if (isCitySelected) {
    path = "../Categories/City/" + updatedCityImageId + ".jpg";
    background = <ImageKitBackground urlEndpoint={urlEndpoint} path={path}/>
  } else {
    // when the user dosn't select anything else
    //path = "../Categories/Wildlife/" + updatedWildlifeImageId + ".jpg"
    background = <Youtube2Background videoId={"udJ8GniptHU"}/>
  }

  return(
      <React.Fragment>
          {background}
      </React.Fragment>
  )
}

// this is where the imagekit component is

const ImageKitBackground = ({urlEndpoint,path}) => {
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

// this is a test feature
const Youtube2Background = ({videoId}) => {
  let videoSource = "https://www.youtube.com/embed/" + videoId +"?vq=hd1440&autoplay=1&controls=0&disablekb=1&loop=1&modestbranding=1&playsinline=1&color=white&mute=1&playlist=" + videoId +"&allowfullscreen&start=100"
  return(
    <div id="wrapperTest" style={{...CSS.wrapperTestStyle}}> 
      <iframe id="iframeTest " src={videoSource} 
        style={{...CSS.iframeStyle}}
        frameborder="0" 
        allow="fullscreen;"
      >
      </iframe>
    </div>
  )
}

// Youtube background component
// const YoutubeBackground = () => {
//   const opts = {
//     height: '100%',
//     width: '100%',  
//     playerVars: {
//       // https://developers.google.com/youtube/player_parameters
//       autoplay: 1,
//       controls: 0,
//       playsinline: 1,
//       disablekb: 1,
//       fs: 0,
//       iv_load_policy: 3,
//       loop: 1,
//       modestbranding: 1,
//       //start: 200,
//       rel: 0, 
//       mute: 1,

//     },
//   }
//   const onReady = (event) => {
//       event.target.pauseVideo();
//   }
//   return(
//     <React.Fragment>
//       {/* Pull the video ids from the database in the future */}
//       return <YouTube videoId="spxtEt6RaS4" opts={opts} onReady={(e) => onReady(e)} style={{...CSS.youtubeBackgroundStyle}} />;
//     </React.Fragment>
//   )
// }


