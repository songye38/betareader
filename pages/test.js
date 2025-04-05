
import Navbar from "@/components/NavBar";
import NavMainSection from "@/components/NavMainSection";


const TestPage = () => {

  return (
    <div>
       <Navbar customNavComponent={<NavMainSection />} />
    </div>
  );
};

export default TestPage;
