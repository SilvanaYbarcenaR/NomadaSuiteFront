import { InputNumber, Space, Form, Select, Flex, Button } from 'antd';
import SecundaryFiltersStyles from './SecundaryFilters.module.css';
import { RiOrderPlayFill } from 'react-icons/ri';
import { BsFilter } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { filterByPrice, orderByRating } from '../../redux/actions/actions';
import { useState } from 'react';

const SecundaryFilters = () => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState();
  const dispatch = useDispatch();

  const onChangeMin = (value) => {
    setMinPrice(value);
  };
  const onChangeMax = (value) => {
    setMaxPrice(value);
  };
  const handleChange = (value) => {
    dispatch(orderByRating(value));
  };
  const filterByPriceRange = () => {
    dispatch(filterByPrice(minPrice, maxPrice))
  }

  return (
    <div className={SecundaryFiltersStyles.secundaryFilters}>
      <Form>
        <Flex justify={"space-between"} align={'center'}>
          <Form.Item label={<><BsFilter/>&nbsp;Rango de precio por mes</>}>
            <Space>
              <InputNumber
                defaultValue={100}
                name={"minPrice"}
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                onChange={onChangeMin}
              />
              <InputNumber
                defaultValue={500}
                name={"maxPrice"}
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                onChange={onChangeMax}
              />
            </Space>
          </Form.Item>
          <Button onClick={filterByPriceRange}>Buscar</Button>
          <Form.Item label={<><RiOrderPlayFill/>&nbsp;Rating</>}>
            <Select
              style={{
                width: '300px',
              }}
              placeholder="Orden"
              onChange={handleChange}
              options={[{value: "asc", label: "Ascendente"}, {value: "desc", label: "Descendente"}]}
            />
          </Form.Item>
        </Flex>
      </Form>
    </div>
  )
}

export default SecundaryFilters;