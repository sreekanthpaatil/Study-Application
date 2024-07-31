import React, { useCallback, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useLocation, useNavigate } from "react-router-dom";

import { useSocket } from "../context/SocketProvider";

import peer from "../peer/Peer";

import styles from "./Room.module.css";

const Room = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const user = params.get("user");
  const role = params.get("role");

  const socket = useSocket();

  const navigate = useNavigate();

  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [usernameJoined, setUsernameJoined] = useState(null);

  const [isLocalAudioMuted, setIsLocalAudioMuted] = useState(false);
  const [isLocalVideoMuted, setIsLocalVideoMuted] = useState(false);

  const handleUserJoined = useCallback(({ username, id }) => {
    console.log(`${username} joined the room`);
    setRemoteSocketId(id);
    setUsernameJoined(username);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer, user });

    setMyStream(stream);
  }, [remoteSocketId, socket, user]);

  const handleIncomingCall = useCallback(
    async ({ from, offer, user }) => {
      setRemoteSocketId(from);
      setUsernameJoined(user);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      setMyStream(stream);
      console.log("Incoming Call", from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted");
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeedIncoming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  const handleNegotiationNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegotiationNeeded);

    return () => {
      peer.peer.removeEventListener(
        "negotiationneeded",
        handleNegotiationNeeded
      );
    };
  }, [handleNegotiationNeeded]);

  useEffect(() => {
    peer.peer.addEventListener("track", async (e) => {
      const remoteStream = e.streams;
      console.log("Got Tracks");
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  const toggleLocalAudio = () => {
    myStream.getAudioTracks().forEach((track) => {
      track.enabled = !isLocalAudioMuted;
    });
    setIsLocalAudioMuted(!isLocalAudioMuted);
  };

  const toggleLocalVideo = () => {
    myStream.getVideoTracks().forEach((track) => {
      track.enabled = !isLocalVideoMuted;
    });
    setIsLocalVideoMuted(!isLocalVideoMuted);
  };

  const endCall = () => {
    if (myStream) {
      myStream.getTracks().forEach((track) => track.stop());
    }

    // Close peer connection
    peer.peer.close();

    // Emit room:leave event
    socket.emit("room:leave", { user, socketId: socket.id });

    // Navigate to home
    navigate(`/room/review?user=${user}&role=${role}`);
  };

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incoming:call", handleIncomingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncoming);
    socket.on("peer:nego:final", handleNegoNeedFinal);
    socket.on("room:leave");
    socket.on("user:left", ({ user }) => {
      console.log(`${user} left the room`);
      setRemoteSocketId(null);
      setUsernameJoined(null);
      setRemoteStream(null);
    });

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incoming:call", handleIncomingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncoming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
      socket.off("user:left");
    };
  }, [
    socket,
    handleUserJoined,
    handleIncomingCall,
    handleCallAccepted,
    handleNegoNeedFinal,
    handleNegoNeedIncoming,
  ]);

  return (
    <div className={styles.room_page}>
      <div className={styles.room_container}>
        <h1 className={styles.room_header}>Room Page</h1>
        <h4 className={styles.room_message}>
          {remoteSocketId ? `${usernameJoined} Connected` : `${user} in room`}
        </h4>
        {myStream && (
          <button onClick={sendStreams} className={styles.btn}>
            SEND STREAM
          </button>
        )}
        {remoteSocketId && (
          <button onClick={handleCallUser} className={styles.btn}>
            CALL
          </button>
        )}
        <div className={styles.video_box}>
          {myStream && (
            <div className={styles.video_container}>
              <h1 className={styles.video_header}>{`Your Stream ${user}`}</h1>
              <ReactPlayer
                playing
                muted
                height="200px"
                width="350px"
                url={myStream}
                // className={styles.player}
              />
            </div>
          )}
          {remoteStream && (
            <div className={styles.video_container}>
              <h1
                className={styles.video_header}
              >{`Remote Stream ${usernameJoined}`}</h1>
              <ReactPlayer
                playing
                muted
                height="200px"
                width="350px"
                url={remoteStream}
                // className={styles.player}
              />
            </div>
          )}
        </div>
        <div className={styles.video_call_btns}>
          <button onClick={toggleLocalAudio} className={styles.btn}>
            {isLocalAudioMuted ? "Unmute Audio" : "Mute Audio"}
          </button>
          <button onClick={toggleLocalVideo} className={styles.btn}>
            {isLocalVideoMuted ? "Unmute Video" : "Mute Video"}
          </button>
          <button onClick={endCall} className={styles.btn}>
            End Call
          </button>
        </div>
      </div>
    </div>
  );
};

export default Room;