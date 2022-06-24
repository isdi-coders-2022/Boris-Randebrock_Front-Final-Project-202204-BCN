import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import userEvent from "@testing-library/user-event";
import store from "./redux/store/store";

jest.mock("jwt-decode", () => () => ({
  id: "1",
  name: "josep",
  username: "josep",
}));

const mockUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUseNavigate,
}));

describe("Given an App component", () => {
  describe("When it's rendered", () => {
    test("Then it should navigate to /songlist", () => {
      const userMockSlice = createSlice({
        name: "user",
        initialState: { username: "josep", logged: true },
        reducers: {},
      });
      const mockStore = configureStore({
        reducer: { user: userMockSlice.reducer },
      });

      render(
        <Provider store={mockStore}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      );

      expect(mockUseNavigate).toHaveBeenCalled();
    });
  });
  describe("When a user is logged in", () => {
    test("Then it should render the login button", () => {
      const userMockSlice = createSlice({
        name: "user",
        initialState: { username: "josep", logged: true },
        reducers: {},
      });
      const mockStore = configureStore({
        reducer: { user: userMockSlice.reducer },
      });

      render(
        <Provider store={mockStore}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      );

      const testElement = screen.getByRole("button", {
        name: "login",
      });

      expect(testElement).toBeInTheDocument();
    });
    test("Then it should dispatch the loginActionCreator", () => {
      const userMockSlice = createSlice({
        name: "user",
        initialState: { username: "josep", logged: true },
        reducers: {},
      });
      const mockStore = configureStore({
        reducer: { user: userMockSlice.reducer },
      });

      render(
        <Provider store={mockStore}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      );

      const testElement = screen.getByRole("button", {
        name: "login",
      });

      userEvent.click(testElement);

      expect(mockUseNavigate).toHaveBeenCalled();
    });
    test("Then it should", () => {
      const MockEffect = jest.fn();
      const userMockSlice = createSlice({
        name: "user",
        initialState: { username: "josep", logged: true },
        reducers: {},
      });

      const mockStore = configureStore({
        reducer: { user: userMockSlice.reducer },
      });

      render(
        <Provider store={mockStore}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      );

      const testElement = screen.getByRole("button", {
        name: "login",
      });

      userEvent.click(testElement);

      expect(MockEffect).not.toHaveBeenCalled();
    });
  });
});

describe("Given the App component", () => {
  describe("When rendered and a user is logged", () => {
    test("Then it should navigate to /songlist", () => {
      const mockUseNavigate = jest.fn();

      jest.mock("react-router-dom", () => ({
        useNavigate: () => mockUseNavigate,
      }));

      let mockLogged = false;

      const logginButton = "/songlist";

      const mockUserSlice = createSlice({
        name: "user",
        initialState: { logged: mockLogged },
        reducers: {},
      });
      const mockStore = configureStore({
        reducer: { user: mockUserSlice.reducer },
      });

      render(
        <Provider store={mockStore}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      );

      expect(mockUseNavigate).not.toHaveBeenCalledWith(logginButton);
    });
  });
});

describe("Given an App component function", () => {
  describe("When invoked and the user is not logged", () => {
    test("Then it should render a login form with a 'login' button", async () => {
      const expectedButtonText = "login";

      render(
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>
      );

      const loginButton = screen.getByRole("button", {
        name: expectedButtonText,
      });

      expect(loginButton).toBeInTheDocument();
    });
  });

  describe("When invoked and the user is logged", () => {
    test("Then it should render a navigation element", async () => {
      const actionLogin = {
        type: "user/login",
        payload: {
          username: "fra432",
          id: "62a0a3ad54725136008cb9d8",
        },
      };

      render(
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>
      );

      await waitFor(() => {
        store.dispatch(actionLogin);
      });

      const navElement = screen.getByText("login");

      expect(navElement).toBeInTheDocument();
    });
    test("Then the user should navigate to /songlist", async () => {
      const actionLogin = {
        type: "user/login",
        payload: {
          username: "fra432",
          id: "62a0a3ad54725136008cb9d8",
        },
      };

      render(
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>
      );

      await waitFor(() => {
        store.dispatch(actionLogin);
      });

      const navElement = screen.getByText("login");

      userEvent.click(navElement);

      expect(mockUseNavigate).toHaveBeenCalled();
    });
    test("Then the loginCreator should be called", async () => {
      const actionLogin = {
        type: "user/login",
        payload: {
          username: "fra432",
          id: "62a0a3ad54725136008cb9d8",
        },
      };

      render(
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>
      );

      await waitFor(() => {
        store.dispatch(actionLogin);
      });

      const navElement = screen.getByText("login");

      userEvent.click(navElement);

      expect(mockUseNavigate).toHaveBeenCalled();
    });
  });
});

const userLoggedCredentials = {
  username: "fra432",
  password: "1234",
};
jest.mock("jwt-decode", () => () => userLoggedCredentials);

describe("Given this App component", () => {
  describe("When it's instantiated with a token in local storage", () => {
    test("Then it should show a list item", () => {
      Object.defineProperty(window, "localStorage", {
        value: {
          getItem: jest.fn(() => "token"),
        },
      });

      const userMockSlice = createSlice({
        name: "user",
        initialState: { name: "fra432", password: "1234", logged: true },
        reducers: {},
      });
      const mockStore = configureStore({
        reducer: {
          user: userMockSlice.reducer,
        },
      });

      render(
        <BrowserRouter>
          <Provider store={mockStore}>
            <App />
          </Provider>
        </BrowserRouter>
      );

      const list = screen.getByText("it`s only rock 'n' roll");

      expect(list).toBeInTheDocument();
    });
  });
});
