
import createArr from '../../../collection_func'
import React, { Component } from 'react';
import { Button, Carousel, Card, Image } from 'react-bootstrap';
import { CardElement } from './CardElement'
import { CreateBook } from './CreateBook'
import Player from './useAudio2'
import {useDispatch, useSelector} from 'react-redux';
import { ButtonSet } from './ButtonSet'


export const OpenFile = (props) => {
 
  const {userid, is_super, username} = useSelector(state => state.userInfo);

  const type_c = props.fileInfo.info.category_type;

  let innerMedia = type_c == 'book' && !props.carousel ?  <CreateBook fileInfo={props.fileInfo}  paragraphLimit={8} />

    : type_c == 'book' && props.carousel ? <p> Category: { props.fileInfo.info.category_list ? props.fileInfo.info.category_list.map((n) => n.name)  : ''} </p>

    : type_c == 'video' ?  <video width="100%" src={props.fileInfo.url} controls="controls" />

    : type_c == 'music' ? <Player url={props.fileInfo.url} />

    : type_c == 'picture' ?  <img className="d-block w-100" src={props.fileInfo.url} alt={props.fileInfo.url} />

    : <div></div>

  let innerForCard = <div>
                      <div>{ innerMedia }</div>
                    </div>


  let cardElement = <div key={props.index}>

                      <ButtonSet {...props} content={innerForCard} index={0} />
                      
                  </div>
  

  return (
      <div >

    { props.fileInfo && cardElement }

    </div>
  )
   }


