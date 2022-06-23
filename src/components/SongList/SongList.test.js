import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import SongList from "./SongList";
import store from "../../redux/store/store";
import { BrowserRouter } from "react-router-dom";
import SongComponent from "../Song/SongComponent";
import userEvent from "@testing-library/user-event";

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
});
