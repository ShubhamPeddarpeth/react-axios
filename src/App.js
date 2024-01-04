import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com/users';

const App = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: '',
    username: '',
    address: '',
    company: '',
    phone: '',
  });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const startEditing = (user) => {
    setEditingUser(user);
    setNewUser({
      name: user.name,
      username: user.username,
      address: user.address.street,
      company: user.company.name,
      phone: user.phone,
    });
  };

  const cancelEditing = () => {
    setEditingUser(null);
    setNewUser({
      name: '',
      username: '',
      address: '',
      company: '',
      phone: '',
    });
  };

  const saveEditingUser = async () => {
    try {
      await axios.put(`${API_BASE_URL}/${editingUser.id}`, {
        id: editingUser.id,
        name: newUser.name,
        username: newUser.username,
        address: {
          ...editingUser.address,
          street: newUser.address,
        },
        company: {
          ...editingUser.company,
          name: newUser.company,
        },
        phone: newUser.phone,
      });

      const updatedUsers = users.map((user) =>
        user.id === editingUser.id
          ? {
            ...user,
            name: newUser.name,
            username: newUser.username,
            address: { ...user.address, street: newUser.address },
            company: { ...user.company, name: newUser.company },
            phone: newUser.phone,
          }
          : user
      );

      setUsers(updatedUsers);
      cancelEditing();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };


  const addUser = async () => {
    try {
      const response = await axios.post(API_BASE_URL, newUser);
      setUsers([...users, response.data]);
      setNewUser({
        name: '',
        username: '',
        address: '',
        company: '',
        phone: '',
      });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <Container>
      <h1 className="my-4">User Management</h1>

      <Row>
        <Col>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formUsername" className='mt-2'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formAddress" className='mt-2'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                value={newUser.address}
                onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formCompany" className='mt-2'>
              <Form.Label>Company</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter company"
                value={newUser.company}
                onChange={(e) => setNewUser({ ...newUser, company: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formPhone" className='mt-2'>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                value={newUser.phone}
                onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
              />
            </Form.Group>

            {editingUser ? (
              <div className='mt-2'>
                <Button variant="primary" onClick={saveEditingUser}>
                  Save Changes
                </Button>
                <Button variant="secondary" className="ml-2" onClick={cancelEditing}>
                  Cancel
                </Button>
              </div>
            ) : (
                <Button className='mt-2' variant="success" type="button" onClick={addUser}>
                Add User
              </Button>
            )}
          </Form>
        </Col>

        <Col>
          <h2>User List</h2>
          <ListGroup>
            {users.map((user) => (
              <ListGroup.Item key={user.id}>
                {user.name} - {user.username} - {user.address.city}, {user.address.street} - {user.company.name} -{' '}
                {user.phone}
                <Button variant="info" onClick={() => startEditing(user)} className="mx-2">
                  Edit
                </Button>
                <Button  variant="danger" onClick={() => deleteUser(user.id)}>
                  Delete
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
