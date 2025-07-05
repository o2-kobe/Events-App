import { Timestamp } from "firebase/firestore";

export default interface Comment {
  id: string;
  eventID: string;
  userID: string;
  userName: string;
  content: string;
  timestamp: Timestamp; // Firestore timestamp
}
