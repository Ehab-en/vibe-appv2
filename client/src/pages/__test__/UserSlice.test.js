//This test verifies that the UserSlice returns the correct initial Redux state when the application starts
import {

  describe,

  expect,

  it

} from 'vitest';

import reducer from '../../features/UserSlice';

const test_state = {

    user: null,

    message: "",

    isLoading: false,

    isSuccess: false,

    isError: false

}

describe("testing slice",()=>{

    it("testing initial state in slice",()=>{

        expect(

            reducer(

                undefined,

                {

                    type: undefined

                }

            )

        ).toEqual(test_state);

    })

})