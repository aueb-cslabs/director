import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TerminalForm = (props) => {
  return (
    <Form noValidate onSubmit={props.handleSubmit}>
      <Form.Row>

        <Form.Group as={Col} md="6">
          <Form.Label>Name</Form.Label>
          <Field className="form-control" name="name" component="input" type="text"/>
        </Form.Group>
        <Form.Group as={Col} md="6">
          <Form.Label>Hostname</Form.Label>
          <Field className="form-control" name="hostname" component="input" type="text"/>
        </Form.Group>

        <Form.Group as={Col} md="6">
          <Form.Label>Address</Form.Label>
          <Field className="form-control" name="addr" component="input" type="text"/>
        </Form.Group>

      </Form.Row>

      <Button type="submit">
        <FontAwesomeIcon icon="save" />
        &nbsp;
        Save
      </Button>

    </Form>
  );
}

const selector = formValueSelector('terminal')

const mapStateToProps = (state, ownProps) => (
  {
    ...ownProps,
  }
)

export default connect(mapStateToProps)(reduxForm({form: 'terminal'})(TerminalForm))