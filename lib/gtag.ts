export const GA_ID:string = process.env.NEXT_PUBLIC_GA_ID|| '';

export const ExistsGAID =()=> GA_ID!=="";
//ページ遷移時イベントのみ記述

export const pageview = (url: string): void => {
    // GA_TRACKING_ID が設定されていない場合は、処理終了
    if (!ExistsGAID()) return;
    window.gtag('config', GA_ID, {
      page_path: url,
    });
  };