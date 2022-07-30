import { useEffect } from "react";
import { useRouter } from "next/router";
import { ExistsGAID,pageview } from "../gtag";

const usePageView=()=>{
    const router = useRouter();

    useEffect(()=>{
        if(!ExistsGAID())return;
        const handleRouteChange = (url: string) => {
            pageview(url);
          };
        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
          };
    },[router.events])
}

export default usePageView;