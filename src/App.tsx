import React, { useState } from 'react';

const App = () => {
  const [formData, setFormData] = useState([
    { type: 'text', label: 'Full Name', name: 'full_name', value: '' },
    { type: 'email', label: 'Email', name: 'email', value: '' },
  ]);

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    const updatedFormData = [...formData];
    updatedFormData[index] = { ...updatedFormData[index], [name]: value };
    setFormData(updatedFormData);
  };

  const handleAddField = () => {
    const newField = { type: 'text', label: 'New Field', name: 'new_field', value: '' };
    setFormData([...formData, newField]);
  };

  const handleDeleteField = (index) => {
    const updatedFormData = [...formData];
    updatedFormData.splice(index, 1);
    setFormData(updatedFormData);
  };

  const handleAddNestedField = (index) => {
    const updatedFormData = [...formData];
    updatedFormData[index] = {
      ...updatedFormData[index],
      fields: [{ type: 'text', label: 'Nested Field', name: 'nested_field', value: '' }],
    };
    setFormData(updatedFormData);
  };

  const handleSave = () => {
    console.log(formData);
  };

  const getField = (field, index) => {
    if (field.type === 'object') {
      return (
        <div key={index}>
          <h2 className="text-lg font-bold mb-2">{field.label}</h2>
          {field.fields.map((nestedField, nestedIndex) => getField(nestedField, nestedIndex))}
          <button
            className="bg-green-500 text-white rounded px-2 py-1 my-2"
            onClick={() => handleAddNestedField(index)}
          >
            Add Nested Field
          </button>
        </div>
      );
    }
    return (
      <div key={index} className="mb-4">
        <label className="block font-bold mb-2" htmlFor={field.name}>
          {field.label}
        </label>
        <input
          className="border rounded-lg px-4 py-2 w-full"
          type={field.type}
          name={field.name}
          id={field.name}
          value={field.value}
          onChange={(event) => handleChange(event, index)}
        />
        <button
          className="bg-red-500 text-white rounded px-2 py-1 my-2"
          onClick={() => handleDeleteField(index)}
        >
          Delete Field
        </button>
      </div>
    );
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Form Generator</h1>
      <form className="space-y-4">
        {formData.map((field, index) => getField(field, index))}
        <button
          className="bg-blue-500 text-white rounded px-2 py-1 my-2"
          onClick={handleAddField}
        >
          Add Field
        </button>
        <button className="bg-green-500 text-white rounded px-2 py-1 my-2" onClick={handleSave}>
          Save
        </button>
      </form>
    </div>
  );
};

export default App;