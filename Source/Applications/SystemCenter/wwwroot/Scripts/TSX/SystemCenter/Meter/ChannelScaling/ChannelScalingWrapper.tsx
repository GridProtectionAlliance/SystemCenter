//******************************************************************************************************
//  ChannelScalingWrapper.tsx - Gbtc
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
//  01/03/2020 - Billy Ernest
//       Generated original version of source code.
//  10/20/2022 - Gabriel Santos
//       Refactored this class into its own file.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { OpenXDA } from '@gpa-gemstone/application-typings';

declare let homePath: string;

export enum ChannelScalingType {
    Voltage,
    Current,
    PowerAndEnergy,
    Impedance,
    NoScaling
}

export class ChannelScalingWrapper {
    private _ScalingType: ChannelScalingType;
    private _Channel: OpenXDA.Types.Channel;
    private MeasurementType: OpenXDA.Types.MeasurementType;
    private MeasurementCharacteristic: OpenXDA.Types.MeasurementCharacteristic;
    private Phase: OpenXDA.Types.Phase;
    private _PresentMultiplier: number;
    private _ReplacedMultiplier: number;
    private _AdjustedMultiplier: number;

    constructor(channel: OpenXDA.Types.Channel, measurementType: OpenXDA.Types.MeasurementType, measurementCharacteristic: OpenXDA.Types.MeasurementCharacteristic, phase: OpenXDA.Types.Phase) {
        this._Channel = channel;
        this.MeasurementType = measurementType;
        this.MeasurementCharacteristic = measurementCharacteristic;
        this.Phase = phase;
        this._ScalingType = this.DeriveScalingType();
        this.PresentMultiplier = channel.Multiplier;
        this.ReplacedMultiplier = channel.Multiplier;
        this.AdjustedMultiplier = channel.Multiplier;
    }

    get Channel() {
        return this._Channel;
    }

    get Descriptor() {
        return <>
            {this._Channel.Name}<br />
            {this._Channel.Description}<br />
            {this._Channel.Asset}
        </>;
    }

    get Identity() {
        return <>
            {this.MeasurementType?.Name ?? "Unrecognized Measurement Type"}<br/>
            {this.MeasurementCharacteristic?.Name ?? "Unrecognized Characteristic Type"}<br/>
            {this.Phase?.Name ?? "Unrecognized Phase"}
        </>;
    }

    get ScalingType() {
        return this._ScalingType;
    }
    set ScalingType(value) {
        this._ScalingType = value;
    }

    get ScalingTypeName() {
        return ChannelScalingType[this.ScalingType];
    }

    get PresentMultiplier() {
        return this._PresentMultiplier;
    }
    set PresentMultiplier(value) {
        this._PresentMultiplier = value;
    }

    get ReplacedMultiplier() {
        return this._ReplacedMultiplier;
    }
    set ReplacedMultiplier(value) {
        this._ReplacedMultiplier = value;
    }

    get AdjustedMultiplier() {
        return this._AdjustedMultiplier;
    }
    set AdjustedMultiplier(value) {
        this._AdjustedMultiplier = value;
    }

    CalculateMultiplier(voltageMultiplier: number, currentMultiplier: number) {
        switch (this.ScalingType) {
            case ChannelScalingType.Voltage:
                return voltageMultiplier;
            case ChannelScalingType.Current:
                return currentMultiplier;
            case ChannelScalingType.PowerAndEnergy:
                return voltageMultiplier * currentMultiplier;
            case ChannelScalingType.Impedance:
                return voltageMultiplier / currentMultiplier;
            default:
                return 1;
        }
    }

