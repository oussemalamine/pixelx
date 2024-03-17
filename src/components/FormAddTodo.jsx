import React, { useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

function FormAddTodo() {
  const [dueDate, setDueDate] = useState(new Date());

  const schema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    assignedto: yup.string().required(),
    deadline: yup.date(),
    urgency: yup.number().required(),
    status: yup.boolean().required(),
  });

  const handleSubmit = async (values) => {
    try {
      const { title, description, assignedto, deadline, urgency, status } = values;
      const addedon = dueDate; // Set addedon to the current date
      const response = await axios.post('http://localhost:5000/api/todos/addtodo', {
        title,
        description,
        assignedto,
        addedon,
        deadline,
        urgency,
        status,
      });
      console.log('Todo added successfully:', response.data);
      // Optionally, you can handle success by showing a success message or redirecting the user
    } catch (error) {
      console.error('Error adding todo:', error);
      // Optionally, you can handle errors by showing an error message to the user
    }
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={{
        title: '',
        description: '',
        assignedto: '',
        deadline: '',
        urgency: '',
        status: false,
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors, setFieldValue }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationFormik01">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={values.title}
                onChange={handleChange}
                isValid={touched.title && !errors.title}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationFormik02">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={values.description}
                onChange={handleChange}
                isValid={touched.description && !errors.description}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationFormik03">
              <Form.Label>Assigned To</Form.Label>
              <Form.Control
                type="text"
                name="assignedto"
                value={values.assignedto}
                onChange={handleChange}
                isInvalid={!!errors.assignedto}
              />
              <Form.Control.Feedback type="invalid">{errors.assignedto}</Form.Control.Feedback>
            </Form.Group>
            <Col md="6">
              <Form.Label>Deadline</Form.Label>
              <DatePicker
                selected={dueDate}
                onChange={date => setDueDate(date)}
                dateFormat="yyyy-MM-dd"
                className="form-control"
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationFormik04">
              <Form.Label>Urgency</Form.Label>
              <Form.Control
                type="number"
                name="urgency"
                value={values.urgency}
                onChange={handleChange}
                isInvalid={!!errors.urgency}
              />
              <Form.Control.Feedback type="invalid">{errors.urgency}</Form.Control.Feedback>
            </Form.Group>

          </Row>
          <Button type="submit">Submit form</Button>
        </Form>
      )}
    </Formik>
  );
}

export default FormAddTodo;
