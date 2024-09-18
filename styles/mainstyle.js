import styled from "styled-components";

export const TopBar=styled.div`
  width: 1500px;
  height: 200px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 65px;
  font-weight: 550;
`
export const Wrapper = styled.div`
    display: flex;
        width: 100%;
  justify-content: center;
  background-color: #FAFAED;
  min-height: 72vh;  
        height: auto;
`;
export const Container=styled.div`
  width: 95%;
`
export const SubTitle=styled.div`
  margin-top: 30px;
display: flex;
`
export const PlusGroupContainer=styled.div`
  width: 45px;
  height: 45px;
  background-color: #EFAD87;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
        margin-left: 20px;
        font-size: 50px;
        color: white;

        &:hover {
    background-color: #EBC8BD;   
                color: #6B1300;
        }
`

export const BtnWrapper=styled.div`
  width: 1500px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
export const BtnWrapper3=styled.div`
        width: 400px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
        z-index: 2;

`
export const Logo=styled.div`
    height: 110px;
  display: flex;
  align-items: center;
        margin-top: 5px;
`
export const VirticalLineWrapper=styled.div`
  width: 7px;
`

export const Username=styled.div`
        font-size: 20px;
        color: black;
        width: auto;
        display: flex;
        margin-right: 15px;
        align-items: center;
        font-family: HancomEQN ;

        p{
          font-style: inherit;
          font-size: 20px;
          color: #6B1300;
          margin-right: 10px;
          font-weight: bold;
  }
`
export const BodyContainer=styled.div`
  display: flex;
        justify-content: center;
`
export const BodyContainer2=styled.div`
  display: flex;
  flex-direction: column;
        margin-top: 50px;

`
export const Group=styled.div`
  width: 400px;
  height: 400px;
  background-color: #6B1300;
        margin: 30px 10px 0 10px;
  border-radius: 5px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-shadow: 0 0 12px rgba(0, 0, 0, 0.7);
        object-fit: cover;
`
export const DeleteBtn=styled.button`
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        background-color: transparent;
        border-radius: 50%;
        height: 45px;
        width: 45px;
        font-size: 40px;
        cursor: pointer;
        margin-left: 315px;
        color:#EBC8BD ;
        &:hover {
                color: #FAFAED;
        }
`
export const SettingBtn=styled.label`
        background-color: transparent;
        border: none;
        color: #EBC8BD;
        height: 30px;
        width: 30px;
        font-size: 40px;
        display: flex;
        align-items: center;
        cursor: pointer;
  justify-content: center;
        object-fit: cover;
        &:hover {
                color: #FAFAED;
        }
        
`

export const DottedLine = styled.div`
 width: ${({ width = '100%' }) => width};
    height: ${({ thickness = '3px' }) => thickness};
    background: repeating-linear-gradient(
        to right,
        ${({ color = '#000' }) => color},
        ${({ color = '#000' }) => color} 20px,  /* 점의 길이 */
        transparent 10px,
        transparent 38px /* 점 사이의 간격 */
    );
        margin-bottom: 20px;
    
`;
export const BallonDog=styled.button`
        color: #6B1300;
        font-size: 55px;
        background-color: transparent;
        border: none;
        cursor: pointer;
`
export const RightArrow=styled.button`
        color: #6B1300;
        font-size: 5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        user-select: none;
        background: unset;
        border: unset;
        position: absolute;
        right: 0;
        left: 1350px;
        bottom: 145px;
`
export const GroupInfo=styled.div`
        width: 400px;
        height: 70px;
        border-radius: 0 0 5px 5px;
        background-color: rgba(235, 200, 189, 0.8); /* 투명도 0.8 적용 */
        z-index: 2;
        font-family: HancomEQN ;
        font-weight: bolder;
        display: flex;
        justify-content: center;
        align-items: center;

        p {
                margin: 15px;
                font-size: 25px;
        }

        img {
                max-width: 100px;
                max-height: 100px;
                display: block;
        }
`
export const InviteContainer=styled.div`
  display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 20px;
`
export const Invite=styled.div`
        display: flex;
        align-items: center;
        width: auto;
        margin-bottom: 20px;
        height: 40px;
        font-size: 25px;
        font-family: "Lucida Handwriting";
        margin-top: 20px;
        justify-content: space-between;

`
export const Invitation=styled.div`
        color: #6B1300;
        display: flex;
        align-items: center;
        p{
                color: black;
                margin-right: 10px;
                font-weight: bold;
                background-color: #ebc8bd;
                height: 30px;
                border-radius: 5px;
                padding: 6px;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-left: 20px;
        }
`
export const BtnWrapper2=styled.div`
        display: flex;
        width: 180px;
        justify-content: space-between;
        margin-left: 40px;
`
export const AcceptBtn=styled.button`
        font-family: "Lucida Handwriting";
        background-color: #6B1300;
        width: 85px;
        font-size: 15px;
        height: 40px;
        border-radius: 15px;
        color: white;
        border: 2px solid #6B1300; /* 기본 테두리 */
        cursor: pointer;

`
export const RejectBtn=styled.button`
        font-family: "Lucida Handwriting";
        background-color: white;
        color: #6b1300;
        width: 85px;
        font-size: 15px;
        height: 40px;
        border-radius: 15px;
        border: 2px solid #6B1300; /* 기본 테두리 */
        cursor: pointer;
`
export const SliderContainer = styled.div`
        display: flex;
`;

export const Slider = styled.div`
    display: flex;
        justify-content: center;
