import styled from 'styled-components';
import { shade } from 'polished';

export const Title = styled.h1`
  color: #F69339;
  font-size: 48px;
  line-height: 56px;
  margin-top: 80px;
  max-width: 450px;
`;

export const Form = styled.form`
  display: flex;
  margin-top: 40px;
  max-width: 700px;

  input {
    flex: 1;
    height: 70px;
    padding: 0 24px;
    border: 0;
    border-radius: 5px 0 0 5px;
    color: #3a3a3a;
    border: 2px solid #fff;
    border-right: 0;

    &::placeholder {
      color: #a8a8b3;
    }
  }

  button {
    width: 210px;
    height: 70px;
    background: #F69339;
    border-radius: 0px 5px 5px 0px;
    border: 0;
    color: #fff;
    font-weight: bold;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#F69339')};
    }
  }
`;

export const Tasks = styled.div`
  margin-top: 64px;
  max-width: 700px;

  div {
    background: #fff;
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    text-decoration: none;
    display: flex;
    align-items: center;
    flex: 1;

    strong {
      flex-grow: 2;
      margin-left: 16px;
      font-size: 20px;
      color: #3d3d4d;
    }

    button {
        background: #FFF;
        padding: 10px;
        border-radius: 8px;
        display: flex;
        border: none;
        transition: 0.1s;

        svg {
          color: #F05C36;
        }

        & + button {
          margin-left: 6px;
        }
      }

    & + div {
      margin-top: 16px;
    }
  }
`;
