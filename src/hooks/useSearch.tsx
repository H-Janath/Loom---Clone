import { useEffect, useState } from "react"
import { userQueryData } from "./userQueryData";
import { searchUsers } from "@/actions/user";

export const useSearch = (key: string,type:'USERS') =>{
    const [query,setQuery] = useState('');
    const [debounse,setDebounse] = useState('');
    const [onUser,setOnUser] = useState<{
        id: string,
        subscription:{
            plan: "PRO" | "FREE" 
        } | null,
        firstname: string | null,
        lastname: string | null,
        image: string | null,
        email: string | null  
    }[]
    | undefined
    >(undefined)

    const onSearchQuery = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setQuery(e.target.value)
    }

    useEffect(()=>{
        const delayInputTimeoutId = setTimeout(()=>{
            setDebounse(query)
        },1000)
        return ()=> clearTimeout(delayInputTimeoutId)
    },[query])

    const {refetch,isFetching} = userQueryData(
        [key,debounse],
        async({queryKey})=>{
            if(type==="USERS"){
                const workspace = await searchUsers(queryKey[1] as string);
                if(workspace.status ===200){
                    setOnUser(workspace.data);
                }
            }
            
        },
        false
    )

    useEffect(()=>{
        if(debounse) refetch()
        if(!debounse) setOnUser(undefined)
        return ()=>{
            debounse
        }
    },[debounse])

    return {onSearchQuery,query,isFetching,onUser};

}