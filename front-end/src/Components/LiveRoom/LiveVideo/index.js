import React, { useState, Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectShowVideoSectionState } from "../../Redux/Reducers/LiveRoom/LiveRoomSlice";
import { selectCurrentChannelUsers } from "../../Redux/Reducers/LiveChat/LiveChatSlice";
import ReactPlayer from "react-player";

// for PeerJS
import { Peer } from "peerjs";

// for socket.io
import { socket } from "../../SocketClient";

const VideoSection = () => {
	const showVideoSection = useSelector(selectShowVideoSectionState);
	const currentChannelUsers = useSelector(selectCurrentChannelUsers);
	const peer = new Peer(socket.id);
	if (showVideoSection) {
		// this is where we need to handle all of the video streaming here
		// 1. get/access all of the current users that has joined the channel
		// 2. This code is 0(n) and will start to lag when users are more than 25 based on discord's research p2p
		// 3. Topology used here is mesh and number of edges will be (n*(n-1))/2
		navigator.mediaDevices.getUserMedia(
			{ video: true, audio: false },
			(stream) => {
				currentChannelUsers.map((user, index) => {
					const call = peer.call(user.userId, stream);
					// call.on("stream", (remoteStream) => {
					// 	// show Stream in some <video> element
					//     // remoteStream are streams from other users
					//     // then display their stream
					// });
				});
			},
			(error) => {
				console.error("Failed to get local stream", error);
			}
		);
	}
	useEffect(() => {
		peer.on("call", (call) => {});
	}, [peer]);
	useEffect(() => {
		// runs this once
		// connect to all the other users
		if (showVideoSection) {
		}
	}, [showVideoSection, currentChannelUsers]);
	return (
		<Fragment>
			{showVideoSection ? (
				<div
					id="VideoSection"
					style={{
						height: "50%",
						width: "100%",
						gridColumn: "2 / 3",
						gridRow: "1 / 1",
						border: "2px solid red",
						alignSelf: "end",
					}}
				>
					{currentChannelUsers.map((user, index) => {})}
				</div>
			) : null}
		</Fragment>
	);
};

export default VideoSection;
