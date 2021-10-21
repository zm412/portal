
import React, { Component } from 'react';
import { Button, Carousel, Card } from 'react-bootstrap';
import createArr from '../../../collection_func'
import { OpenFile } from '../common_components/OpenFile';
import {useDispatch, useSelector} from 'react-redux';
import { fetchDataPost } from '../../../collection_func'


export const Comment_card = (props) => { 
  const { userid, username, is_super } = useSelector(state => state.userInfo);
  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

  
  let deleteComment = async (e) => {
    fetchDataPost(`delete_comment/`, { id: e.target.dataset.commentid})
  }
 

  return( 
  <Card key={props.index}>
    <Card.Body>
      <Card.Text>User: {props.obj.username }</Card.Text>
      <Card.Text>Comment: { props.obj.comment }</Card.Text>
      <Card.Text>Date: { props.obj.created_at }</Card.Text>
    {
     (  userid == props.obj.user_id ||  is_super )  &&
      <Button data-commentid={props.obj.id} onClick={deleteComment} variant="primary">Delete comment</Button> 
    }
    </Card.Body>
  </Card>
) }
