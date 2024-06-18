import React, { useEffect, useState } from 'react';

import "bootstrap/dist/css/bootstrap.min.css"; 
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; 

export const Summary = ({ fileUploaded }) => {
    const [modelName, setModelName] = useState("");
    const [uptimeName, setUptimeName] = useState("");
    const [dumpName, setDumpName] = useState("");
    const [versionName, setVersionName] = useState("");
    useEffect(() => {
        const modeloRE = /\[ro\.product\.model\]:\s+\[(.*?)\]/;  
        const uptimeRE = /Uptime:(.*?)\n/;
        const dumpDateRE = /dumpstate:\s(.*?)\n/;
        const versionRE = /\[ro\.product\.build\.fingerprint\]:\s+\[(.*?)\]\n/;

        // capturando as expressoes 
        const modelo = modeloRE.exec(fileUploaded);
        const uptime = uptimeRE.exec(fileUploaded);
        const dumpstate = dumpDateRE.exec(fileUploaded);
        const version = versionRE.exec(fileUploaded);
        if (modelo) setModelName(modelo[1]);
        if (uptime) setUptimeName(uptime[1]);
        if (dumpstate) setDumpName(dumpstate[1]);
        if (version) setVersionName(version[1]);    

    }, [fileUploaded]);

    return (
        <div className="mx-2 p-2 border border-black border-opacity-25 rounded">
            <div className="container text-center">
                <div className="row align-items-center">
                    <div className="col d-flex flex-column justify-content-center">
                        <p className="text-center"><b>Build:</b> {versionName}</p>
                        <p className="text-center"><b>Device:</b> {modelName}</p>
                    </div>
                    <div className="col d-flex flex-column justify-content-center">
                        <p className="text-center"><b>Uptime:</b> {uptimeName}</p>
                        <p className="text-center"><b>Dumpstate:</b> {dumpName}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
