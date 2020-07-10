import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #f5f5f5;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #312e38;
  width: 120px;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s;
  &:hover {
    background: ${shade(0.2, '#f5f5f5')};
  }
`;