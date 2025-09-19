import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import home from './srcImages/home.png'
import CurrentHoldings from './Pages/CurrentHoldings/CurrentHoldings.jsx';
import DividendEntries from './Pages/DividendEntries/DividendEntries.jsx';
import ClubPreferences from './Pages/ClubPreferences/ClubPreferences.jsx';
import ClubHolds from './Pages/ClubHolds/ClubHolds.jsx';
import upGreenRight from './srcImages/UpGreenRight.png'
import downRedRight from './srcImages/DownRedRight.png'
import RootLayout from './Pages/RootLayout.jsx';
import HomePage from './Pages/HomePage/HomePage.jsx';
import MagicFormula from './Pages/MagicFormula/MagicFormula.jsx';
import Banks from './Pages/Banks/Banks.jsx';
import Simulator from './Pages/Simulator/Simulator.jsx';
import WatchList from './Pages/WatchList/WatchList.jsx';
import HistoricalDividends from './Pages/HistoricalDividends/HistoricalDividends.jsx';
import StatementSpreadSheet from './Pages/StatementSpreadSheet/StatementSpreadSheet.jsx';
import SummarySpreadSheet from './Pages/SummarySpreadSheet/SummarySpreadSheet.jsx';

import {Amplify} from 'aws-amplify'
import awsconfig from './aws-exports'
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';


Amplify.configure(awsconfig)

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {path: '/', element: <HomePage/>},
      {path: '/current', element: <CurrentHoldings/>},
      {path: '/dividendentries', element: <DividendEntries/>},
      {path: '/clubpreferences', element: <ClubPreferences/>},
      {path: '/clubholds', element: <ClubHolds/>},
      {path: '/magicformula', element: <MagicFormula/>},
      {path: '/banks', element: <Banks/>},
      {path: '/watchlist', element: <WatchList/>},
      {path: '/historicaldividendentries', element: <HistoricalDividends/>},
      {path: '/simulator', element: <Simulator/>},
      {path: '/statmententries', element: <StatementSpreadSheet/>},
      {path: '/summaryentries', element: <SummarySpreadSheet/>}
    ]
  },

]);
function App() {



  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div className="App">
          <RouterProvider router={router}/>
          <button onClick={signOut}>Sign out</button>
        </div>
      )}
    </Authenticator>
  );
}

export default App;

