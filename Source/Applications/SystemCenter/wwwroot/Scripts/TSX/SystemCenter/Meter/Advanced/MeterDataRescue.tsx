//******************************************************************************************************
//  MeterDataRescue.tsx - Gbtc
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
//  06/07/2021 - Stephen C. Wills
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { ReactTable } from '@gpa-gemstone/react-table'
import { Warning, LoadingScreen } from '@gpa-gemstone/react-interactive';
import { OpenXDA } from '@gpa-gemstone/application-typings';
import { OpenXDA as OpenXDAGlobal } from '../../global';
import { toNumber } from 'lodash';

declare let homePath: string;

function UsePrevious<T>(value: T) {
    const ref = React.useRef<T>();
    React.useEffect(() => { ref.current = value; });
    return ref.current;
}

function HandleError(e: unknown) {
    if (e instanceof Error) {
        const err: Error = e;
        return err.message;
    }

    if (typeof (e) === "string")
        return e as string;

    console.log(e);

    return `Unknown error of type ${typeof (e)}. See console for details.`;
}

export default function DataRescueWindow(props: {
    Meter: OpenXDA.Types.Meter;
}) {
    const [operations, setOperations] = React.useState<OpenXDAGlobal.DataRescueOperation[]>();

    const [editedOperation, setEditedOperation] = React.useState<OpenXDAGlobal.DataRescueOperation>();
    const [affectedFileCount, setAffectedFileCount] = React.useState<number>(0);
    const [isValid, setIsValid] = React.useState<boolean>(true);

    const [warningCallback, setWarningCallback] = React.useState<(confirmed: boolean) => void>();
    const [showRescueWarning, setShowRescueWarning] = React.useState<boolean>(false);

    function resetEditedOperation() {
        setEditedOperation(undefined);
        setAffectedFileCount(0);
        setIsValid(true);
    }

    function resetOperations() {
        setOperations(undefined);
        resetEditedOperation();
    }

    async function queryOperations() {
        interface AjaxOperation {
            ID: number;
            MeterID: number;
            StartTime: string;
            EndTime: string;
            TimeShift: number;
            TimeShiftUnits: string;
            ChannelAdjustments: [];
        }

        const operations: AjaxOperation[] = await $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/DataRescue/Operations?meterID=${props.Meter.ID}`,
            contentType: "application/json",
            dataType: "json",
            cache: true,
            async: true
        });

        return operations.map(op => {
            const operation: OpenXDAGlobal.DataRescueOperation = {
                ID: op.ID,
                MeterID: op.MeterID,
                StartTime: new Date(op.StartTime),
                EndTime: new Date(op.EndTime),
                TimeShift: op.TimeShift,
                TimeShiftUnits: op.TimeShiftUnits,
                ChannelAdjustments: op.ChannelAdjustments
            };

            return operation;
        });
    }

    async function queryAffectedFileCount() {
        function getQueryString() {
            const meterID = editedOperation.MeterID;
            const startTime = editedOperation.StartTime.toISOString();
            const endTime = editedOperation.EndTime.toISOString();
            return `?meterID=${meterID}&startTime=${startTime}&endTime=${endTime}`;
        }

        const pathOrQueryString = (editedOperation.ID > 0)
            ? `/${editedOperation.ID}`
            : getQueryString();

        const count: number = await $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/DataRescue/AffectedFileCount${pathOrQueryString}`,
            contentType: "application/json",
            dataType: "json",
            cache: true,
            async: true
        });

        return count;
    }

    async function saveEditedOperation() {
        await $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/DataRescue/SaveOperation`,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(editedOperation),
            cache: true,
            async: true
        });
    }

    async function deleteEditedOperation() {
        await $.ajax({
            type: "DELETE",
            url: `${homePath}api/OpenXDA/DataRescue/Delete/${editedOperation.ID}`,
            contentType: "application/json",
            dataType: "json",
            cache: true,
            async: true
        });
    }

    function operationsChanged() {
        if (operations !== undefined)
            return;

        (async () => {
            const queriedOperations = await queryOperations();
            setOperations(queriedOperations);
        })();
    }

    function editedOperationChanged() {
        if (editedOperation === undefined)
            return;

        (async () => {
            const count = await queryAffectedFileCount();
            setAffectedFileCount(count);
        })();
    }

    React.useEffect(operationsChanged, [operations]);
    React.useEffect(editedOperationChanged, [editedOperation]);

    function handleTimeRangeChanged(startTime: Date, endTime: Date) {
        const newOperation: OpenXDAGlobal.DataRescueOperation = { ...editedOperation };
        newOperation.StartTime = startTime;
        newOperation.EndTime = endTime;
        setEditedOperation(newOperation);
    }

    function handleTimeShiftChanged(shift: number, units: string) {
        const newOperation: OpenXDAGlobal.DataRescueOperation = { ...editedOperation };
        newOperation.TimeShift = shift;
        newOperation.TimeShiftUnits = units;
        setEditedOperation(newOperation);
    }

    function handleChannelAdjusted(channelID: number, adder: number, multiplier: number) {
        const index = editedOperation.ChannelAdjustments.findIndex((adjustment) => adjustment.ChannelID === channelID);
        const addNew = !(adder === 0 && multiplier === 1) && index < 0;
        const update = !(adder === 0 && multiplier === 1) && index >= 0;
        const remove = (adder === 0 && multiplier === 1 && index >= 0);

        if (!addNew && !update && !remove)
            return;

        const channelAdjustments = [...editedOperation.ChannelAdjustments];

        if (addNew) {
            channelAdjustments.push({
                ID: 0,
                ChannelID: channelID,
                Channel: "",
                Adder: adder,
                Multiplier: multiplier
            });
        }

        if (update) {
            const adjustment: OpenXDAGlobal.DataRescueChannelAdjustment = { ...channelAdjustments[index] };
            adjustment.Adder = adder;
            adjustment.Multiplier = multiplier;
            channelAdjustments[index] = adjustment;
        }

        if (remove)
            channelAdjustments.splice(index, 1);

        const newOperation: OpenXDAGlobal.DataRescueOperation = { ...editedOperation };
        newOperation.ChannelAdjustments = channelAdjustments;
        setEditedOperation(newOperation);
    }

    function startNewRescue() {
        setEditedOperation({
            ID: 0,
            MeterID: props.Meter.ID,
            StartTime: new Date(),
            EndTime: new Date(),
            TimeShift: 0,
            TimeShiftUnits: "hours",
            ChannelAdjustments: []
        });
    }

    function rescue(confirmed: boolean) {
        setShowRescueWarning(false);

        if (!confirmed)
            return;

        (async () => {
            await saveEditedOperation();
            resetOperations();
        })();
    }

    function del(confirmed: boolean) {
        setShowRescueWarning(false);

        if (!confirmed)
            return;

        (async () => {
            await deleteEditedOperation();
            resetOperations();
        })();
    }

    function cancelRescue() {
        resetEditedOperation();
    }

    function confirmRescue() {
        setWarningCallback(() => rescue);
        setShowRescueWarning(true);
    }

    function confirmDelete() {
        setWarningCallback(() => del);
        setShowRescueWarning(true);
    }

    return <>
        <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Data Rescue:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div style={{ width: '100%', maxHeight: window.innerHeight - 450, overflowY: 'auto' }}>
                    <DataRescueBody
                        Operations={operations}
                        EditedOperation={editedOperation}
                        OnOperationSelected={setEditedOperation}
                        OnTimeRangeChanged={handleTimeRangeChanged}
                        OnTimeShiftChanged={handleTimeShiftChanged}
                        OnChannelAdjusted={handleChannelAdjusted}
                        OnValidationChanged={setIsValid}
                    />
                </div>
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <DataRescueFooter
                        EditedOperation={editedOperation}
                        IsFormValid={isValid}
                        OnStartNew={startNewRescue}
                        OnRescue={confirmRescue}
                        OnCancel={cancelRescue}
                        OnDelete={confirmDelete}
                    />
                </div>
            </div>
        </div>
        <Warning
            Message={`Data for ${affectedFileCount} files will be reprocessed. This cannot be undone.`}
            Title={"Reprocess Rescued Data"}
            CallBack={warningCallback}
            Show={showRescueWarning} />
    </>;
}

function DataRescueBody(props: {
    Operations: OpenXDAGlobal.DataRescueOperation[];
    EditedOperation: OpenXDAGlobal.DataRescueOperation;
    OnOperationSelected: (operation: OpenXDAGlobal.DataRescueOperation) => void;
    OnTimeRangeChanged: (start: Date, end: Date) => void;
    OnTimeShiftChanged: (shift: number, units: string) => void;
    OnChannelAdjusted: (channelID: number, adder: number, multiplier: number) => void;
    OnValidationChanged: (isValid: boolean) => void;
}) {

    if (props.EditedOperation !== undefined) {
        return (
            <DataRescueOperationEditor
                DataRescueOperation={props.EditedOperation}
                OnTimeRangeChanged={props.OnTimeRangeChanged}
                OnTimeShiftChanged={props.OnTimeShiftChanged}
                OnChannelAdjusted={props.OnChannelAdjusted}
                OnValidationChanged={props.OnValidationChanged}
            />
        );
    }

    if (props.Operations !== undefined) {
        return (
            <DataRescueTable
                DataRescueOperations={props.Operations}
                RowClick={props.OnOperationSelected}
            />
        );
    }

    return <LoadingScreen Show={true} />;
}

function DataRescueFooter(props: {
    EditedOperation: OpenXDAGlobal.DataRescueOperation;
    IsFormValid: boolean;
    OnStartNew: () => void;
    OnRescue: () => void;
    OnCancel: () => void;
    OnDelete: () => void;
}) {
    if (props.EditedOperation !== undefined) {
        const deleteButton = (props.EditedOperation.ID !== 0)
            ? <button className="btn btn-danger pull-right" onClick={props.OnDelete}>Delete</button>
            : null;

        return <>
            <button className="btn btn-primary pull-right" onClick={props.OnRescue} disabled={!props.IsFormValid}>Rescue</button>
            <button className="btn btn-default pull-right" onClick={props.OnCancel}>Cancel</button>
            {deleteButton}
        </>;
    }

    return <button className="btn btn-primary pull-right" onClick={props.OnStartNew}>Start New Rescue</button>;
}

function DataRescueTable(props: {
    DataRescueOperations: OpenXDAGlobal.DataRescueOperation[];
    RowClick: (row: OpenXDAGlobal.DataRescueOperation) => void;
}) {
    const renderStartTime = (item: OpenXDAGlobal.DataRescueOperation) => <>{item.StartTime.toISOString()}</>;
    const renderEndTime = (item: OpenXDAGlobal.DataRescueOperation) => <>{item.EndTime.toISOString()}</>;
    const renderTimeShift = (item: OpenXDAGlobal.DataRescueOperation) => <>{item.TimeShift} {item.TimeShiftUnits}</>;
    const renderChannelAdjustments = (item: OpenXDAGlobal.DataRescueOperation) => <>{item.ChannelAdjustments.length}</>;

    return (
        <ReactTable.Table<OpenXDAGlobal.DataRescueOperation>
            TableClass="table table-hover"
            Data={props.DataRescueOperations}
            SortKey={"None"}
            Ascending={false}
            OnSort={() => { /* Sorting not supported */ }}
            OnClick={(d) => props.RowClick(d.row)}
            TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
            TbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 500, width: '100%' }}
            RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
            Selected={(item) => false}
            KeySelector={(item) => item.ID}
        >
            <ReactTable.Column<OpenXDAGlobal.DataRescueOperation>
                Key={'StartTime'}
                AllowSort={false}
                Field={'StartTime'}
                HeaderStyle={{ width: '25%', cursor: 'initial' }}
                RowStyle={{ width: '25%' }}
                Content={({ item }) => renderStartTime(item)}
            > Start
            </ReactTable.Column>
            <ReactTable.Column<OpenXDAGlobal.DataRescueOperation>
                Key={'EndTime'}
                AllowSort={false}
                Field={'EndTime'}
                HeaderStyle={{ width: '25%', cursor: 'initial' }}
                RowStyle={{ width: '25%' }}
                Content={({ item }) => renderEndTime(item)}
            > End
            </ReactTable.Column>
            <ReactTable.Column<OpenXDAGlobal.DataRescueOperation>
                Key={'TimeShift'}
                AllowSort={false}
                Field={'TimeShift'}
                HeaderStyle={{ width: '25%', cursor: 'initial' }}
                RowStyle={{ width: '25%' }}
                Content={({ item }) => renderTimeShift(item)}
            > Time Shift
            </ReactTable.Column>
            <ReactTable.Column<OpenXDAGlobal.DataRescueOperation>
                Key={'ChannelAdjustments'}
                AllowSort={false}
                Field={'ChannelAdjustments'}
                HeaderStyle={{ width: '25%', cursor: 'initial' }}
                RowStyle={{ width: '25%' }}
                Content={({ item }) => renderChannelAdjustments(item)}
            > Channel Adjustments
            </ReactTable.Column>
        </ReactTable.Table>
    );
}

function DataRescueOperationEditor(props: {
    DataRescueOperation: OpenXDAGlobal.DataRescueOperation;
    OnTimeRangeChanged: (start: Date, end: Date) => void;
    OnTimeShiftChanged: (shift: number, units: string) => void;
    OnChannelAdjusted: (channelID: number, adder: number, multiplier: number) => void;
    OnValidationChanged: (isValid: boolean) => void;
}) {
    const [errorCount, setErrorCount] = React.useState<number>(0);
    const previousErrorCount = UsePrevious(errorCount);

    function errorCountChanged() {
        const hasErrors = (errorCount > 0);
        const hadErrors = (previousErrorCount > 0);

        if (hasErrors === hadErrors)
            return;

        props.OnValidationChanged(!hasErrors);
    }

    React.useEffect(errorCountChanged, [errorCount]);

    const timeShiftUnitsOptions = [
        "ticks",
        "milliseconds",
        "seconds",
        "minutes",
        "hours",
        "days"
    ];

    function startTimeChanged(startTime: Date) {
        props.OnTimeRangeChanged(startTime, props.DataRescueOperation.EndTime);
    }

    function endTimeChanged(endTime: Date) {
        props.OnTimeRangeChanged(props.DataRescueOperation.StartTime, endTime);
    }

    function timeShiftChanged(timeShift: number) {
        props.OnTimeShiftChanged(timeShift, props.DataRescueOperation.TimeShiftUnits);
    }

    function timeShiftUnitsChanged(timeShiftUnits: string) {
        props.OnTimeShiftChanged(props.DataRescueOperation.TimeShift, timeShiftUnits);
    }

    function channelAdjusted(channelID: number, adder: number, multiplier: number) {
        props.OnChannelAdjusted(channelID, adder, multiplier);
    }

    function handleValidationChanged(isValid: boolean) {
        if (isValid)
            setErrorCount(errorCount - 1);
        else
            setErrorCount(errorCount + 1);
    }

    return (
        <>
            <div className={"form-inline"}>
                <div className={"p-2"}>
                    <DateInput
                        ID={"startTimeInput"}
                        Label={"Start Time"}
                        Value={props.DataRescueOperation.StartTime}
                        OnChanged={startTimeChanged}
                        OnValidationChanged={handleValidationChanged}
                        Style={{ width: "14em" }}
                    />
                </div>
                <div className={"p-2"}>
                    <DateInput
                        ID={"endTimeInput"}
                        Label={"End Time"}
                        Value={props.DataRescueOperation.EndTime}
                        OnChanged={endTimeChanged}
                        OnValidationChanged={handleValidationChanged}
                        Style={{ width: "14em" }}
                    />
                </div>
                <div className={"p-2"}>
                    <NumberInput
                        ID={"timeShiftInput"}
                        Label={"Time Shift"}
                        Value={props.DataRescueOperation.TimeShift}
                        OnChanged={timeShiftChanged}
                        OnValidationChanged={handleValidationChanged}
                        Style={{ width: "4em" }}
                    />
                    {" "}
                    <select
                        className={"custom-select"}
                        name={"timeShiftUnits"}
                        value={props.DataRescueOperation.TimeShiftUnits}
                        onChange={(e) => timeShiftUnitsChanged(e.target.value)}
                        style={{ width: "auto" }}>

                        {timeShiftUnitsOptions.map((units) => <option key={units} value={units}>{units}</option>)}

                    </select>
                </div>
            </div>
            <ChannelAdjustmentTable
                MeterID={props.DataRescueOperation.MeterID}
                ChannelAdjustments={props.DataRescueOperation.ChannelAdjustments}
                OnAdjusted={channelAdjusted}
                OnValidationChanged={handleValidationChanged}
            />
        </>
    );
}

function ChannelAdjustmentTable(props: {
    MeterID: number;
    ChannelAdjustments: OpenXDAGlobal.DataRescueChannelAdjustment[];
    OnAdjusted: (channelID: number, adder: number, multiplier: number) => void;
    OnValidationChanged: (isValid: boolean) => void;
}) {
    const [channels, setChannels] = React.useState<OpenXDA.Types.Channel[]>();
    const [errorCount, setErrorCount] = React.useState<number>(0);
    const previousErrorCount = UsePrevious(errorCount);

    const channelAdjustments: OpenXDAGlobal.DataRescueChannelAdjustment[] = ((adjustments) => {
        if (channels === undefined)
            return [];

        const lookup: { [channelID: number]: OpenXDAGlobal.DataRescueChannelAdjustment } = {};

        for (const adjustment of adjustments)
            lookup[adjustment.ChannelID] = adjustment;

        return channels.map((channel) => {
            const adjustment = lookup[channel.ID];
            const id = (adjustment !== undefined) ? adjustment.ID : 0;
            const adder = (adjustment !== undefined) ? adjustment.Adder : 0;
            const multiplier = (adjustment !== undefined) ? adjustment.Multiplier : 1;

            return {
                ID: id,
                ChannelID: channel.ID,
                Channel: `${channel.Asset} ${channel.Name} (${channel.MeasurementType} ${channel.Phase} ${channel.MeasurementCharacteristic})`,
                Adder: adder,
                Multiplier: multiplier
            };
        });
    })(props.ChannelAdjustments);

    async function queryChannels() {
        const channels: [] = await $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Meter/${props.MeterID}/Channels`,
            contentType: "application/json",
            dataType: "json",
            cache: true,
            async: true
        });

        return channels.map(channel => channel as OpenXDA.Types.Channel);
    }

    function channelsChanged() {
        if (channels !== undefined)
            return;

        (async () => {
            const queriedChannels = await queryChannels();
            setChannels(queriedChannels);
        })();
    }

    function errorCountChanged() {
        const hasErrors = (errorCount > 0);
        const hadErrors = (previousErrorCount > 0);

        if (hasErrors === hadErrors)
            return;

        props.OnValidationChanged(!hasErrors);
    }

    React.useEffect(channelsChanged, [channels]);
    React.useEffect(errorCountChanged, [errorCount]);

    function handleValidationChanged(isValid: boolean) {
        if (isValid)
            setErrorCount(errorCount - 1);
        else
            setErrorCount(errorCount + 1);
    }

    function renderAdderInput(row: OpenXDAGlobal.DataRescueChannelAdjustment) {
        function handleChanged(adder: number) {
            props.OnAdjusted(row.ChannelID, adder, row.Multiplier);
        }

        return (
            <NumberInput
                ID={"multiplierInput"}
                Value={row.Adder}
                OnChanged={handleChanged}
                OnValidationChanged={handleValidationChanged}
                Style={{ fontSize: "inherit" }}
            />
        );
    }

    function renderMultiplierInput(row: OpenXDAGlobal.DataRescueChannelAdjustment) {
        function handleChanged(multiplier: number) {
            props.OnAdjusted(row.ChannelID, row.Adder, multiplier);
        }

        return (
            <NumberInput
                ID={"multiplierInput"}
                Value={row.Multiplier}
                OnChanged={handleChanged}
                OnValidationChanged={handleValidationChanged}
                Style={{ fontSize: "inherit" }}
            />
        );
    }

    return (
        <ReactTable.Table<OpenXDAGlobal.DataRescueChannelAdjustment>
            TableClass="table table-hover"
            Data={channelAdjustments}
            SortKey={"None"}
            Ascending={false}
            OnSort={() => { /* Sorting not supported */ }}
            TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
            TbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 600, width: '100%' }}
            RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
            Selected={(item) => false}
            KeySelector={(item) => item.ID}
        >
            <ReactTable.Column<OpenXDAGlobal.DataRescueChannelAdjustment>
                Key={'Channel'}
                AllowSort={false}
                Field={'Channel'}
                HeaderStyle={{ width: 'auto', cursor: 'initial' }}
                RowStyle={{ width: 'auto', cursor: 'initial' }}
            > Channel
            </ReactTable.Column>
            <ReactTable.Column<OpenXDAGlobal.DataRescueChannelAdjustment>
                Key={'Adder'}
                AllowSort={false}
                Field={'Adder'}
                HeaderStyle={{ width: '15rem', cursor: 'initial' }}
                RowStyle={{ width: '15rem', cursor: 'initial' }}
                Content={({ item }) => renderAdderInput(item)}
            > Adder
            </ReactTable.Column>
            <ReactTable.Column<OpenXDAGlobal.DataRescueChannelAdjustment>
                Key={'Multiplier'}
                AllowSort={false}
                Field={'Multiplier'}
                HeaderStyle={{ width: '15rem', cursor: 'initial' }}
                RowStyle={{ width: '15rem', cursor: 'initial' }}
                Content={({ item }) => renderMultiplierInput(item)}
            > Multiplier
            </ReactTable.Column>
        </ReactTable.Table>
    );
}

