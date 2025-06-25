import CardContainer from "./CardContainer";
import Description from "./Description";
import DescriptionContainer from "./DescriptionContainer";
import Header from "./Header";
import SvgIcon from "./SvgIcon";

function AboutComponent() {
  return (
    <div
      className="relative flex h-[100%] w-[80%] mx-auto min-h-screen flex-col bg-white justify-between group/design-root overflow-x-hidden"
      style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
    >
      <div>
        <div className="flex items-center bg-white p-4 pb-2 justify-between">
          <h2 className="text-[#121416] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pl-12 pr-12">
            About
          </h2>
        </div>
        <h3 className="text-[#121416] tracking-light text-2xl font-bold leading-tight px-4 text-left pb-2 pt-5">
          Welcome to CampusConnect
        </h3>
        <p className="text-[#121416] text-base font-normal leading-normal pb-3 pt-1 px-4">
          Campus Connect is your go-to app for discovering and engaging with
          events happening right here on campus. We&apos;ve created a
          centralized platform to make it easier than ever for students like you
          to find out what&apos;s going on and get involved. Our mission is to
          connect students with the vibrant campus life by simplifying the
          process of finding and participating in events. We believe that a
          thriving campus community is essential for a well-rounded educational
          experience, and Campus Connect is designed to enhance student
          engagement and make the most of your time here.
        </p>
        <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Our Mission
        </h2>
        <p className="text-[#111518] text-base font-normal leading-normal pb-3 pt-1 px-4">
          Our mission is to streamline event discovery and participation for all
          students. We believe that a vibrant campus life is essential for a
          well-rounded education, and Campus Connect is designed to help you
          make the most of your time here.
        </p>

        <h3 className="text-[#121416] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
          Key Features
        </h3>
        <CardContainer>
          <SvgIcon>
            <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path>
          </SvgIcon>

          <DescriptionContainer>
            <Header tilte="Event Notifications" />

            <Description
              text="Never miss out on what's happening. Get instant notifications
              for new events and updates."
            />
          </DescriptionContainer>
        </CardContainer>

        <CardContainer>
          <SvgIcon>
            <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
          </SvgIcon>

          <DescriptionContainer>
            <Header tilte="Customized Event Feed" />
            <Description text="Easily find events based on your interests, clubs, or location." />
          </DescriptionContainer>
        </CardContainer>

        <CardContainer>
          <SvgIcon>
            <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"></path>
          </SvgIcon>

          <DescriptionContainer>
            <Header tilte="Social Interaction" />

            <Description
              text="Connect with fellow students, share your experiences, and make new
              friends."
            />
          </DescriptionContainer>
        </CardContainer>

        <CardContainer>
          <SvgIcon>
            <path d="M80,64a8,8,0,0,1,8-8H216a8,8,0,0,1,0,16H88A8,8,0,0,1,80,64Zm136,56H88a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Zm0,64H88a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16ZM44,52A12,12,0,1,0,56,64,12,12,0,0,0,44,52Zm0,64a12,12,0,1,0,12,12A12,12,0,0,0,44,116Zm0,64a12,12,0,1,0,12,12A12,12,0,0,0,44,180Z"></path>
          </SvgIcon>

          <DescriptionContainer>
            <Header tilte="Event Categories" />

            <Description
              text="Browse events by categories like sports, arts, academics, and
              more."
            />
          </DescriptionContainer>
        </CardContainer>

        <CardContainer>
          <SvgIcon>
            <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
          </SvgIcon>

          <DescriptionContainer>
            <Header tilte="Search Function" />

            <Description text="Use our powerful search to find events by name, date, or location." />
          </DescriptionContainer>
        </CardContainer>

        <CardContainer>
          <SvgIcon>
            <path d="M239.2,97.29a16,16,0,0,0-13.81-11L166,81.17,142.72,25.81h0a15.95,15.95,0,0,0-29.44,0L90.07,81.17,30.61,86.32a16,16,0,0,0-9.11,28.06L66.61,153.8,53.09,212.34a16,16,0,0,0,23.84,17.34l51-31,51.11,31a16,16,0,0,0,23.84-17.34l-13.51-58.6,45.1-39.36A16,16,0,0,0,239.2,97.29Zm-15.22,5-45.1,39.36a16,16,0,0,0-5.08,15.71L187.35,216v0l-51.07-31a15.9,15.9,0,0,0-16.54,0l-51,31h0L82.2,157.4a16,16,0,0,0-5.08-15.71L32,102.35a.37.37,0,0,1,0-.09l59.44-5.14a16,16,0,0,0,13.35-9.75L128,32.08l23.2,55.29a16,16,0,0,0,13.35,9.75L224,102.26S224,102.32,224,102.33Z"></path>
          </SvgIcon>

          <DescriptionContainer>
            <Header tilte="Personalized Recommendations" />

            <Description
              text=" Get event suggestions tailored to your preferences and past
              activity."
            />
          </DescriptionContainer>
        </CardContainer>

        <CardContainer>
          <SvgIcon>
            <path d="M239.2,97.29a16,16,0,0,0-13.81-11L166,81.17,142.72,25.81h0a15.95,15.95,0,0,0-29.44,0L90.07,81.17,30.61,86.32a16,16,0,0,0-9.11,28.06L66.61,153.8,53.09,212.34a16,16,0,0,0,23.84,17.34l51-31,51.11,31a16,16,0,0,0,23.84-17.34l-13.51-58.6,45.1-39.36A16,16,0,0,0,239.2,97.29Zm-15.22,5-45.1,39.36a16,16,0,0,0-5.08,15.71L187.35,216v0l-51.07-31a15.9,15.9,0,0,0-16.54,0l-51,31h0L82.2,157.4a16,16,0,0,0-5.08-15.71L32,102.35a.37.37,0,0,1,0-.09l59.44-5.14a16,16,0,0,0,13.35-9.75L128,32.08l23.2,55.29a16,16,0,0,0,13.35,9.75L224,102.26S224,102.32,224,102.33Z"></path>
          </SvgIcon>

          <DescriptionContainer>
            <Header tilte="Personalized Event Recommendations" />

            <Description text="Discover events tailored to your interests and preferences." />
          </DescriptionContainer>
        </CardContainer>

        <CardContainer>
          <SvgIcon>
            <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
          </SvgIcon>

          <DescriptionContainer>
            <Header tilte="Easy Event RSVP" />

            <Description text="RSVP to events directly within the app to secure your spot." />
          </DescriptionContainer>
        </CardContainer>

        <CardContainer>
          <SvgIcon>
            <path d="M229.66,109.66l-48,48a8,8,0,0,1-11.32-11.32L204.69,112H165a88,88,0,0,0-85.23,66,8,8,0,0,1-15.5-4A103.94,103.94,0,0,1,165,96h39.71L170.34,61.66a8,8,0,0,1,11.32-11.32l48,48A8,8,0,0,1,229.66,109.66ZM192,208H40V88a8,8,0,0,0-16,0V208a16,16,0,0,0,16,16H192a8,8,0,0,0,0-16Z"></path>
          </SvgIcon>

          <DescriptionContainer>
            <Header tilte="Share Events with Friends" />

            <Description text="Share event details with friends and classmates effortlessly." />
          </DescriptionContainer>
        </CardContainer>

        <h3 className="text-[#121416] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
          Benefits
        </h3>

        <CardContainer>
          <SvgIcon>
            <path d="M119.76,217.94A8,8,0,0,1,112,224a8.13,8.13,0,0,1-2-.24l-32-8a8,8,0,0,1-2.5-1.11l-24-16a8,8,0,1,1,8.88-13.31l22.84,15.23,30.66,7.67A8,8,0,0,1,119.76,217.94Zm132.69-96.46a15.89,15.89,0,0,1-8,9.25l-23.68,11.84-55.08,55.09a8,8,0,0,1-7.6,2.1l-64-16a8.06,8.06,0,0,1-2.71-1.25L35.86,142.87,11.58,130.73a16,16,0,0,1-7.16-21.46L29.27,59.58h0a16,16,0,0,1,21.46-7.16l22.06,11,53-15.14a8,8,0,0,1,4.4,0l53,15.14,22.06-11a16,16,0,0,1,21.46,7.16l24.85,49.69A15.9,15.9,0,0,1,252.45,121.48Zm-46.18,12.94L179.06,80H147.24L104,122c12.66,8.09,32.51,10.32,50.32-7.63a8,8,0,0,1,10.68-.61l34.41,27.57Zm-187.54-18,17.69,8.85L61.27,75.58,43.58,66.73ZM188,152.66l-27.71-22.19c-19.54,16-44.35,18.11-64.91,5a16,16,0,0,1-2.72-24.82.6.6,0,0,1,.08-.08L137.6,67.06,128,64.32,77.58,78.73,50.21,133.46l49.2,35.15,58.14,14.53Zm49.24-36.24L212.42,66.73l-17.69,8.85,24.85,49.69Z"></path>
          </SvgIcon>

          <DescriptionContainer>
            <Header tilte="Networking Opportunities" />

            <Description text="Expand your network by connecting with students at events." />
          </DescriptionContainer>
        </CardContainer>

        <CardContainer>
          <SvgIcon>
            <path d="M216,72H180.92c.39-.33.79-.65,1.17-1A29.53,29.53,0,0,0,192,49.57,32.62,32.62,0,0,0,158.44,16,29.53,29.53,0,0,0,137,25.91a54.94,54.94,0,0,0-9,14.48,54.94,54.94,0,0,0-9-14.48A29.53,29.53,0,0,0,97.56,16,32.62,32.62,0,0,0,64,49.57,29.53,29.53,0,0,0,73.91,71c.38.33.78.65,1.17,1H40A16,16,0,0,0,24,88v32a16,16,0,0,0,16,16v64a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V136a16,16,0,0,0,16-16V88A16,16,0,0,0,216,72ZM149,36.51a13.69,13.69,0,0,1,10-4.5h.49A16.62,16.62,0,0,1,176,49.08a13.69,13.69,0,0,1-4.5,10c-9.49,8.4-25.24,11.36-35,12.4C137.7,60.89,141,45.5,149,36.51Zm-64.09.36A16.63,16.63,0,0,1,96.59,32h.49a13.69,13.69,0,0,1,10,4.5c8.39,9.48,11.35,25.2,12.39,34.92-9.72-1-25.44-4-34.92-12.39a13.69,13.69,0,0,1-4.5-10A16.6,16.6,0,0,1,84.87,36.87ZM40,88h80v32H40Zm16,48h64v64H56Zm144,64H136V136h64Zm16-80H136V88h80v32Z"></path>
          </SvgIcon>

          <DescriptionContainer>
            <Header tilte="Exclusive Content" />

            <Description text="Access exclusive content and offers available only to app users." />
          </DescriptionContainer>
        </CardContainer>
      </div>

      <div>
        <div className="h-5 bg-white"></div>
      </div>
    </div>
  );
}

export default AboutComponent;
