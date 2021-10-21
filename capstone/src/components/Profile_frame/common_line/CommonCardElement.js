
import React, { Component } from 'react';
import { Button, Carousel, Card } from 'react-bootstrap';
import {Form_comment} from './Form_comment'
import {useDispatch, useSelector} from 'react-redux';

//Takes props: fileInfo (obj.title, obj.description, obj.id). 
//props.content - more elements for adding in body


export const CommonCardElement = (props) => { 
  const [comments, setComments] = React.useState(props.comments);
  if(props.fileInfoObj.id != props.openedItemId){
    props.closeCommentsBlock();
  }

  return( 
  <Card key={props.index}>
    <Card.Body>
      <Card.Title>{ props.fileInfoObj.title }</Card.Title>
      <Card.Text>{ props.fileInfoObj.description }</Card.Text>
        { props.content }
        { props.isCommentsBlockOpened &&
                    <Form_comment 
                        submitFunc={props.addComment} 
                        itemId={props.fileInfoObj.id} 
                        comments={props.comments}  
                        isCommentsListChanged={props.isCommentsListChanged}
                    /> }
    </Card.Body>
  </Card>
) }
