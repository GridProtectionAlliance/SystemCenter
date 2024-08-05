//******************************************************************************************************
//  MeterDataDelete.tsx - Gbtc
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
import { Warning } from '@gpa-gemstone/react-interactive';
import { OpenXDA } from '@gpa-gemstone/application-typings';
import { DatePicker } from '@gpa-gemstone/react-forms';

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

interface RecordType {
    startTime: Date | null;
    endTime: Date | null;
}

export default function DataDeleteWindow(props: {
    Meter: OpenXDA.Types.Meter;
    OnDelete: () => void;
}) {
    const now = new Date();

    const [record, setRecord] = React.useState<RecordType>({ startTime: now, endTime: now });
    const [affectedFileCount, setAffectedFileCount] = React.useState<number>(0);

    const [startTimeValid, setStartTimeValid] = React.useState<boolean>(true);
    const [endTimeValid, setEndTimeValid] = React.useState<boolean>(true);

    const [showDeleteWarning, setShowDeleteWarning] = React.useState<boolean>(false);

    async function queryAffectedFileCount() {
        const queryString = (() => {
            const meterID = props.Meter.ID;
            const isoStartTime = record.startTime?.toISOString();
            const isoEndTime = record.endTime?.toISOString();
            return `meterID=${meterID}&startTime=${isoStartTime}&endTime=${isoEndTime}`;
        })();

        const count: number = await $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/MeterData/AffectedFileCount?${queryString}`,
            contentType: "application/json",
            dataType: "json",
            cache: true,
            async: true
        });

        return count;
    }

    function timeRangeChanged() {
        (async () => {
            const count = await queryAffectedFileCount();
            setAffectedFileCount(count);
        })();
    }

    React.useEffect(timeRangeChanged, [record.startTime, record.endTime]);

    async function deleteMeterData() {
        const query = {
            meterID: props.Meter.ID,
            startTime: record.startTime,
            endTime: record.endTime
        }

        await $.ajax({
            type: "DELETE",
            url: `${homePath}api/OpenXDA/MeterData/Delete`,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(query),
            cache: true,
            async: true
        });
    }

    function del(confirmed: boolean) {
        setShowDeleteWarning(false);

        if (!confirmed)
            return;

        (async () => {
            await deleteMeterData();
            props.OnDelete();
        })();
    }

    function confirmDelete() {
        setShowDeleteWarning(true);
    }

    function isFormValid() {
        return startTimeValid && endTimeValid;
    }

    function validateStartTime(value: string): boolean {
        const date = new Date(value);
        const isValid = !isNaN(date.getTime());
        setStartTimeValid(isValid);
        return isValid;
    }

    function validateEndTime(value: string): boolean {
        const date = new Date(value);
        const isValid = !isNaN(date.getTime());
        setEndTimeValid(isValid);
        return isValid;
    }

    return <>
        <div className="card" style={{ flex: 1, overflow: 'hidden' }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Delete Data:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
                <div className="pl-3" style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
                    <form>
                        <div className="form-group row">
                            <DatePicker<RecordType>
                                Record={record}
                                Field="startTime"
                                Setter={setRecord}
                                Valid={() => startTimeValid}
                                Label="Start Time"
                                Type="datetime-local"
                                Feedback="Invalid start time."
                                AllowEmpty={false}
                                Accuracy="second"
                            />
                        </div>
                        <div className="form-group row">
                            <DatePicker<RecordType>
                                Record={record}
                                Field="endTime"
                                Setter={setRecord}
                                Valid={() => endTimeValid}
                                Label="End Time"
                                Type="datetime-local"
                                Feedback="Invalid end time."
                                AllowEmpty={false}
                                Accuracy="second"
                            />
                        </div>
                    </form>
                </div>
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className="btn btn-danger pull-right" onClick={confirmDelete} disabled={!isFormValid()}>Delete Data</button>
                </div>
                <span>for {affectedFileCount} files</span>
            </div>
        </div>
        <Warning
            Message={`Data for ${affectedFileCount} files will be deleted. This cannot be undone.`}
            Title={"Reprocess Rescued Data"}
            CallBack={del}
            Show={showDeleteWarning} />
    </>;
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

function TextInput(props: {
    ID: string;
    Label?: string;
    Value: string;
    OnChanged: (value: string) => void;
    Style?: React.CSSProperties;
    ErrorMessage?: string;
}) {
    const label = (props.Label !== undefined)
        ? <label className="col-sm-1 col-form-label" htmlFor={props.ID} style={{ fontSize: "1rem" }}>{props.Label}</label>
        : undefined;

    const errorClass = (props.ErrorMessage !== undefined) ? "is-invalid" : undefined;

    return <>
        {label}
        <div className="col-sm-11 col-form-label">
            <input
                id={props.ID}
                className={`form-control ${errorClass}`}
                title={props.ErrorMessage} name={props.ID}
                type={"text"} value={props.Value}
                onChange={(e) => props.OnChanged(e.target.value)}
                style={props.Style}
            />
        </div>
    </>;
}