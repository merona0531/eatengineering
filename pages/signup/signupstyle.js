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
export const SignupBox = styled.div`
  width: 320px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #FFBD43;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fdf3da;
`;

export const InputWrapper = styled.div`
  margin-bottom: 15px;
  
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #FFBD43;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #FFBD43;
  border-radius: 5px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 15px;
  background-color: #FFBD43;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #ffefaf;
    color: #FFBD43;
  }
`;

export const Error = styled.div`
  color: red;
  margin-top: 10px;
`;
