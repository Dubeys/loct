import React, { useState } from 'react';
import './App.css';
import Row from './components/row/Row';
import Uploader from './components/uploader/Uploader';
import Header from './components/header/Header';
import { save } from './services/save.service';

function App() {
  const [data, setData] = useState({});
  const handleRowChange = (fileIndex, valueIndex, value) => {
    const newData = {...data};
    newData.values[fileIndex][valueIndex] = value;
    setData(newData);
  }

  const handleLabelChange = (valueIndex, label) => {
    const newData = {...data};
    newData.keys[valueIndex] = label;
    setData(newData);
  }

  const handleSave = () => {
    save(data);
    const newData = {...data};
    newData.initialValues = JSON.parse(JSON.stringify(newData.values));
    setData(newData);
  }

  const handleFileLoad = (files) => {
    setData({...files, initialValues: JSON.parse(JSON.stringify(files.values))});
  }

  const handleAddLine = () => {
    const newValues = data.values.map((col) => col.concat(['']));
    setData({...data, keys: data.keys.concat(['']), values: newValues});
    setImmediate(() => {
      window.scrollTo(0, 9999999);
    })
  } 
  
  const rows = data.keys ? data.keys.map((key, index) => ({ key, valueIndex: index, values: data.values.map((f) => f[index]), initialValues: data.initialValues.map((f) => f[index]) })) : [];
  const inputRows = rows.map((r) => (<Row key={r.key} label={r.key} columns={data.fileNames} valueIndex={r.valueIndex} values={r.values} initialValues={r.initialValues} onChange={handleRowChange} onLabelChange={handleLabelChange}/>));

  return (
    <div className="App">
      {!data.keys && <Uploader onLoad={handleFileLoad} />}
      {!!data.keys && <Header columns={data.fileNames} onSave={handleSave} onAddLine={handleAddLine}/>}
      <div className="input-rows">
        {inputRows}
      </div>
    </div>
  );
}

export default App;
