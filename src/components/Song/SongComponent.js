import SongStyle from "./SongStyle";
import Button from "../Button/Button";
import { useDispatch } from "react-redux";
import { deleteSongThunk } from "../../redux/thunks/songThunks";

const SongComponent = ({ song: { artist, songTitle } }) => {
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(deleteSongThunk(id));
  };

  return (
    <SongStyle>
      <ul className="song-collection">
        <li className="song-container__songtitle">
          <span className="material-symbols-rounded">music_note</span>
          <h2 className="song-collection__title">{`${songTitle}`}</h2>
        </li>
        <li className="song-collection__song">
          <span className="material-symbols-rounded">person</span>
          <h3 className="song-collection__artist">{`${artist}`}</h3>
        </li>
        <li className="song-collection__button">
          <Button text="i'll take it!" styleType="primary" />
          <Button text="delete" styleType="secondary" onClick={handleDelete} />
        </li>
      </ul>
    </SongStyle>
  );
};

export default SongComponent;
