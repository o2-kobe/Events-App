export default interface Event {
  id: string;
  name?: string;
  location?: string;
  startDateTime?: any;
  endDateTime?: any;
  category?: string;
  description?: string;
  imgURL?: string;
  isRecurring?: boolean;
  recurrencePattern?: string;
}
