import '@testing-library/jest-dom';
//This test verifies that the Register button is rendered correctly on the Register page
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

describe("testing register button",()=>{

  it("checking register button",()=>{

    render(

      <Provider store={store}>

        <BrowserRouter>

          <Register />

        </BrowserRouter>

      </Provider>

    );

    expect(

      screen.getByText(/register/i)

    ).toBeInTheDocument();

  })

})