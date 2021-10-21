
import React, { Component } from 'react';
import { Col, Row, Form, Button, Carousel, Card } from 'react-bootstrap';
import { Comment_card } from './Comment_card'
import {setComments, setItemId, setIsCommentsListChanged, setIsCommentsBlockOpened} from '../../../reducers/commentsReducer'
import {useDispatch, useSelector} from 'react-redux';


export const Form_comment = (props) => {

  const [comments, setComments] = React.useState(props.comments);


  return (
    <div>
    { props.comments && props.comments.map((n, i) =>  <div key={i}><Comment_card obj={n} index={i} /></div> ) }

    <Form data-id={props.itemId} onSubmit={props.submitFunc}>
      <Row className="align-items-center">
        <Col xs="auto">
        <Form.Label>Example textarea</Form.Label>
        <Form.Control as="textarea" required type='text' name='comment' rows={3} />
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col xs="auto">
        
          <Button type="submit">Submit</Button>
        </Col>
      </Row>
    </Form>
  </div>

 )
}