function DateInput(props: {
    ID: string;
    Label?: string;
    Value: Date;
    OnChanged: (value: Date) => void;
    OnValidationChanged: (isValid: boolean) => void;
    Style?: React.CSSProperties;
}) {
    const [value, setValue] = React.useState<string>(props.Value.toISOString());
    const [error, setError] = React.useState<string>();
    const previousError = UsePrevious(error);

    function handleChanged() {
        try {
            const newValue = new Date(value);

            if (value === "") {
                setError("Please enter a value");
                return;
            }

            if (isNaN(newValue.getTime())) {
                setError(`${newValue} is not a valid date/time`);
                return;
            }

            props.OnChanged(newValue);
            setError(undefined);
        } catch (e) {
            const errorMessage = HandleError(e);
            setError(errorMessage);
        }
    }

    function errorChanged() {
        const hasError = (error !== undefined);
        const hadError = (previousError !== undefined);

        if (hasError !== hadError)
            props.OnValidationChanged(!hasError);
    }

    React.useEffect(handleChanged, [value]);
    React.useEffect(errorChanged, [error]);

    return (
        <TextInput
            ID={props.ID}
            Label={props.Label}
            Value={value}
            OnChanged={setValue}
            ErrorMessage={error}
            Style={props.Style}
        />
    );
}