`;


export const LeftArrow = styled.button`
        color: #6B1300;
        font-size: 5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        user-select: none;
        background: unset;
        border: unset;
        position: absolute;
      left: 0;
        right: 1350px;
        bottom: 145px;
`;

export const GroupImg=styled.img`
        position: absolute;
        z-index: 1;
  width: 400px;
        height: 400px;
        object-fit: cover;
`

export const LogoutButton = styled.button`
  position: relative;
  padding: 0 8px 12px;
  min-width: 100px;
  background: none;
  border: none;
  cursor: pointer;
`;
export const MyButton = styled.button`
  position: relative;
  padding: 0 8px 12px;
  width: 60px;
  background: none;
  border: none;
  cursor: pointer;
`;
export const ButtonTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  padding: 8px 16px;
  font-family: HancomEQN ;
  transform: translateY(0);
  text-align: center;
  color: #fff;
  text-shadow: 0 -1px rgba(0, 0, 0, 0.25);
  transition: transform 0.2s;
  user-select: none;

  ${LogoutButton}:active & {
    transform: translateY(6px);
  }

  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    border-radius: 4px;
    width: 100%;
    height: 100%;
    box-sizing: content-box;
    background-image: radial-gradient(#833022, #6B1300);
    text-align: center;
    color: #fff;
    box-shadow: inset 0 0 0px 1px rgba(255, 255, 255, 0.2), 0 1px 2px 1px rgba(255, 255, 255, 0.2);
    transition: border-radius 0.2s, padding 0.2s, width 0.2s, transform 0.2s;

    ${LogoutButton}:active & {
      border-radius: 6px;
      padding: 0 2px;
    }
  }
`;
export const MyButtonTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  padding: 8px 16px;
  font-family: HancomEQN ;
  transform: translateY(0);
  text-align: center;
  color: #fff;
  text-shadow: 0 -1px rgba(0, 0, 0, 0.25);
  transition: transform 0.2s;
  user-select: none;

  ${MyButton}:active & {
    transform: translateY(6px);
  }

  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    border-radius: 15px;
    width: 100%;
    height: 100%;
    box-sizing: content-box;
    background-image: radial-gradient(#833022, #6B1300);
    text-align: center;
    color: #fff;
    box-shadow: inset 0 0 0px 1px rgba(255, 255, 255, 0.2), 0 1px 2px 1px rgba(255, 255, 255, 0.2);
    transition: border-radius 0.2s, padding 0.2s, width 0.2s, transform 0.2s;

    ${MyButton}:active & {
      border-radius: 20px;
      padding: 0 2px;
    }
  }
`;

export const ButtonBottom = styled.div`
  position: absolute;
  z-index: 1;
  bottom: 4px;
  left: 4px;
  border-radius: 8px / 16px 16px 8px 8px;
  padding-top: 6px;
  width: calc(100% - 8px);
  height: calc(100% - 10px);
  box-sizing: content-box;
  background-color: #701400;
  background-image: radial-gradient(4px 8px at 4px calc(100% - 8px), rgba(255, 255, 255, 0.25), transparent),
  radial-gradient(4px 8px at calc(100% - 4px) calc(100% - 8px), rgba(255, 255, 255, 0.25), transparent),
  radial-gradient(16px at -4px 0, rgba(255, 255, 255, 1), transparent),
  radial-gradient(16px at calc(100% + 4px) 0, rgba(255, 255, 255, 1), transparent);
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.5), inset 0px -1px 3px 3px rgba(0, 0, 0, 0.4);
  transition: border-radius 0.2s, padding-top 0.2s;

  ${LogoutButton}:active & {
    border-radius: 10px 10px 8px 8px / 8px;
    padding-top: 0;
  }
`;

export const MyButtonBottom = styled.div`
  position: absolute;
  z-index: 1;
  bottom: 4px;
  left: 4px;
  border-radius: 30px / 30px 30px 30px 30px;
  padding-top: 6px;
  width: calc(100% - 8px);
  height: calc(100% - 10px);
  box-sizing: content-box;
  background-color: #701400;
  background-image: radial-gradient(4px 8px at 4px calc(100% - 8px), rgba(255, 255, 255, 0.25), transparent),
  radial-gradient(4px 8px at calc(100% - 4px) calc(100% - 8px), rgba(255, 255, 255, 0.25), transparent),
  radial-gradient(16px at -4px 0, rgba(255, 255, 255, 1), transparent),
  radial-gradient(16px at calc(100% + 4px) 0, rgba(255, 255, 255, 1), transparent);
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.5), inset 0px -1px 3px 3px rgba(0, 0, 0, 0.4);
  transition: border-radius 0.2s, padding-top 0.2s;

  ${MyButton}:active & {
    border-radius: 30px 30px 30px 30px / 30px;
    padding-top: 0;
  }
`;

export const ButtonBase = styled.div`
  position: absolute;
  z-index: 0;
  top: 4px;
  left: 0;
  border-radius: 12px;
  width: 100%;
  height: calc(100% - 4px);
  background-color: rgba(0, 0, 0, 0.15);
  box-shadow: 0 1px 1px 0 rgba(255, 255, 255, 0.75), inset 0 2px 2px rgba(0, 0, 0, 0.25);
`;

export const MyButtonBase = styled.div`
  position: absolute;
  z-index: 0;
  top: 4px;
  left: 0;
  border-radius: 20px;
  width: 100%;
  height: calc(100% - 4px);
  background-color: rgba(0, 0, 0, 0.15);
  box-shadow: 0 1px 1px 0 rgba(255, 255, 255, 0.75), inset 0 2px 2px rgba(0, 0, 0, 0.25);
`;