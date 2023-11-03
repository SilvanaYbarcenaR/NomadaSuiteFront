import React, { useEffect, useState } from 'react';
import CardsStyles2 from "../UserPanel/Reservations.module.css"
import CardBox from '../../components/CardBox/CardBox';
import CardsStyles from '../../components/CardsContainer/CardsContainer.module.css';
import { getAccommodations, getNextAccommodations } from '../../redux/Actions/actions';
import { useSelector, useDispatch } from 'react-redux';
import { DatePicker, Space, Row, Divider, Skeleton, Flex, Col } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';


dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const weekFormat = 'MM/DD';
const monthFormat = 'YYYY/MM';

const fecha = '2035/01/01'

/** Manually entering any of the following formats will perform date parsing */
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];
const customFormat = (value) => `custom format: ${value.format(dateFormat)}`;
const customWeekStartEndFormat = (value) =>
  `${dayjs(value).startOf('week').format(weekFormat)} ~ ${dayjs(value)
    .endOf('week')
    .format(weekFormat)}`;

const Reservation = () => {
  const dispatch = useDispatch();
  const accommodations = useSelector((state) => state.accommodations);
  const accommodationsFiltered = useSelector((state) => state.accommodationsFiltered);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    dispatch(getNextAccommodations(page));
    setLoading(false);
    setPage(page + 1);
  };

  useEffect(() => {
    dispatch(getAccommodations());
    loadMoreData();
  }, []);

  useEffect(() => {
    setData([...data, ...accommodations]);
  }, [accommodations]);

  useEffect(() => {
    setData(accommodations);
    setPage(1);
  }, [accommodationsFiltered]);

  return (
    <div className={CardsStyles.cardsContainer}>
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length === 0 || data.length < accommodationsFiltered.length}
        loader={
          <Flex>
            <Skeleton paragraph={{ rows: 4 }} active />
            <Skeleton paragraph={{ rows: 4 }} active />
            <Skeleton paragraph={{ rows: 4 }} active />
            <Skeleton paragraph={{ rows: 4 }} active />
            <Skeleton paragraph={{ rows: 4 }} active />
            <Skeleton paragraph={{ rows: 4 }} active />
          </Flex>
        }
        
        scrollableTarget="scrollableDiv"
      >
        <div className={CardsStyles.noScroll}>
          <Row gutter={24} align={'stretch'}>
            {data.length &&
              data?.map((accommodation, index) => {
                return (
                  <Col key={index} span={24}>
                    <div style={{ borderRadius: '20px', border: '1px solid #eee', padding: '10px', margin: '10px', display: 'flex', justifyContent: 'space-evenly' }}>
                      <CardBox 
                        id={accommodation?._id}
                        photos={accommodation?.photos}
                        name={accommodation?.name}
                        rating={accommodation?.rating}
                        price={accommodation?.price}
                        location={`${accommodation?.idLocation?.city}, ${accommodation?.idLocation?.country}`}
                      />
                      <div >
                       
                          <Space direction="vertical" size={12}>
                            <div style={{ display: 'flex', alignItems: 'center', marginTop: '30px' }} >
                            <span style={{ marginRight: '79px', fontWeight: 'bold' }}>Check In</span>
                              <DatePicker
                                defaultValue={dayjs(fecha, dateFormat)}
                                format={dateFormat}
                                allowClear={false}
                                disabledDate={(current) => current && current < dayjs().endOf('day')}
                                open={false} // Evita que se despliegue el menú de selección de fecha
                                inputReadOnly={true}
                              />
                            </div>
                          </Space>

                          <Divider />

                          <Space direction="vertical" size={12}>
                            <div style={{ display: 'flex', alignItems: 'center' }} >
                              <span style={{ marginRight: '70px', fontWeight: 'bold' }}>Check Out</span>
                                <DatePicker
                                  defaultValue={dayjs('2055/01/01', dateFormat)}
                                  format={dateFormat}
                                  allowClear={false}
                                  disabledDate={(current) => current && current < dayjs().endOf('day')}
                                  open={false} // Evita que se despliegue el menú de selección de fecha
                                  inputReadOnly={true}
                                />
                            </div>
                          </Space>

                          <Divider />
                          
                          <Space direction="vertical" size={12}>
                            <div style={{ display: 'flex', alignItems: 'center' }} >
                              <span style={{ marginRight: '70px', fontWeight: 'bold' }}>Dias Reservados:</span>
                              <span style={{ fontWeight: 'bold' }}>45</span>
                               
                            </div>
                          </Space>

                          <Divider />
                          
                          <Space direction="vertical" size={12}>
                            <div style={{ display: 'flex', alignItems: 'center' }} >
                              <span style={{ marginRight: '80px', fontWeight: 'bold', fontSize: '20px' }}>Total Pagado:</span>
                              <span style={{ fontWeight: 'bold', fontSize: '18px' }}>$<u>100USD</u></span>
                               
                            </div>
                          </Space>
                      </div>
                    </div>
                  </Col>
                );
              })}
          </Row>
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Reservation;


