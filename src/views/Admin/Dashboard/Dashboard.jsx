import React from 'react';
import { Row, Col, Card } from 'antd';
import LineReservation from './LineReservation'; 
import PieChartUser from './PieChartUser'; 
import PieChartAccommodation from './PieChartAccommodation';
import RatingBarChart from './RatingBarChart';

const DashboardWithCharts = () => {
  return (
    <>
      <div>Dashboard</div>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Card title="Line Reservation" style={{ marginBottom: 16 }}>
            <LineReservation />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Card title="Rating Bar Chart" style={{ marginBottom: 16 }}>
            <RatingBarChart />
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Card title="Pie Chart User" style={{ marginBottom: 16 }}>
            <PieChartUser />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Card title="Pie Chart Accommodation" style={{ marginBottom: 16 }}>
            <PieChartAccommodation />
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default DashboardWithCharts;
