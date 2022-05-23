import { Desktop } from "../ResponsiveComponent/MediaQuery.js";
import { Tablet } from "../ResponsiveComponent/MediaQuery.js";
import  NavBar  from "../NavBar";
import * as CSS from "./css.js";
import { IKImage } from 'imagekitio-react';
import {urlEndpoint} from "../../Routes/index.js";
import Draggable from 'react-draggable'; 
import React from "react";

// import custom css file here
// React dosnt play nice with .css files
import "./HomePage.css";

// 1. Can use either functional ES6 style or Component OOP style.
// Stateless -> use functional
// Stateful -> use OOP Classes

// IKImage component refers to the component to retrieve/store images using Imagekit.io API
// link -> https://docs.imagekit.io/getting-started/quickstart-guides/react

class HomePage extends React.Component  {
    render() {
        return (
            <div id="Home" style={{...CSS.homeStyle}}>
                <Desktop>
                    <div id="HomeDesktopContainer" style={{...CSS.homeDesktopContainerStyle}}>
                        {/* Peek the definition of IKIMage to see which properties it supports */}
                        <IKImage 
                            urlEndpoint={urlEndpoint}
                            path="../Categories/Space/5.jpg"
                            width="100%"
                            height="100%"
                            id="background"
                            //https://ik.imagekit.io/acerizm/KanbanWarriors/Categories/Space/1.jpg
                        />
                        <Draggable
                            axis="both"
                            handle=".handle"
                            //defaultPosition={{x: 90, y: 0}}
                            position={null}
                            defaultClassName="draggableNavBar"
                            //grid={[25, 25]}
                            scale={1}
                            onStart={this.handleStart}
                            onDrag={this.handleDrag}
                            onStop={this.handleStop}>
                            <div>
                                <NavBar></NavBar>
                            </div>
                        </Draggable>
                    </div>
                </Desktop>
                <Tablet></Tablet>
            </div>
        )
    }
    
}

export default HomePage;