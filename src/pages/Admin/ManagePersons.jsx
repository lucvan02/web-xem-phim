import React, { useState, useEffect } from 'react';
import { getAllPersons, addPerson, updatePerson, deletePerson, getAllCountries } from '../../Utils/api';
import Sidebar from './Sidebar';

const ManagePersons = () => {
  const [persons, setPersons] = useState([]);
  const [countries, setCountries] = useState([]);
  const [newPerson, setNewPerson] = useState({
    name: '',
    gender: '',
    dayOfBirth: '',
    image: '',
    describe: '',
    countryId: 1
  });
  const [editPerson, setEditPerson] = useState(null);

  useEffect(() => {
    fetchPersons();
    fetchCountries();
  }, []);

  const fetchPersons = async () => {
    try {
      const data = await getAllPersons();
      setPersons(data);
    } catch (error) {
      console.error('Error fetching persons:', error);
    }
  };

  const fetchCountries = async () => {
    try {
      const data = await getAllCountries();
      setCountries(data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const handleAddPerson = async () => {
    try {
      await addPerson(newPerson);
      fetchPersons();
      resetNewPerson();
    } catch (error) {
      console.error('Error adding person:', error);
    }
  };

  const handleUpdatePerson = async () => {
    try {
      await updatePerson(editPerson);
      fetchPersons();
      setEditPerson(null);
    } catch (error) {
      console.error('Error updating person:', error);
    }
  };

  const handleDeletePerson = async (id) => {
    try {
      await deletePerson(id);
      fetchPersons();
    } catch (error) {
      console.error('Error deleting person:', error);
    }
  };

  const handleEditPerson = (person) => {
    setEditPerson(person);
  };

  const resetNewPerson = () => {
    setNewPerson({
      name: '',
      gender: '',
      dayOfBirth: '',
      image: '',
      describe: '',
      countryId: 1
    });
  };

  return (
    <div className='main-content'>
        <Sidebar/>
      <h1>Manage Persons</h1>
      <div>
        <h2>Add New Person</h2>
        <input
          type="text"
          placeholder="Name"
          value={newPerson.name}
          onChange={(e) => setNewPerson({ ...newPerson, name: e.target.value })}
        />

        <input
          type="text"
          placeholder="Image url"
          value={newPerson.image}
          onChange={(e) => setNewPerson({ ...newPerson, image: e.target.value })}
        />

        <select
          value={newPerson.countryId}
          onChange={(e) => setNewPerson({ ...newPerson, countryId: e.target.value })}
        >
          {countries.map(country => (
            <option key={country.countryId} value={country.countryId}>{country.name}</option>
          ))}
        </select>

        {/* Other input fields for gender, dayOfBirth, describe */}
        <button onClick={handleAddPerson}>Add</button>
      </div>
      <div>
        <h2>List of Persons</h2>
        <ul>
          {persons.map((person) => (
            <li key={person.personId}>
              {editPerson && editPerson.personId === person.personId ? (
                <div>
                  <input
                    type="text"
                    value={editPerson.name}
                    onChange={(e) => setEditPerson({ ...editPerson, name: e.target.value })}
                  />
                  <input
                    type="text"
                    value={editPerson.image}
                    onChange={(e) => setEditPerson({ ...editPerson, image: e.target.value })}
                  />
                  {/* Other input fields for gender, dayOfBirth, describe */}
                  <button onClick={handleUpdatePerson}>Save</button>
                </div>
              ) : (
                <div>
                  {person.name}
                  {/* Display other info */}
                  <button onClick={() => handleEditPerson(person)}>Edit</button>
                  <button onClick={() => handleDeletePerson(person.personId)}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManagePersons;
