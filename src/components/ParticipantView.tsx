import { Avatar, Box, Stack, Typography } from "@mui/material";
import React from "react";
import { HostViewProps } from "types/HostView";
import { ParticipantViewProps } from "types/ParticipantView";
import { calculateWidth, getHost } from "utils/host";
import BackHandOutlinedIcon from "@mui/icons-material/BackHandOutlined";
import { deepPurple } from "@mui/material/colors";
import BackHandOutlined from "@mui/icons-material/BackHandOutlined";

function ParticipantView({ allUsers, handRaised }: ParticipantViewProps) {
  console.log("handRaised by", handRaised);
  const host = getHost(allUsers);
  console.log("host details", host);
  return (
    <Stack direction="row" alignItems='flex-start'>
      <Stack justifyContent="center">
        {Object.keys(allUsers).map((user, index) => {
          if (allUsers[user]["userRole"] === "HOST") {
            return;
          }
          console.log(user);
          return (
            <Stack
              key={index}
              sx={{ width: 200, border: "1px solid #333" }}
              alignItems="center"
            >
              <img
                src="/images/avatar.png"
                alt="avatar"
                style={{ width: "70%" }}
              />
              <Stack direction="row" alignItems="center" gap='10px'>
                <Typography variant="subtitle1">
                  {allUsers[user]["userName"]}
                </Typography>
                {handRaised === user && (
                  <Avatar sx={{ bgcolor: deepPurple[500] }}>
                    <BackHandOutlined />
                  </Avatar>
                )}
              </Stack>
            </Stack>
          );
        })}
      </Stack>
      <Stack sx={{ width: 'calc(100% - 204)', border: "1px solid #333", flexGrow: '1' }} alignItems="center">
        <img src="/images/avatar.png" alt="avatar" style={{ width: "70%" }} />
        {host?.["userName"]}
      </Stack>
    </Stack>
  );
}

export default ParticipantView;
