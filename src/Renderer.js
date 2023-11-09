import React, { useRef, useState, useEffect } from "react";

import * as d3 from "d3";
import Chart from './Chart'

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

// 1. finish documenting the api - done
// 2. process objects into d3 in the d3 component - write out data model
// also set up the logic of what to do with said objects
// d3 objects = objects in here, like axis is an axis.
// OR
// can do one "generic" variable type w diff properties
// when there is a new type of d3 object such as axis
// it can be assigned to a variable as a property of that variable
// the instance will be uservar.axis, say
// and you can operate on it from there from other UI sections
// 3. add typescript and pass in (some) arrays of objects, some values

// finish processing backend logic
// 4. connect those objects to the ui
// 5. import - done / export
// 6. create accordion - done, delete accordion, add expand icon back to accordion
// 7. fully implement multi and rename accordion, restyle delete and add buttons
// 8. add warning dialogs when you delete / leave
// 9. improve inputs for data type validation, add tooltips
// 10. variable / json field dropdowns for selection, "enter" to persist instructions at top

// finish backend
// finish the ui based on the backend
// expand/add/delete lucide dev icons restyle
// delete accordion
// connect the ui to the backend
// warning dialog when delete / leave
// input types / tooltips
// variables/json field dropdowns
// dropdown elements must depend on other vars -
// like a new var gets added to var dropdown when created
// enter to persist instructions
// bug pass

// add'l : what if add visual sparql data queries?
// like make it very easy to visualize data from sparql

// Initial dataset to load
let initialData = [
  {id: 1, state: "NY", county: "D", rate: 3.2}, 
  {id: 2, state: "DE", county: "M", rate: 5.1},
  {id: 3, state: "AZ", county: "B", rate: 1.1}, 
  {id: 4, state: "CA", county: "A", rate: 2.4},
  {id: 5, state: "ND", county: "C", rate: 3.8}, 
  {id: 6, state: "IN", county: "M", rate: 4.5}
]

// Icons
let expandIco = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
let addIco = <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
let deleteIco = <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>

