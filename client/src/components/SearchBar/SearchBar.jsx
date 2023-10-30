import React, { useState } from "react";
import { AutoComplete, DatePicker, InputNumber, Space } from "antd";
import { useDispatch } from "react-redux";
import { getLocationByName } from "../../redux/Actions/actions";

const { RangePicker } = DatePicker;
const mockVal = (str, repeat = 1) => ({
  value: str.repeat(repeat),
});

const SearchBar = () => {
  const dispatch = useDispatch()

  const [value, setValue] = useState({
    location: '',
    startDate: '',
    endDate: '',
    rooms: ''
  });
  const [options, setOptions] = useState([]);

  const onRangeChange = (dates, dateStrings) => {
    setValue({
      ...value,
      startDate: dateStrings[0],
      endDate: dateStrings[1]
    });
  };

  const getPanelValue = (searchText) =>
    !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];
  const onSelect = (data) => {
    console.log('onSelect', data);
  };

  const searchHandler = () => {
    dispatch(getLocationByName(value))
  };

  const onChangeRooms = (value) => {
    setValue({
      ...value,
      rooms: value
    });
  };

  const onChange = (data) => {
    if (/^[a-zA-Z]*$/.test(data)) {
      setValue(data);
    }
  };
  return (
    <div>
      
      {/* Search and Filter */}

      <div className='flex gap-2 border border-gray-300 rounded-full py-4 px-4 shadow-md shadow-gray-400'>
        <AutoComplete
          size="large"
          value={value.location}
          options={options}
          style={{
            width: 200,
          }}
          onSelect={onSelect}
          onSearch={(text) => setOptions(getPanelValue(text))}
          onChange={onChange}
          placeholder="Ubicación"
        />
        <RangePicker size="small" placeholder={['Check-in', 'Check-out']} onChange={onRangeChange} />
        <Space wrap>
          <InputNumber value={value.rooms} placeholder={"Habitaciones"} size="large" min={1} max={10} onChange={onChangeRooms} type='number'
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