    private DeriveScalingType() {
        if (this.MeasurementType?.Name === "Voltage") {
            if (this.MeasurementCharacteristic?.Name === "Instantaneous")
                return ChannelScalingType.Voltage;
            if (this.MeasurementCharacteristic?.Name === "Peak")
                return ChannelScalingType.Voltage;
            if (this.MeasurementCharacteristic?.Name === "RMS")
                return ChannelScalingType.Voltage;
            if (this.MeasurementCharacteristic?.Name === "HRMS")
                return ChannelScalingType.Voltage;
            if (this.MeasurementCharacteristic?.Name === "IHRMS")
                return ChannelScalingType.Voltage;
            if (this.MeasurementCharacteristic?.Name === "TotalTHDRMS")
                return ChannelScalingType.Voltage;
            if (this.MeasurementCharacteristic?.Name === "OddTHDRMS")
                return ChannelScalingType.Voltage;
            if (this.MeasurementCharacteristic?.Name === "EvenTHDRMS")
                return ChannelScalingType.Voltage;
            if (this.MeasurementCharacteristic?.Name === "TIDRMS")
                return ChannelScalingType.Voltage;
            if (this.MeasurementCharacteristic?.Name === "TIFRMS")
                return ChannelScalingType.Voltage;
            if (this.MeasurementCharacteristic?.Name === "SPos")
                return ChannelScalingType.Voltage;
            if (this.MeasurementCharacteristic?.Name === "SNeg")
                return ChannelScalingType.Voltage;
            if (this.MeasurementCharacteristic?.Name === "SZero")
                return ChannelScalingType.Voltage;
            if (this.MeasurementCharacteristic?.Name === "SpectraHGroup")
                return ChannelScalingType.Voltage;
        }
        if (this.MeasurementType?.Name === "Current") {
            if (this.MeasurementCharacteristic?.Name === "Instantaneous")
                return ChannelScalingType.Current;
            if (this.MeasurementCharacteristic?.Name === "Peak")
                return ChannelScalingType.Current;
            if (this.MeasurementCharacteristic?.Name === "RMS")
                return ChannelScalingType.Current;
            if (this.MeasurementCharacteristic?.Name === "RMSDemand")
                return ChannelScalingType.Current;
            if (this.MeasurementCharacteristic?.Name === "RMSPeakDemand")
                return ChannelScalingType.Current;
            if (this.MeasurementCharacteristic?.Name === "HRMS")
                return ChannelScalingType.Current;
            if (this.MeasurementCharacteristic?.Name === "IHRMS")
                return ChannelScalingType.Current;
            if (this.MeasurementCharacteristic?.Name === "TotalTHDRMS")
                return ChannelScalingType.Current;
            if (this.MeasurementCharacteristic?.Name === "OddTHDRMS")
                return ChannelScalingType.Current;
            if (this.MeasurementCharacteristic?.Name === "EvenTHDRMS")
                return ChannelScalingType.Current;
            if (this.MeasurementCharacteristic?.Name === "TIDRMS")
                return ChannelScalingType.Current;
            if (this.MeasurementCharacteristic?.Name === "SPos")
                return ChannelScalingType.Current;
            if (this.MeasurementCharacteristic?.Name === "SNeg")
                return ChannelScalingType.Current;
            if (this.MeasurementCharacteristic?.Name === "SZero")
                return ChannelScalingType.Current;
            if (this.MeasurementCharacteristic?.Name === "SpectraHGroup")
                return ChannelScalingType.Current;
        }
        if (this.MeasurementType?.Name === "Power") {
            if (this.MeasurementCharacteristic?.Name === "P")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic?.Name === "Q")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic?.Name === "S")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic?.Name === "PFund")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic?.Name === "QFund")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic?.Name === "SFund")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic?.Name === "PDemand")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic?.Name === "QDemand")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic?.Name === "SDemand")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic?.Name === "PPeakDemand")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic?.Name === "QPeakDemand")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic?.Name === "SPeakDemand")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic?.Name === "PPredDemand")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic?.Name === "QPredDemand")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic?.Name === "SPredDemand")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic?.Name === "PCoQDemand")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic?.Name === "PCoSDemand")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic?.Name === "QCoPDemand")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic?.Name === "QCoSDemand")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic?.Name === "SCoPDemand")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic?.Name === "SCoQDemand")
                return ChannelScalingType.PowerAndEnergy
            if (this.MeasurementCharacteristic?.Name === "PHarmonic")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic?.Name === "PHarmonicUnsigned")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic?.Name === "SVector")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic?.Name === "SVectorFund")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic?.Name === "SArith")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic?.Name === "SArithFund")
                return ChannelScalingType.PowerAndEnergy;
        }
        if (this.MeasurementType?.Name === "Energy") {
            if (this.MeasurementCharacteristic?.Name === "PIntg")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic?.Name === "PIntgPos")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic?.Name === "PIntgPosFund")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic?.Name === "PIntgNeg")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic?.Name === "PIntgNegFund")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic?.Name === "QIntg")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic?.Name === "QIntgPos")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic?.Name === "QIntgPosFund")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic?.Name === "QIntgNeg")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic?.Name === "QIntgNegFund")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic?.Name === "SIntg")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic?.Name === "SIntgFund")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic?.Name === "PIVLIntg")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic?.Name === "PIVLIntgPos")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic?.Name === "PIVLIntgPosFund")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic?.Name === "PIVLIntgNeg")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic?.Name === "PIVLIntgNegFund")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic?.Name === "QIVLIntg")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic?.Name === "QIVLIntgPos")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic?.Name === "QIVLIntgPosFund")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic?.Name === "QIVLIntgNeg")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic?.Name === "QIVLIntgNegFund")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic?.Name === "SIVLIntg")
                return ChannelScalingType.PowerAndEnergy;
            if (this.MeasurementCharacteristic?.Name === "SIVLIntgFund")
                return ChannelScalingType.PowerAndEnergy;
        }
        return ChannelScalingType.NoScaling;
    }
}