
import { createArr } from '../../../collection_func'
import React, { Component } from 'react';
import { Button, Carousel, Card, Image } from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';


export const SliceBook = (props) => {

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
                setDataArr(doc[0]) 
              })
          })
    }

  }, []);




  return (<div> 
              <p> { dataArr && dataArr} </p>
              <p>...</p>
          </div> )

   }


