import React, { useEffect, useState } from "react";
import Hero from "../Components/Hero";
import axios from "axios";
import { toast } from "react-toastify";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import FormContainer from "../Components/FormContainer";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function HomeScreen() {
  const navigate = useNavigate()
  const handleClose = () => setShow(false);
  const handleShow = (id, name, email) => {
    setShow(true);
    setName(name);
    setEmail(email);
    setId(id)
  };

  const deleteUser = async (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete   ${name}`
    );
    if (confirmDelete) {
      await axios.delete(`api/admin/deleteUser/${id}`);
      setUser((undeletedUsers) =>
        undeletedUsers.filter((user) => user._id !== id)
      );
      toast.success("user deleted successfully");
    } else {
      toast.error("user not deleted");
    }
  };

  const editUser = async (id, name, email) => {
    const confirmEdit = window.confirm(`Are you sure you want to edit ${name}`);
    if (confirmEdit) {
      // await axios.get(`api/admin/editUser/${id}`).then((res)=>{
      //   console.log(res.data);
      // })
      handleShow(id, name, email);
    }else{
      toast.error('user not updated')

    }
  };
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [id,setId]= useState('')
  const [users, setUser] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    axios.get("api/admin/userTable").then((res) => {
      setUser(res.data);
      console.log(users, "sdfs");
    });
  }, []);

  const [show, setShow] = useState(false);

  const filteredData = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`api/admin/editUser/${id}`,{name:name,email:email}).then((res)=>{
      console.log(res.data)
      setName('')
      setEmail('')
      handleClose()
      setUser((prevUsers) => {
        return prevUsers.map((user) => {
          if (user._id === id) {
            return {
              ...user,
              name: name,
              email: email,
            };
          }
          return user;
        });
      });
      toast.success('updated successfully')
    }).catch((err)=>{
      console.log(err);
      toast.error('user not updated')
    })
  };

  return (
    <>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </InputGroup>
      <div className="text-center">
        <div className="row table-responsive col-lg-12">
          <table
            className="table table-bordered"
            style={{ width: "100%" }}
            id="productsTable"
          >
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a
                      className="btn btn-primary" 
                      onClick={() => editUser(user._id, user.name, user.email)}
                    >
                      Edit
                    </a>
                  </td>
                  <td>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a
                      className="delBtn btn btn-primary"
                      onClick={() => {
                        deleteUser(user._id, user.name);
                      }}
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

  <a className="btn btn-warning" onClick={()=>navigate('AdminAddUser')}>add user</a>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <FormContainer>
            <h1>Sign Up</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="my-2" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  name="name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="my-2" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  name="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                ></Form.Control>
              </Form.Group>

              <Button type="submit" variant="primary" className="mt-3">
                update
              </Button>
            </Form>
          </FormContainer>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default HomeScreen;
