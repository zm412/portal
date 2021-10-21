
import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

export const  Modal_bt = (props) => {
  const [show, setShow] = React.useState(false);
  const [carouselOn, setCarouselOn] = React.useState(false);
  const [fullscreen, setFullscreen] = React.useState(true);
  
  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  const handleClose = () => { 
    props.closeViewer();
    setCarouselOn(false)
    setShow(false)
  }

  const showCarousel = () => setCarouselOn(true);

  return ( <div className='row'>
      <Button variant="primary" className="col-sm-5 mt-4 center_cl" onClick={()=>handleShow('md-down')}>{props.name}</Button> 
      <Modal show={show} onHide={handleClose}  size="lg" fullscreen={fullscreen}>
        <Modal.Header >
          <Modal.Title>{ props.title }</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal_size'>{ carouselOn ? props.content2 : props.content1 }</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            Close
          </Button>

          <Button variant="success" onClick={showCarousel}>
           Open All 
          </Button>

    {
      !props.cardSetOn && <Button variant="success" onClick={props.closeViewer}> Close viewer </Button>
    }
        </Modal.Footer>
      </Modal>
    </div>
  );
}

