import styled from "styled-components";
import theme from "../../theme/theme";

const SongStyle = styled.div`
  border-radius: 10px;
  border: 2px solid black;
  padding: 30px;
  margin: 30px 20px;

  .song-container__songtitle,
  .song-collection__song {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  .song-detail__songtitle,
  .song-detail__song {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .song-icon__container {
    margin: 0;
    padding: 0;
    background-color: ${theme.blueDark};
    display: flex;
    width: 90px;
    height: 90px;
    margin: 0;
    padding: 0;
    justify-content: center;
    border-radius: 50px;
    align-items: center;
    position: absolute;
    right: 0;
    top: -60px;
  }
  /* 
  .song-icon__image {
    width: auto;
    height: 70px;
  } */

  .song-container {
    width: inherit;
    margin: 0;
    display: flex;
    flex-direction: column;
  }

  .songDetail-header {
    display: flex;
    justify-content: center;
  }

  .song-collection__button {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 10px;
    gap: 10px;
  }

  .song-container__name {
    font-size: 2em;
    margin: 0;
    color: #583e3b;
    font-weight: 800;
    margin: 0;
    width: 70%;
  }
  .song {
    margin-bottom: 20px;
  }

  .song-container__button {
    margin-top: 10px;
  }

  .secondary {
    background: rgba(${theme.redrgb}, 0.25);
    color: ${theme.red};
    border: 3px solid ${theme.red};
    width: 100%;
    height: 45px;
    border-radius: 10px;
  }
  p {
    padding-top: 5px;
    padding-bottom: 5px;
    margin-top: 0;
    margin-bottom: 0;
  }
  .song-details__button {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 10px;
    gap: 10px;
  }
`;

export default SongStyle;
