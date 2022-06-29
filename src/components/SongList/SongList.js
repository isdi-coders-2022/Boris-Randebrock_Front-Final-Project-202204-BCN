import { useSelector } from "react-redux";
import SongComponent from "../Song/SongComponent";
import SongListStyles from "./SongListStyles";

const SongList = () => {
  const songs = useSelector((state) => state.song);
  return (
    <SongListStyles>
      <h1>Songlist</h1>
      <ul>
        {songs.map((song, index) => (
          <SongComponent song={song} key={song._id} />
        ))}
      </ul>
    </SongListStyles>
  );
};

export default SongList;
