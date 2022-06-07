export interface IArticle {
    id: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    revisedAt: string
    title: string
    body: string
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