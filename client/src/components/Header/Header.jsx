import '../Header/Header.css'
import React, { useState } from 'react';
import NSlogo2 from "../../assets/image/logo.png"
import { Space, Dropdown, Modal } from 'antd';
import User from '../Modals/RegisterUser/User';
import Login from '../Modals/Login/Login';
import SearchBar from '../SearchBar/SearchBar';
import { Link, NavLink } from 'react-router-dom/dist';


function Header() {
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const closeUserModal = () => {
    setIsUserModalVisible(false);
  };
  const closeLoginModal = () => {
    setIsLoginModalVisible(false);
  };
  const items = [
    {
      label: <a className='font-bold' onClick={() => setIsUserModalVisible(true)}>Registro</a>,
      key: '0',
    },
    {
      label: <a onClick={setIsLoginModalVisible}>Iniciar sesión</a>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: <NavLink to="/register-accommodation">Publica tu espacio</NavLink>,
      key: '3',
    },
    {
      label: 'Centro de ayuda',
      key: '4',
    },
  ];

  return (
    <div>
      <nav className="bg-white w-full navBar relative justify-between items-center mx-auto px-1">
        {/* Logo */}
        <header className='p-4 flex justify-between'>
        <Link to="/home" className='flexgap-1'>
          <img src={NSlogo2} width={185} height={70} alt="Nomada Suite Logo" />
        </Link>

          {/* end logo */}

          <SearchBar />

          {/* publish */}

          <div className="mt-4 flex space-x-4 justify-end text-gray-500 md:flex xl:flex col-span-2 justify-end">
            <p className='font-bold'>Publica tu espacio</p>
            <button className="flex space-x-4 justify-end text-gray-500 md:flex xl:flex col-span-2 justify-end">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
            </button>

            {/* end publish */}

            {/* Login */}

          </div>
          <Dropdown
            menu={{
              items,
            }}
            trigger={['click']}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <button className='flex gap-2 border border-gray-300 rounded-full py-2 px-3'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-9">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                  <div className='bg-gray-500 text-white rounded-full border border-gray-500 bg-primary '>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                      <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                    </svg>
                  </div>
                </button>
              </Space>
            </a>
          </Dropdown>

          {/* end login */}

          <Modal
            className="modalRegister"
            title="Registro"
            open={isUserModalVisible}
            onCancel={closeUserModal}
            footer={null}
          >
            <User />
          </Modal>
          <Modal
            className="modalRegister"
            title="Bienvenido a NómadaSuite"
            open={isLoginModalVisible}
            onCancel={closeLoginModal}
            footer={null}
          >
            <Login />
          </Modal>

        </header>
      </nav>
    </div>
  )
}
export default Header;