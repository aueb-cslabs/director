import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm, formValueSelector } from "redux-form";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserForm = props => {
  return (
    <Form noValidate onSubmit={props.handleSubmit}>
      <Form.Row>
        {props.dn ? (
          <Form.Group as={Col} md="12">
            <Form.Label>DN</Form.Label>
            <Field
              className="form-control"
              name="dn"
              component="input"
              type="text"
              disabled
            />
          </Form.Group>
        ) : null}

        <Form.Group as={Col} md="6">
          <Form.Label>Username</Form.Label>
          <Field
            className="form-control"
            name="username"
            component="input"
            type="text"
            disabled={props.created_at}
          />
        </Form.Group>
        <Form.Group as={Col} md="6">
          <Form.Label>Full Name</Form.Label>
          <Field
            className="form-control"
            name="full_name"
            component="input"
            type="text"
            disabled={!props.local}
          />
        </Form.Group>

        <Form.Group as={Col} md="6">
          <Form.Label>Email Address</Form.Label>
          <Field
            className="form-control"
            name="email_address"
            component="input"
            type="text"
            disabled={!props.local}
          />
        </Form.Group>

        {true ? (
          <Form.Group as={Col} md="6">
            <Form.Label>Phone Number</Form.Label>
            <Field
              className="form-control"
              name="phone_number"
              component="input"
              type="text"
              disabled={!props.local}
            />
          </Form.Group>
        ) : null}

        {true ? (
          <Form.Group as={Col} md="6">
            <Form.Label>Type</Form.Label>
            <Field
              className="custom-select"
              name="type"
              component="select"
              normalize={value => parseInt(value)}
              disabled={false}
            >
              <option value="0">Normal</option>
              <option value="1">Administrator</option>
              <option value="2">Super Administrator</option>
            </Field>
          </Form.Group>
        ) : null}

        <Form.Group as={Col} md="6">
          <Form.Label>Affiliation</Form.Label>
          <Field
            className="form-control"
            name="affiliation"
            component="input"
            type="text"
            disabled={!props.local}
          />
        </Form.Group>
      </Form.Row>

      <Button type="submit">
        <FontAwesomeIcon icon="save" />
        &nbsp;
        {props.created_at ? "Save" : "Create"}
      </Button>

      {!props.local ? (
        <Button
          variant="warning"
          type="button"
          onClick={() => {
            props.change("local", true);
            props.change("dn", null);
          }}
        >
          Convert to local
        </Button>
      ) : null}

      {props.otp_key ? (
        <Button
          variant="danger"
          type="button"
          onClick={() => props.change("otp_key", null)}
        >
          Remove OTP
        </Button>
      ) : null}

      {props.created_at ? (
        <Button className={"float-right"} variant="danger" type="submit">
          <FontAwesomeIcon icon="trash" />
          &nbsp; Delete
        </Button>
      ): null}
    </Form>
  );
};

const selector = formValueSelector("user");

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  created_at: selector(state, 'created_at'),
  dn: selector(state, 'dn'),
  local: selector(state, 'local'),
  otp_key: selector(state, 'otp_key')
});

export default connect(mapStateToProps)(reduxForm({ form: "user" })(UserForm));
