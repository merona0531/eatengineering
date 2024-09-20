import styled from "styled-components";

export const Wrapper=styled.div`
    width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background-color: #FAFAED;`
export const Container=styled.div`
    width: 1500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const Logo=styled.div`
  width:100%;
    height: 100px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  margin-top: 20px;
`
export const MyInfoContainer=styled.div`
  width: 400px;
  height: 500px;
  border: 2px solid black;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const ProfileImg=styled.div`
    width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 50%;
  margin-top: 30px;
`
export const ProfileModifyBtn=styled.label`
  border: none;
  background-color: transparent;
  color: #7e5847;
  font-size: 17px;
  margin-top: 10px;
  padding: 7px;
  border-radius: 20px;
  &:hover {
    background-color: #EBC8BD;
    color: #6B1300;
  }
  
  input{
    width: 100%;
    height: 100%;
    display: none;
  }
`
export const MyInfo=styled.div`
    margin-top: 20px;
`
export const MyName=styled.div`
`
export const BallonDog=styled.button`
        color: black;
        font-size: 50px;
        background-color: transparent;
        border: none;
      display: flex;
      justify-content: center;
  margin-bottom: -22px;
  margin-top: -10px;
`