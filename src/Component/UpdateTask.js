import Form from 'react-bootstrap/Form';
import {useForm} from 'react-hook-form';
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { RingLoader } from "react-spinners";
import { AuthProvider, useAuth } from './AuthContext';
function UpdateTask(){
    const location = useLocation();
    const [formdata,setFormdata] = useState();
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);

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
        taskpriority:yup.string().required('taskPriority is required')

    })

    const UpdatePage = (data) =>{
      let formdata ={
        title:data.title,
        discription:data.discription,
        duedate:data.duedate,
        category:data.category,
        assigned:data.assigned,
        taskpriority:data.taskpriority

      
      }
      axios.put(`http://localhost:5000/addtaskdetail/${location.state}`,formdata)
      .then(response=>{
        console.log(response.data)
        navigate('/dashboard')
        toast.success("update Succesfully")
      })
    }

 useEffect(()=>{
    setLoading(true)
    axios.get(` http://localhost:5000/addtaskdetail/${location.state}`)
    .then(response=>{
        console.log(response.data)
        setFormdata(response.data)
        setValue('title',response?.data?.title)
        setValue('discription',response?.data?.discription)
        setValue('duedate',response?.data?.duedate)
        setValue('category',response?.data?.category)
        setValue('assigned',response?.data?.assigned)
        setValue('taskpriority',response?.data?.taskpriority)
    })
    .catch(function(error){
        console.log(error)
    })
    .finally(()=>{
        setLoading(false)
    })
 },[location])




    const {
        register,
        handleSubmit,
        setValue,
        formState:{errors}
        }= useForm({resolver:yupResolver(schema)});

    return(
        <div>
            <RingLoader color="#d65836" loading={loading} size={50} />
             <Form.Group className="mb-3" controlId="formBasicTitle">
        <Form.Label>Title</Form.Label>
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
        <Form.Control type="category" placeholder="Enter Category" {...register('category')}/>
        <p style={{ color: "#ff0000" }}>{errors.category?.message}</p>
      </Form.Group>
      <lable>Task Priority</lable>
      <Form.Select {...register('taskpriority')} aria-label="Default select example">
      <option>Task Priority</option>
      <option value="Low">Low</option>
      <option value="Medium">Medium</option>
      <option value="High">High</option>
    </Form.Select>
      <Button variant="primary" type="submit" onClick={handleSubmit(UpdatePage)} >
        Submit
      </Button>
      <ToastContainer/>
        </div>
    )
}
export default UpdateTask;