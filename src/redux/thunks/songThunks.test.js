import axios from "axios";
import {
  deleteSongActionCreator,
  loadOneSongActionCreator,
  loadSongsActionCreator,
} from "../features/songSlice";
import { mockSongs } from "../../mocks/mockSongs";
import {
  deleteSongThunk,
  loadOneSongThunk,
  loadSongsThunk,
} from "./songThunks";

describe("Given the loadSongsActionCreator function", () => {
  describe("When the loadSongsThunk function is called", () => {
    test("Then the loadSongsActionCreator function should be called", async () => {
      const token = "testToken";
      const dispatch = jest.fn();
      const response = { data: mockSongs };
      axios.get = jest.fn().mockResolvedValue(response);

      const expectedAction = loadSongsActionCreator(mockSongs);

      const thunk = loadSongsThunk(token);
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalledWith(expectedAction);
    });
  });
});

describe("Given the deleteSongThunk function", () => {
  describe("When it is called", () => {
    test("Then the deleteSongThunkActionCreator function should be called", async () => {
      const token = "testToken";
      const dispatch = jest.fn();

      const response = { data: mockSongs, status: 200 };
      axios.delete = jest.fn().mockResolvedValue(response);

      const expectedAction = deleteSongActionCreator(mockSongs[0].id);

      const thunk = deleteSongThunk(mockSongs[0].id, token);
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalledWith(expectedAction);
    });
  });
  test("Then the deleteSongThunkActionCreator function should be called with the statusCode 200", async () => {
    const id = 2;
    const dispatch = jest.fn();
    const action = deleteSongActionCreator(id);

    jest.spyOn(Storage.prototype, "getItem").mockRejectedValue(true);
    axios.delete = jest.fn().mockResolvedValue({ status: 200 });

    const thunk = deleteSongThunk(id);
    await thunk(dispatch);

    expect(dispatch).toHaveBeenCalledWith(action);
  });
});
//});

describe("Given the loadOneSongThunk function", () => {
  describe("When it is called", () => {
    test("Then the loadOneSongThunkActionCreator function should be called", async () => {
      const token = "testToken";
      const dispatch = jest.fn();
      const response = { data: mockSongs[0], status: 200 };

      axios.get = jest.fn().mockResolvedValue(response);

      const expectedAction = loadOneSongActionCreator(mockSongs[0].id, token);

      const thunk = loadOneSongThunk(mockSongs[0].id, token);
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalledWith(expectedAction);
    });
    test("Then the loadOneSongThunkActionCreator function should be called with the statusCode 200", async () => {
      const id = 2;
      const dispatch = jest.fn();
      const action = loadOneSongActionCreator(id);

      jest.spyOn(Storage.prototype, "getItem").mockRejectedValue(true);
      axios.get = jest.fn().mockResolvedValue({ status: 200 });

      const thunk = loadOneSongThunk(id);
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalledWith(action);
    });
  });
});
