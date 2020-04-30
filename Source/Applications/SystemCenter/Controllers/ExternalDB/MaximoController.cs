//******************************************************************************************************
//  MaximoController.cs - Gbtc
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
//  04/08/2020 - Christoph Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web.Http;
using GSF.Data;
using GSF.Data.Model;
using Newtonsoft.Json.Linq;
using openXDA.Model;
using Oracle;
using Oracle.ManagedDataAccess.Client;

namespace SystemCenter.Controllers
{
    [RoutePrefix("api/ExternalDB/Maximo/Location")]
    public class MaximoLocationController : ExternalDBController<Location>
    {
        protected override string extDBConnectionSetting { get { return "dbMaximo"; } }
        protected override GSF.Data.DatabaseType extDBType { get { return DatabaseType.Oracle; } }
        protected override string extDBName { get { return "Maximo"; } }

        protected override Model.ExternalDBField processExternalAdditionalField(Location location, Model.ExternalDBField field)
        {
            field.OpenXDAParentTableID = location.ID;
            field.DisplayName = location.LocationKey;
            return field;
        }

        protected override Model.ExternalDBField processExternalopenXDAField(Location location, Model.ExternalDBField field)
        {
            field.OpenXDAParentTableID = location.ID;
            field.DisplayName = location.LocationKey;
            return field;
        }

        protected override string getDataQuery(Location location)
        {
                using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
                {
                    Model.AdditionalField uidField = new TableOperations<Model.AdditionalField>(connection).QueryRecordWhere("OpenXDAParentTable = 'Location' AND FieldName = 'Maximo Asset Number (UID)'");
                    if (uidField == null)
                        throw (new Exception("Unable to Find Maximo Asset Number Field"));

                    Model.AdditionalFieldValue uiValue = new TableOperations<Model.AdditionalFieldValue>(connection).QueryRecordWhere("OpenXDAParentTableID = {0} AND AdditionalFieldID = {1}", location.ID, uidField.ID);

                    if (uiValue == null)
                        throw (new Exception("No valid Maximo Asset Number Defined"));

                    string result = "UNID = '{0}'";
                    return String.Format(result, uiValue.Value);
                }
            
        }
    }

    [RoutePrefix("api/ExternalDB/Maximo/Meter")]
    public class MaximoMeterController : ExternalDBController<Meter>
    {
        protected override string extDBConnectionSetting { get { return "dbMaximo"; } }
        protected override GSF.Data.DatabaseType extDBType { get { return DatabaseType.Oracle; } }
        protected override string extDBName { get { return "Maximo"; } }

        protected override Model.ExternalDBField processExternalAdditionalField(Meter meter, Model.ExternalDBField field)
        {
            field.OpenXDAParentTableID = meter.ID;
            field.DisplayName = meter.AssetKey;
            return field;
        }

        protected override Model.ExternalDBField processExternalopenXDAField(Meter meter, Model.ExternalDBField field)
        {
            field.OpenXDAParentTableID = meter.ID;
            field.DisplayName = meter.AssetKey;
            return field;
        }

        protected override string getDataQuery(Meter meter)
        {
            using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
            {
                Model.AdditionalField uidField = new TableOperations<Model.AdditionalField>(connection).QueryRecordWhere("OpenXDAParentTable = 'Meter' AND FieldName = 'Maximo Asset Number (UID)'");
                if (uidField == null)
                    throw (new Exception("Unable to Find Maximo Asset Number Field"));

                Model.AdditionalFieldValue uiValue = new TableOperations<Model.AdditionalFieldValue>(connection).QueryRecordWhere("OpenXDAParentTableID = {0} AND AdditionalFieldID = {1}", meter.ID, uidField.ID);               
                if (uiValue == null)
                    throw (new Exception("No valid Maximo Asset Number Defined"));

                string result = "UNID = '{0}'";
                return String.Format(result, uiValue.Value);
            }
        }
    }

    [RoutePrefix("api/ExternalDB/Maximo/Breaker")]
    public class MaximoBreakerController : ExternalDBController<Breaker>
    {
        protected override string extDBConnectionSetting { get { return "dbMaximo"; } }
        protected override GSF.Data.DatabaseType extDBType { get { return DatabaseType.Oracle; } }
        protected override string extDBName { get { return "Maximo"; } }

        protected override Model.ExternalDBField processExternalAdditionalField(Breaker breaker, Model.ExternalDBField field)
        {
            field.OpenXDAParentTableID = breaker.ID;
            field.DisplayName = breaker.AssetKey;
            return field;
        }

