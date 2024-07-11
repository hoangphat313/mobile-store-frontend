import styled from 'styled-components';

export const WrapperType = styled.div`
  padding: 7px;
  cursor: pointer;
  color: #45474B;
  font-size: 18px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #818FB4;
    color: #fff;
    border-radius: 4px;
  }

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 16px;

    &:hover {
      font-size: 18px;
    }
  }

  @media (max-width: 480px) {
    padding: 6px;
    font-size: 14px;

    &:hover {
      font-size: 16px;
    }
  }
`;
