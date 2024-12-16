import {parseAsString, useQueryState} from "nuqs"

export function useSearchParam(){
    return useQueryState( 
    "search" ,  //passed as search in useQueryState(searchi-input component) ||this is dynamic but yha directly bhi likh sakte hai agar ek hi jaga use krna hai toh, 
        parseAsString.withDefault("").withOptions({clearOnDefault:true})
    )
}