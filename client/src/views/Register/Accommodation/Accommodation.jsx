import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCities, getCountries, getServices } from "../../../redux/Actions/actions";
import { Button, Checkbox, Form, Input, InputNumber, Modal, Select, Upload, Divider } from "antd";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
import style from "./Accommodation.module.css"

const buttonStyle = {
  background: "#231CA7",
  color: "white",
  height: "3rem",
  width: "100%"
};

const { TextArea } = Input;
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

//GoogleMaps

const containerStyle = {
  width: '100%',
  height: '300px'
};

const center = {
  lat: -38.158,
  lng: -63.107
};

const Accommodation = () => {
  const services = useSelector((state) => state.services);
  const countries = useSelector((state) => state.countries);
  const cities = useSelector((state) => state.cities);
  const dispatch = useDispatch();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([])
  const handleCancel = () => setPreviewOpen(false);

  useEffect(() => {
    dispatch(getServices());
    dispatch(getCountries())
  }, []);

  const handleChangePhoto = ({ fileList: newFileList }) => setFileList(newFileList);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const [serverResponse, setServerResponse] = useState(null);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
      const response = await axios.post('http://localhost:3001/api/accommodation/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        setServerResponse({ success: 'Registro exitoso' });
      } else {
        setServerResponse({ error: 'No se pudo realizar el registro' });
      }
    } catch (error) {
      setServerResponse({ error: 'Hubo un error en la solicitud' });
    }
  };

  const [form, setForm] = useState({});

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value
    setForm({
      ...form,
      [property]: value
    });
  };

  const handleCity = (value) => {
    dispatch(getCities(value))
  };

  //GoogleMaps
  const [selectedCoordinates, setSelectedCoordinates] = useState({
    lat: 0,
    lng: 0,
  });

  const handleMapClick = (event) => {
    setSelectedCoordinates({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  return (
    <div className={style.Accommodation}>
      <div className={style.accommodationBox}>
        <Form
          onSubmit={handleFormSubmit}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          style={{
            maxWidth: 600,
          }}
        >

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
                onChange={handleChange}
              />
            </Form.Item>
          </div>

          {/* Accommodation Name end */}
          {/* Services */}

          {/* <h1>Servicios</h1> */}
          <Divider plain><h1>Servicios</h1></Divider>

          <div className={style.services}>
            <div className={style.bedroom}>
              <Form.Item
                label="Habitaciones"
                name="bedroom"
              >
                <Select
                  mode="multiple"
                  placeholder="Selecciona la cantidad de habitaciones"
                  onChange={handleChange}
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
            </div>

            <div className={style.bathroom}>
              <Form.Item
                label="Baños"
                name="bathroom"
              >
                <Select
                  mode="multiple"
                  placeholder="Selecciona la cantidad de baños"
                  onChange={handleChange}
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
            </div>
          </div>

          <div>
            <Form.Item
              name="services"
            >
              <Checkbox.Group
                options={services
                  .filter((service) => service.name !== 'Habitación' && service.name !== 'Baño')
                  .map((service) => ({
                    label: `${service.name}`,
                    value: service._id,
                    key: service._id,
                  }))}
                name="otherServices"
              />
            </Form.Item>
          </div>

          {/* Services end */}
          {/* Photos */}

          <Form.Item
            label="Fotos"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            name='image'
          >
            <Upload
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              listType="picture-card"
              accept='image/png, image/jpeg'
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChangePhoto}
              type='file'
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
          <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
            <img
              alt="example"
              style={{
                width: '100%',
              }}
              src={previewImage}
            />
          </Modal>

          {/* Photos end */}
          {/* Location */}

          <Form.Item
            label="País"
            name="country"
          >
            <Select
              placeholder="Selecciona el país"
              onChange={(value) => handleCity(value)}
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

          {/* Location end */}
          {/* Location */}

          <Form.Item
            label="Ciudad"
            name="city"
          >
            <Select
              placeholder="Selecciona la ciudad"
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

          {/* Location end */}
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
              onChange={handleChange}
            />
          </Form.Item>

          {/* Address end */}
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
              type="number"
              onChange={handleChange}
            />
          </Form.Item>

          {/* Zip Code end */}
          {/* GoogleMaps */}

          <LoadScript googleMapsApiKey="AIzaSyArs06xMpsgYYgUJFVEkngG6e0TZkF0Sus">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              id="map"
              zoom={5}
              onClick={handleMapClick}
            >
              <Marker position={selectedCoordinates} />
            </GoogleMap>
          </LoadScript>

          {/* GoogleMaps end */}
          {/* Description */}

          <Form.Item
            label="Despripción"
            name="description"
          >
            <TextArea rows={4} />
          </Form.Item>

          {/* Description end */}
          {/* Price */}

          <Form.Item
            label="Precio"
            name="price"
          >
            <InputNumber
              formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              min={0}
              parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              step="0.01"
            />
          </Form.Item>

          {/* Price end */}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={buttonStyle}
              block
            >
              Button
            </Button>
          </Form.Item>
        </Form>

        {serverResponse && (
          <div className={serverResponse.error ? 'error' : 'success'}>
            {serverResponse.error || serverResponse.success}
          </div>
        )}

      </div>
    </div>
  )
};

export default Accommodation;