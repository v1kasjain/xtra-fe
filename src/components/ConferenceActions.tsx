import { Avatar, Box, Button, IconButton, Stack } from "@mui/material";
import React from "react";
import { ConferenceActionsProps } from "types/ConferenceActions";
import BackHandOutlinedIcon from "@mui/icons-material/BackHandOutlined";
import CallEndOutlinedIcon from "@mui/icons-material/CallEndOutlined";
import MicOffOutlinedIcon from "@mui/icons-material/MicOffOutlined";
import VideocamOffOutlinedIcon from "@mui/icons-material/VideocamOffOutlined";

function ConferenceActions({
  startTimer,
  userRole,
  raiseHand,
  userId,
}: ConferenceActionsProps) {
  return (
    <Box>
      <Stack
        direction="row"
        spacing={1}
        justifyContent="space-around"
        alignItems="center"
      >
        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          alignItems="center"
        >
          <Avatar>
            <VideocamOffOutlinedIcon />
          </Avatar>
          <Avatar>
            <MicOffOutlinedIcon />
          </Avatar>
          <Avatar>
            <CallEndOutlinedIcon />
          </Avatar>

          {userRole === "PARTICIPANT" && (
            <IconButton onClick={() => raiseHand(userId)}>
              <Avatar>
                <BackHandOutlinedIcon />
              </Avatar>
            </IconButton>
          )}
        </Stack>
        {userRole === "HOST" ? (
          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            alignItems="center"
          >
            <Box>Start Countdown for</Box>
            <IconButton onClick={() => startTimer(15)} color="info">
              <Avatar> 15s</Avatar>
            </IconButton>
            <IconButton onClick={() => startTimer(30)}>
              <Avatar>30s</Avatar>
            </IconButton>
            <IconButton onClick={() => startTimer(45)}>
              <Avatar>45s</Avatar>
            </IconButton>
            <IconButton onClick={() => startTimer(60)}>
              <Avatar>60s</Avatar>
            </IconButton>
          </Stack>
        ) : null}
      </Stack>
    </Box>
  );
}

export default ConferenceActions;
