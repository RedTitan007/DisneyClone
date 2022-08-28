import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import db from "../firebase";
import { collection, getDocs } from "firebase/firestore/lite";

const Detail = () => {
  const { id} = useParams();
  const [detailData, setDetailData] = useState({});

  useEffect(() => {
    async function fetchData() {
      const moviesCol = collection(db, "movies");
      const moviesSnapshot = await getDocs(moviesCol);
      const moviesList = moviesSnapshot.docs.map((mov) => mov.data());
      console.log("moviesList",moviesList);
      setDetailData(moviesList.filter(a=>a.ID===id)[0]);
    }
    fetchData();
  }, [id]);

  return (
    <Container>
      <Background>
        <img
          src={detailData.backgroundImg}
          alt={detailData.title}
        />
      </Background>
      <ImageTitle>
        <img
          src={detailData.titleImg}
          alt={detailData.title}
        />
      </ImageTitle>
      <ContentMeta>
        <Controls>
          <Player>
            <img src="/images/play-icon-black.png" alt="" />
            <span>Play</span>
          </Player>
          <Trailer>
            <img src="/images/play-icon-white.png" alt="" />
            <span>Trailer</span>
          </Trailer>
          <AddList>
            <span />
            <span />
          </AddList>
          <GroupWatch>
            <div>
              <img src="/images/group-icon.png" alt="" />
            </div>
          </GroupWatch>
        </Controls>
        <SubTitle>{detailData.subTitle}</SubTitle>
        <Description>{detailData.description}</Description>
      </ContentMeta>
    </Container>
  );
};
const Container = styled.div`
  position: relative;
  min-height: calc(100vh-250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
`;
const Background = styled.div`
  position: fixed; /*If you scroll the image will not get scroll and it is Zindex=-1 means the other elements will render on the background content */
  right: 0px;
  top: 0px;
  left: 0px;
  opacity: 0.8;
  z-index: -1;
  img {
    width: 100vw;
    height: 100vh;

    @media (max-width: 768px) {
      width: initial; /*Sets this property to its default value.*/
    }
  }
`;
const ImageTitle = styled.div`
  display: flex;
  align-items: flex-end; /* Makes Items to align Center Vertically-Here Items will allign in Bottom*/
  -webkit-box-pack: start;
  justify-content: flex-start; /* Makes Items to align Center Horizantally */
  margin: 0px auto;
  height: 30vw;
  min-height: 170px;
  padding-bottom: 24px;
  width: 100%; /*  if you specify width:100%, the element's total width will be 100% of its containing block plus any horizontal margin,
         padding and border (unless you've used box-sizing:border-box, in which case only margins are added to the 100% to change how its total width is calculated).*/

  img {
    width: 35vw; /*35% of Width (Viewport Width) */
    max-width: 600px; /*This prevents the used value of the width property from becoming larger than the value specified by max-width . */
    min-width: 200px;
  }
`;

const ContentMeta = styled.div`
  max-width: 874px;
`;
const Controls = styled.div`
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  margin: 24px 0px;
  min-height: 56px;
`;
const Player = styled.button`
  letter-spacing: 1.8px;
  font-size: 15px;
  margin: 0px 22px 0px 0px;
  padding: 0px 24px;
  height: 56px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  text-transform: uppercase;
  background: rgb(249, 249, 249);
  border: none;
  color: rgb(0, 0, 0);

  img {
    width: 32px;
  }
  &:hover {
    background: rgb(198, 198, 198);
  }
  @media (max-width: 768px) {
    height: 45px;
    font-size: 12px;
    padding: 0px 12px;
    margin: 0px 10px 0px 0px;

    img {
      width: 25px;
    }
  }
`;
const Trailer = styled(Player)`
  /* Inheriting Everything from Player*/
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(249, 249, 249);
  color: rgba(249, 249, 249);
`;
const AddList = styled.div`
  margin-right: 16px;
  height: 44px;
  width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%; /* Makes Circle */
  border: 2px solid white;
  cursor: pointer;

  span {
    background-color: rgb(249, 249, 249);
    display: inline-block;
    &:first-child {
      height: 2px;
      width: 16px;
    }
    &:nth-child(2) {
      height: 16px;
      transform: translate(-8px) rotate(0deg);
      width: 2px;
    }
  }
`;
const GroupWatch = styled.div`
  height: 44px;
  width: 44px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  div {
    background: rgb(0, 0, 0);
    border-radius: 50%;
    height: 40px;
    width: 40px;

    img {
      width: 100%; /*  if you specify width:100%, the element's total width will be 100% of its containing block plus any horizontal margin,
         padding and border (unless you've used box-sizing:border-box, in which case only margins are added to the 100% to change how its total width is calculated).*/
    }
  }
`;
const SubTitle = styled.div`
  color: rgba(249, 249, 249);
  font-size: 15px;
  min-height: 20px; /* Increases the Container height */

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Description = styled.div`
  line-height: 1.4;
  font-size: 20px;
  padding: 16px 0px;
  color: rgba(249, 249, 249);

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export default Detail;