        protected override Model.ExternalDBField processExternalopenXDAField(Breaker breaker, Model.ExternalDBField field)
        {
            field.OpenXDAParentTableID = breaker.ID;
            field.DisplayName = breaker.AssetKey;
            return field;
        }

        protected override string getDataQuery(Breaker breaker)
        {
            using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
            {
                Model.AdditionalField uidFieldBreaker = new TableOperations<Model.AdditionalField>(connection).QueryRecordWhere("OpenXDAParentTable = 'Breaker' AND FieldName = 'Maximo Breaker Asset Number (UID)'");
                if (uidFieldBreaker == null)
                    throw (new Exception("Unable to Find Maximo Asset Number Field"));

                Model.AdditionalFieldValue uiValueBreaker = new TableOperations<Model.AdditionalFieldValue>(connection).QueryRecordWhere("OpenXDAParentTableID = {0} AND AdditionalFieldID = {1}", breaker.ID, uidFieldBreaker.ID);
                if (uiValueBreaker == null)
                    throw (new Exception("No valid Maximo Asset Number Defined"));

                string result = "UNID = '{0}'";
                Model.AdditionalField uidFieldTC = new TableOperations<Model.AdditionalField>(connection).QueryRecordWhere("OpenXDAParentTable = 'Breaker' AND FieldName = 'Maximo TripCoil Asset Number (UID)'");
                
                if (uidFieldTC == null)
                    return String.Format(result, uiValueBreaker.Value);

                Model.AdditionalFieldValue uiValueTC = new TableOperations<Model.AdditionalFieldValue>(connection).QueryRecordWhere("OpenXDAParentTableID = {0} AND AdditionalFieldID = {1}", breaker.ID, uidFieldTC.ID);
                if (uiValueTC == null)
                    return String.Format(result, uiValueBreaker.Value);


                result = result + " OR UNID = '{1}'";
                return String.Format(result, uiValueBreaker.Value, uiValueTC.Value);
            }
        }
    }


    [RoutePrefix("api/ExternalDB/Maximo/CapacitorBank")]
    public class MaximoCapBankController : ExternalDBController<CapBank>
    {
        protected override string extDBConnectionSetting { get { return "dbMaximo"; } }
        protected override GSF.Data.DatabaseType extDBType { get { return DatabaseType.Oracle; } }
        protected override string extDBName { get { return "Maximo"; } }

        protected override Model.ExternalDBField processExternalAdditionalField(CapBank capBank, Model.ExternalDBField field)
        {
            field.OpenXDAParentTableID = capBank.ID;
            field.DisplayName = capBank.AssetKey;
            return field;
        }

        protected override Model.ExternalDBField processExternalopenXDAField(CapBank capBank, Model.ExternalDBField field)
        {
            field.OpenXDAParentTableID = capBank.ID;
            field.DisplayName = capBank.AssetKey;
            return field;
        }

        protected override string getDataQuery(CapBank capBank)
        {
            using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
            {
                Model.AdditionalField uidField = new TableOperations<Model.AdditionalField>(connection).QueryRecordWhere("OpenXDAParentTable = 'CapBank' AND FieldName = 'Maximo Asset Number (UID)'");
                if (uidField == null)
                    throw (new Exception("Unable to Find Maximo Asset Number Field"));

                Model.AdditionalFieldValue uiValue = new TableOperations<Model.AdditionalFieldValue>(connection).QueryRecordWhere("OpenXDAParentTableID = {0} AND AdditionalFieldID = {1}", capBank.ID, uidField.ID);
                if (uiValue == null)
                    throw (new Exception("No valid Maximo Asset Number Defined"));

                string result = "UNID = '{0}'";
                return String.Format(result, uiValue.Value);
            }
        }
    }


    [RoutePrefix("api/ExternalDB/Maximo/Line")]
    public class MaximoLineController : ExternalDBController<Line>
    {
        protected override string extDBConnectionSetting { get { return "dbMaximo"; } }
        protected override GSF.Data.DatabaseType extDBType { get { return DatabaseType.Oracle; } }
        protected override string extDBName { get { return "Maximo"; } }

        protected override Model.ExternalDBField processExternalAdditionalField(Line line, Model.ExternalDBField field)
        {
            field.OpenXDAParentTableID = line.ID;
            field.DisplayName = line.AssetKey;
            return field;
        }

        protected override Model.ExternalDBField processExternalopenXDAField(Line line, Model.ExternalDBField field)
        {
            field.OpenXDAParentTableID = line.ID;
            field.DisplayName = line.AssetKey;
            return field;
        }

