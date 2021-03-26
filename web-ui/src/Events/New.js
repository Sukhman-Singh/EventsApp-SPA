import React from 'react';

import { Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react'
import { useHistory } from 'react-router-dom';

import { create_event, fetch_events } from '../api';

import flatpickr from "flatpickr";

export default function EventsNew() {
  let history = useHistory();
  let [event, setEvent] = useState({
    name: "",
    body: "",
    date: "",
  });

  function onSubmit(ev) {
    ev.preventDefault();
    console.log(ev);
    console.log(event);
    create_event(event).then((resp) => {
      if (resp["errors"]) {
        console.log("errors", resp.errors);
      }
      else {
        history.push("/");
        fetch_events();
      }
    });
  }

  function update(field, ev) {
    let p1 = Object.assign({}, event);
    p1[field] = ev.target.value;
    setEvent(p1);
  }

  flatpickr('#date',
	  {
		  enableTime:true,
		  dateForm:"Y-m-d H:i",
		  onChange: function(_selectedDates, dateStr, _instance) {
			  let p1 = Object.assign({}, event);
			  p1["date"] = dateStr;
			  setEvent(p1);
		  }
	  });

   return (
    <Row>
      <Col>
        <h2>New Event</h2>
        <Form onSubmit={onSubmit}>
        
	  <Form.Group>
            <Form.Label>Event Name</Form.Label>
            <Form.Control as="textarea"
                          rows={1}
                          onChange={
				  (ev) => update("name", ev)}
                          value={event.name} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Body</Form.Label>
            <Form.Control as="textarea"
                          rows={4}
                          onChange={
				  (ev) => update("body", ev)}
                          value={event.body} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Date</Form.Label>
            <Form.Control type="text"
	                  id="date"
                          onChange={
				  (ev) => update("date", ev)}
	   		  value={event.date} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Create
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
