import { useAuth0 } from "@auth0/auth0-react";
import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, unsetUser } from "../store";

export const SetUserInfo:FC<{}> = () => {

    const { user } = useAuth0()
    const dispatch = useDispatch()

    useEffect(() => {
        (user && user.name) ? dispatch(setUser({email: user.email, userName: user.username, userRole: user['https://db.fauna.com/roles'][0]})) : dispatch(unsetUser())
      }, [user])

      return <></>
}