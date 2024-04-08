export type ConferenceActionsProps = {
  startTimer: (seconds: number) => void;
  userRole: string;
  raiseHand: (userId: string) => void;
  userId: string;
};
