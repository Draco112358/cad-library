import { IdToken, useAuth0 } from "@auth0/auth0-react";
import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store";

export const User: FC<{}> = () => {

    const { getIdTokenClaims } = useAuth0()
    const dispatch = useDispatch()

    useEffect(() => {
        const getToken = async () => {
            const tok = await getIdTokenClaims()
            return tok
        }
        getToken().then(token => (token && token.name) && dispatch(setUser({userName: token.name, userRole: token['https.//db.fauna.com/roles'][0]})))
    }, [])


    return <></>
}