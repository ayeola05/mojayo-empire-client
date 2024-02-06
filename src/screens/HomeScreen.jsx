import { useParams } from "react-router-dom";
import ShopSection from "../components/homeComponents/ShopSection";
import Header from "./../components/Header";
import CallToActionSection from "../components/homeComponents/CallToActionSection";
import ContactInfo from "../components/homeComponents/ContactInfo";
import Footer from "../components/Footer";

const HomeScreen = () => {
  window.scrollTo(0, 0);
  const params = useParams();
  const keyword = params.keyword;
  const pagenumber = params.pagenumber;
  return (
    <div>
      <Header />
      <ShopSection keyword={keyword} pagenumber={pagenumber} />
      <CallToActionSection />
      <ContactInfo />
      <Footer />
    </div>
  );
};

export default HomeScreen;
