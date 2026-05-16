import '@testing-library/jest-dom';
//Does the Login page render correctly and display the email input field
import {

  render,

  screen

} from "@testing-library/react";

import {

  describe,

  it,

  expect

} from "vitest";

import {

  Provider

} from "react-redux";

import {

  BrowserRouter

} from "react-router-dom";

import {store} from "../../store";

import Login from "../../pages/Login";

describe("testing login page",()=>{

  it("checking login heading",()=>{

    render(

      <Provider store={store}>

        <BrowserRouter>

          <Login />

        </BrowserRouter>

      </Provider>

    );
   expect(

  screen.getByPlaceholderText(/you@example.com/i)

).toBeInTheDocument();
  })

})