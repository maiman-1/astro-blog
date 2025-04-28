import React, { useState } from 'react';

const TestSelect = () => {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    console.log('Called');
    setValue(event.target.value);
  };

  return (
    <select value={value} onChange={handleChange}>
      <option value="">Select</option>
      <option value="new">New</option>
      <option value="old">Old</option>
    </select>
  );
};

export default TestSelect;
