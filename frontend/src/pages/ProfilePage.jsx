import {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import Loader from '../components/Loader';
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from '../firebase';
import { updateProfile } from 'firebase/auth';
import '../styles/ProfilePage.css'

const ProfilePage = () => {
    const [user] = useAuthState(auth);
    const [name, setName] = useState(user?.displayName || '');
const [email, setEmail] = useState(user?.email || '');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const submitHandler = async(e) => {
        e.preventDefault();
        setIsLoading(true);
            try {
                await updateProfile(auth.currentUser, {
                    displayName: name,
                    email: email,
                });
                toast.success('Profile updated');
            } catch (err) {
                toast.error(err?.message || err.code);
            } finally {
                setIsLoading(false);
            }
    }

    const handleCancel = () => {
        navigate('/user');
    }

  return (
    <FormContainer>
        <h1>Update Profile</h1>

        <Form onSubmit={submitHandler}>
            <Form.Group className="my-2" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type='text'
                    placeholder= {user?.displayName || 'Enter Name'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type='email'
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>

            {isLoading ? <Loader/> : (
                <div className='d-flex update-cancel-btn'>
            <Button type='submit' variant='primary' className='mt-3'>
                Update
            </Button>
            <Button variant='secondary' className='mt-3'  onClick={handleCancel}>
                        Back
                    </Button>
                    </div>
)}
        </Form>
    </FormContainer>
  )
}

export default ProfilePage