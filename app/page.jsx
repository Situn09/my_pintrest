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
    console.log(process.env.API_KEY);
    fetch(
      `https://pixabay.com/api/?key=41894091-1b5f30cfbc18dc06e4b253142&q=${encodeURI(
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
        alert(
          "Something went wrong. Look like free API rate limit exceeded",
          err
        );
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
