import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCities, getCountries, getServices } from "../../../redux/Actions/actions";
import { Button, Checkbox, Form, Input, InputNumber, Modal, Select, Upload } from "antd";
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
    bedroom: [],
    bathroom: [],
    services: [],
    country: "",
    city: "",
    address: "",
    zipCode: "",
    description: "",
    price: 0,
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
        setFormData({
          ...formData,
          services: [...formData.services, value]
        });
      } else {
        setFormData({
          ...formData,
          [field]: value
        });
      }
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // Crear un objeto FormData con los datos de formData
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("bedroom", formData.bedroom);
    formDataToSend.append("bathroom", formData.bathroom);
    formDataToSend.append("services", JSON.stringify(formData.services));
    formDataToSend.append("country", formData.country);
    formDataToSend.append("city", formData.city);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("zipCode", formData.zipCode);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    // Agregar la imagen a formDataToSend (fileList[0] debería ser un archivo)
    if (fileList.length > 0) {
      formDataToSend.append("image", fileList[0].originFileObj);
    }

    try {
      // Realizar la solicitud POST al servidor con formDataToSend
      const response = await axios.post("URL_DE_TU_API", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setServerResponse({ success: "Usuario registrado con éxito" });
    } catch (error) {
      setServerResponse({ error: "No se pudo registrar el usuario" });
    }
  };

  const handleCity = (value) => {
    dispatch(getCities(value));
  };

  // GoogleMaps
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
                value={formData.name}
                onChange={(e) => handleFormChange("name", e.target.value)}
              />
            </Form.Item>
          </div>

          {/* Accommodation Name end */}
          {/* Services */}

          <h1>Servicios</h1>

          <div className={style.services}>
            <div className={style.bedroom}>
              <Form.Item
                label="Habitaciones"
                name="bedroom"
              >
                <Select
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
            </div>

            <div className={style.bathroom}>
              <Form.Item
                label="Baños"
                name="bathroom"
              >
                <Select
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
                value={formData.services}
                onChange={(value) => handleFormChange("services", value)}
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
              onChange={(value) => handleCity(value) && handleFormChange("country", value)}
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
              onChange={(e) => handleFormChange("address", e.target.value)}
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
              value={formData.zipCode}
              onChange={(value) => handleFormChange("zipCode", value)}
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