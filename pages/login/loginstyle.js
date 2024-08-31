import styled from "styled-components";

export const Wrapper=styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
export const Container=styled.div`
  width: 1500px;
  height: 710px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const Logo=styled.div`
    height: 250px;
  display: flex;
  align-items: center;
`
export const LoginBox=styled.div`
  margin-top: 10px;
  width: 200px;
  padding: 20px;
  border: 1px solid #6B1300;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #EBC8BD;
  font-family: HancomEQN ;

`
export const InputWrapper = styled.div`
  margin-bottom: 15px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #6B1300;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #6B1300;
  border-radius: 5px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #6B1300;
  color: white;
  font-weight: bold;
  font-size: 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  font-family: HancomEQN ;


  &:hover {
    background-color: #FAFAED;
    color: #6B1300;
  }
`;

export const SignUpBtn=styled.button`
  border: none;
  background-color: white;
  color: #6B1300;
  cursor: pointer;
  font-size: 18px;
  margin-top: 30px;
  &:hover {
    color: #EBC8BD;
  }
`