import '@testing-library/jest-dom';
//This test verifies that the Register page renders correctly and displays the email input field to the user

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

import { store } from "../../store";

import Register from "../../pages/Register";

describe("testing register page",()=>{

  it("checking email input",()=>{

    render(

      <Provider store={store}>

        <BrowserRouter>

          <Register />

        </BrowserRouter>

      </Provider>

    );

    expect(

      screen.getByPlaceholderText(/you@example.com/i)

    ).toBeInTheDocument();

  })

})