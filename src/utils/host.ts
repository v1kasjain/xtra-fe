import { ConnectedClientsProps } from "types/ConnectedClients";

interface User {
  userName: string;
  userRole: string;
}

interface Users {
  [userId: string]: User;
}

interface CalculateWidthProps {
  totalParticipant: number;
}

// Function to check if a user is a host
export function isHost(
  userId: string,
  allUsers: ConnectedClientsProps
): boolean {
  return allUsers[userId] && allUsers[userId].userRole === "HOST";
}

// Function to get the host
export function getHost(allUsers: ConnectedClientsProps) {
  for (const userId in allUsers) {
    if (
      Object.prototype.hasOwnProperty.call(allUsers, userId) &&
      allUsers[userId].userRole === "HOST"
    ) {
      return allUsers[userId];
    }
  }
  return null; // No host found
}

export function calculateWidth(totalParticipant: number) {
  let width;
  if (totalParticipant === 1) {
    width = 100;
  } else if (totalParticipant < 4) {
    width = 100 / totalParticipant;
  } else if (totalParticipant === 4) {
    width = 50;
  } else if (totalParticipant === 5 || totalParticipant === 6) {
    width = 33.33;
  } else if (totalParticipant === 7 || totalParticipant === 8) {
    width = 25;
  } else {
    // handle other cases if needed
    width = 0;
  }
  return width;
}
