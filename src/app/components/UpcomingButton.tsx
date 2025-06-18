export default function UpcomingButton() {
  const handleClick = () => {
    const upcomingSection = document.getElementById("upcoming-events");
    if (upcomingSection) {
      upcomingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-white px-3 cursor-pointer py-3 rounded-2xl text-sm text-black mt-2 hover:bg-gray-200 transition-colors duration-300"
    >
      Upcoming Events
    </button>
  );
}
