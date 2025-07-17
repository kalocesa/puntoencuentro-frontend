import { useContext } from "react";
import Header from "./Header/Header";
import BookSection from "../Book/BookSection/BookSection";
import Loader from "../Loader/Loader";
import { LoaderContext } from "../../providers/LoaderProvider";

function Home() {
  const { isLoading } = useContext(LoaderContext);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <BookSection />
        </>
      )}
    </>
  );
}

export default Home;
