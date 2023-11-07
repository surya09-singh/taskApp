import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { RingLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import { AuthProvider, useAuth } from "./AuthContext";
import Modal from "react-bootstrap/Modal";

function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [assinged, setAssinged] = useState([]);

  const authUser = useAuth()?.authUser;
  const isLoggedIn = useAuth()?.isLoggedIn;
  useEffect(() => {
    if (!isLoggedIn || localStorage.getItem("login") != "true") {
      navigate("/");
    }
  }, []);
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(false);
  const [refrash, setRefrash] = useState(false);
  const [usersbkp, setUsersbkp] = useState([]);
  const [show, setShow] = useState(false);
  const [assignee ,setAssignee] = useState();
  const [modalObj , setmodalObj] = useState();
  const [task,setTask] = useState();

  const handleClose = () => setShow(false);
  const handleShow = (i) => {
    /* eslint-disable */
    setShow(true) ,
    setmodalObj(users[i])
};



  const handleDelete = (Name) => {
    setLoading(true);
    axios
      .delete(`http://localhost:5000/addtaskdetail/${Name}`)
      .then(function (response) {
        console.log(response.data);
        setRefrash(!refrash);

        toast.success("Delete Successfully");
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleEdit = (Name) => {
    navigate("/updatetask", { state: Name });
  };

  const handleSearch = (e) => {
    const input = e.target.value.toLowerCase();
    if (input.length !== 0) {
      let response = [];
      response = usersbkp.filter((d) => {
        return (
          d.title.toLowerCase().search(input) !== -1 ||
          d.discription.toLowerCase().search(input) !== -1 ||
          d.duedate.toLowerCase().search(input) !== -1
        );
      });
      setUsers(response);
    } else {
      setUsers(usersbkp);
    }
    console.log(users);
  };
  const hanlecategory = (e) => {
    if (e.target.value) {
      let x = usersbkp.filter((item) => {
        return item.category.toLowerCase() == e.target.value.toLowerCase();
      });
      setUsers(x);
    } else {
      setUsers(data);
    }
  };
  const handleTaskpriority = (e) => {
    if (e.target.value) {
      let x = usersbkp.filter((item) => {
        return item.taskpriority.toLowerCase() == e.target.value.toLowerCase();
      });
      setUsers(x);
    } else {
      setUsers(data);
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/addtaskdetail")
      .then(function (response) {
        console.log(response.data);
        setUsers(response.data);
        setData(response.data);
        setUsersbkp(response.data);
        setTask(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refrash]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(" http://localhost:5000/users")
      .then(function (response) {
        console.log(response.data);
        setAssinged(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refrash]);

  function hanmdleADDtask() {
    navigate("/addtask");
  }
  function handleAssinged() {
    navigate();
  }


const  handleSubmit = (data) => {
 let formdata={
  title:modalObj.title,
  discription:modalObj.discription,
  duedate:modalObj.duedate,
  category:modalObj.category,
  assigned:modalObj.assigned,
  taskpriority:modalObj.taskpriority
}
  axios
      .put("http://localhost:5000/addtaskdetail/"+modalObj.id
      , formdata)
      .then(function (response) {
        console.log(response.data);
setShow(false)    
toast.success('Task assigneed succsefully');
setRefrash(true)

      })


}


  return (
    <AuthProvider>
      <div>
      <div>
          <select
            onChange={(e) => {
              handleTaskpriority(e);
            }}
          >
            <option value="">TaskPriority</option>
            {task &&
              task.map((item, index) => {
                return <option value={item.taskpriority}>{item.taskpriority}</option>;
              })}
          </select>
        </div>
        <div>
          <select
            onChange={(e) => {
              hanlecategory(e);
            }}
          >
            <option value=""> Category </option>
            {data &&
              data.map((item, index) => {
                return <option value={item.category}>{item.category}</option>;
              })}
          </select>
        </div>
        <div>
          <input
            type="search"
            placeholder="Search"
            onChange={(e) => {
              handleSearch(e);
            }}
          ></input>
        </div>
        <Button type="submit" onClick={() => hanmdleADDtask()}>
          Add New Task
        </Button>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Title</th>
              <th>Discription</th>
              <th>Due Dtae</th>
              <th>Category</th>
              <th> Asignee</th>
              <th>Task Priority</th>
              <th>Update</th>
              <th>Delete</th>
              <th>Assinged Task</th>
            </tr>
          </thead>
          <RingLoader color="#d65836" loading={loading} size={50} />
          <tbody>
            {users &&
              users.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.title}</td>
                    <td>{item.discription}</td>
                    <td>{item.duedate}</td>
                    <td>{item.category}</td>
                    <td>{item?.assigned}</td>
                    <td>{item?.taskpriority}</td>
                    <td>
                      <Button type="submit" onClick={() => handleEdit(item.id)}>
                        Update
                      </Button>
                    </td>
                    <td>
                      <Button
                        type="submit"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </Button>
                    </td>
                    <td>
                      <Button variant="primary" onClick={() => {
                        handleShow(index)
                      }}>
                        Assinged Task
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Task Assinged</Modal.Title>
          </Modal.Header>
          <Modal.Body></Modal.Body>
          <select onChange={(e) =>{
setAssignee(e.target.value)
if(modalObj?.assigned?.length==0){
modalObj.assigned.push(e.target.value)
}else{
  modalObj.assigned=[];
  modalObj.assigned.push(e.target.value)
}
          }}>
            <option value="">Users</option>
            {assinged &&
              assinged?.map((item, index) => {
                return <option value={item.name}>{item.name}</option>;
              })}
          </select>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => {
              handleSubmit()
            }}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <ToastContainer />
      </div>
    </AuthProvider>
  );
}
export default Dashboard;
