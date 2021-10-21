
import React, { Component } from 'react';
import { Button, Carousel, Card } from 'react-bootstrap';
import {Form_comment} from '../common_line/Form_comment'
import {useDispatch, useSelector} from 'react-redux';

//Takes props: fileInfo (obj.title, obj.description, obj.id). 
//props.content - more elements for adding in body


export const CardElement = (props) => { 

  return( 
  <Card key={props.index}>
    <Card.Body >
      <Card.Title>{ props.fileInfoObj.title }</Card.Title>
      <Card.Text>
        <div>
          { props.fileInfoObj.description }<br />
          { props.content }
        </div>
      </Card.Text>
   </Card.Body>
  </Card>
) }
