import { Container, Card, Button } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import imagiie from '../assets/imagiie.png'

const Hero = () => {
  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center mb-4'>Image Gallery</h1>
          <p className='text-center mb-4'>
            Welcome To the <strong>Image Gallery</strong>! Wanna upload random images and drag them around on screen? Then sign up to get started or sign in if you already have an account!
          </p>
      
          <div className='d-flex'>
            <LinkContainer to='/login'>
            <Button variant='primary' className='me-3'>
              Sign In
            </Button>
            </LinkContainer>
            
            <LinkContainer to='/register'>
            <Button variant='secondary'>
              Sign Up
            </Button>
            </LinkContainer>
          </div>
          <img src={imagiie} alt="image" className='text-center mt-4 w-75 h-75 rounded'/>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;