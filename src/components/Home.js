import styled from "styled-components";
import ImageSlider from "./ImageSlider";
import Viewers from "./Viewers";
import Recommends from "./Recommends";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Trending from "./Trending";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import db from "../firebase";
import { setMovies } from "../features/movie/movieSlice";
import { selectUserName } from "../features/users/userSlice";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

const Home = (props) => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  let recommends = [];
  let newDisney = [];
  let originals = [];
  let trending = [];

  useEffect(() => {
    async function fetchData() {
      const moviesCol = collection(db, "movies");
      const moviesSnapshot = await getDocs(moviesCol);
      const moviesList = moviesSnapshot.docs.map((mov) => mov.data());
      console.log("UserName",userName);
      moviesList.map((data, index) => {
        switch (data.type) {
          case "recommend":
            recommends = [...recommends, { id: index, ...data }];
            break;
          case "new":
            newDisney = [...newDisney, { id: index, ...data }];
            break;
          case "original":
            originals = [...originals, { id: index, ...data }];
            break;
          case "trending":
            trending = [...trending, { id: index, ...data }];
            break;
        }
      });
      dispatch(
        setMovies({
          recommend: recommends,
          newDisney: newDisney,
          original: originals,
          trending: trending,
        })
      );
    }
    if(userName)
     fetchData();
  }, [userName]);

  return (
    <Container>
      <ImageSlider />
      <Viewers />
      <Recommends />
      <NewDisney />
      <Originals />
      <Trending />
    </Container>
  );
};
const Container = styled.div`
  position: relative;
  top: 72px;
  display: block;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url("images/home-background.png") center center / cover
      no-repeat fixed; /*background: bg-color bg-image position/bg-size bg-repeat bg-origin bg-clip bg-attachment initial|inherit; 
                        background-color background-image background-position background-position/background-size background-repeat background-attachment */
    content: " ";
    position: absolute;
    inset: 0px; /* The inset CSS property is a shorthand that corresponds to the top, right, bottom, and/or left properties.*/
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;
