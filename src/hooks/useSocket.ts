import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { ConnectedClientsProps } from "types/ConnectedClients";

const socket = io("http://localhost:5000");

function useSocket(
  meetingId: string | undefined,
  userName: string | undefined,
  userRole: string | null
) {
  const [time, setTime] = useState(0);
  const [userId, setUserId] = useState("");
  const [handRaised, setHandRaised] = useState("");
  const [connectedClients, setConnectedClients] =
    useState<ConnectedClientsProps>({});

  useEffect(() => {
    if (!meetingId || !userName || !userRole) return;

    socket.emit("join_room", meetingId, userName, userRole);

    socket.on("timer_started", (seconds) => {
      setTime(seconds);
    });

    socket.on("connected_clients", (clients) => {
      setConnectedClients(clients);
    });

    //hand_raised
    socket.on("hand_raised", (userId) => {
      setHandRaised(userId);
    });

    socket.on("user_id", (userId) => {
      setUserId(userId);
    });

    return () => {
      socket.off("timer_started");
      socket.off("connected_clients");
      socket.off("hand_raised");
    };
  }, [meetingId, userName, userRole]);

  const startTimer = (seconds: number) => {
    if (!meetingId) return;
    socket.emit("start_timer", { meetingId, seconds });
  };

  const raiseHand = (userId: string) => {
    if (!meetingId) return;
    socket.emit("raise_hand", { meetingId, userId });
  };

  return {
    time,
    setTime,
    connectedClients,
    startTimer,
    raiseHand,
    userId,
    handRaised,
  };
}

export default useSocket;
