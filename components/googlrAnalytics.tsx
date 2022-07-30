import React from 'react'
import { ExistsGAID,GA_ID } from '../lib/gtag'

function GooglrAnalytics() {
   return ExistsGAID()?
    <>
      {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}></script>
      <script dangerouslySetInnerHTML={{
        __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-683WN9HR4B');`
      }}>
      </script>
    </>:
    <></>
    
}

export default GooglrAnalytics