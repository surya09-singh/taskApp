import Form from 'react-bootstrap/Form';
import {useForm} from 'react-hook-form';
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import { useEffect } from 'react';
import { ToastContainer,toast } from 'react-toastify';


function AddTask(){
    const navigate = useNavigate();

    const authUser = useAuth()?.authUser
    const isLoggedIn = useAuth()?.isLoggedIn

    useEffect(() => {
if(!isLoggedIn){
navigate('/')
}
    } , [])

    const schema = yup
    .object({
        title:yup.string().required('Title is required'),
        discription:yup.string().required('Discription is requird'),
        duedate:yup.string().required('DueDate is required'),
        category:yup.string().required('category is required'),
        taskpriority:yup.string().required('taskpriority is required')
    })

    const RegisterTask = (data)=>{
        let formdata = {
            title:data.title,
            discription:data.discription,
            duedate:data.duedate,
            category:data.category,
            assigned:[],
            taskpriority:data.taskpriority

        }
        axios.post(' http://localhost:5000/addtaskdetail',formdata)
        .then(function(response){
            console.log(response);
            navigate('/dashboard')
            toast.success('Add task successfully')
        })
        .catch(function(error){
            console.log(error)
        })
        .finally(()=>{

        })
    }
    const {
        register,
        handleSubmit,
        formState:{errors}
    }= useForm({resolver:yupResolver(schema)});

    return(
        <div>
            <Form.Group className="mb-3" controlId="formBasicTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control type="title" placeholder="Enter Title" {...register('title')}/>
       <p style={{ color: "#ff0000" }}>{errors.title?.message}</p>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDiscription">
        <Form.Label>Discription</Form.Label>
        <Form.Control type="discription" placeholder="Discription" {...register('discription')} />
        <p style={{ color: "#ff0000" }}>{errors.discription?.message}</p>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicDuedate">
        <Form.Label>Due Date</Form.Label>
        <Form.Control type="date" placeholder="DueDate" {...register('duedate')}/>
        <p style={{ color: "#ff0000" }}>{errors.duedate?.message}</p>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCategory">
        <Form.Label>Category</Form.Label>
        <Form.Control type="category" placeholder="eg. React 18.0" {...register('category')}/>
         <p style={{ color: "#ff0000" }}>{errors.category?.message}</p>
      </Form.Group>
      <Form.Select {...register('taskpriority')} aria-label="Default select example">
      <option>Task Priority</option>
      <option value="Low">Low</option>
      <option value="Medium">Medium</option>
      <option value="High">High</option>
      <p style={{ color: "#ff0000" }}>{errors.taskpriority?.message}</p>
    </Form.Select>
      <Button variant="primary" type="submit" onClick={handleSubmit(RegisterTask)}>
        Submit
      </Button>
      <ToastContainer/>
        </div>
    )
}
export default AddTask;