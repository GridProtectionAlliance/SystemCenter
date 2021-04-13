//******************************************************************************************************
//  LineSegmentWindow.tsx - Gbtc
//
//  Copyright © 2020, Grid Protection Alliance.  All Rights Reserved.
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
//  04/17/2020 - Christoph Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import {SystemCenter, OpenXDA } from '../global';
import { AssetAttributes } from '../AssetAttribute/Asset';
import { getAllAssets, getAssetTypes, getAssetWithAdditionalFields } from '../../../TS/Services/Asset';
import LineSegmentAttributes from './LineSegment';
import { LoadingScreen, Modal, Warning } from '@gpa-gemstone/react-interactive';
import Table from '@gpa-gemstone/react-table';
import { Pencil, TrashCan } from '@gpa-gemstone/gpa-symbols';
import LineSegmentWizard from './FawgLineSegmentWizard/LineSegmentWizard';

declare var homePath: string;

function LineSegmentWindow(props: { ID: number }): JSX.Element {
    const [segments, setSegments] = React.useState<Array<OpenXDA.LineSegment>>([]);

    const [showAdd, setShowAdd] = React.useState<boolean>(false);
    const [showFawg, setShowFawg] = React.useState<boolean>(false);
    const [showWarning, setshowWarning] = React.useState<boolean>(false);
    const [showLoading, setShowLoading] = React.useState<boolean>(false);

    const [newEditSegment, setNewEditSegment] = React.useState<OpenXDA.Asset>(AssetAttributes.getNewAsset('LineSegment') as OpenXDA.LineSegment);
    const [newEdit, setNewEdit] = React.useState<SystemCenter.NewEdit>('New');
    const [assetTypes, setAssetTypes] = React.useState<Array<OpenXDA.AssetType>>([]);
    const [allAssets, setAllAssets] = React.useState<Array<OpenXDA.Asset>>([]);

    React.useEffect(() => {
        getData();
        
    }, [props.ID]);

    function getData(): void {
        getSegments();

        getAllAssets().done((assets: Array<OpenXDA.Asset>) => {
            getAssetTypes().done((assetTypes: Array<OpenXDA.AssetType>) => {
                let dat = assetTypes.filter(item => item.Name == 'LineSegment')
                setAssetTypes(dat);
                setAllAssets(assets.filter(item => item['AssetTypeID'] == dat[0].ID));
            });
            
        });
       

    }

    function getSegments(): void {
       $.ajax({
            type: "GET",
           url: `${homePath}api/OpenXDA/Line/${props.ID}/LineSegments?_=${}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
       }).done((data: Array<OpenXDA.LineSegment>) => {
           setSegments(data);
       });
    }

    function addExistingSegment(): void {
        $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/LineSegment/${newEditSegment.ID}/AddToLine/${props.ID}`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(''),
            dataType: 'json',
            cache: true,
            async: true
        }).done(e => {
            getData();
            setNewEditSegment(AssetAttributes.getNewAsset('LineSegment'))
        });
    }

    function addNewSegment(): void{
        $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/LineSegment/New/Line/${props.ID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ Asset: newEditSegment }),
            cache: false,
            async: true
        }).done(() => {
            sessionStorage.clear();
            getData();
            setNewEditSegment(AssetAttributes.getNewAsset('LineSegment'))

        }).fail((msg) => {
            if (msg.status == 500)
                alert(msg.responseJSON.ExceptionMessage)
        });
    }

    function deleteSegment(): void {
        if (newEditSegment.ID == 0)
            return;
        setShowLoading(true);
        
        $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/LineSegment/${newEditSegment.ID}/Disconnect/${props.ID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        }).done(e => {
            setShowLoading(false);
            getData();
        });

    }

    function UpdateSegment(): void {
        $.ajax({
            type: "Patch",
            url: `${homePath}api/OpenXDA/LineSegment/Update`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(newEditSegment),
            cache: false,
            async: true
        }).done((data) => getData());
    }

    return (
        <>
        <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <h4>Line Segments:</h4>
            </div>
            <div className="card-body">
                <div style={{ height: window.innerHeight - 540, maxHeight: window.innerHeight - 540, overflowY: 'auto' }}>
                    <Table<OpenXDA.LineSegment>
                        cols={[
                            { key: 'AssetName', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                            { key: 'Length', label: 'Length (miles)', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                            { key: 'R1', label: 'R1', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                            { key: 'X1', label: 'X1', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                            { key: 'R0', label: 'R0', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                            { key: 'X0', label: 'X0', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                            {
                                key: null, label: '', headerStyle: { width: 80, paddingLeft: 0, paddingRight: 5 }, rowStyle: { width: 80, paddingLeft: 0, paddingRight: 5 },
                                content: (item) => <> <button className="btn btn-sm"
                                    onClick={(e) => {
                                        setShowAdd(true);
                                        setNewEditSegment(item);
                                        setNewEdit('Edit');
                                    }}><span>{Pencil}</span></button>
                                    <button className="btn btn-sm"
                                        onClick={(e) => {
                                            setNewEditSegment(item);
                                            setshowWarning(true);
                                            
                                        }}><span>{TrashCan}</span></button>
                                </>
                            }

                        ]}
                        tableClass="table table-hover"
                        data={segments}
                        sortField={'AssetName'}
                        ascending={true}
                        onSort={(d) => { }}
                        onClick={() => {}}
                        theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }}
                        rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        selected={(item) => false}
                    />
                </div>
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className="btn btn-primary" onClick={() => setShowAdd(true)}>Add Segement</button>
                </div>
                <div className="btn-group mr-2">
                    <button className="btn btn-primary" onClick={(evt) => setShowFawg(true)}>Update from FAWG</button>
                </div>

            </div>
        </div>

        <Warning Show={showWarning} Title={'Remove this Segment From the Line'} Message={'This will permanently remove the Segment.'} CallBack={(confirm) => { if (confirm) deleteSegment(); setshowWarning(false); }} />
            <LoadingScreen Show={showLoading} />
            <Modal Show={showAdd} Title={newEdit == 'New' ? 'Add New LineSegment to Line' : 'Edit ' + newEditSegment.AssetKey + ' for Meter'} Size={'lg'} ShowX={true}
                CallBack={(confirm) => {
                    if (confirm && newEdit == 'Edit')
                        UpdateSegment();
                    if (confirm && newEdit == 'New' && newEditSegment.ID == 0)
                        addNewSegment();
                    if (confirm && newEdit == 'New' && newEditSegment.ID != 0)
                        addExistingSegment();
                    setNewEditSegment(AssetAttributes.getNewAsset('LineSegment') as OpenXDA.LineSegment);
                    setShowAdd(false);
                }}
                CancelText={'Close'}
                ConfirmText={'Save'}
                DisableConfirm={AssetAttributes.AssetError(newEditSegment, 'LineSegment').length > 0}
                ConfirmShowToolTip={AssetAttributes.AssetError(newEditSegment, 'LineSegment').length > 0}
                ConfirmToolTipContent={AssetAttributes.AssetError(newEditSegment, 'LineSegment').map((i, t) => <p key={i}> <i style={{ marginRight: '10px', color: '#dc3545' }} className="fa fa-exclamation-circle"></i> {t}</p>)}
            >
                <div className="row">
                    <div className="col">
                        <AssetAttributes.AssetAttributeFields Asset={newEditSegment} NewEdit={newEdit} AssetTypes={assetTypes} AllAssets={allAssets} UpdateState={setNewEditSegment} GetDifferentAsset={(assetID) => {
                            if (newEdit == 'Edit')
                                return;
                            let asset = allAssets.find(a => a.ID == assetID);
                            let assetType = assetTypes.find(at => at.ID == asset['AssetTypeID'])
                            getAssetWithAdditionalFields(assetID, assetType.Name).then(asset => setNewEditSegment(asset));
                        }} HideAssetType={true} />
                    </div>
                    <div className="col">
                        <LineSegmentAttributes Asset={newEditSegment as OpenXDA.LineSegment} NewEdit={newEdit} UpdateState={setNewEditSegment} />
                    </div>
                </div>
            </Modal>
            {showFawg ? < LineSegmentWizard LineID={props.ID} closeWizard={() => setShowFawg(false)} /> : null}
        </>
    );
}

export default LineSegmentWindow;
