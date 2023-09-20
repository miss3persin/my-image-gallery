import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Form, Button, Row, Col} from 'react-bootstrap';
// import {useDispatch, useSelector} from 'react-redux';
import FormContainer from '../components/FormContainer';
// import {useLoginMutation} from '../slices/usersApiSlice';
// import {setCredentials} from '../slices/authSlice';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../components/Loader';
import {auth} from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    // const dispatch = useDispatch();

    // const [login, {isLoading}] = useLoginMutation();

    // const {userInfo} = useSelector((state) => state.auth);

    // useEffect(() => {
    //     if (userInfo) {
    //         navigate('/user');
    //     }
    // }, [navigate, userInfo]);

    const submitHandler = async(e) => {
        e.preventDefault();
        setLoading(true)

        if (!email || !password) {
            toast.error("Please fill in all fields");
            setLoading(false)
            return;
        }
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            toast.success("Logged In successful");
            setLoading(false);
            navigate('/user');
        }).catch((error) => console.log(error));
    };
    // const submitHandler = async(e) => {
    //     e.preventDefault();
    //     try {
    //         setLoading(true)
    //        const res = await login({ email, password }).unwrap();
    //        dispatch(setCredentials({...res}));
    //        navigate('/');
    //     } catch (err) {
    //         toast.error(err?.data?.message || err.error);
    //         setLoading(false)
    //     }
    // };

  return (
    <FormContainer>
        <h1>Sign In</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group className="my-2" controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type='email'
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Enter Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>

            {/* {isLoading && <Loader/>} */}
            {loading ? <Loader/> : (

            <Button type='submit' variant='primary' className='mt-3'>
                Sign In
            </Button>
)}
            <Row className='py-3'>
                <Col>
                    New Customer? <Link to='/register'>Register</Link>
                </Col>
            </Row>
        </Form>
    </FormContainer>
  )
}

export default LoginPage