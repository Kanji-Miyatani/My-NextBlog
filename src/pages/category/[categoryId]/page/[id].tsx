import { GetStaticPaths } from 'next';
import React from 'react'
import { GetAllCategories } from '../../../lib/posts';

function TagName() {
  return (
    <div>

    </div>
  )
}

export const getStaticPaths:GetStaticPaths=async()=>{
    const categories =await GetAllCategories();
    const paths = categories.map(category=>({
        params:{
            tagName:category.name
        }
    }))
    return {
        paths,
        fallback:false
    }
}

export default TagName;