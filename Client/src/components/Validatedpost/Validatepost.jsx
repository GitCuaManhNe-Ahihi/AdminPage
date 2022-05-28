import React, { useEffect } from 'react'
import { postService } from '../../Service/PostService';
import CardContainer from '../UI/Card/CardContainer'
import HeaderSearch from '../UI/HeaderSearch/HeaderSearch'
import CardP from '../UI/Card/CardP';
import useSWR from 'swr'
import { browseService } from '../../Service/PostService';

export default function Validatepost() {
  const [loading, setLoading] = React.useState(false);
  const {data,mutate} = useSWR("article",postService)
  const handle_Browse = async(id) => {
    try{
       await browseService({id:id,validator:1});
       mutate();
    }
    catch(err){
      console.log(err);
    }
  }
  const handle_Un_Browse = async(id) => {
    try{
       await browseService({id:id,validator:-1});
       mutate();
    }
    catch(err){
      console.log(err);
    }
  }

  return (
      <>
      <HeaderSearch></HeaderSearch>
      <CardContainer>
        {
          data?.map((item, index) => {
            return item.validator?null:<CardP type={1}  handle_Un_Browse={handle_Un_Browse}  handle_Browse={ handle_Browse} key={index} data={item}  browse={1}></CardP>
          })
        }
      </CardContainer>
      </>
  )
}
