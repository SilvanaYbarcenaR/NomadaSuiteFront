import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCities, getCountries, getServices } from "../../../redux/Actions/actions";
import { Button, Checkbox, Form, Input, InputNumber, Modal, Select, Upload, Row, Col } from "antd";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
import style from "./Accommodation.module.css"

const buttonStyle = {
  background: "#231CA7",
  color: "white",
  height: "3rem",
  width: "140%"
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
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const handleCancel = () => setPreviewOpen(false);

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
  console.log(formData.services);

  useEffect(() => {
    dispatch(getServices());
    dispatch(getCountries());
  }, []);

  const handleChangePhoto = ({ fileList: newFileList }) => setFileList(newFileList);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1));
  };

  const [serverResponse, setServerResponse] = useState(null);

  const handleFormChange = (field, value) => {
    if (field === "bedroom" || field === "bathroom") {
      setFormData({
        ...formData,
        services: [...formData.services, value]
      });
    } else {
      if (field === "services") {
        const services = [...formData.services, ...value]
        const servicesFiltered = [...formData.services, ...value].filter((service, index) => {
          return services.indexOf(service) === index;
        });
        setFormData({
          ...formData,
          services: servicesFiltered
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

  const handleFormSubmit = async (values) => {
    console.log(values);
    // Crear un objeto FormData con los datos de formData
    var form = document.querySelector('form');
    let formDataToSend = new FormData(form);
    formDataToSend.append("name", values.name);
    if( values.services.length > 0) {
      values.services.forEach((service) => {
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
    if( values.image.length > 0) {
      values.image.forEach((image) => {
        formDataToSend.append("images", image.originFileObj);
      }) 
    }
    
    try {
      // Realizar la solicitud POST al servidor con formDataToSend
      const response = await axios.post("http://localhost:3001/api/accommodation/create", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setServerResponse({ success: "Usuario registrado con éxito" });
    } catch (error) {
      setServerResponse({ error: "No se pudo registrar el usuario" });
    }
  };

  // GoogleMaps
  const [selectedCoordinates, setSelectedCoordinates] = useState({
    lat: 0,
    lng: 0,
  });

  const handleMapClick = (event) => {
    const coordinates = `${event.latLng.lat()}, ${event.latLng.lng()}`
    console.log(coordinates);
    setFormData({
      ...formData,
      coordinates: coordinates
    })
    setSelectedCoordinates({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  return (
    <div className={style.Accommodation}>
      <div className={style.accommodationBox}>
        <Form
          onFinish={handleFormSubmit}
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
                labelCol={{ span: 10 }}
              >
                <Select
                  style={{ width: '100%' }}
                  placeholder="Selecciona la cantidad de habitaciones"
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
                  placeholder="Selecciona la cantidad de baños"
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
                width: '180%',
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
            valuePropName="fileList"
            getValueFromEvent={normFile}
            name='image'
          >
            <Upload
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              listType="picture-card"
              accept="image/png, image/jpeg"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChangePhoto}
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

          {/* Location end */}
          {/* Location */}

          <Form.Item
            label="Ciudad"
            name="city"
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
              value={formData.address}
              onChange={(event) => handleFormChange("address", event.target.value)}
            />
          </Form.Item>

          {/* Address end */}
          {/* Zip Code */}

          <Form.Item
            label="C.Postal"
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
              onChange={(event) => handleFormChange("zipCode", event.target.value)}
            />
          </Form.Item>
          <hr />

          {/* Zip Code end */}
          {/* GoogleMaps */}

          <div className={style.map}>
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
              onChange={(e) => handleFormChange("description", e.target.value)}
            />
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
              value={formData.price}
              onChange={(value) => handleFormChange("price", value)}
            />
          </Form.Item>

          {/* Price end */}
          <Button
            type="primary"
            htmlType="submit"
            style={buttonStyle}
          >
            Registrar
          </Button>
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