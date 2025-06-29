import AboutHeader from "./AboutHeader";
import AboutFeatures from "./AboutFeatures";
import Footer from "./Footer";

function AboutComponent() {
  return (
    <div>
      <div
        className="relative flex h-[100%] w-[80%] mx-auto min-h-screen py-[1rem] flex-col bg-white justify-between group/design-root overflow-x-hidden"
        style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
      >
        <AboutHeader />
        <div>
          <h3 className="text-[#121416] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
            Key Features
          </h3>

          <AboutFeatures />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AboutComponent;
