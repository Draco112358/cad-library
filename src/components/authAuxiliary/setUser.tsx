import { IdToken, useAuth0 } from "@auth0/auth0-react";
import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store";

export const SetUser: FC<{}> = () => {

    const { user } = useAuth0()
    const dispatch = useDispatch()

    useEffect(() => {
        (user && user.name) && dispatch(setUser({userName: user.name, userRole: user['https://db.fauna.com/roles'][0]}))
    }, [])

    return <></>
}