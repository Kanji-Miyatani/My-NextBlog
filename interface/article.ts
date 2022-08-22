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
    Tags: Array<ITags>
    RelatedLinks:IArticle[]
  }

  export interface ITags{
    id:string
    tag:string
  }
  export interface ICategories{
    id:string
    name:string
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
  totalCount: number,
    offset: number,
    limit: number
}

export interface IMicroCMSBlogRes extends IMicroCMSRes{
  contents:IArticle[]
}

export interface IMicroCMSCategoriesRes extends IMicroCMSRes{
  contents:ICategories[]
}

export interface ITocs{
  text:string | null,
  id:string,
  name:string,
}

export interface ICategoryCount extends ICategories{
  count :number;
}