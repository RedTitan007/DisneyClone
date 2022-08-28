import styled from "styled-components";
import {
  auth,
  provider,
  signInWithPopup,
  GoogleAuthProvider,
} from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectUserName,
  selectUserPhoto,
  setSignOutState,
  setUserLoginDetails,
} from "../features/users/userSlice";
import { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Header = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setUser(user);
        navigate("../home", {
          replace: true,
        }); /* If using replace: true, the navigation will replace the current entry in the history stack instead of adding a new one.*/
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, [userName]);

  const handleAuth = () => {
    if (!userName) {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          console.log("RESULT:", result);
          console.log("CREDENTIAL:", credential);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          setUser(result.user);
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    } else if (userName) {
      signOut(auth)
        .then(() => {
          dispatch(setSignOutState());
          navigate("/", { replace: true });
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };
  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };
  return (
    <Nav>
      <Logo>
        <img src="/images/logo.svg" alt="Disney+HotStar" />
      </Logo>
      {!userName ? (
        <Login onClick={handleAuth}>Login</Login>
      ) : (
        <>
          <NavMenu>
            <a href="/home">
              <img src="/images/home-icon.svg" alt="Home" />
              <span>Home</span>
            </a>
            <a href="/home">
              <img src="/images/search-icon.svg" alt="Home" />
              <span>Search</span>
            </a>
            <a href="/home">
              <img src="/images/watchlist-icon.svg" alt="Home" />
              <span>Watchlist</span>
            </a>
            <a href="/home">
              <img src="/images/original-icon.svg" alt="Home" />
              <span>Originals</span>
            </a>
            <a href="/home">
              <img src="/images/movie-icon.svg" alt="Home" />
              <span>Movies</span>
            </a>
            <a href="/home">
              <img src="/images/series-icon.svg" alt="Home" />
              <span>Series</span>
            </a>
          </NavMenu>
          <SignOut>
            <UserImg src={userPhoto} alt={userName} />
            <DropDown>
              <span onClick={handleAuth}>SignOut</span>
            </DropDown>
          </SignOut>
        </>
      )}
    </Nav>
  );
};

const Nav = styled.div`
  position: fixed; /*The Container Will be Fixed and removes the scroll */
  top: 0;
  right: 0;
  left: 0;
  height: 70px;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center; /* Vertical Alignment */
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3; /* An element with greater stack order is always above an element with a lower stack order.
  Greater one cover the lower one */
`;
const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;
  img {
    display: block;
    width: 100%;/*  if you specify width:100%, the element's total width will be 100% of its containing block plus any horizontal margin,
         padding and border (unless you've used box-sizing:border-box, in which case only margins are added to the 100% to change how its total width is calculated).*/
  }
`;

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0px;
  padding: 0px;
  position: relative;
  margin-right: auto; /* Margin:auto makes element Center,Margin-right:auto makes element complete left */
  margin-left: 25px;

  a {
    display: flex;
    align-items: center;
    margin: 0 12px; /* Was Padding Changed to Margin */

    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto; /* Sets the stack order equal to its parents. This is default. */
    }
    span {
      color: rgb(249, 249, 249, 249);
      font-size: 13px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0px;
      white-space: nowrap;
      position: relative;

      &:before {
        content: "";
        background-color: rgb(249, 249, 249, 249);
        height: 2px;
        bottom: -6px;
        border-radius: 0px 0px 4px 4px;
        opacity: 0;
        position: absolute; /*It is used to Put the Underline at Bottom */
        right: 0px;
        left: 0px;
        transform-origin: left center; /*Line will Expand from left to Right */
        transform: scaleX(0); /*scale(0) 0 means invisible Shrink Property*/
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s; /*transition+transition-timing functions([x,y],[x,y])
         To provide Smooth Animation */
        visibility: hidden;
        width: auto; /* Occupies the Available Space */
      }
    } /*Bracket is Closed as Hover Effect is Required for Entire a */
    &:hover {
      span:before {
        transform: scaleX(1); /*No Shrink Visible to Everyone */
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }
  /* @media (max-width:760px){
    display: none;
  } */
`;
const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  padding: 8px 16px;
  border-radius: 4px;
  transition: all 0.2s ease 0s;

  &:hover {
    cursor: pointer;
    border-color: transparent;
    background-color: #f9f9f9;
    color: #000; /* Black */
  }
`;
const UserImg = styled.img`
  height: 100%;
`;

const DropDown = styled.div`
  letter-spacing: 3px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  border-radius: 4px;
  padding: 10px;
  position: absolute;
  top: 48px;
  right: 0px;
  font-size: 14px;
  width: 100px;
  opacity: 0;
`;
const SignOut = styled.div`
  height: 48px;
  width: 48px;
  position: relative;
  align-items: center;
  justify-content: center;
  display: flex;
  cursor: pointer;

  ${UserImg} {
    /*Self Defined Element Syntax */
    border-radius: 50%;
  }
  &:hover {
    ${DropDown} {
      /* Needs to be Used After Initialization */
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;
export default Header;