        protected override string getDataQuery(Line line)
        {
            using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
            {
                Model.AdditionalField uidField = new TableOperations<Model.AdditionalField>(connection).QueryRecordWhere("OpenXDAParentTable = 'Line' AND FieldName = 'Maximo Asset Number (UID)'");
                if (uidField == null)
                    throw (new Exception("Unable to Find Maximo Asset Number Field"));

                Model.AdditionalFieldValue uiValue = new TableOperations<Model.AdditionalFieldValue>(connection).QueryRecordWhere("OpenXDAParentTableID = {0} AND AdditionalFieldID = {1}", line.ID, uidField.ID);
                if (uiValue == null)
                    throw (new Exception("No valid Maximo Asset Number Defined"));

                string result = "UNID = '{0}'";
                return String.Format(result, uiValue.Value);
            }
        }
    }

    [RoutePrefix("api/ExternalDB/Maximo/Transformer")]
    public class MaximoXFRController : ExternalDBController<Transformer>
    {
        protected override string extDBConnectionSetting { get { return "dbMaximo"; } }
        protected override GSF.Data.DatabaseType extDBType { get { return DatabaseType.Oracle; } }
        protected override string extDBName { get { return "Maximo"; } }

        protected override Model.ExternalDBField processExternalAdditionalField(Transformer xfr, Model.ExternalDBField field)
        {
            field.OpenXDAParentTableID = xfr.ID;
            field.DisplayName = xfr.AssetKey;
            return field;
        }

        protected override Model.ExternalDBField processExternalopenXDAField(Transformer xfr, Model.ExternalDBField field)
        {
            field.OpenXDAParentTableID = xfr.ID;
            field.DisplayName = xfr.AssetKey;
            return field;
        }

        protected override string getDataQuery(Transformer xfr)
        {
            using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
            {
                Model.AdditionalField uidFieldA = new TableOperations<Model.AdditionalField>(connection).QueryRecordWhere("OpenXDAParentTable = 'Transformer' AND FieldName = 'Maximo Phase A Asset Number (UID)'");
                Model.AdditionalField uidFieldB = new TableOperations<Model.AdditionalField>(connection).QueryRecordWhere("OpenXDAParentTable = 'Transformer' AND FieldName = 'Maximo Phase B Asset Number (UID)'");
                Model.AdditionalField uidFieldC = new TableOperations<Model.AdditionalField>(connection).QueryRecordWhere("OpenXDAParentTable = 'Transformer' AND FieldName = 'Maximo Phase C Asset Number (UID)'");


                if (uidFieldA == null || uidFieldB == null || uidFieldC == null)
                    throw (new Exception("Unable to Find Maximo Asset Number Fields"));


                Model.AdditionalFieldValue uiValueA = new TableOperations<Model.AdditionalFieldValue>(connection).QueryRecordWhere("OpenXDAParentTableID = {0} AND AdditionalFieldID = {1}", xfr.ID, uidFieldA.ID);
                Model.AdditionalFieldValue uiValueB = new TableOperations<Model.AdditionalFieldValue>(connection).QueryRecordWhere("OpenXDAParentTableID = {0} AND AdditionalFieldID = {1}", xfr.ID, uidFieldB.ID);
                Model.AdditionalFieldValue uiValueC = new TableOperations<Model.AdditionalFieldValue>(connection).QueryRecordWhere("OpenXDAParentTableID = {0} AND AdditionalFieldID = {1}", xfr.ID, uidFieldC.ID);

                string result = "UNID = '{0}'";
                   

                if (uiValueA == null && uiValueB== null && uiValueC == null)
                    throw (new Exception("No Maximo Asset Number specified"));

                if (uiValueA == null && uiValueB == null)
                    return String.Format(result, uiValueC.Value);

                if (uiValueB == null && uiValueC == null)
                    return String.Format(result, uiValueA.Value);

                if (uiValueA == null && uiValueC == null)
                    return String.Format(result, uiValueB.Value);

                result = result + " OR UNID = '{1}'";

                if (uiValueA == null )
                    return String.Format(result, uiValueB.Value, uiValueC.Value);

                if (uiValueB == null)
                    return String.Format(result, uiValueA.Value, uiValueC.Value);

                if (uiValueC == null)
                    return String.Format(result, uiValueA.Value, uiValueB.Value);

                result = result + " OR UNID = '{2}'";
                
                return String.Format(result, uiValueA.Value, uiValueB.Value, uiValueC.Value);
            }
        }
    }



} 