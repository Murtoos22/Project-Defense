import styled from 'styled-components';

export const LinearGradientText = styled.div`
    background:     (
        to right, 
        rgba(214, 109, 255, 1), 
        rgba(112, 190, 255, 1), 
        rgba(82, 178, 254, 1), 
        rgba(130, 199, 255, 1)
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-size: 24px;
    font-weight: bold;
`;

export const RadialGradientText = styled.div`
  background: radial-gradient(
    circle, 
    rgba(214, 109, 255, 1), 
    rgba(112, 190, 255, 1), 
    rgba(82, 178, 254, 1), 
    rgba(130, 199, 255, 1)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  font-size: 24px;
  font-weight: bold;
`;

export const ConicGradientText = styled.div`
  background: conic-gradient(
    from 25deg, 
    rgba(214, 109, 255, 1), 
    rgba(112, 190, 255, 1), 
    rgba(82, 178, 254, 1), 
    rgba(130, 199, 255, 1)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  font-size: 24px;
  font-weight: bold;
`;