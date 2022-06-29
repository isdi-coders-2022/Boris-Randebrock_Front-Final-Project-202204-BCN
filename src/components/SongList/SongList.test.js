import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import SongList from "./SongList";
import store from "../../redux/store/store";
import { BrowserRouter } from "react-router-dom";
import SongComponent from "../Song/SongComponent";
import userEvent from "@testing-library/user-event";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { mockSongs, mockListSongs } from "../../mocks/mockSongs";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

jest.mock("../../redux/thunks/userThunks", () => ({
  loadSongsThunk: jest.fn(),
}));

describe("Given the SongList component", () => {
  describe("When it is rendered", () => {
    test("Then it should render the SongComponent", () => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <SongList />
          </Provider>
        </BrowserRouter>
      );
      const testElement = screen.getByRole("heading", {
        name: "Songlist",
      });

      expect(testElement).toBeInTheDocument();
    });

    test("Then a listItem should be present with the key song", () => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <SongList />
          </Provider>
        </BrowserRouter>
      );

      const testElement = screen.getByRole("heading", {
        name: "Songlist",
      });

      expect(testElement).toBeInTheDocument();
    });
  });

  describe("When the details-button is clicked", () => {
    test("Then it should navigate to the details page", () => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <SongList />
            <SongComponent song />
          </Provider>
        </BrowserRouter>
      );

      const detailsButton = screen.getByText("details");
      userEvent.click(detailsButton);

      expect(detailsButton).toBeInTheDocument();
      expect(detailsButton).not.toHaveAttribute("type", "button");
    });
  });
});

describe("Given a SongList component", () => {
  describe("When instantiated", () => {
    test("Then it should show a list of songs", () => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <SongList />
          </Provider>
        </BrowserRouter>
      );
      const listItems = screen.getByText("Songlist");

      expect(listItems).toBeInTheDocument();
    });
  });
  describe("When invoked", () => {
    test("Then it should render a title with a text 'Songlist'", () => {
      const expectedText = "Songlist";
      render(
        <Provider store={store}>
          <SongList />
        </Provider>
      );
      const result = screen.getByText("Songlist");

      expect(result.textContent).toBe(expectedText);
    });
    test("Then it should render a list of songs", () => {});
  });
});
describe("Given a SList component", () => {
  describe("When rendered with a list of two songs", () => {
    test("Then it should render the title of the two songs", () => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <SongList songs={mockSongs} />
          </Provider>
        </BrowserRouter>
      );

      const listItems = screen.getByText("Songlist");

      expect(listItems).toBeInTheDocument();
    });
  });
});

describe("Given the List component", () => {
  describe("When calling it with a song array", () => {
    test("Then it should render a song card for each element", () => {
      const mockSlice = createSlice({
        name: "song",
        initialState: mockListSongs,
        reducers: {},
      });
      const expectedText = "David Bowie";

      const mockStore = configureStore({
        reducer: {
          song: mockSlice.reducer,
        },
      });

      render(
        <BrowserRouter>
          <Provider store={mockStore}>
            <SongList />
          </Provider>
        </BrowserRouter>
      );

      const detailsButton = screen.getByText(expectedText);

      expect(detailsButton).toBeInTheDocument();
    });
  });
});
