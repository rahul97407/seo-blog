import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import { loginWithGoogle  , authenticate , isAuth} from '../../actions/auth'
import { GOGGLE_CLIENT_ID } from '../../config'
import GoogleLogin from 'react-google-login'


const LoginGoogle = () => {

    const responseGoogle = response => {
        const tokenId = response.tokenId 
        const user = {tokenId}

        loginWithGoogle(user)
        .then(data => {

            console.log(data)
            if(data.error){
                console.log(data.error)
            }

            else{
                authenticate(data, () => {
                    if (isAuth() && isAuth().role === 1) {
                        Router.push('/admin');
                    }
                    else Router.push('/user');
                })
            }
        })
    }

    return (
        <div className="pb-3">
            <GoogleLogin 
            clientId = {`${GOGGLE_CLIENT_ID}`}
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            theme ="dark"
            >

            </GoogleLogin>
        </div>
    )
}


export default LoginGoogle;