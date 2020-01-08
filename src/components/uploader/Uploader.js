import React from "react";
import './Uploader.css';

function Uploader({onLoad}) {
    const handleFileChange = (e) => {
        const filePromisses = Array.from(e.target.files).map((f) => 
            new Promise((resolve, reject) => {
                const fileReader = new FileReader();
                fileReader.addEventListener('load', (res) => {
                    resolve({ name: f.name.replace(/\.[a-z]+$/, ''), file: JSON.parse(res.target.result)});
                })
                fileReader.readAsText(f);
            })
        )

        Promise.all(filePromisses).then((res) => {
            const allKeys = res.reduce((acc,{file},index) => 
                !index ? acc.concat(Object.keys(file)) : acc.concat(Object.keys(file).filter((k) => !acc.includes(k)))
                ,[]
            );
            const filesTransform = res.reduce((acc, { name, file }) => {
                acc.values.push(allKeys.map((key) => file[key] ? file[key] : ''))
                acc.fileNames.push(name);
                return acc;
            }, {fileNames: [],values: []});
            onLoad({keys: allKeys, ...filesTransform});
        });
    }

    return (
        <div className="uploader">
            <input id="fileupload" type="file" multiple onChange={handleFileChange} />
            <label htmlFor="fileupload">load translation JSONs ( select them all )</label>
        </div>
    )
}

export default Uploader;
