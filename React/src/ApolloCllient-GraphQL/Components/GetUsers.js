import React, { useEffect, useState } from "react";
import {useQuery, gql} from '@apollo/client' 
import { LOAD_USERS } from "../GraphQL/Queries";

function GetUsers(){
    const {error, loading, data} = useQuery(LOAD_USERS)
    const [users, setUsers] = useState()
    useEffect(()=>{
        console.log(data)
    },[data])

    return <div></div>
}

export default GetUsers