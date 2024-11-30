import { useSearch } from "@/hooks/useSearch"

type Props = {
    workspaceId: string
}

const Search = ({workspaceId}: Props)=>{
    const {query,onSearchQuery,isFetching,onUser} = useSearch(
        'get-users',
        'USERS'
    )

    const {} =  useMutationData
    return <div className="">Search</div>
}

export default Search