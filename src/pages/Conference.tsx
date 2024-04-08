import { Box, Button, Container, Stack } from "@mui/material";
import ConferenceActions from "components/ConferenceActions";
import CountdownTimer from "components/Countdown";
import HostView from "components/HostView";
import ParticipantModal from "components/ParticipantModal";
import ParticipantView from "components/ParticipantView";
import useSocket from "hooks/useSocket";
import useUser from "hooks/useUser";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { isHost } from "utils/host";

function Conference() {
  const { id: meetingId } = useParams();
  const { userRole, setUserRole, userName, setUserName } = useUser();
  const {
    time,
    setTime,
    connectedClients,
    startTimer,
    raiseHand,
    userId,
    handRaised,
  } = useSocket(meetingId, userName, userRole);
  const [showParticipantModal, setParticipantModal] = useState(
    !(userRole === "HOST" || userRole === "PARTICIPANT")
  );

  useEffect(() => {
    setUserRole(localStorage.getItem("userRole"));
  }, [showParticipantModal]);

  const isHostView = isHost(userId, connectedClients);

  if (!userRole) {
    return (
      <ParticipantModal
        showParticipantModal={showParticipantModal}
        setParticipantModal={setParticipantModal}
        setUserRole={setUserRole}
        setUserName={setUserName}
      />
    );
  }

  const clientsCount = Object.keys(connectedClients).length;
  return (
    <Container>
      <Box p={1}>
        <Stack
          direction="column"
          justifyContent="space-between"
          sx={{ height: "92vh" }}
        >
          {isHostView ? (
            <HostView
              allUsers={connectedClients}
              clientsCount={clientsCount}
              handRaised={handRaised}
            />
          ) : (
            <ParticipantView
              allUsers={connectedClients}
              handRaised={handRaised}
            />
          )}

          <Box>
            {""}
            {time > 0 ? <CountdownTimer setTime={setTime} time={time} /> : null}
          </Box>
          <ConferenceActions
            startTimer={startTimer}
            userRole={userRole}
            raiseHand={raiseHand}
            userId={userId}
          />
        </Stack>
      </Box>
    </Container>
  );
}

export default Conference;
