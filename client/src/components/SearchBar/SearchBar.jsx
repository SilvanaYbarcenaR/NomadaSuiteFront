import React, { useState } from "react";
import { AutoComplete, DatePicker, InputNumber, Space } from "antd";
import { useDispatch } from "react-redux";
import { getFilteredAccommodation } from "../../redux/Actions/actions";

const { RangePicker } = DatePicker;

const options = [
  {
    value: 'Burns Bay Road',
  },
  {
    value: 'Downing Street',
  },
  {
    value: 'Wall Street',
  },
];

const SearchBar = () => {
  const dispatch = useDispatch()
  const [values, setValues] = useState({
    city: '',
    country: '',
    startDate: '',
    endDate: '',
    rooms: ''
  });

  const onRangeChange = (dates, dateStrings) => {
    setValues({
      ...values,
      startDate: dateStrings[0],
      endDate: dateStrings[1]
    });
  };

  const searchHandler = () => {
    dispatch(getFilteredAccommodation(values));
  };

  const onChangeRooms = (value) => {
    setValues({
      ...values,
      rooms: value
    });
  };

  const onChange = (data) => {
    if (/^[a-zA-Z, ]*$/.test(data)) {
      const input = data.split(',').map(item => item.trim());

      if (input.length === 2) {
        const city = input[0];
        const country = input[1];

        setValues({
          ...values,
          city: city,
          country: country
        });
      } else if (input.length === 1) {
        setValues({
          ...values,
          city: input[0],
          country: ''
        });
      }
    }
  };

  return (
    <div>

      {/* Search and Filter */}

      <div className='flex gap-2 border border-gray-300 rounded-full py-4 px-4 shadow-md shadow-gray-400'>
        <AutoComplete
          size="large"
          value={values.location}
          options={options}
          style={{
            width: 200,
          }}
          onChange={onChange}
          placeholder="Ubicación"

          filterOption={(inputValue, option) =>
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
        <RangePicker size="small" placeholder={['Check-in', 'Check-out']} onChange={onRangeChange} />
        <Space wrap>
          <InputNumber value={values.rooms} placeholder={"Habitaciones"} size="large" min={1} max={10} onChange={onChangeRooms} type='number'
            style={{
              width: 114,
            }}
          />
        </Space>
        <button className='bg-primary text-white p-2 rounded-full' onClick={searchHandler}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </button>
      </div>

      {/* end Search and Filter */}

    </div>
  )
};

export default SearchBar;