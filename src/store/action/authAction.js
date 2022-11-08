import axios from 'axios'
import * as actionTypes from './actionTypes'

export const authStart=()=>{
    return{
        type:actionTypes.AUTH_START
    }
}
export const authSuccess=(token,userId)=>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        token:token,
        userId:userId
    }
}
export const authFail=(error)=>{
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}

export const authLogout=()=>{
    return{
        type:actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout=(expirationTime)=>{
    return dispatch=>{
        setTimeout(() => {
            dispatch(authLogout())
        }, expirationTime*1000);
    }
}

export const auth=(email,password,isSignup)=>{
    return dispatch=>{
        dispatch(authStart())
        const authData={
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA-eh1id1YzRG6c8MSABR_XUn2l0lauqRA'
        if(!isSignup){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA-eh1id1YzRG6c8MSABR_XUn2l0lauqRA'
        }
        console.log('isSignup', isSignup)
        axios.post(url,authData)
        .then(response=>{
            // console.log('response', response.data.expiresIn)
            dispatch(authSuccess(response.data.idToken,response.data.localId))
            dispatch(checkAuthTimeout(response.data.expiresIn))
        })
        .catch(error=>{
            console.log('error', error.response.data.error.message)
            dispatch(authFail(error.response.data.error))
        })
    }
}