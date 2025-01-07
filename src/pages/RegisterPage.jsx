import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import RegisterInput from '../components/RegisterInput';
import { asyncRegisterUser } from '../states/users/action';

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));
    navigate('/');
  };

  return (
    <Container className="register-page">
      <Row className="justify-content-center">
        <Col md={6}>
          <article className="register-page__main">
            <h2 className="text-center mb-4">Join Us and Start Exploring!</h2>

            <RegisterInput register={onRegister} />

            <p className="mt-3 text-center">
              Already have an account?{' '}
              <Link to="/">Login</Link>
            </p>
          </article>
        </Col>
      </Row>
    </Container>
  );
}

export default RegisterPage;
