export default interface Event {
  id: string;
  name?: string;
  location?: string;
  startDateTime?: Date | string;
  endDateTime?: Date | string;
  category?: string;
  description?: string;
  imgURL?: string;
}