function NumberInput(props: {
    ID: string;
    Label?: string;
    Value: number;
    OnChanged: (value: number) => void;
    OnValidationChanged: (isValid: boolean) => void;
    Style?: React.CSSProperties;
}) {
    const [value, setValue] = React.useState<string>(props.Value.toString());
    const [error, setError] = React.useState<string>();
    const previousError = UsePrevious(error);

    function handleChanged() {
        try {
            const newValue = toNumber(value);

            if (value === "") {
                setError("Please enter a value");
                return;
            }

            if (isNaN(newValue)) {
                setError(`${newValue} is not a valid number`);
                return;
            }

            props.OnChanged(newValue);
            setError(undefined);
        } catch (e) {
            const errorMessage = HandleError(e);
            setError(errorMessage);
        }
    }

    function errorChanged() {
        const hasError = (error !== undefined);
        const hadError = (previousError !== undefined);

        if (hasError !== hadError)
            props.OnValidationChanged(!hasError);
    }

    React.useEffect(handleChanged, [value]);
    React.useEffect(errorChanged, [error]);

    return (
        <TextInput
            ID={props.ID}
            Label={props.Label}
            Value={value}
            OnChanged={setValue}
            ErrorMessage={error}
            Style={props.Style}
        />
    );
}

function TextInput(props: {
    ID: string;
    Label?: string;
    Value: string;
    OnChanged: (value: string) => void;
    Style?: React.CSSProperties;
    ErrorMessage?: string;
}) {
    const label = (props.Label !== undefined)
        ? <label htmlFor={props.ID} style={{ fontSize: "1rem" }}>{props.Label}</label>
        : undefined;

    const errorClass = (props.ErrorMessage !== undefined) ? "is-invalid" : undefined;

    return <>
        {label}
        <input
            id={props.ID}
            className={`form-control ${errorClass}`}
            title={props.ErrorMessage} name={props.ID}
            type={"text"} value={props.Value}
            onChange={(e) => props.OnChanged(e.target.value)}
            style={props.Style}
        />
    </>;
}