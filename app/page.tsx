import Sections from "./components/Sections";
import AskMeSection from "./components/AskMeSection";
import AutoUIChatClient from "./components/AutoUIChatClient";
import PlayBackgroundOverlay from "./components/PlayBackgroundOverlay";
import ContactSuccessOverlay from "./components/ContactSuccessOverlay";

export default function Home() {
  return (
    <>
      <Sections />
      <AskMeSection />
      <PlayBackgroundOverlay />
      <ContactSuccessOverlay />
      <AutoUIChatClient />
    </>
  );
}
