import { useEffect } from "react";
import { useRouter } from "next/router";
import { ExistsGAID,pageview } from "../gtag";

const usePageView=()=>{
    const router = useRouter();

    useEffect(()=>{
        if(!ExistsGAID())return;
        router.events.on('routeChangeComplete',(path)=>{
            pageview(path);
        })
    },[router.events])
}

export default usePageView;