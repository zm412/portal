
import createArr from '../../../collection_func'
import React, { Component } from 'react';
import { Button, Carousel, Card, Image } from 'react-bootstrap';
import { CommonCardElement } from './CommonCardElement'
import Player from '../common_components/useAudio2'
import {useDispatch, useSelector} from 'react-redux';
import { CreateBook } from '../common_components/CreateBook'
import { SliceBook } from './SliceBook'


export const OpenCommonFile = (props) => {

  const {userid, is_super, username} = useSelector(state => state.userInfo);
  let ifSaved = props.fileInfo.info.owners_list.filter(n => n.id == userid).length > 0 ? 'Saved on list' : 'Save on list'

  const buttons = <div>

    {
      props.fileInfo.info.user_id != userid && 

              <Button data-id={props.fileInfo.info.id} onClick={props.saveOnList} variant="success" className="m-1">{ifSaved}</Button> 
    }

              <Button data-id={props.fileInfo.info.id} onClick={props.showComments} className="m-1" variant="success">Comments ({props.fileInfo.info.comment_info.length })</Button> 
              <Image  className="m-1" src={ props.fileInfo.info.shared_info.likers.some(n => n.id == userid) 
                    ?  "https://img.icons8.com/fluent/22/000000/filled-like.png" 
                    : "https://img.icons8.com/material-outlined/20/000000/filled-like.png"
                  } data-id={props.fileInfo.info.id} onClick={props.addLike}/>({props.fileInfo.info.shared_info.likers.length})
  
    
          </div>



  const type_c = props.fileInfo.info.category_type;

  let innerMedia = type_c == 'book' ? <SliceBook fileInfo={props.fileInfo}  paragraphLimit={7} />

    : type_c == 'video' ?  <video width="100%" src={props.fileInfo.url} controls="controls" />

    : type_c == 'music' ? <Player url={props.fileInfo.url} />

    : type_c == 'picture' ?  <img className="d-block w-100" src={props.fileInfo.url} alt={props.fileInfo.url} />

    : <div>Hello</div>

  let innerForCard = <div>
                      <div>{ innerMedia }</div>
                      <div>{buttons}</div>
                    </div>


  let cardElement = <CommonCardElement 
                            index={0} 
                            fileInfoObj={props.fileInfo.info} 
                            content={innerForCard} 
                            mode={props.mode} 
                            addComment={props.addComment} 
                            isCommentsBlockOpened={props.isCommentsBlockOpened} 
                            closeCommentsBlock={props.closeCommentsBlock ? props.closeCommentsBlock : () => {}}
                            comments={props.comments} 
                            isCommentsListChanged={props.isCommentsListChanged}
                            openedItemId={props.openedItemId}
                              />
  

  return (
      <div>

    { props.fileInfo && cardElement }

    </div>
  )
   }


