export interface IArticle {
    id: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    revisedAt: string
    title: string
    content: string
    description:string
    eyecatch:{
        url: string
    height: number
    width: number
    }
    category:{
        id: string
        name: string
    }
    Tags: Array<{
        name:string
    }>
  }

  export interface IEyeCatch{
    url: string
    height: number
    width: number
  }

export interface IPaths{
   id:string
}

export interface IMicroCMSRes{
  contents:IArticle[],
  totalCount: number,
    offset: number,
    limit: number
}