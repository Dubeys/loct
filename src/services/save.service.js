import JSZip from "jszip";

export function save({fileNames, keys, values}) {

    //reconstruct data to a json structure with: documentName -> {"key": "value"[]}
    //from data: {fileNames: documentNames[], keys: allKeys[], values: values[fileNames.length][keys.length] }

    const files = fileNames.map((fileName, fileIndex) => {
        return {
            name: fileName, 
            valuesString: JSON.stringify(
                keys.reduce((acc, key, index) => {
                    return({...acc, [key]: values[fileIndex][index]})
                },{})
            ,null, 2)
        };
    });

    const zip = new JSZip();
    files.forEach((file) => {
        zip.file(file.name+'.json', file.valuesString,{type: "string"});
    })

    console.log(zip.files);
    zip.generateAsync({type: 'base64'}).then((res) => {
        window.location.href = "data:application/zip;base64," + res;
    })

    // this.transform.addEventListener('change', (e) => {
//     const fileReader = new FileReader();
//     fileReader.addEventListener('load', (res) => {
//         const resParsed = JSON.parse(res.target.result);
//         this.templateLoaded.then((template) => {

//             const reordered = JSON.stringify(template.reduce((acc, templateKey) => {
//                 return resParsed[templateKey] ? { ...acc, [templateKey]: resParsed[templateKey] } : { ...acc, [templateKey]: '' };
//             }, {})).replace(/\",\"/g, '\",\n\"').replace(/\},\"/g, '\},\n\"').replace(/\{/g, '{\n').replace(/\}/g, '\n\}');

//             const url = 'data:text/plain;charset=utf-8,' + encodeURIComponent(reordered);
//             this.download.setAttribute('href', url);
//             const index = e.target.value.lastIndexOf('\\') < 0 ? e.target.value.lastIndexOf('/') : e.target.value.lastIndexOf('\\')
//             let filename = e.target.value.substring(index);
//             if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) filename = filename.substring(1);
//             this.download.setAttribute('download', filename);

//         })
//     })
//     fileReader.readAsText(e.target.files[0]);
// })

    
}