export default interface Comment {
  id: string;
  eventID: string;
  userID: string;
  content: string;
  timestamp: any; // Firestore timestamp
  userName?: string; // Optional: for displaying user name
}
