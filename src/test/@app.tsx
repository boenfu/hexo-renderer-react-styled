import React, {FC} from 'react';
import styled from 'styled-components';

const App = styled.div`
  width: 360px;
  height: 360px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #06f;
`;

const Text = styled.span`
  color: #eee;
  font-size: 20px;
  transition: 0.2s all linear;
  padding-bottom: 24px;

  &:hover {
    filter: brightness(1.2);
    font-size: 24px;
  }
`;

const Test: FC = () => {
  return (
    <App>
      <Text>hexo-renderer-react-styled</Text>
    </App>
  );
};

export default Test;
