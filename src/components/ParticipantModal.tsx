import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useParams } from "react-router-dom";

type ParticipantModalProps = {
  showParticipantModal: boolean;
  setParticipantModal: React.Dispatch<React.SetStateAction<boolean>>;
  setUserRole: React.Dispatch<React.SetStateAction<string | null>>;
  setUserName: React.Dispatch<React.SetStateAction<string | "xtra-user">>;
};
export default function ParticipantModal({
  showParticipantModal,
  setParticipantModal,
  setUserRole,
  setUserName,
}: ParticipantModalProps) {
  const { id: meetingId } = useParams();

  const createParticipant = async (participantName: string) => {
    try {
      const response = await fetch("http://localhost:5000/create-participant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ participantName, meetingId }),
      });
      if (!response.ok) {
        throw new Error(`API call failed with status ${response.status}`);
      }
      const data = await response.json();

      if (data?.userRole) {
        localStorage.setItem("userRole", data?.userRole);
        localStorage.setItem("userName", participantName);
        setUserRole(data?.userRole);
        setUserName(participantName);
      }
      console.log("Signup successful!");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClose = () => {
    setParticipantModal(false);
  };

  return (
    <>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog
        open={showParticipantModal}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const participantName = formJson.participantName;
            createParticipant(participantName);
            //handleClose();
          },
        }}
      >
        <DialogTitle>Join Conference</DialogTitle>

        <DialogContent>
          <DialogContentText>
            To join this conference as participant, please enter your name here.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="participantName"
            label="Your Name"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit">Join</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
