import BackHandOutlined from "@mui/icons-material/BackHandOutlined";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import React from "react";
import { HostViewProps } from "types/HostView";
import { calculateWidth, getHost } from "utils/host";

function HostView({ allUsers, clientsCount, handRaised }: HostViewProps) {
  const widthPerParticipant = calculateWidth(clientsCount - 1);
  const host = getHost(allUsers);
  return (
    <Box sx={{ position: "relative", height: "100vh" }}>
      <Stack justifyContent="center" direction="row" flexWrap="wrap">
        {Object.keys(allUsers).map((user, index) => {
          if (allUsers[user]["userRole"] === "HOST") {
            return;
          }
          return (
            <Stack
              key={index}
              sx={{
                width: `calc(${widthPerParticipant}% - 2px)`,
                border: "1px solid #333",
              }}
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
      {host && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            position: "absolute",
            right: 0,
            bottom: 0,
            border: "1px solid #333",
          }}
        >
          <img
            src="/images/avatar.png"
            alt="avatar"
            style={{ width: "200px" }}
          />
          {host.userName}
        </Box>
      )}
    </Box>
  );
}

export default HostView;
