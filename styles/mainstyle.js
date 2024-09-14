import styled from "styled-components";

export const TopBar=styled.div`
  width: 100%;
  height: 250px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 65px;
  color: #6B1300;
  font-weight: 550;
`
export const Wrapper = styled.div`
    display: flex;
        width: 100%;
  justify-content: center;
  background-color: #FAFAED;
  height: 1000px;
`;
export const Container=styled.div`
  width: 95%;
`
export const SubTitle=styled.div`
  margin-top: 30px;
display: flex;
`
export const PlusGroupContainer=styled.div`
  width: 50px;
  height: 50px;
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
    height: 160px;
  display: flex;
  align-items: center;
`
export const LoginBtn=styled.button`
    background-color: #FFBD43;
  height: 30px;
  width: 100px;
  border: none;
  border-radius: 15px 0 0 15px;
  font-weight: bolder;
  font-size: 14px;
  cursor: pointer;
  color: white;
  &:hover {
    background-color: #fff2d9;
    color: #ffbd43;
  }
  //margin-top: 20px;
`
export const RegisterBtn=styled.button`
  background-color: #FFBD43;
  height: 30px;
  width: 100px;
  border: none;
  border-radius: 0 15px 15px 0;
  font-weight: bolder;
  font-size: 14px;
  cursor: pointer;
  color: white;
  &:hover {
    background-color: #fff2d9;
    color: #ffbd43;
  }
`
export const VirticalLineWrapper=styled.div`
  height: 30px;
  width: 1px;
  background-color: #FFBD43;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const VirticalLine = styled.div`
  position: relative;
    height: 18px;
    width: 2px;
    //margin: 0 1rem;
    background-color: white;
`;

export const LogoutBtn = styled.div`
        background-color: #6B1300;
        height: 47px;
        width: 130px;
        font-family: "Lucida Handwriting";
        font-style: inherit;
        font-size: 23px;
        color: white;
        border: 2px solid #6B1300; /* 기본 테두리 */
        border-radius: 12px; /* 모서리 둥글게 */
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        overflow: hidden; /* 레이스 효과가 버튼 내부로 나가지 않게 함 */

        &:hover {
                background-color: #EBC8BD;
                color: #6B1300;
        }
`;


export const Username=styled.div`
        font-size: 25px;
        color: black;
        width: 230px;
        display: flex;
        align-items: center;
  p{
          font-family: HancomEQN ;
          font-style: inherit;
          font-size: 25px;
          color: #6B1300;
          margin-right: 20px;
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
        margin-left: 310px;
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
        font-size: 65px;
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
        height: 100px;
        border-radius: 0 0 5px 5px;
        background-color: rgba(235, 200, 189, 0.8); /* 투명도 0.8 적용 */
        z-index: 2;

        p {
                margin-left: 10px;
                margin-top: 15px;
                font-size: 20px;
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