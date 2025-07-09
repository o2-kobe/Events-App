export const formatFirestoreTimestamp = (timestamp: string | Date) => {
  // Check if timestamp is a Firestore Timestamp object or a string/Date
  if (typeof timestamp === "object" && "toDate" in timestamp) {
    return (timestamp as { toDate: () => Date }).toDate();
  } else {
    return new Date(timestamp as string | Date);
  }
};

export const formatDate = (date: Date) => {
  return date
    .toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "2-digit",
      year: "numeric",
    })
    .replace(/,/g, "")
    .replace(/(\w{3}) (\w{3}) (\d{2}) (\d{4})/, "$1, $2 $3 $4");
};
