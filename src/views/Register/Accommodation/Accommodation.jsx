import { getCities, getCountries, getServices } from "../../../redux/Actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Button, Checkbox, Col, Form, Input, InputNumber, Modal, Row, Select, Upload, notification } from "antd";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { PlusOutlined } from "@ant-design/icons";
import style from "./Accommodation.module.css"
import axios from "axios";

const { TextArea } = Input;

const buttonStyle = {
  background: "#231CA7",
  color: "white",
  height: "3rem",
  width: "160%"
};

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const containerStyle = {
  width: '100%',
  height: '315px'
};

const center = {
  lat: -38.158,
  lng: -63.107
};

const Accommodation = () => {

  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [servicesGroup, setServicesGroup] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const countries = useSelector((state) => state.countries);
  const services = useSelector((state) => state.services);
  const cities = useSelector((state) => state.cities);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    services: [],
    country: "",
    city: "",
    address: "",
    zipCode: "",
    description: "",
    price: 0,
    coordinates: ""
  });

  useEffect(() => {
    dispatch(getServices());
    dispatch(getCountries());
  }, []);

  const handleFormChange = (field, value) => {
    if (field === "bedroom" || field === "bathroom") {
      setFormData({
        ...formData,
        services: [...formData.services, value]
      });
    } else {
      if (field === "services") {
        const services = formData.services.filter(service => !servicesGroup.includes(service));
        setServicesGroup(value);
        setFormData({
          ...formData,
          services: [...services, ...value]
        });
      } else {
        setFormData({
          ...formData,
          [field]: value
        });
      }
      if (field === "country") {
        dispatch(getCities(value));
      }
    }
  };

  // Images
  const props = {
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  // GoogleMaps
  const [selectedCoordinates, setSelectedCoordinates] = useState({
    lat: 0,
    lng: 0,
  });

  const handleMapClick = (event) => {
    const coordinates = `${event.latLng.lat()}, ${event.latLng.lng()}`
    setFormData({
      ...formData,
      coordinates: coordinates
    })
    setSelectedCoordinates({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  const handleFormSubmit = async (values) => {
    var form = document.querySelector('form');
    let formDataToSend = new FormData(form);
    formDataToSend.append("name", values.name);
    if (formData.services.length > 0) {
      formData.services.forEach((service) => {
        formDataToSend.append("services", service);
      })
    }
    formDataToSend.append("country", values.country);
    formDataToSend.append("city", values.city);
    formDataToSend.append("address", values.address);
    formDataToSend.append("zipCode", values.zipCode);
    formDataToSend.append("description", values.description);
    formDataToSend.append("price", values.price);
    formDataToSend.append("coordinates", formData.coordinates);
    if (values.image.length > 0) {
      values.image.forEach((image) => {
        formDataToSend.append("images", image.originFileObj);
      })
    }

    try {
      await axios.post('/accommodation/create', formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      notification.success({
        message: 'Hemos recibido tu formulario.',
        description: 'Estamos en proceso de revisión.',
        placement: 'bottomLeft'
      });
    } catch (error) {
      notification.error({
        message: 'Lo sentimos.',
        description: 'el registro no se ha completado.',
        placement: 'bottomLeft'
      });
    }
  }

  return (
    <div className={style.Accommodation}>
      <div className={style.accommodationBox}>
        <Form
          name="form"
          onFinish={handleFormSubmit}
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 15,
          }}
          layout="horizontal"
          style={{
            maxWidth: "100%",
          }}
        >

          <Row gutter={50}>
            <Col span={12}>
              {/* Accommodation Name */}

              <div>
                <Form.Item
                  label="Nombre"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: 'Por favor ingrese su nombre',
                    },
                  ]}
                >
                  <Input
                    type="text"
                    autoComplete="true"
                    value={formData.name}
                    onChange={(event) => handleFormChange("name", event.target.value)}
                  />
                </Form.Item>
              </div>

              {/* Accommodation Name end */}
              {/* Services */}

              <hr />
              <h1>Servicios</h1>

              <Row>
                <Col span={12}>
                  <Form.Item
                    label="Habitaciones: "
                    name="bedroom"
                    rules={[
                      {
                        required: true,
                        message: 'Por favor ingrese la cantidad de habitaciones de su alojamiento',
                      },
                    ]}
                    labelCol={{ span: 10 }}
                  >
                    <Select
                      style={{ width: '100%' }}
                      placeholder="Cantidad"
                      value={formData.bedroom}
                      onChange={(value) => handleFormChange("bedroom", value)}
                    >
                      {services.filter((service) => service.name === 'Habitación')
                        .map((service) => (
                          <Select.Option
                            key={service._id}
                            value={service._id}
                          >
                            {`${service.quantity}`}
                          </Select.Option>
                        ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="Baños: "
                    name="bathroom"
                    labelCol={{ span: 10 }}
                  >
                    <Select
                      style={{ width: '100%' }}
                      placeholder="Cantidad"
                      value={formData.bathroom}
                      onChange={(value) => handleFormChange("bathroom", value)}
                    >
                      {services
                        .filter((service) => service.name === 'Baño')
                        .map((service) => (
                          <Select.Option
                            key={service._id}
                            value={service._id}
                          >
                            {`${service.quantity}`}
                          </Select.Option>
                        ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item name="services">
                <Checkbox.Group
                  style={{
                    width: '175%',
                  }}
                  value={formData.services}
                  onChange={(value) => handleFormChange("services", value)}
                >
                  <Row>
                    {services
                      .filter((service) => service.name !== 'Habitación' && service.name !== 'Baño')
                      .map((service) => (
                        <Col span={8} key={service._id}>
                          <Checkbox value={service._id}>{service.name}</Checkbox>
                        </Col>
                      ))}
                  </Row>
                </Checkbox.Group>
              </Form.Item>
              <hr />

              {/* Services end */}
              {/* Photos */}

              <Form.Item
                label="Fotos"
                name='image'
                valuePropName="fileList"
                getValueFromEvent={normFile}
                wrapperCol={{
                  span: 20,
                }}
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingrese una imagen',
                  },
                ]}
              >
                <Upload
                  {...props}
                  accept="image/*"
                  fileList={fileList}
                  listType="picture-card"
                  onPreview={handlePreview}
                  type="file"
                >
                  <div>
                    <PlusOutlined />
                    <div
                      style={{
                        marginTop: 8,
                      }}
                    >
                      Upload
                    </div>
                  </div>
                </Upload>
              </Form.Item>
              <hr />
              <Modal
                footer={null}
                onCancel={handleCancel}
                open={previewOpen}
              >
                <img
                  alt="example"
                  style={{
                    width: '100%',
                  }}
                  src={previewImage}
                />
              </Modal>

              {/* Photos end */}
              {/* Country */}

              <Form.Item
                label="País"
                name="country"
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingrese un país',
                  },
                ]}
              >
                <Select
                  placeholder="Selecciona el país"
                  onChange={(value) => handleFormChange("country", value)}
                  value={formData.country}
                >
                  {countries.map((country) => (
                    <Select.Option
                      key={country.country_name}
                      value={country.country_name}
                    >
                      {`${country.country_name}`}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              {/* Country end */}
              {/* City */}

              <Form.Item
                label="Ciudad"
                name="city"
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingrese la ciudad',
                  },
                ]}
              >
                <Select
                  placeholder="Selecciona la ciudad"
                  value={formData.city}
                  onChange={(value) => handleFormChange("city", value)}
                >
                  {cities.map((country) => (
                    <Select.Option
                      key={country.state_name}
                      value={country.state_name}
                    >
                      {`${country.state_name}`}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              {/* City end */}
              {/* Address */}

              <Form.Item
                label="Dirección"
                name="address"
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingrese una dirección',
                  },
                ]}
              >
                <Input
                  type="text"
                  value={formData.address}
                  onChange={(event) => handleFormChange("address", event.target.value)}
                />
              </Form.Item>

              {/* Address end */}
            </Col>
            <Col span={12}>
              {/* Zip Code */}

              <Form.Item
                label="Código Postal"
                name="zipCode"
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingrese el código postal',
                  },
                ]}
              >
                <Input
                  value={formData.zipCode}
                  onChange={(event) => handleFormChange("zipCode", event.target.value.replace(/\D/g, ''))}
                />
              </Form.Item>
              <hr />

              {/* Zip Code end */}
              {/* GoogleMaps */}

              <div className={style.map}>
                <LoadScript
                  googleMapsApiKey="AIzaSyArs06xMpsgYYgUJFVEkngG6e0TZkF0Sus"
                  name="coordinates"
                >
                  <GoogleMap
                    name="coordinates"
                    mapContainerStyle={containerStyle}
                    center={center}
                    id="map"
                    zoom={5}
                    onClick={handleMapClick}
                  >
                    <Marker position={selectedCoordinates} />
                  </GoogleMap>
                </LoadScript>
              </div>
              <hr />

              {/* GoogleMaps end */}
              {/* Description */}

              <Form.Item
                label="Despripción"
                name="description"
              >
                <TextArea
                  rows={4}
                  value={formData.description}
                  onChange={(event) => handleFormChange("description", event.target.value)}
                  placeholder="En este espacio, puedes proporcionar no solo una descripción de tu alojamiento, sino también información detallada sobre los servicios que ofreces y/o condiciones."
                />
              </Form.Item>

              {/* Description end */}
              {/* Price */}

              <Form.Item
                label="Precio"
                name="price"
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingrese un valor',
                  },
                ]}
              >
                <InputNumber
                  formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  min={5}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  step="0.01"
                  value={formData.price}
                  onChange={(value) => handleFormChange("price", value)}
                />
              </Form.Item>

              {/* Price end */}

              <Form.Item>
                <Button
                  block
                  htmlType="submit"
                  style={buttonStyle}
                  type="primary"
                >
                  Registrar
                </Button>
              </Form.Item>

            </Col>
          </Row>
        </Form >
      </div >
    </div >
  )
};

export default Accommodation;