// Renders not only the Chart but all UI Controls
function Renderer() {
  // should be color picker - react package for color picker?
  // could also fill in color names with preview swatches.

  // Refs
  const chartColorInputRef = useRef(null);
  const userVarNameInputRef = useRef(null);
  const addFileInputRef = useRef(null);
  const dsvDelimiterInputRef = useRef(null);
  const randomDistributionInputRef = useRef(null);
  const pathInputRef = useRef(null);
  const selectionInputRef = useRef(null);
  const eventNameInputRef = useRef(null);
  const transitionTimeInputRef = useRef(null);
  const xAxisLabelRef = useRef(null);
  const yAxisLabelRef = useRef(null);

  // States
  const [chartColor, setChartColor] = useState("steelblue");
  const [userVarName, setUserVarName] = useState("myVar");
  const [aFile, setAFile] = useState(initialData);
  const [dsvDelimiter, setDsvDelimiter] = useState(",");
  const [randomDistribution, setRandomDistribution] = useState("");
  const [path, setPath] = useState("");
  const [selection, setSelection] = useState("");
  const [eventName, setEventName] = useState("myEvent");
  const [transitionTime, setTransitionTime] = useState(100);
  const [xAxisLabel, setXAxisLabel] = useState("");
  const [yAxisLabel, setYAxisLabel] = useState("");
  const [variables, setVariables] = useState([]); 

  // Handlers
  const handleColorChangeBlur = () => {
    setChartColor(chartColorInputRef.current.value)
  };
  const handleColorChangeEnter = (e) => {
    if (e.keyCode == 13){
        setChartColor(chartColorInputRef.current.value)
    }
  };
  const handleXAxisLabelChangeBlur = () => {
    setXAxisLabel(xAxisLabelRef.current.value)
  };
  const handleXAxisLabelChangeEnter = (e) => {
    if (e.keyCode == 13){
        setXAxisLabel(xAxisLabelRef.current.value)
    }
  };
  const handleYAxisLabelChangeBlur = () => {
    setYAxisLabel(yAxisLabelRef.current.value)
  };
  const handleYAxisLabelChangeEnter = (e) => {
    if (e.keyCode == 13){
        setYAxisLabel(yAxisLabelRef.current.value)
    }
  };
  const handleUserVarNameChange = () => {
    setUserVarName(userVarNameInputRef.current.value)
  };
  const handleAFileChange = () => {
    // setAFile(addFileInputRef.current.value)
  };
  const handleDsvDelimiterChange = () => {
    setDsvDelimiter(dsvDelimiterInputRef.current.value)
  };
  const handleRandomDistributionChange = () => {
    setRandomDistribution(randomDistributionInputRef.current.value)
  };
  const handlePathChange = () => {
    setPath(pathInputRef.current.value)
  };
  const handleSelectionChange = () => {
    setSelection(selectionInputRef.current.value)
  };
  const handleEventNameChange = () => {
    setEventName(eventNameInputRef.current.value)
  };
  const handleTransitionTimeChange = () => {
    setTransitionTime(transitionTimeInputRef.current.value)
  };

  const handleAddVariableClick = () => {
    let newVar = <Accordion key={variables.length}>
                  <AccordionSummary>
                    <button onClick={handleDeleteVariableClick(variables.length)}>{deleteIco}</button> 
                    &nbsp;&nbsp;&nbsp;{userVarName}
                  </AccordionSummary>
                  <AccordionDetails>
                  </AccordionDetails>
                </Accordion>
    userVarNameInputRef.current.value = "";
    setUserVarName("");
    setVariables(variables => [...variables, newVar])
  }

  const handleDeleteVariableClick = (key) => {
    let newList = variables.splice(key-1, 1)
    setVariables(newList)
  }

  // Set the input data based on an input file
  const setFileData = (e) => {
    let reader = new FileReader()
    reader.onload = onRenderLoad;
    reader.readAsText(e.target.files[0]);
  }

  const onRenderLoad = (e) => { setAFile(JSON.parse(e.target.result)); }

  return (
    <div className="main">
      <div id="viz" className="viz">
        <Chart data={aFile} color={chartColor} vars={variables} xAxisLabel={xAxisLabel} yAxisLabel={yAxisLabel} />
      </div>
      <div className="ctrls">
        <Accordion>
          <AccordionSummary
            expandIcon={expandIco}
          >
            <Typography>Variables</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Variable:&nbsp;
              <input ref={userVarNameInputRef} id="userVarNameInput" type="text" onBlur={handleUserVarNameChange}></input>
            </Typography>
            {variables}
            <button onClick={handleAddVariableClick}>{addIco}</button>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary>
            <Typography>Data</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              File:&nbsp;
              <input ref={addFileInputRef} onChange={setFileData} id="fileInput" type="file" onBlur={handleAFileChange}></input>
            </Typography>
            <Typography>
              <span title="Sets the X (horizontal) axis label text.">X-Axis Label Text:</span>&nbsp;
              <input ref={xAxisLabelRef} id="xAxisLabelInput" type="text" onBlur={handleXAxisLabelChangeBlur} onKeyDown={handleXAxisLabelChangeEnter}></input>
            </Typography>
            <Typography>
              <span title="Sets the Y (vertical) axis label text.">Y-Axis Label Text:</span>&nbsp;
              <input ref={yAxisLabelRef} id="yAxisLabelInput" type="text" onBlur={handleYAxisLabelChangeBlur} onKeyDown={handleYAxisLabelChangeEnter}></input>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary>
            <Typography>Data Transforms</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Accordion>
              <AccordionSummary
                // expandIcon={}
              >
                <Typography>DSV</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  DSV:&nbsp;
                  <input ref={dsvDelimiterInputRef} id="dsvDelimiterInput" type="text" onBlur={handleDsvDelimiterChange}></input>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                // expandIcon={}
              >
                <Typography>Random</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Random:&nbsp;
                  <input ref={randomDistributionInputRef} id="randomDistributionInput" type="text" onBlur={handleRandomDistributionChange}></input>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary>
            <Typography>Visualization</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Path:&nbsp;
              <input ref={pathInputRef} id="pathInput" type="text" onBlur={handlePathChange}></input>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary>
            <Typography>Selections</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Selection:&nbsp;
              <input ref={selectionInputRef} id="selectionInput" type="text" onBlur={handleSelectionChange}></input>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary>
            <Typography>Style</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <span title="Sets the color of the chart.">Color:</span>&nbsp;
              <input ref={chartColorInputRef} id="chartColorInput" type="text" onBlur={handleColorChangeBlur} onKeyDown={handleColorChangeEnter}></input>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary>
            <Typography>Interaction</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Event Name:&nbsp;
              <input ref={eventNameInputRef} id="eventNameInput" type="text" onBlur={handleEventNameChange}></input>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary>
            <Typography>Animation</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Transition Time:&nbsp;
              <input ref={transitionTimeInputRef} id="transitionTimeInput" type="text" onBlur={handleTransitionTimeChange}></input>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default Renderer;
