import './App.css';
import * as d3 from "d3";
import {useEffect, useState} from 'react'
import Renderer from './Renderer'

function App() {
  return (
    <div>
    <h2 className="title">D3 Sandbox</h2>
    <Renderer />
    </div>
  );
}

export default App;
