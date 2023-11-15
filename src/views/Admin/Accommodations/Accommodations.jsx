import { Button, Flex, Space, Table, Input, notification, Tooltip, Modal, Form, Row, Col, Select, Checkbox, Upload, InputNumber } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { MdDomainAdd, MdDomainDisabled } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import Highlighter from "react-highlight-words";

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

import {
  EditOutlined,
  PlusOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAccommodation_A, getAccommodationPendingConfirmation_A, getActiveAccommodation_A, getDisabledAccommodation_A, getServices, updateAccommodation_A } from '../../../redux/Actions/actions';

const AccommodationAdmin = () => {

  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [servicesGroup, setServicesGroup] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const services = useSelector((state) => state.services);
  const [formData, setFormData] = useState({
    name: "",
    services: [],
    description: "",
    price: 0,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeAccommodation = useSelector((state) => state.activeAccommodation_A)
  const disabledAccommodation = useSelector((state) => state.disabledAccommodation_A)
  const accommodationPendingConfirmation = useSelector((state) => state.accommodationPendingConfirmation_A)

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActiveAccommodation_A());
    dispatch(getAccommodationPendingConfirmation_A());
    dispatch(getDisabledAccommodation_A());
    dispatch(getServices())
    const dataColumns = [];
    if (users.length > 0) {
      users.reverse().map((user, index) => {
        const tags = [];
        const userId = user._id;
        if (user.isActive) {
          tags.push("Activo")
        }
        else {
          tags.push("Inactivo")
        }
        if (user.isAdmin) {
          tags.push("Admin")
        }
        dataColumns.push({
          key: index,
          avatar:
            user.profileImage ?
              <Image
                width={30}
                style={{ borderRadius: "50%" }}
                src={user.profileImage}
              />
              :
              <FaCircleUser style={{ fontSize: "30px", color: "#d3ceee" }} />,
          name: user.firstName + " " + user.lastName,
          email: user.email,
          admin: <Switch className={userStyles.toggle} defaultChecked={user.isAdmin} onChange={(checked) => onChangeAdmin(checked, userId)} />,
          active: <Switch className={userStyles.toggle} defaultChecked={user.isActive} onChange={(checked) => onChangeActive(checked, userId)} />,
          tags: tags,
          action:
            <Space size="middle">
              <a onClick={showModal}><EditOutlined /></a>
              <Tooltip title="El usuario se eliminará de manera definitiva">
                <DeleteOutlined onClick={onDelete} />
              </Tooltip>
            </Space>
        })
      })
    }
    setData(dataColumns);
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

  const handleDelete = (accommodationId) => {
    dispatch(deleteAccommodation_A(accommodationId))
      .then(() => {
        notification.success({
          message: '¡Excelente!',
          description: 'El alojamiento se eliminó con éxito.',
          placement: 'bottomLeft'
        });
      })
      .catch((error) => {
        notification.error({
          message: 'Error',
          description: `Lo sentimos, ${(error).toLowerCase()}.`,
          placement: 'bottomLeft'
        })
      });
  };

  const handleActive = (accommodationId) => {
    const dataToSend = {
      isActive: true,
    };
    dispatch(updateAccommodation_A(accommodationId, dataToSend))
      .then(() => {
        notification.success({
          message: '¡Excelente!',
          description: 'El alojamiento se activó con éxito.',
          placement: 'bottomLeft'
        });
      })
      .catch((error) => {
        notification.error({
          message: 'Error',
          description: `Lo sentimos, ${(error).toLowerCase()}.`,
          placement: 'bottomLeft'
        })
      });
  };

  const handleDesactive = (accommodationId) => {
    const dataToSend = {
      isActive: false,
    };
    dispatch(updateAccommodation_A(accommodationId, dataToSend))
      .then(() => {
        notification.success({
          message: '¡Excelente!',
          description: 'El alojamiento se desactivó con éxito.',
          placement: 'bottomLeft'
        });
      })
      .catch((error) => {
        notification.error({
          message: 'Error',
          description: `Lo sentimos, ${(error).toLowerCase()}.`,
          placement: 'bottomLeft'
        })
      });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
  };

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
          <a onClick={showModal}><EditOutlined /></a>
          <Tooltip title="El alojamiento se activará">
            <MdDomainAdd
              onClick={() => handleActive(record.id)}
              style={{ cursor: 'pointer', maxWidth: '50px' }}
            />
          </Tooltip>
          <Tooltip title="El alojamiento se desactivará">
            <MdDomainDisabled
              onClick={() => handleDesactive(record.id)}
              style={{ cursor: 'pointer', maxWidth: '50px' }}
            />
          </Tooltip>
          <Tooltip title="El alojamiento se eliminará de manera definitiva">
            <AiOutlineDelete
              onClick={() => handleDelete(record.id)}
              style={{ cursor: 'pointer', maxWidth: '50px' }}
            />
          </Tooltip>
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

  const handleFormSubmit = async (values) => {
    var form = document.querySelector('form');
    let formDataToSend = new FormData(form);
    formDataToSend.append("name", values.name);
    formDataToSend.append("ownerId", user._id);
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
    if (Object.keys(user).length === 0) {
    } else {
      try {
        const response = await axios.post('/accommodation/create', formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        notification.success({
          message: 'Hemos recibido tu formulario.',
          description: 'Estamos en proceso de revisión.',
          placement: 'bottomLeft'
        });
        const userName = user.firstName + " " + user.lastName;
        axios.post(`/email`, {
          to: user.email,
          subject: "Registro exitoso de alojamiento en NómadaSuite",
          html: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><!--[if gte mso 9]><xml> <o:OfficeDocumentSettings> <o:AllowPNG/> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings></xml><![endif]--> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <meta name="x-apple-disable-message-reformatting"> <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]--> <title></title> <style type="text/css"> @media only screen and (min-width: 620px) { .u-row { width: 600px !important; } .u-row .u-col { vertical-align: top; } .u-row .u-col-100 { width: 600px !important; }}@media (max-width: 620px) { .u-row-container { max-width: 100% !important; padding-left: 0px !important; padding-right: 0px !important; } .u-row .u-col { min-width: 320px !important; max-width: 100% !important; display: block !important; } .u-row { width: 100% !important; } .u-col { width: 100% !important; } .u-col > div { margin: 0 auto; }}body { margin: 0; padding: 0;}table,tr,td { vertical-align: top; border-collapse: collapse;}p { margin: 0;}.ie-container table,.mso-container table { table-layout: fixed;}* { line-height: inherit;}a[x-apple-data-detectors='true'] { color: inherit !important; text-decoration: none !important;}table, td { color: #000000; } #u_body a { color: #0000ee; text-decoration: underline; } @media (max-width: 480px) { #u_content_heading_1 .v-container-padding-padding { padding: 8px 20px 0px !important; } #u_content_heading_1 .v-font-size { font-size: 21px !important; } #u_content_heading_1 .v-text-align { text-align: center !important; } #u_content_text_2 .v-container-padding-padding { padding: 35px 15px 10px !important; } #u_content_text_5 .v-container-padding-padding { padding: 35px 15px 10px !important; } #u_content_text_3 .v-container-padding-padding { padding: 10px 15px 40px !important; } } </style> <!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap" rel="stylesheet" type="text/css"><!--<![endif]--></head><body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #c2e0f4;color: #000000"> <!--[if IE]><div class="ie-container"><![endif]--> <!--[if mso]><div class="mso-container"><![endif]--> <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #c2e0f4;width:100%" cellpadding="0" cellspacing="0"> <tbody> <tr style="vertical-align: top"> <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top"> <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #c2e0f4;"><![endif]--> <div class="u-row-container" style="padding: 0px;background-color: transparent"> <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;"> <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;"> <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]--> <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]--><div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;"> <div style="height: 100%;width: 100% !important;"> <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]--> <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"> <tbody> <tr> <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:arial,helvetica,sans-serif;" align="left"> <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 6px solid #7e8c8d;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%"> <tbody> <tr style="vertical-align: top"> <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%"> <span>&#160;</span> </td> </tr> </tbody> </table> </td> </tr> </tbody></table> <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]--> </div></div><!--[if (mso)|(IE)]></td><![endif]--> <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]--> </div> </div> </div> <div class="u-row-container" style="padding: 0px;background-color: transparent"> <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;"> <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;"> <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]--> <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]--><div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;"> <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"> <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]--> <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"> <tbody> <tr> <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:arial,helvetica,sans-serif;" align="left"> <table width="100%" cellpadding="0" cellspacing="0" border="0"> <tr> <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center"> <img align="center" border="0" src="https://nomadasuitefront-production-cf39.up.railway.app/assets/banner-81eb9417.png" alt="Banner" title="Banner" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 600px;" width="600"/> </td> </tr></table> </td> </tr> </tbody></table><table id="u_content_heading_1" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"> <tbody> <tr> <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:25px 30px 30px 31px;font-family:arial,helvetica,sans-serif;" align="left"> <h1 class="v-text-align v-font-size" style="margin: 0px; color: #023047; line-height: 170%; text-align: center; word-wrap: break-word; font-family: 'Open Sans',sans-serif; font-size: 26px; font-weight: 400;"><div><p><span style="text-decoration: underline;"><strong>¡Gracias por registrar tu alojamiento!</strong></span></p></div></h1> </td> </tr> </tbody></table> <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]--> </div></div><!--[if (mso)|(IE)]></td><![endif]--> <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]--> </div> </div> </div> <div class="u-row-container" style="padding: 0px;background-color: transparent"> <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;"> <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;"> <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]--> <!--[if (mso)|(IE)]><td align="center" width="598" style="width: 598px;padding: 15px 0px;border-top: 1px solid #CCC;border-left: 1px solid #CCC;border-right: 1px solid #CCC;border-bottom: 1px solid #CCC;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]--><div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;"> <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"> <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 15px 0px;border-top: 1px solid #CCC;border-left: 1px solid #CCC;border-right: 1px solid #CCC;border-bottom: 1px solid #CCC;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]--> <table id="u_content_text_2" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"> <tbody> <tr> <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:25px 55px 10px;font-family:arial,helvetica,sans-serif;" align="left"> <div class="v-text-align v-font-size" style="font-size: 14px; color: #333333; line-height: 180%; text-align: left; word-wrap: break-word;"> <p style="font-size: 14px; line-height: 180%;"><span style="font-size: 18px; line-height: 32.4px; font-family: Lato, sans-serif;"><strong><span style="line-height: 32.4px; font-size: 18px;">Hola ${userName}, </span></strong></span></p><p style="font-size: 14px; line-height: 180%;"> </p><p style="font-size: 14px; line-height: 180%;"><span style="font-family: Lato, sans-serif; line-height: 28.8px; font-size: 16px;">Estamos evaluando tu solicitud para publicar tu alojamiento en NómadaSuite, te notificaremos una vez haya sido aprobada tu publicación.</span><span style="font-family: Lato, sans-serif; line-height: 28.8px; font-size: 16px;"></span></p> </div> </td> </tr> </tbody></table><table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"> <tbody> <tr> <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:15px 55px;font-family:arial,helvetica,sans-serif;" align="left"> <table width="100%" cellpadding="0" cellspacing="0" border="0"> <tr> <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center"> <img align="center" border="0" src=${response.data.photos[0]} alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 490px;" width="490"/> </td> </tr></table> </td> </tr> </tbody></table><table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"> <tbody> <tr> <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 55px;font-family:arial,helvetica,sans-serif;" align="left"> <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%"> <tbody> <tr style="vertical-align: top"> <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%"> <span>&#160;</span> </td> </tr> </tbody> </table> </td> </tr> </tbody></table><table id="u_content_text_5" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"> <tbody> <tr> <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:20px 55px;font-family:arial,helvetica,sans-serif;" align="left"> <div class="v-text-align v-font-size" style="font-size: 14px; color: #333333; line-height: 180%; text-align: left; word-wrap: break-word;"> <p style="font-size: 14px; line-height: 180%;"><span style="font-family: Lato, sans-serif; line-height: 28.8px; font-size: 16px;"><strong>Nombre: </strong>${response.data.name}</span></p><p style="font-size: 14px; line-height: 180%;"><strong><span style="font-family: Lato, sans-serif; line-height: 28.8px; font-size: 16px;">Ubicación: </span></strong><span style="font-family: Lato, sans-serif; line-height: 28.8px; font-size: 16px;">${response.data.city}, ${response.data.country}<br /><strong>Descripción: </strong>${response.data.description}</span></p> </div> </td> </tr> </tbody></table><table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"> <tbody> <tr> <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 55px;font-family:arial,helvetica,sans-serif;" align="left"> <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%"> <tbody> <tr style="vertical-align: top"> <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%"> <span>&#160;</span> </td> </tr> </tbody> </table> </td> </tr> </tbody></table><table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"> <tbody> <tr> <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:20px 10px 30px;font-family:arial,helvetica,sans-serif;" align="left"> <!--[if mso]><style>.v-button {background: transparent !important;}</style><![endif]--><div class="v-text-align" align="center"> <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://nomadasuitefront-production-cf39.up.railway.app/" style="height:47px; v-text-anchor:middle; width:239px;" arcsize="93.5%" strokecolor="#231ca7" strokeweight="2px" fillcolor="#ffffff"><w:anchorlock/><center style="color:#231ca7;"><![endif]--> <a href="https://nomadasuitefront-production-cf39.up.railway.app/" target="_blank" class="v-button v-font-size" style="box-sizing: border-box;display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #231ca7; background-color: #ffffff; border-radius: 44px;-webkit-border-radius: 44px; -moz-border-radius: 44px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;border-top-width: 2px; border-top-style: solid; border-top-color: #231ca7; border-left-width: 2px; border-left-style: solid; border-left-color: #231ca7; border-right-width: 2px; border-right-style: solid; border-right-color: #231ca7; border-bottom-width: 2px; border-bottom-style: solid; border-bottom-color: #231ca7;font-size: 14px;"> <span style="display:block;padding:15px 50px;line-height:120%;"><strong><span style="font-family: 'Open Sans', sans-serif; font-size: 14px; line-height: 16.8px;">IR A NÓMADASUITE</span></strong></span> </a> <!--[if mso]></center></v:roundrect><![endif]--></div> </td> </tr> </tbody></table><table id="u_content_text_3" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"> <tbody> <tr> <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 55px 40px;font-family:arial,helvetica,sans-serif;" align="left"> <div class="v-text-align v-font-size" style="font-size: 14px; line-height: 170%; text-align: left; word-wrap: break-word;"> <p style="font-size: 14px; line-height: 170%;"> </p><p style="font-size: 14px; line-height: 170%;"><span style="font-family: Lato, sans-serif; font-size: 16px; line-height: 27.2px;">Saludos,</span></p><p style="font-size: 14px; line-height: 170%;"><span style="font-family: Lato, sans-serif; font-size: 14px; line-height: 23.8px;"><strong><span style="font-size: 16px; line-height: 27.2px;">Equipo de NómadaSuite</span></strong></span></p> </div> </td> </tr> </tbody></table> <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]--> </div></div><!--[if (mso)|(IE)]></td><![endif]--> <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]--> </div> </div> </div> <div class="u-row-container" style="padding: 0px;background-color: transparent"> <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;"> <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;"> <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]--> <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]--><div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;"> <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"> <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]--> <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]--> </div></div><!--[if (mso)|(IE)]></td><![endif]--> <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]--> </div> </div> </div> <div class="u-row-container" style="padding: 0px;background-color: transparent"> <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #424250;"> <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;"> <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #424250;"><![endif]--> <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]--><div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;"> <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"> <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]--> <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"> <tbody> <tr> <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:42px 10px 15px;font-family:arial,helvetica,sans-serif;" align="left"> <div align="center"> <div style="display: table; max-width:134px;"> <!--[if (mso)|(IE)]><table width="134" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:134px;"><tr><![endif]--> <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 13px;" valign="top"><![endif]--> <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 13px"> <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top"> <a href="https://instagram.com/" title="Instagram" target="_blank"> <img src="https://cdn.tools.unlayer.com/social/icons/circle-white/instagram.png" alt="Instagram" title="Instagram" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important"> </a> </td></tr> </tbody></table> <!--[if (mso)|(IE)]></td><![endif]--> <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 13px;" valign="top"><![endif]--> <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 13px"> <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top"> <a href="https://youtube.com/" title="YouTube" target="_blank"> <img src="https://cdn.tools.unlayer.com/social/icons/circle-white/youtube.png" alt="YouTube" title="YouTube" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important"> </a> </td></tr> </tbody></table> <!--[if (mso)|(IE)]></td><![endif]--> <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]--> <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px"> <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top"> <a href="https://email.com/" title="Email" target="_blank"> <img src="https://cdn.tools.unlayer.com/social/icons/circle-white/email.png" alt="Email" title="Email" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important"> </a> </td></tr> </tbody></table> <!--[if (mso)|(IE)]></td><![endif]--> <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]--> </div></div> </td> </tr> </tbody></table><table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"> <tbody> <tr> <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 35px;font-family:arial,helvetica,sans-serif;" align="left"> <div class="v-text-align v-font-size" style="font-size: 14px; color: #ffffff; line-height: 210%; text-align: center; word-wrap: break-word;"> <p style="font-size: 14px; line-height: 210%;"><span style="font-family: Lato, sans-serif; line-height: 29.4px;">Copyrights © Todos los derechos reservados</span></p> </div> </td> </tr> </tbody></table> <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]--> </div></div><!--[if (mso)|(IE)]></td><![endif]--> <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]--> </div> </div> </div> <!--[if (mso)|(IE)]></td></tr></table><![endif]--> </td> </tr> </tbody> </table> <!--[if mso]></div><![endif]--> <!--[if IE]></div><![endif]--></body></html>`
        })
      } catch (error) {
        notification.error({
          message: 'Lo sentimos.',
          description: 'el registro no se ha completado.',
          placement: 'bottomLeft'
        });
      }
    }
  }

  return (
    <>
      <Flex justify='end' style={{ marginBottom: "-2rem" }}>
        <Button><PlusOutlined /> Añadir usuario</Button>
      </Flex>
      <Table columns={columns} dataSource={[...dataActive, ...dataPending, ...dataDisabled]} pagination={{ pageSize: 6 }} />
      <Modal
        title="Editar Alojamiento"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancelModal}
        footer={null}
      >
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

        </Form>
      </Modal>
    </>
  )
}

export default AccommodationAdmin