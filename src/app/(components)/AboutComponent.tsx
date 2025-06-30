import AboutHeader from "./AboutHeader";
import AboutFeatures from "./AboutFeatures";

function AboutComponent() {
  return (
    <div>
      <div className="relative flex h-[100%] mx-auto min-h-screen py-[1rem] flex-col bg-white group/design-root overflow-x-hidden">
        <AboutHeader />
        <div className="mt-8">
          <h3 className="text-[#121416] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2">
            Key Features
          </h3>

          <AboutFeatures />
        </div>
      </div>
    </div>
  );
}

export default AboutComponent;
