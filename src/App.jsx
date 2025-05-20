//import { useState } from 'react'
import React, { useMemo, useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import Page from './Page';
import './ThemeToggle.css'
import ThemeToggle from './Created_Files/ThemeToggle'; // Import the toggle

import Page from './Created_Files/Page'
import Sidebar from './Created_Files/Sidebar'
import Home from './Created_Files/Home'
import ToggleTheme from './Created_Files/ThemeToggle';

import CustomThemeProvider from './Created_Files/ThemeContext';
import ToggleThemeButton from './Created_Files/ToggleThemeBtn'; './Created_Files/ToggleThemeBtn';

function App() {

 
  return (
    <>
      <div className="app-container">
        <Sidebar/>   
             
      </div>
      <CustomThemeProvider>
      
      <ToggleThemeButton/>
    </CustomThemeProvider>
      
    </>
  )
}

export default App
