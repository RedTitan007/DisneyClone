import styled from "styled-components";
const Login = (props) => {
  return (
    <Container>
      <Content>
        <CTA>
          <CTALogoOne src="/images/cta-logo-one.svg" alt="" />
          <Signup>Get All There</Signup>
          <Description>
            Get All Language Movies under one Streming Site diseny+HotStar
            subscription.As of 03/26/21,the Price of Disney+ and The Disney
            Bundle will increase by $1.
          </Description>
          <CTALogoTwo src="/images/cta-logo-two.png" alt="" />
        </CTA>
        <BgImage />
      </Content>
    </Container>
  );
};

const Container = styled.section`
  overflow: hidden; /* No Scroll if the content excedes the height */
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 100vh; /* 1vh=10px to Set the Height OtherWise Scroller will come at Right Side */
`;
const Content = styled.div`
  margin-bottom: 10vw;
  width: 100%;/*  if you specify width:100%, the element's total width will be 100% of its containing block plus any horizontal margin,
         padding and border (unless you've used box-sizing:border-box, in which case only margins are added to the 100% to change how its total width is calculated).*/
  position: relative;
  min-height: 100vh;
  box-sizing: border-box; /* Width and height apply to all parts of the element: content, padding and borders:*/
  display: flex;
  justify-content: center; /* Makes Items to align Center Horizantally */
  align-items: center; /* Makes Items to align Center Vertically */
  flex-direction: column; /* Next Line Not Inline */
  padding: 80px 40px;
  height: 100%;
`;
const BgImage = styled.div`
  background-image: url(/images/login-background.jpg);
  height: 100%;
  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: -1; /* To add the Items on the Top of The Image Rather than Behind. Basically The Image will be behind */
`;
const CTA = styled.div`
  max-width: 650px;
  width: 100%;/*  if you specify width:100%, the element's total width will be 100% of its containing block plus any horizontal margin,
         padding and border (unless you've used box-sizing:border-box, in which case only margins are added to the 100% to change how its total width is calculated).*/
  display: flex;
  flex-direction: column;
`;
const Signup = styled.a`
  font-weight: bold;
  font-size: 18px;
  color: #f9f9f9;
  background-color: #0063e5;
  margin-bottom: 12px;
  width: 100%;/*  if you specify width:100%, the element's total width will be 100% of its containing block plus any horizontal margin,
         padding and border (unless you've used box-sizing:border-box, in which case only margins are added to the 100% to change how its total width is calculated).*/
  letter-spacing: 1.5px;
  padding: 16.5px 0;
  border: 1px solid transparent;
  border-radius: 4px;

  &:hover {
    background-color: #0483ee;
  }
`;
const Description = styled.p`
  color: hsla(0, 0%, 95.3%, 1);
  font-size: 11px;
  margin: 0 0 24px; /*Top Right Bottom :-> top right_left bottom; */
  line-height: 1.5; /* Gives Space Between the Lines */
  letter-spacing: 1.5px;
`;

const CTALogoOne = styled.img`
  margin-bottom: 12px;
  max-width: 600px; /* Maximum Width of the Image */
  min-height: 1px;
  display: block; /* Line by Line One after the other */
  width: 100%;/*  if you specify width:100%, the element's total width will be 100% of its containing block plus any horizontal margin,
         padding and border (unless you've used box-sizing:border-box, in which case only margins are added to the 100% to change how its total width is calculated).*/
`;
const CTALogoTwo = styled.img`
  max-width: 600px;
  margin-bottom: 20px;
  display: inline-block;
  vertical-align: bottom;
  width: 100%;/*  if you specify width:100%, the element's total width will be 100% of its containing block plus any horizontal margin,
         padding and border (unless you've used box-sizing:border-box, in which case only margins are added to the 100% to change how its total width is calculated).*/
`;

export default Login;
