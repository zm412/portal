
import { createArr } from '../../../collection_func'
import React, { Component } from 'react';
import { Button, Carousel, Card, Image } from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';


export const CreateBook = (props) => {

  const [dataArr, setDataArr] = React.useState(null);
 
  React.useEffect(() => {
   async function get_book (url){
    let response = await fetch(url);
    return await response.text();
   }

    if(props.fileInfo.info.category_type == 'book'){
        get_book(props.fileInfo.url)
          .then(text => { 
            createArr(text, props.paragraphLimit, props.fileInfo.url.endsWith('fb2'))
              .then(doc => { 
                setDataArr(doc) 
              })
          })
    }

  }, []);


  let listPage = dataArr ? dataArr.map((item, index) =>{  
      let block1 = item.map((n, i) =>(<p key={i} className='left_text'>{n}</p>));

      return( 
              <Carousel.Item key={index}>
                <div>{index+1} page</div>
                {block1}
              </Carousel.Item>
            ) 
  })
: '';



  return ( <Carousel interval={null}> { listPage } </Carousel> )

   }


