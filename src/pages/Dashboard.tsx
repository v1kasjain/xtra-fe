import {
  Alert,
  Box,
  Button,
  Container,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const BASE_URL = "";

function Dashboard() {
  const [meetingId, setMeetingId] = useState("");
  const [showSnackBar, setSnackBar] = useState(false);

  const handleCreateMeeting = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/create-meeting", {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`API call failed with status ${response.status}`);
      }
      const data = await response.json();

      if (data?.meetingId) {
        setMeetingId(data.meetingId);
      }

      if (data?.userRole) {
        localStorage.setItem("userRole", data?.userRole);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleShareConf = () => {
    navigator.clipboard.writeText(`http://localhost:3000/${meetingId}`);
    setSnackBar(true);
  };

  return (
    <Container>
      <Box
        sx={{
          border: "1px solid #11212d",
          borderRadius: 10,
          padding: 10,
          marginTop: 10,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack>
            {!meetingId ? (
              <Button onClick={handleCreateMeeting} variant="outlined">
                Create New Conference
              </Button>
            ) : (
              <>
                <Button variant="outlined">
                  <Link
                    to={`http://localhost:3000/${meetingId}`}
                    style={{ textDecoration: "none" }}
                  >
                    Join conference
                  </Link>
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => handleShareConf()}
                  sx={{ marginTop: 2 }}
                >
                  Share Conferenec
                </Button>
                <Typography variant="caption" display="block" gutterBottom>
                  This action will copy conference URL
                </Typography>
              </>
            )}
          </Stack>

          <img src="/images/conference-dashboard.png" width={650} />
        </Stack>
      </Box>
      {showSnackBar && (
        <Snackbar
          open={showSnackBar}
          autoHideDuration={6000}
          onClose={() => setSnackBar(false)}
          key={"top" + "right"}
          message="Conference URL copied"
        />
      )}
    </Container>
  );
}

export default Dashboard;
