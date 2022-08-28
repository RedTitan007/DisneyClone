import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {useSelector } from "react-redux";
import { selecttrending } from "../features/movie/movieSlice";

const Trending = () => {
    const trendings=useSelector(selecttrending);
  return (
    <Container>
      <h4>Trending</h4>
      <Content>
      {trendings &&
        trendings.map((a,index)=>{
            return (
              <Wrap key={a.ID}>
              <Link to={`/detail/${a.ID}`}>
                <img
                  src={a.cardImg}
                  alt={a.title}
                />
              </Link>
            </Wrap>
            )
          })
    }
      </Content>
    </Container>
  );
};
const Container = styled.div`
  padding: 0 0 26px;
`;
const Content = styled.div`
  display: grid;
  grid-gap: 25px;
  gap: 25px;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;
const Wrap = styled.div`
  padding-top: 56.25%;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  border: 3px solid rgba(249, 249, 249, 0.1);

  img {
    position: absolute;
    inset: 0;
    display: block;
    height: 100%;
    width: 100%;/*  if you specify width:100%, the element's total width will be 100% of its containing block plus any horizontal margin,
         padding and border (unless you've used box-sizing:border-box, in which case only margins are added to the 100% to change how its total width is calculated).*/
    object-fit: cover;
    opacity: 1;
    transition: opacity 500ms ease-in-out 0s;
    z-index: 1;
    top: 0;
  }
  &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
  }
`;

export default Trending;
