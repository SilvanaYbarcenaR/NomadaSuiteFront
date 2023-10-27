import { InputNumber, Space, Form, Select, Flex } from 'antd';
import SecundaryFiltersStyles from './SecundaryFilters.module.css';
import { RiOrderPlayFill } from 'react-icons/ri';
import { BsFilter } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { orderByRating } from '../../redux/actions/actions';

const SecundaryFilters = () => {
  const dispatch = useDispatch();

  const onChange = (value) => {
    console.log('changed', value);
  };
  const handleChange = (value) => {
    dispatch(orderByRating(value));
  };
  return (
    <div className={SecundaryFiltersStyles.secundaryFilters}>
      <Form>
        <Flex justify={"space-between"}>
          <Form.Item label={<><BsFilter/>&nbsp;Rango de precio</>}>
            <Space>
              <InputNumber
                defaultValue={100}
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                onChange={onChange}
              />
              <InputNumber
                defaultValue={500}
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                onChange={onChange}
              />
            </Space>
          </Form.Item>
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