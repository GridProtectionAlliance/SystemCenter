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

        protected override string getDataQuery(Location location, string tablename)
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

        protected override string getDataQuery(Meter meter, string tablename)
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

        protected override string getDataQuery(Breaker breaker, string tablename)
        {
            using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
            {
                if (tablename == "TripCoil")
                {
                    Model.AdditionalField uidFieldTC = new TableOperations<Model.AdditionalField>(connection).QueryRecordWhere("OpenXDAParentTable = 'Breaker' AND FieldName = 'Maximo TripCoil Asset Number (UID)'");
                    if (uidFieldTC == null)
                        throw (new Exception("Unable to Find Maximo Asset Number Field"));

                    Model.AdditionalFieldValue uiValueTC = new TableOperations<Model.AdditionalFieldValue>(connection).QueryRecordWhere("OpenXDAParentTableID = {0} AND AdditionalFieldID = {1}", breaker.ID, uidFieldTC.ID);
                    if (uiValueTC == null)
                        throw (new Exception("No valid Maximo Asset Number Defined"));

                    return String.Format("UNID = '{0}'", uiValueTC.Value);
                }

                if (tablename == "INSTXFR_A")
                {
                    Model.AdditionalField uidFieldXFR = new TableOperations<Model.AdditionalField>(connection).QueryRecordWhere("OpenXDAParentTable = 'Breaker' AND FieldName = 'Phase A Inst. XFR Asset Number (UID)'");
                    if (uidFieldXFR == null)
                        throw (new Exception("Unable to Find Maximo Asset Number Field"));

                    Model.AdditionalFieldValue uiValueXFR = new TableOperations<Model.AdditionalFieldValue>(connection).QueryRecordWhere("OpenXDAParentTableID = {0} AND AdditionalFieldID = {1}", breaker.ID, uidFieldXFR.ID);
                    if (uiValueXFR == null)
                        throw (new Exception("No valid Maximo Asset Number Defined"));

                    return String.Format("UNID = '{0}'", uiValueXFR.Value);
                }

                if (tablename == "INSTXFR_B")
                {
                    Model.AdditionalField uidFieldXFR = new TableOperations<Model.AdditionalField>(connection).QueryRecordWhere("OpenXDAParentTable = 'Breaker' AND FieldName = 'Phase B Inst. XFR Asset Number (UID)'");
                    if (uidFieldXFR == null)
                        throw (new Exception("Unable to Find Maximo Asset Number Field"));

                    Model.AdditionalFieldValue uiValueXFR = new TableOperations<Model.AdditionalFieldValue>(connection).QueryRecordWhere("OpenXDAParentTableID = {0} AND AdditionalFieldID = {1}", breaker.ID, uidFieldXFR.ID);
                    if (uiValueXFR == null)
                        throw (new Exception("No valid Maximo Asset Number Defined"));

                    return String.Format("UNID = '{0}'", uiValueXFR.Value);
                }

                if (tablename == "INSTXFR_C")
                {
                    Model.AdditionalField uidFieldXFR = new TableOperations<Model.AdditionalField>(connection).QueryRecordWhere("OpenXDAParentTable = 'Breaker' AND FieldName = 'Phase C Inst. XFR Asset Number (UID)'");
                    if (uidFieldXFR == null)
                        throw (new Exception("Unable to Find Maximo Asset Number Field"));

                    Model.AdditionalFieldValue uiValueXFR = new TableOperations<Model.AdditionalFieldValue>(connection).QueryRecordWhere("OpenXDAParentTableID = {0} AND AdditionalFieldID = {1}", breaker.ID, uidFieldXFR.ID);
                    if (uiValueXFR == null)
                        throw (new Exception("No valid Maximo Asset Number Defined"));

                    return String.Format("UNID = '{0}'", uiValueXFR.Value);
                }


                Model.AdditionalField uidFieldBreaker = new TableOperations<Model.AdditionalField>(connection).QueryRecordWhere("OpenXDAParentTable = 'Breaker' AND FieldName = 'Maximo Breaker Asset Number (UID)'");
                if (uidFieldBreaker == null)
                    throw (new Exception("Unable to Find Maximo Asset Number Field"));

                Model.AdditionalFieldValue uiValueBreaker = new TableOperations<Model.AdditionalFieldValue>(connection).QueryRecordWhere("OpenXDAParentTableID = {0} AND AdditionalFieldID = {1}", breaker.ID, uidFieldBreaker.ID);
                if (uiValueBreaker == null)
                    throw (new Exception("No valid Maximo Asset Number Defined"));


                return String.Format("UNID = '{0}'", uiValueBreaker.Value);
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

        protected override string getDataQuery(CapBank capBank, string tablename)
        {
            using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
            {

                if (tablename == "INSTXFR_A")
                {
                    Model.AdditionalField uidFieldXFR = new TableOperations<Model.AdditionalField>(connection).QueryRecordWhere("OpenXDAParentTable = 'CapBank' AND FieldName = 'Phase A Inst. XFR Asset Number (UID)'");
                    if (uidFieldXFR == null)
                        throw (new Exception("Unable to Find Maximo Asset Number Field"));

                    Model.AdditionalFieldValue uiValueXFR = new TableOperations<Model.AdditionalFieldValue>(connection).QueryRecordWhere("OpenXDAParentTableID = {0} AND AdditionalFieldID = {1}", capBank.ID, uidFieldXFR.ID);
                    if (uiValueXFR == null)
                        throw (new Exception("No valid Maximo Asset Number Defined"));

                    return String.Format("UNID = '{0}'", uiValueXFR.Value);
                }

                if (tablename == "INSTXFR_B")
                {
                    Model.AdditionalField uidFieldXFR = new TableOperations<Model.AdditionalField>(connection).QueryRecordWhere("OpenXDAParentTable = 'CapBank' AND FieldName = 'Phase B Inst. XFR Asset Number (UID)'");
                    if (uidFieldXFR == null)
                        throw (new Exception("Unable to Find Maximo Asset Number Field"));

                    Model.AdditionalFieldValue uiValueXFR = new TableOperations<Model.AdditionalFieldValue>(connection).QueryRecordWhere("OpenXDAParentTableID = {0} AND AdditionalFieldID = {1}", capBank.ID, uidFieldXFR.ID);
                    if (uiValueXFR == null)
                        throw (new Exception("No valid Maximo Asset Number Defined"));

                    return String.Format("UNID = '{0}'", uiValueXFR.Value);
                }

                if (tablename == "INSTXFR_C")
                {
                    Model.AdditionalField uidFieldXFR = new TableOperations<Model.AdditionalField>(connection).QueryRecordWhere("OpenXDAParentTable = 'CapBank' AND FieldName = 'Phase C Inst. XFR Asset Number (UID)'");
                    if (uidFieldXFR == null)
                        throw (new Exception("Unable to Find Maximo Asset Number Field"));

                    Model.AdditionalFieldValue uiValueXFR = new TableOperations<Model.AdditionalFieldValue>(connection).QueryRecordWhere("OpenXDAParentTableID = {0} AND AdditionalFieldID = {1}", capBank.ID, uidFieldXFR.ID);
                    if (uiValueXFR == null)
                        throw (new Exception("No valid Maximo Asset Number Defined"));

                    return String.Format("UNID = '{0}'", uiValueXFR.Value);
                }

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
    public class MaximoLineController  : ExternalDBController<Line>
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

        protected override string getDataQuery(Line line, string tablename)
        {
            using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
            {

                if (tablename == "INSTXFR_A")
                {
                    Model.AdditionalField uidFieldXFR = new TableOperations<Model.AdditionalField>(connection).QueryRecordWhere("OpenXDAParentTable = 'Line' AND FieldName = 'Phase A Inst. XFR Asset Number (UID)'");
                    if (uidFieldXFR == null)
                        throw (new Exception("Unable to Find Maximo Asset Number Field"));

                    Model.AdditionalFieldValue uiValueXFR = new TableOperations<Model.AdditionalFieldValue>(connection).QueryRecordWhere("OpenXDAParentTableID = {0} AND AdditionalFieldID = {1}", line.ID, uidFieldXFR.ID);
                    if (uiValueXFR == null)
                        throw (new Exception("No valid Maximo Asset Number Defined"));

                    return String.Format("UNID = '{0}'", uiValueXFR.Value);
                }

                if (tablename == "INSTXFR_B")
                {
                    Model.AdditionalField uidFieldXFR = new TableOperations<Model.AdditionalField>(connection).QueryRecordWhere("OpenXDAParentTable = 'Line' AND FieldName = 'Phase B Inst. XFR Asset Number (UID)'");
                    if (uidFieldXFR == null)
                        throw (new Exception("Unable to Find Maximo Asset Number Field"));

                    Model.AdditionalFieldValue uiValueXFR = new TableOperations<Model.AdditionalFieldValue>(connection).QueryRecordWhere("OpenXDAParentTableID = {0} AND AdditionalFieldID = {1}", line.ID, uidFieldXFR.ID);
                    if (uiValueXFR == null)
                        throw (new Exception("No valid Maximo Asset Number Defined"));

                    return String.Format("UNID = '{0}'", uiValueXFR.Value);
                }

                if (tablename == "INSTXFR_C")
                {
                    Model.AdditionalField uidFieldXFR = new TableOperations<Model.AdditionalField>(connection).QueryRecordWhere("OpenXDAParentTable = 'Line' AND FieldName = 'Phase C Inst. XFR Asset Number (UID)'");
                    if (uidFieldXFR == null)
                        throw (new Exception("Unable to Find Maximo Asset Number Field"));

                    Model.AdditionalFieldValue uiValueXFR = new TableOperations<Model.AdditionalFieldValue>(connection).QueryRecordWhere("OpenXDAParentTableID = {0} AND AdditionalFieldID = {1}", line.ID, uidFieldXFR.ID);
                    if (uiValueXFR == null)
                        throw (new Exception("No valid Maximo Asset Number Defined"));

                    return String.Format("UNID = '{0}'", uiValueXFR.Value);
                }

            
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

        protected override string getDataQuery(Transformer xfr, string tablename)
        {

            using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
            {
                if (tablename == "INSTXFR_A")
                {
                    Model.AdditionalField uidFieldXFR = new TableOperations<Model.AdditionalField>(connection).QueryRecordWhere("OpenXDAParentTable = 'Transformer' AND FieldName = 'Phase A Inst. XFR Asset Number (UID)'");
                    if (uidFieldXFR == null)
                        throw (new Exception("Unable to Find Maximo Asset Number Field"));

                    Model.AdditionalFieldValue uiValueXFR = new TableOperations<Model.AdditionalFieldValue>(connection).QueryRecordWhere("OpenXDAParentTableID = {0} AND AdditionalFieldID = {1}", xfr.ID, uidFieldXFR.ID);
                    if (uiValueXFR == null)
                        throw (new Exception("No valid Maximo Asset Number Defined"));

                    return String.Format("UNID = '{0}'", uiValueXFR.Value);
                }

                if (tablename == "INSTXFR_B")
                {
                    Model.AdditionalField uidFieldXFR = new TableOperations<Model.AdditionalField>(connection).QueryRecordWhere("OpenXDAParentTable = 'Transformer' AND FieldName = 'Phase B Inst. XFR Asset Number (UID)'");
                    if (uidFieldXFR == null)
                        throw (new Exception("Unable to Find Maximo Asset Number Field"));

                    Model.AdditionalFieldValue uiValueXFR = new TableOperations<Model.AdditionalFieldValue>(connection).QueryRecordWhere("OpenXDAParentTableID = {0} AND AdditionalFieldID = {1}", xfr.ID, uidFieldXFR.ID);
                    if (uiValueXFR == null)
                        throw (new Exception("No valid Maximo Asset Number Defined"));

                    return String.Format("UNID = '{0}'", uiValueXFR.Value);
                }

                if (tablename == "INSTXFR_C")
                {
                    Model.AdditionalField uidFieldXFR = new TableOperations<Model.AdditionalField>(connection).QueryRecordWhere("OpenXDAParentTable = 'Transformer' AND FieldName = 'Phase C Inst. XFR Asset Number (UID)'");
                    if (uidFieldXFR == null)
                        throw (new Exception("Unable to Find Maximo Asset Number Field"));

                    Model.AdditionalFieldValue uiValueXFR = new TableOperations<Model.AdditionalFieldValue>(connection).QueryRecordWhere("OpenXDAParentTableID = {0} AND AdditionalFieldID = {1}", xfr.ID, uidFieldXFR.ID);
                    if (uiValueXFR == null)
                        throw (new Exception("No valid Maximo Asset Number Defined"));

                    return String.Format("UNID = '{0}'", uiValueXFR.Value);
                }

                if (tablename == "LTC_A")
                {
                    Model.AdditionalField uidFieldXFR = new TableOperations<Model.AdditionalField>(connection).QueryRecordWhere("OpenXDAParentTable = 'Transformer' AND FieldName = 'Phase A LTC Asset Number (UID)'");
                    if (uidFieldXFR == null)
                        throw (new Exception("Unable to Find Maximo Asset Number Field"));

                    Model.AdditionalFieldValue uiValueXFR = new TableOperations<Model.AdditionalFieldValue>(connection).QueryRecordWhere("OpenXDAParentTableID = {0} AND AdditionalFieldID = {1}", xfr.ID, uidFieldXFR.ID);
                    if (uiValueXFR == null)
                        throw (new Exception("No valid Maximo Asset Number Defined"));

                    return String.Format("UNID = '{0}'", uiValueXFR.Value);
                }

                if (tablename == "LTC_B")
                {
                    Model.AdditionalField uidFieldXFR = new TableOperations<Model.AdditionalField>(connection).QueryRecordWhere("OpenXDAParentTable = 'Transformer' AND FieldName = 'Phase B LTC Asset Number (UID)'");
                    if (uidFieldXFR == null)
                        throw (new Exception("Unable to Find Maximo Asset Number Field"));

                    Model.AdditionalFieldValue uiValueXFR = new TableOperations<Model.AdditionalFieldValue>(connection).QueryRecordWhere("OpenXDAParentTableID = {0} AND AdditionalFieldID = {1}", xfr.ID, uidFieldXFR.ID);
                    if (uiValueXFR == null)
                        throw (new Exception("No valid Maximo Asset Number Defined"));

                    return String.Format("UNID = '{0}'", uiValueXFR.Value);
                }

                if (tablename == "LTC_C")
                {
                    Model.AdditionalField uidFieldXFR = new TableOperations<Model.AdditionalField>(connection).QueryRecordWhere("OpenXDAParentTable = 'Transformer' AND FieldName = 'Phase C LTC Asset Number (UID)'");
                    if (uidFieldXFR == null)
                        throw (new Exception("Unable to Find Maximo Asset Number Field"));

                    Model.AdditionalFieldValue uiValueXFR = new TableOperations<Model.AdditionalFieldValue>(connection).QueryRecordWhere("OpenXDAParentTableID = {0} AND AdditionalFieldID = {1}", xfr.ID, uidFieldXFR.ID);
                    if (uiValueXFR == null)
                        throw (new Exception("No valid Maximo Asset Number Defined"));

                    return String.Format("UNID = '{0}'", uiValueXFR.Value);
                }


                if (tablename == "Transformer_A")
                {
                    Model.AdditionalField uidFieldXFR = new TableOperations<Model.AdditionalField>(connection).QueryRecordWhere("OpenXDAParentTable = 'Transformer' AND FieldName = 'Maximo Phase A Asset Number (UID)'");
                    if (uidFieldXFR == null)
                        throw (new Exception("Unable to Find Maximo Asset Number Field"));

                    Model.AdditionalFieldValue uiValueXFR = new TableOperations<Model.AdditionalFieldValue>(connection).QueryRecordWhere("OpenXDAParentTableID = {0} AND AdditionalFieldID = {1}", xfr.ID, uidFieldXFR.ID);
                    if (uiValueXFR == null)
                        throw (new Exception("No valid Maximo Asset Number Defined"));

                    return String.Format("UNID = '{0}'", uiValueXFR.Value);
                }

                if (tablename == "Transformer_B")
                {
                    Model.AdditionalField uidFieldXFR = new TableOperations<Model.AdditionalField>(connection).QueryRecordWhere("OpenXDAParentTable = 'Transformer' AND FieldName = 'Maximo Phase B Asset Number (UID)'");
                    if (uidFieldXFR == null)
                        throw (new Exception("Unable to Find Maximo Asset Number Field"));

                    Model.AdditionalFieldValue uiValueXFR = new TableOperations<Model.AdditionalFieldValue>(connection).QueryRecordWhere("OpenXDAParentTableID = {0} AND AdditionalFieldID = {1}", xfr.ID, uidFieldXFR.ID);
                    if (uiValueXFR == null)
                        throw (new Exception("No valid Maximo Asset Number Defined"));

                    return String.Format("UNID = '{0}'", uiValueXFR.Value);
                }

                
                Model.AdditionalField uidFieldXFRC = new TableOperations<Model.AdditionalField>(connection).QueryRecordWhere("OpenXDAParentTable = 'Transformer' AND FieldName = 'Maximo Phase C Asset Number (UID)'");
                if (uidFieldXFRC == null)
                    throw (new Exception("Unable to Find Maximo Asset Number Field"));

                Model.AdditionalFieldValue uiValueXFRC = new TableOperations<Model.AdditionalFieldValue>(connection).QueryRecordWhere("OpenXDAParentTableID = {0} AND AdditionalFieldID = {1}", xfr.ID, uidFieldXFRC.ID);
                if (uiValueXFRC == null)
                    throw (new Exception("No valid Maximo Asset Number Defined"));

                return String.Format("UNID = '{0}'", uiValueXFRC.Value);
                

            }
        }
    }

    [RoutePrefix("api/ExternalDB/Maximo/Bus")]
    public class MaximoBusController : ExternalDBController<Bus>
    {
        protected override string extDBConnectionSetting { get { return "dbMaximo"; } }
        protected override GSF.Data.DatabaseType extDBType { get { return DatabaseType.Oracle; } }
        protected override string extDBName { get { return "Maximo"; } }

        protected override Model.ExternalDBField processExternalAdditionalField(Bus bus, Model.ExternalDBField field)
        {
            field.OpenXDAParentTableID = bus.ID;
            field.DisplayName = bus.AssetKey;
            return field;
        }

        protected override Model.ExternalDBField processExternalopenXDAField(Bus bus, Model.ExternalDBField field)
        {
            field.OpenXDAParentTableID = bus.ID;
            field.DisplayName = bus.AssetKey;
            return field;
        }

        protected override string getDataQuery(Bus bus, string tablename)
        {
            using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
            {
                if (tablename == "INSTXFR_A")
                {
                    Model.AdditionalField uidFieldXFR = new TableOperations<Model.AdditionalField>(connection).QueryRecordWhere("OpenXDAParentTable = 'Bus' AND FieldName = 'Phase A Inst. XFR Asset Number (UID)'");
                    if (uidFieldXFR == null)
                        throw (new Exception("Unable to Find Maximo Asset Number Field"));

                    Model.AdditionalFieldValue uiValueXFR = new TableOperations<Model.AdditionalFieldValue>(connection).QueryRecordWhere("OpenXDAParentTableID = {0} AND AdditionalFieldID = {1}", bus.ID, uidFieldXFR.ID);
                    if (uiValueXFR == null)
                        throw (new Exception("No valid Maximo Asset Number Defined"));

                    return String.Format("UNID = '{0}'", uiValueXFR.Value);
                }

                if (tablename == "INSTXFR_B")
                {
                    Model.AdditionalField uidFieldXFR = new TableOperations<Model.AdditionalField>(connection).QueryRecordWhere("OpenXDAParentTable = 'Bus' AND FieldName = 'Phase B Inst. XFR Asset Number (UID)'");
                    if (uidFieldXFR == null)
                        throw (new Exception("Unable to Find Maximo Asset Number Field"));

                    Model.AdditionalFieldValue uiValueXFR = new TableOperations<Model.AdditionalFieldValue>(connection).QueryRecordWhere("OpenXDAParentTableID = {0} AND AdditionalFieldID = {1}", bus.ID, uidFieldXFR.ID);
                    if (uiValueXFR == null)
                        throw (new Exception("No valid Maximo Asset Number Defined"));

                    return String.Format("UNID = '{0}'", uiValueXFR.Value);
                }

                    Model.AdditionalField uidFieldXFRC = new TableOperations<Model.AdditionalField>(connection).QueryRecordWhere("OpenXDAParentTable = 'Bus' AND FieldName = 'Phase C Inst. XFR Asset Number (UID)'");
                    if (uidFieldXFRC == null)
                        throw (new Exception("Unable to Find Maximo Asset Number Field"));

                    Model.AdditionalFieldValue uiValueXFRC = new TableOperations<Model.AdditionalFieldValue>(connection).QueryRecordWhere("OpenXDAParentTableID = {0} AND AdditionalFieldID = {1}", bus.ID, uidFieldXFRC.ID);
                    if (uiValueXFRC == null)
                        throw (new Exception("No valid Maximo Asset Number Defined"));

                    return String.Format("UNID = '{0}'", uiValueXFRC.Value);
                
            }
        }

     

    }

} 