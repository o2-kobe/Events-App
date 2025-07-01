import { Timestamp } from "firebase/firestore";

export default interface Comment {
  id: string;
  eventID: string;
  userID: string;
  content: string;
  timestamp: Timestamp; // Firestore timestamp
  userName?: string; // Optional: for displaying user name
}
