//******************************************************************************************************
//  LocationImages.tsx - Gbtc
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
//  06/16/2021 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************


import * as React from 'react';
import * as _ from 'lodash';
import { OpenXDA } from '@gpa-gemstone/application-typings';
import { Modal, LayoutGrid } from '@gpa-gemstone/react-interactive';
declare var homePath: string;

const LocationImagesWindow = (props: { Location: OpenXDA.Types.Location }) => {
    const [images, setImages] = React.useState<string[]>([]);
    const [image, setImage] = React.useState<string>('');

    React.useEffect(() => {
        let handle = getImages();
        handle.done(i => {console.log(i); setImages(i)});

        return () => {
            if (handle.abort != undefined) handle.abort();
        };
    }, [props.Location.ID]);

    function getImages(): JQuery.jqXHR {
        return $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Location/${props.Location.ID}/Images`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        })
    }

    return (
        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div className="card-header">
                <div className="col">
                    <h4>Substation Images:</h4>
                </div>
            </div>
            <div className="card-body" style={{ flex: 1, overflowY: 'auto' }}>
                <div style={{ width: '100%', height: '100%', flex: 1, overflowY: 'auto' }}>
                    <LayoutGrid rowsPerPage={2} colMax={4}>
                        {images.length > 0
                        ? (images.map((img, i) => (
                            <>
                                <img src={`${homePath}api/OpenXDA/Location/${props.Location.ID}/Images/${img}`} alt={img}
                                    className={'img-thumbnail'} onClick={() => setImage(img)} key={i} style={{cursor: 'pointer', height: '90%'}}/>
                                <h6 className="caption" style={{maxHeight: '10%'}}>{img}</h6>
                            </>
                            )))
                        : <div className="alert alert-info block">No images to display.</div>
                        }
                    </LayoutGrid>
                </div>
            </div>
            <Modal
                ConfirmBtnClass={'btn-primary'}
                Show={image.length > 0} ShowCancel={false} ShowX={true} ConfirmText={'Close'} Title={image}
                CallBack={() => setImage('') }>
                <img style={{ height: '75%', display: 'block', margin: 'auto' }}
                    src={`${homePath}api/OpenXDA/Location/${props.Location.ID}/Images/${image}`} />
            </Modal>
        </div>
    );
}
export default LocationImagesWindow;