//******************************************************************************************************
//  PQDIFParser.ts - Gbtc
//
//  Copyright © 2021, Grid Protection Alliance.  All Rights Reserved.
//
//  Licensed to the Grid Protection Alliance (GPA) under one or more contributor license agreements. See
//  the NOTICE file distributed with this work for additional information regarding copyright ownership.
//  The GPA licenses this file to you under the MIT License (MIT), the "License"; you may not use this
//  file except in compliance with the License. You may obtain a copy of the License at:
//
//      http://opensource.org/licenses/MIT
//
//  Unless agreed to in writing, the subject software distributed under the License is distributed on an
//  "AS-IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. Refer to the
//  License for the specific language governing permissions and limitations.
//
//  Code Modification History:
//  ----------------------------------------------------------------------------------------------------
//  10/15/2021 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************



import { OpenXDA } from "@gpa-gemstone/application-typings";

export default class PQDIFParser {
    Analogs: Array<OpenXDA.Types.Channel>;
    Digitals: Array<OpenXDA.Types.Channel>;
    Channels: Array<OpenXDA.Types.Channel>;
    private Contents: Uint8Array;
    private MeterKey: string;
    constructor(contents: ArrayBuffer, meterKey: string) {
        this.Contents = new Uint8Array(contents);
        this.MeterKey = meterKey;
    }

    public LoadChannels(): Promise<OpenXDA.Types.Channel[]> {

        return new Promise<OpenXDA.Types.Channel[]>((resolve, reject) => {

            var xhr = new XMLHttpRequest();
            xhr.open('POST', `${homePath}api/SystemCenter/PQDIFFile/${this.MeterKey}`);
            xhr.setRequestHeader('Content-Type', 'application/octet-stream');
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    this.Channels = JSON.parse(xhr.responseText);
                    resolve(this.Channels);
                }
            }
            xhr.send(this.Contents);
        });
    }

}

