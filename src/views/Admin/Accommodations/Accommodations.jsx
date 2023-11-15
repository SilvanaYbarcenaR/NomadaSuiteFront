import { Button, Flex, Space, Table, Input } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import Highlighter from "react-highlight-words";
import { FaRegEdit } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";



import {
  EditOutlined,
  PlusOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getAccommodationPendingConfirmation_A, getActiveAccommodation_A, getDisabledAccommodation_A } from '../../../redux/Actions/actions';

const AccommodationAdmin = () => {
  // getAccommodationPercentage_A,
  // deleteAccommodation_A,
  // getAccommodationBy_A,
  // updateAccommodation_A,
  const activeAccommodation = useSelector((state) => state.activeAccommodation_A)
  const disabledAccommodation = useSelector((state) => state.disabledAccommodation_A)
  const accommodationPendingConfirmation = useSelector((state) => state.accommodationPendingConfirmation_A)
  console.log(activeAccommodation);

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActiveAccommodation_A());
    dispatch(getAccommodationPendingConfirmation_A());
    dispatch(getDisabledAccommodation_A());
  }, []);

  const dataActive = activeAccommodation.map((objeto, index) => {
    return {
      key: (index + 1).toString(),
      id: objeto._id,
      name: objeto.name,
      owner: objeto.ownerId,
      services: objeto.idServices.map(service => service.name).join(', '),
      photos: <img src={objeto.photos[0]} style={{ maxWidth: '50px' }} />,
      location: `${objeto.idLocation.city}, ${objeto.idLocation.country}`,
      description: objeto.description,
      price: `$${objeto.price}`,
      active: 'Sí',
      rating: objeto.rating || 'N/A',
    };
  });

  const dataPending = accommodationPendingConfirmation.map((objeto, index) => {
    return {
      key: (index + 1).toString(),
      id: objeto._id,
      name: objeto.name,
      owner: objeto.ownerId,
      services: objeto.idServices.map(service => service.name).join(', '),
      photos: <img src={objeto.photos[0]} style={{ maxWidth: '50px' }} />,
      location: `${objeto.idLocation.city}, ${objeto.idLocation.country}`,
      description: objeto.description,
      price: `$${objeto.price}`,
      active: 'Pendiente',
      rating: objeto.rating || 'N/A',
    };
  });

  const dataDisabled = disabledAccommodation.map((objeto, index) => {
    return {
      key: (index + 1).toString(),
      id: objeto._id,
      name: objeto.name,
      owner: objeto.ownerId,
      services: objeto.idServices.map(service => service.name).join(', '),
      photos: <img src={objeto.photos[0]} style={{ maxWidth: '50px' }} />,
      location: `${objeto.idLocation.city}, ${objeto.idLocation.country}`,
      description: objeto.description,
      price: `$${objeto.price}`,
      active: 'No',
      rating: objeto.rating || 'N/A',
    };
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };


  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      width: '15%',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Anfitrión',
      dataIndex: 'owner',
      key: 'owner',
      ...getColumnSearchProps('owner'),
    },
    {
      title: 'Servicios',
      dataIndex: 'services',
      key: 'services',
    },
    {
      title: 'Fotos',
      dataIndex: 'photos',
      key: 'photos',
    },
    {
      title: 'Ubicación',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Precio',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Activo',
      dataIndex: 'active',
      key: 'active',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
    },
    {
      title: 'Acción',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record.id)}>
            <FaRegEdit />
          </Button>
          <Button onClick={() => handleDelete(record.id)}>
            <TiDelete style={{ fontSize: '20px' }} />
          </Button>
        </Space>
      ),
    },
    // {
    //   title: 'Address',
    //   dataIndex: 'address',
    //   key: 'address',
    //   ...getColumnSearchProps('address'),
    //   sorter: (a, b) => a.address.length - b.address.length,
    //   sortDirections: ['descend', 'ascend'],
    // },
  ];

  return (
    <>
      <Flex justify='end' style={{ marginBottom: "-2rem" }}>
        <Button><PlusOutlined /> Añadir usuario</Button>
      </Flex>
      <Table columns={columns} dataSource={[...dataActive, ...dataPending, ...dataDisabled]} pagination={{ pageSize: 6 }} />
    </>
  )
}

export default AccommodationAdmin