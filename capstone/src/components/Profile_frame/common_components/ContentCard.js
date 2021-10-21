
import React, { Component } from 'react';
import useAudio from './useAudio'
import { Button, Carousel, Card } from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {setIsShared} from '../../../reducers/checkItemReducer'
import { get_files } from '../../../collection_func'

//props : mode, type_content, fileInfo
//mode == 'user' : funcDelete, shareItem
//mode == 'admin' : funcDeleteFromDb, funcApproveFile 
//mode == 'common_user' : saveOnList, showComments, addComment

export const ContentCard = (props) => {
  let objProps = props.objProps;
   
    let buttonSpecial = objProps.type_content && objProps.type_content == 'music'
      ?  <Button  onClick={toggle(index)}>{props.fileInfo.playing ? 'Pause' : 'Play'}</Button> 
      : <Button data-id={props.fileInfo.info.id} onClick={objProps.handlerOpen} variant="outline-primary">Open</Button>


    let buttonContent = props.mode == 'admin' 
      ? <div> 
            <Button data-id={props.fileInfo.info.id} onClick={objProps.funcDeleteFromDb} variant="outline-primary">Delete from DB</Button> 
            <Button data-id={props.fileInfo.info.id} onClick={objProps.funcApproveFile} variant="outline-primary">Positive</Button> 
            <Button data-id={props.fileInfo.info.id} onClick={objProps.funcApproveFile} variant="outline-primary">Negative</Button> 
        </div>
      : props.mode == 'user'
      ? <div>
            <Button data-id={props.fileInfo.info.id} onClick={objProps.funcDelete} variant="outline-primary">Delete</Button>
      {
        !props.fileInfo.info.shared_info && 
            <Button data-id={props.fileInfo.info.id} onClick={objProps.shareItem} variant="outline-primary">To share</Button>
      }
      {
        props.fileInfo.info.shared_info && 
            <p>{ props.sharingInfo }</p>
      }
         </div>
      :
          <div>
              <Button data-id={props.fileInfo.info.id} onClick={objProps.saveOnList} variant="outline-primary">Save on list</Button> 
              <Image src={ props.fileInfo.info.shared_info.likers.some(n => n.id == userid) 
                    ?  "https://img.icons8.com/fluent/22/000000/filled-like.png" 
                    : "https://img.icons8.com/material-outlined/20/000000/filled-like.png"
                  } data-id={props.fileInfo.info.id} onClick={objProps.addLike}/>
  
              <Button data-id={props.fileInfo.info.id} onClick={objProps.showComments} variant="outline-primary">Show comments</Button> 
    
          </div>


    let content = <div index={index}> 
                    { buttonSpecial }
                    { buttonContent }
                </div>
      
    return( {content}) 
}



