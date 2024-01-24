"use client";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import app from "./Shared/firebaseConfig";
import { useContext, useEffect, useState } from "react";
import PinList from "./components/Pins/PinList";
import Loading from "./components/Utils/Loading";
import { StoreContext } from "./Provider";

export default function Home() {
  const db = getFirestore(app);
  const [isLoading, setLoading] = useState(true);
  const [listOfPins, setListOfPins] = useState([]);
  const [state, setState] = useContext(StoreContext);

  useEffect(() => {
    getAllPins();
  }, [state.search]);
  const getAllPins = async () => {
    // setListOfPins([]);
    setLoading(true);
    fetch(
      `https://pixabay.com/api/?key=${process.env.API_KEY}&q=${encodeURI(
        state.search
      )}&image_type=photo&pretty=true`
    )
      .then((data) => {
        return data.json();
      })
      .then((json) => {
        setListOfPins(
          json.hits.map((hit) => {
            return {
              userName: hit.user,
              desc: hit.tags,
              id: hit.id,
              title: hit.tags,
              link: hit.pageURL,
              userImage: hit.userImageURL,
              image: hit.largeImageURL,
            };
          })
        );
        setLoading(false);
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
    // const q = query(collection(db, "pinterest-post"));
    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    //   setListOfPins((listOfPins) => [...listOfPins, doc.data()]);
    // });
  };

  return (
    <>
      <Loading isLoading={isLoading}>
        <div className="p-3">
          <PinList listOfPins={listOfPins} />
        </div>
      </Loading>
    </>
  );
}
