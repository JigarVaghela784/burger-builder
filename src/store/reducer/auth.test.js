import reducer from "./authReducer";
import * as actionTypes from '../action/actionTypes';

describe('auth reducer',()=>{
    it('should return initial state',()=>{
        expect(reducer(undefined,{})).toEqual( {
            token: null,
            userId: null,
            error: null,
            loading: false,
            authNavigateToPath: "/",
          })
    })
    it('should store  the token upon login')
})
