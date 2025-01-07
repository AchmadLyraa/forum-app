import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import LoginInput from '../components/LoginInput';
import { asyncSetAuthUser } from '../states/authUser/action';

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authUser } = useSelector((states) => states);

  if (authUser) {
    navigate('/');
  }

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <Container className="login-page">
      <Row className="justify-content-center">
        <Col md={6} className="justify-content-center">

          <article className="login-page__main">
            <h2 className="text-center mb-4">
              See <strong>The Ideas</strong>, <br />
              Through Forum App.
            </h2>

            <LoginInput login={onLogin} />
            <p className="mt-3 text-center">
              Don&apos;t have an account?{' '}
              <Link to="/register">Register</Link>
            </p>
          </article>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
