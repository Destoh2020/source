import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { ApiResponse, User } from '../common/common';
import { baseApiUrl } from '../store/slices/appSlice';

const customStyles = {
  content: {
    top: '30%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

function Students() {
  const baseUrl = useSelector(baseApiUrl);
  const initialStudents: User[] = [];
  const [students, setStudents] = useState(initialStudents);
  const [isModal, setIsModal] = useState(false);

  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');

  const [changeCounter, setChangeCounter] = useState(0);

  useEffect(() => {
    const url = `${baseUrl}/users?groupName=Students`;
    axios.get(url).then((response) => {
      const students: User[] = response.data;
      setStudents(students);
    });
  }, [baseUrl, changeCounter]);

  function showSweetAlert(message: string) {
    Swal.fire({
      icon: 'error',
      text: message,
    });
  }

  const handleSaveStudent = () => {
    if (username === '') {
      showSweetAlert('Please enter username!');
      return;
    }

    if (firstName === '') {
      showSweetAlert('Please enter first name!');
      return;
    }

    if (lastName === '') {
      showSweetAlert('Please enter last name!');
      return;
    }

    if (password === '') {
      showSweetAlert('Please enter password!');
      return;
    }

    const student = {
      groupName: 'Students',
      username,
      password,
      firstName,
      lastName,
    };

    const url = `${baseUrl}/addUser`;
    axios.post(url, student).then((response) => {
      const data: ApiResponse = response.data;
      if (!data.status) {
        showSweetAlert(data.message);
        return;
      }

      setIsModal(false);
      setChangeCounter(changeCounter + 1);
    });
  };

  const handleDelete = (userId: string) => {
    if (userId === '') {
      showSweetAlert('Fatal error: No id attached to student');
      return;
    }

    Swal.fire({
      title: 'Are you sure you want to delete?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: '#d14529',
    }).then((response) => {
      if (response.isConfirmed) {
        const url = `${baseUrl}/deleteUser?userId=${userId}`;
        axios.get(url).then((response) => {
          const data: ApiResponse = response.data;
          if (!data.status) {
            showSweetAlert(data.message);
            return;
          }

          setChangeCounter(changeCounter + 1);
        });
      }
    });
  };

  return (
    <div className='container'>
      <div className='row mt-3'>
        <div className='col-sm-12'>
          <button
            type='button'
            className='btn btn-primary btn-md float-end'
            onClick={() => setIsModal(true)}
          >
            Add New Student
          </button>
        </div>
      </div>
      <div className='row'>
        <table className='table table-striped table-hover'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Username</th>
              <th scope='col'>First Name</th>
              <th scope='col'>Last Name</th>
              <th scope='col'>Status</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => {
              return (
                <tr key={student.id}>
                  <th scope='row'>{index + 1}</th>
                  <td>{student.username}</td>
                  <td>{student.firstName}</td>
                  <td>{student.lastName}</td>
                  <td>{student.status === 1 ? 'Active' : 'Disabled'}</td>
                  <td>
                    <button
                      className='btn btn-danger btn-sm'
                      onClick={() => handleDelete(student.id)}
                    >
                      X
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* <!-- Modal --> */}
      <Modal
        isOpen={isModal}
        onRequestClose={() => setIsModal(false)}
        contentLabel='Example Modal'
        style={customStyles}
      >
        <div className='row'>
          <div className='col'>
            <h3 className='text-center'>Add New Student</h3>
          </div>
          <div className='col-sm-1 ms-md-auto'>
            <button
              className='btn-close float-end'
              onClick={() => setIsModal(false)}
            ></button>
          </div>
        </div>

        <div>
          <form>
            <div className='mb-3'>
              <label htmlFor='username' className='form-label'>
                Username
              </label>
              <input
                type='text'
                className='form-control'
                id='username'
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='firstName' className='form-label'>
                First Name
              </label>
              <input
                type='text'
                className='form-control'
                id='firstName'
                onChange={(event) => setFirstName(event.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='lastname' className='form-label'>
                Last Name
              </label>
              <input
                type='text'
                className='form-control'
                id='lastName'
                onChange={(event) => setLastName(event.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='password' className='form-label'>
                Password
              </label>
              <input
                type='password'
                className='form-control'
                id='password'
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </form>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            <button
              type='button'
              className='btn btn-secondary float-end'
              onClick={() => setIsModal(false)}
            >
              Close
            </button>
          </div>
          <div className='col-md-6'>
            <button
              type='button'
              className='btn btn-primary'
              onClick={handleSaveStudent}
            >
              Save changes
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Students;
