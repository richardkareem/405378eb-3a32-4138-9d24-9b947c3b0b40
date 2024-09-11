import React from 'react';
import { ToastContainer } from 'react-toastify';

export const ThemeProvider = ({children}:{children: React.ReactNode}) =>{
    return <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={true}
        draggable={true}
        pauseOnHover={true}
      />
      {children}
    </>
}