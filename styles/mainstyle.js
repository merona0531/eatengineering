import styled from "styled-components";

export const TopBar=styled.div`
  width: 100%;
  height: 250px;
  background-color: #ffefaf;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 65px;
  color: white;
  font-weight: 550;
`
export const Wrapper = styled.div`
    display: flex;
  justify-content: center;
  background-color: #fff9df;
  height: 65vh;
`;
export const Container=styled.div`
  width: 95%;
`
export const SubTitle=styled.div`
  margin-top: 30px;
`
export const PlusGroupContainer=styled.div`
  width: 250px;
  height: 250px;
  background-color: #ffefaf;
  border-radius: 20px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: #fff2d9;
  }
`

export const BtnWrapper=styled.div`
  width: 1500px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
export const Logo=styled.div`
    height: 190px;
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

export const LogoutBtn=styled.div`
  background-color: #FFBD43;
  height: 30px;
  width: 100px;
  border: none;
  border-radius: 15px;
  font-weight: bolder;
  font-size: 14px;
  cursor: pointer;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #fff2d9;
    color: #ffbd43;
  }
`
export const Username=styled.div`
        font-size: 25px;
        color: black;
  
`
export const BodyContainer=styled.div`
  display: flex;
`
export const BodyContainer2=styled.div`
  display: flex;
  flex-direction: column;
        margin-top: 30px;

`
export const Group=styled.div`
  margin-top: 20px;
  width: 250px;
  height: 250px;
  background-color: #ffefaf;
  border-radius: 20px;
  margin-left: 28px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
`
export const DeleteBtn=styled.button`
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        background-color: #deffa0;
        border-radius: 5px 20px 5px 5px;
        height: 40px;
        width: 40px;
        font-size: 40px;
        cursor: pointer;
        margin-left: 210px;
        color: black;
        &:hover {
                background-color: #fff2d9;
        }
`

export const DottedLine = styled.div`
 width: ${({ width = '100%' }) => width};
    height: ${({ thickness = '2px' }) => thickness};
    background: repeating-linear-gradient(
        to right,
        ${({ color = '#000' }) => color},
        ${({ color = '#000' }) => color} 10px,  /* 점의 길이 */
        transparent 10px,
        transparent 20px /* 점 사이의 간격 */
    );
        margin-bottom: 20px;
    
`;

export const RightArrow=styled.button`
        color: #FFBD43;
        font-size: 5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 50%;
        left: 0;
        z-index: 2;
        cursor: pointer;
        user-select: none;
        background: unset;
        border: unset;
        margin-left: 5px;
`
export const GroupInfo=styled.div`
        width: 250px;
        height: 70px;
        border-radius: 0 0 20px 20px;
        background-color: rgb(222, 255, 160, 0.4);

        p {
                margin-left: 10px;
                margin-top: 15px;
                font-size: 20px;
        }
`