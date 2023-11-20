import styled from "styled-components";

export const MainApp = styled.main`
  h2.question-text {
    font-size: clamp(1rem, 4vw, 2rem);
    margin: 0px;
  }
  @media screen and (min-width: 980px) {
    place-items: center;
  }
`;
