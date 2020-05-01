INSERT INTO AdditionalField (OpenXDAParentTable, FieldName) VALUES ('Meter', 'Maximo Asset Number (UID)')
GO

INSERT INTO AdditionalField (OpenXDAParentTable, FieldName) VALUES ('Location', 'Maximo Asset Number (UID)')
GO

INSERT INTO AdditionalField (OpenXDAParentTable, FieldName) VALUES 
('Breaker', 'Maximo Breaker Asset Number (UID)'),
('Breaker', 'Maximo TripCoil Asset Number (UID)')
GO


INSERT INTO AdditionalField (OpenXDAParentTable, FieldName) VALUES ('Line', 'Maximo Asset Number (UID)')
GO


INSERT INTO AdditionalField (OpenXDAParentTable, FieldName) VALUES ('CapBank', 'Maximo Asset Number (UID)')
GO

INSERT INTO AdditionalField (OpenXDAParentTable, FieldName) VALUES
('Transformer', 'Maximo Phase A Asset Number (UID)'),
('Transformer', 'Maximo Phase B Asset Number (UID)'),
('Transformer', 'Maximo Phase C Asset Number (UID)'),
('Transformer', 'Maximo Phase A LTC Asset Number (UID)'),
('Transformer', 'Maximo Phase B LTC Asset Number (UID)'),
('Transformer', 'Maximo Phase C LTC Asset Number (UID)')
GO



/* Alias will hold the Name Field Matching PQView*/

INSERT INTO AdditionalField (OpenXDAParentTable, FieldName, ExternalDB, ExternalDBTable, ExternalDBTableKey) VALUES 
('Meter', 'Serial Number','PQView','SerialNumber','Value'),
('Meter', 'Connection Type','PQView','ConnectionType','connectiontype'),
('Meter', 'PQView Site ID','PQView','site','id'),
('Meter', 'Nominal Voltage','PQView','site','nominalBaseV'),
('Meter', 'Nominal Frequency','PQView','site','nominalFundFreq'),
('Meter', 'Firmware Version','PQView','Version','Value'),
('Meter', 'Instrument Location','PQView','InstrumentLocation','Value'),
('Meter', 'Web ALias','PQView','WebAlias','Value'),
('Meter', 'UTC Offset','PQView','site','utcoffset'),
('Meter', 'Use DST Correction','PQView','site','dst')
GO


/* XDA Fields */
INSERT INTO ExternalOpenXDAField (OpenXDAParentTable, FieldName, ExternalDB, ExternalDBTable, ExternalDBTableKey) VALUES
('Meter','Make','PQView','Vendor','Value'),
('Meter','Model','PQView','Equipment','Value')
GO

/* Fields From Maximo for Meter */
INSERT INTO AdditionalField (OpenXDAParentTable, FieldName, ExternalDB, ExternalDBTable, ExternalDBTableKey) VALUES 
('Meter', 'Function','Maximo','Meter','Function'),
('Meter', 'Location Name','Maximo','Meter','Location_Name'),
('Meter', 'Meter Sector','Maximo','Meter','METERSECTOR'),
('Meter', 'TVA Model No','Maximo','Meter','TVA_MODEL_NO'),
('Meter', 'Unit','Maximo','Meter','Unit'),
('Meter', 'Asset Desc','Maximo','Meter','Asset_Desc'),
('Meter', 'Serial No (Maximo)','Maximo','Meter','SERIAL_NO'),
('Meter', 'Station/Line','Maximo','Meter','STATIONLINE'),
('Meter', 'MSCO','Maximo','Meter','MSCO'),
('Meter', 'Supplier','Maximo','Meter','Supplier'),
('Meter', 'Manufacturer','Maximo','Meter','MANUFACTURER'),
('Meter', 'Status','Maximo','Meter','Status'),
('Meter', 'TVA Alias','Maximo','Meter','TVA_Alias')
GO

/* XDA Fields */
INSERT INTO ExternalOpenXDAField (OpenXDAParentTable, FieldName, ExternalDB, ExternalDBTable, ExternalDBTableKey) VALUES
('Meter','Description','Maximo','Meter','DESCRIPTION')
GO

/* Fields From Maximo for Substations */
INSERT INTO AdditionalField (OpenXDAParentTable, FieldName, ExternalDB, ExternalDBTable, ExternalDBTableKey) VALUES 
('Location', 'City','Maximo','Location','City'),
('Location', 'County','Maximo','Location','County'),
('Location', 'State','Maximo','Location','State'),
('Location', 'Street Address','Maximo','Location','StreetAddress'),
('Location', 'ZIP Code','Maximo','Location','ZipCode'),
('Location', 'Customer 1','Maximo','Location','Customer1'),
('Location', 'Customer 2','Maximo','Location','Customer2'),
('Location', 'Customer 3','Maximo','Location','Customer3'),
('Location', 'Meter Sector','Maximo','Location','METERSECTOR'),
('Location', 'Unit','Maximo','Location','Unit'),
('Location', 'Station/Line','Maximo','Location','STATIONLINE'),
('Location', 'ADCC','Maximo','Location','Adcc')
GO

/* XDA Fields */
INSERT INTO ExternalOpenXDAField (OpenXDAParentTable, FieldName, ExternalDB, ExternalDBTable, ExternalDBTableKey) VALUES
('Location','Description','Maximo','Location','DESCRIPTION')
GO

/* Fields From Maximo for Breakers */
INSERT INTO AdditionalField (OpenXDAParentTable, FieldName, ExternalDB, ExternalDBTable, ExternalDBTableKey) VALUES 
('Breaker', 'Function','Maximo','Breaker','Function'),
('Breaker', 'Location Name','Maximo','Breaker','Location_Name'),
('Breaker', 'TVA Model No','Maximo','Breaker','TVA_MODEL_NO'),
('Breaker', 'Unit','Maximo','Breaker','Unit'),
('Breaker', 'Asset Desc','Maximo','Breaker','Asset_Desc'),
('Breaker', 'Station/Line','Maximo','Breaker','STATIONLINE'),
('Breaker', 'Manufacturer','Maximo','Breaker','MANUFACTURER'),
('Breaker', 'Status','Maximo','Breaker','Status'),

('Breaker', 'Function TripCoil','Maximo','TripCoil','Function'),
('Breaker', 'Location Name TripCoil','Maximo','TripCoil','Location_Name'),
('Breaker', 'Unit TripCoil','Maximo','TripCoil','Unit'),
('Breaker', 'Station/Line TripCoil','Maximo','TripCoil','STATIONLINE'),
('Breaker', 'Asset Desc TripCoil','Maximo','TripCoil','Asset_Desc'),
('Breaker', 'Desc TripCoil','Maximo','TripCoil','Description')

GO

INSERT INTO ExternalOpenXDAField (OpenXDAParentTable, FieldName, ExternalDB, ExternalDBTable, ExternalDBTableKey) VALUES
('Breaker','Description','Maximo','Breaker','DESCRIPTION'),
('Breaker','VoltageKV','Maximo','Breaker','OperatingKV')
GO

/* Fields From Maximo for CapBank */
INSERT INTO AdditionalField (OpenXDAParentTable, FieldName, ExternalDB, ExternalDBTable, ExternalDBTableKey) VALUES 
('CapBank', 'Function','Maximo','CapBank','Function'),
('CapBank', 'Location Name','Maximo','CapBank','Location_Name'),
('CapBank', 'TVA Model No','Maximo','CapBank','TVA_MODEL_NO'),
('CapBank', 'Unit','Maximo','CapBank','Unit'),
('CapBank', 'Asset Desc','Maximo','CapBank','Asset_Desc'),
('CapBank', 'Station/Line','Maximo','CapBank','STATIONLINE'),
('CapBank', 'Manufacturer','Maximo','CapBank','MANUFACTURER'),
('CapBank', 'Status','Maximo','CapBank','Status'),
('CapBank', 'Capacitor KV','Maximo','CapBank','CapKV'),
('CapBank', 'Bank KVAR','Maximo','CapBank','BankVAR')
GO

INSERT INTO ExternalOpenXDAField (OpenXDAParentTable, FieldName, ExternalDB, ExternalDBTable, ExternalDBTableKey) VALUES
('CapBank','Description','Maximo','CapBank','DESCRIPTION'),
('CapBank','VoltageKV','Maximo','CapBank','OperatingKV'),
('CapBank','CapacitancePerBank','Maximo','CapBank','CapKVAR'),
('CapBank','NumberOfBanks','Maximo','CapBank','CapCount')
GO

/* Fields From Maximo for Lines */
INSERT INTO AdditionalField (OpenXDAParentTable, FieldName, ExternalDB, ExternalDBTable, ExternalDBTableKey) VALUES 
('Line', 'Function','Maximo','Line','Function'),
('Line', 'Unit','Maximo','Line','Unit'),
('Line', 'Address','Maximo','Line','Address'),
('Line', 'TVA Area','Maximo','Line','TVA_Area'),
('Line', 'Drawing No','Maximo','Line','DrawingNo'),
('Line', 'Station/Line','Maximo','Line','StationLine'),
('Line', 'Phasing Drawing','Maximo','Line','PhasingDWG'),
('Line', 'Structure List Drawing','Maximo','Line','StructureListDWG')
GO
INSERT INTO ExternalOpenXDAField (OpenXDAParentTable, FieldName, ExternalDB, ExternalDBTable, ExternalDBTableKey) VALUES
('Line','Description','Maximo','Line','DESCRIPTION'),
('Line','VoltageKV','Maximo','Line','OperatingKV')
GO

/* Fields from Maximo for Transformer */
INSERT INTO AdditionalField (OpenXDAParentTable, FieldName, ExternalDB, ExternalDBTable, ExternalDBTableKey) VALUES 
('Transformer', 'Function Phase A','Maximo','Transformer_A','Function'),
('Transformer', 'Location Name Phase A','Maximo','Transformer_A','Location_Name'),
('Transformer', 'Unit Phase A','Maximo','Transformer_A','Unit'),
('Transformer', 'Station/Line Phase A','Maximo','Transformer_A','STATIONLINE'),
('Transformer', 'Asset Desc Phase A','Maximo','Transformer_A','Asset_Desc'),
('Transformer', 'TVA Model No Phase A','Maximo','Transformer_A','TVA_MODEL_NO'),
('Transformer', 'Serial No Phase A','Maximo','Transformer_A','Serial_No'),
('Transformer', 'Manufacturer Phase A','Maximo','Transformer_A','MANUFACTURER'),
('Transformer', 'Long Description Phase A','Maximo','Transformer_A','Long_Desc'),

('Transformer', 'Function Phase B','Maximo','Transformer_B','Function'),
('Transformer', 'Location Name Phase B','Maximo','Transformer_B','Location_Name'),
('Transformer', 'Unit Phase B','Maximo','Transformer_B','Unit'),
('Transformer', 'Station/Line Phase B','Maximo','Transformer_B','STATIONLINE'),
('Transformer', 'Asset Desc Phase B','Maximo','Transformer_B','Asset_Desc'),
('Transformer', 'TVA Model No Phase B','Maximo','Transformer_B','TVA_MODEL_NO'),
('Transformer', 'Serial No Phase B','Maximo','Transformer_B','Serial_No'),
('Transformer', 'Manufacturer Phase B','Maximo','Transformer_B','MANUFACTURER'),
('Transformer', 'Long Description Phase B','Maximo','Transformer_B','Long_Desc'),

('Transformer', 'Function Phase C','Maximo','Transformer_C','Function'),
('Transformer', 'Location Name Phase C','Maximo','Transformer_C','Location_Name'),
('Transformer', 'Unit Phase C','Maximo','Transformer_C','Unit'),
('Transformer', 'Station/Line Phase C','Maximo','Transformer_C','STATIONLINE'),
('Transformer', 'Asset Desc Phase C','Maximo','Transformer_C','Asset_Desc'),
('Transformer', 'TVA Model No Phase C','Maximo','Transformer_C','TVA_MODEL_NO'),
('Transformer', 'Serial No Phase C','Maximo','Transformer_C','Serial_No'),
('Transformer', 'Manufacturer Phase C','Maximo','Transformer_C','MANUFACTURER'),
('Transformer', 'Long Description Phase C','Maximo','Transformer_C','Long_Desc')
GO

/* Fields from Maximo for LTC */
INSERT INTO AdditionalField (OpenXDAParentTable, FieldName, ExternalDB, ExternalDBTable, ExternalDBTableKey) VALUES 
('Transformer', 'Function Phase A LTC','Maximo','LTC_A','Function'),
('Transformer', 'Location Name Phase A LTC','Maximo','LTC_A','Location_Name'),
('Transformer', 'Unit Phase A LTC','Maximo','LTC_A','Unit'),
('Transformer', 'Station/Line Phase A LTC','Maximo','LTC_A','STATIONLINE'),
('Transformer', 'Asset Desc Phase A LTC','Maximo','LTC_A','Asset_Desc'),
('Transformer', 'Serial No Phase A LTC','Maximo','LTC_A','Serial_No'),
('Transformer', 'Desc. Phase A LTC','Maximo','LTC_A','DESCRIPTION'),
('Transformer', 'Operating KV Phase A LTC','Maximo','LTC_A','OperatingKV'),
('Transformer', 'Function Phase B LTC','Maximo','LTC_B','Function'),
('Transformer', 'Location Name Phase B LTC','Maximo','LTC_B','Location_Name'),
('Transformer', 'Unit Phase B LTC','Maximo','LTC_B','Unit'),
('Transformer', 'Station/Line Phase B LTC','Maximo','LTC_B','STATIONLINE'),
('Transformer', 'Asset Desc Phase B LTC','Maximo','LTC_B','Asset_Desc'),
('Transformer', 'Serial No Phase B LTC','Maximo','LTC_B','Serial_No'),
('Transformer', 'Desc. Phase B LTC','Maximo','LTC_B','DESCRIPTION'),
('Transformer', 'Operating KV Phase B LTC','Maximo','LTC_B','OperatingKV'),
('Transformer', 'Function Phase C LTC','Maximo','LTC_C','Function'),
('Transformer', 'Location Name Phase C LTC','Maximo','LTC_C','Location_Name'),
('Transformer', 'Unit Phase C LTC','Maximo','LTC_C','Unit'),
('Transformer', 'Station/Line Phase C LTC','Maximo','LTC_C','STATIONLINE'),
('Transformer', 'Asset Desc Phase C LTC','Maximo','LTC_C','Asset_Desc'),
('Transformer', 'Serial No Phase C LTC','Maximo','LTC_C','Serial_No'),
('Transformer', 'Desc. Phase C LTC','Maximo','LTC_C','DESCRIPTION'),
('Transformer', 'Operating KV Phase C LTC','Maximo','LTC_C','OperatingKV')
GO


INSERT INTO ExternalOpenXDAField (OpenXDAParentTable, FieldName, ExternalDB, ExternalDBTable, ExternalDBTableKey) VALUES
('Transformer','Description','Maximo','Transformer_A','DESCRIPTION'),
('Transformer','VoltageKV','Maximo','Transformer_A','OperatingKV')
GO


/* PQView Query for Meter */
INSERT INTO extDBTables (TableName,ExternalDB,Query) VALUES
           ('ConnectionType','PQView','
            (
             SELECT
                    Site.name As name,
	               ConnectionType.name AS connectiontype
                FROM
                    SITE JOIN
                    ConnectionType ON ConnectionType.ID = Site.ConnectionTypeID
            ) T1')
GO

INSERT INTO extDBTables (TableName,ExternalDB,Query) VALUES
           ('Vendor','PQView','
            (
             SELECT 
                site.name as name,
                SitePropertyValue.valueText AS Value 
                FROM 
                    Site JOIN 
                    SitePropertyValue ON Site.id = SitePropertyValue.siteID JOIN 
                    SiteProperty On SiteProperty.ID = SitePropertyValue.sitePropertyID 
                WHERE 
                    SiteProperty.name = ''Vendor''

            ) T1')
GO

INSERT INTO extDBTables (TableName,ExternalDB,Query) VALUES
           ('Equipment','PQView','
            (
             SELECT 
                site.name as name,
                SitePropertyValue.valueText AS Value 
                FROM 
                    Site JOIN 
                    SitePropertyValue ON Site.id = SitePropertyValue.siteID JOIN 
                    SiteProperty On SiteProperty.ID = SitePropertyValue.sitePropertyID 
                WHERE 
                    SiteProperty.name = ''Equipment''

            ) T1')
GO

INSERT INTO extDBTables (TableName,ExternalDB,Query) VALUES
           ('SerialNumber','PQView','
            (
             SELECT 
                site.name as name,
                SitePropertyValue.valueText AS Value 
                FROM 
                    Site JOIN 
                    SitePropertyValue ON Site.id = SitePropertyValue.siteID JOIN 
                    SiteProperty On SiteProperty.ID = SitePropertyValue.sitePropertyID 
                WHERE 
                    SiteProperty.name = ''Serial Number''

            ) T1')
GO

INSERT INTO extDBTables (TableName,ExternalDB,Query) VALUES
           ('Version','PQView','
            (
             SELECT 
                site.name as name,
                SitePropertyValue.valueText AS Value 
                FROM 
                    Site JOIN 
                    SitePropertyValue ON Site.id = SitePropertyValue.siteID JOIN 
                    SiteProperty On SiteProperty.ID = SitePropertyValue.sitePropertyID 
                WHERE 
                    SiteProperty.name = ''Version''

            ) T1')
GO

INSERT INTO extDBTables (TableName,ExternalDB,Query) VALUES
           ('WebAlias','PQView','
            (
             SELECT 
                site.name as name,
                SitePropertyValue.valueText AS Value 
                FROM 
                    Site JOIN 
                    SitePropertyValue ON Site.id = SitePropertyValue.siteID JOIN 
                    SiteProperty On SiteProperty.ID = SitePropertyValue.sitePropertyID 
                WHERE 
                    SiteProperty.name = ''Web Alias''

            ) T1')
GO

INSERT INTO extDBTables (TableName,ExternalDB,Query) VALUES
           ('InstrumentLocation','PQView','
            (
             SELECT 
                site.name as name,
                SitePropertyValue.valueText AS Value 
                FROM 
                    Site JOIN 
                    SitePropertyValue ON Site.id = SitePropertyValue.siteID JOIN 
                    SiteProperty On SiteProperty.ID = SitePropertyValue.sitePropertyID 
                WHERE 
                    SiteProperty.name = ''Instrument Location''

            ) T1')
GO
/* FAWG Query for LineSegments */
INSERT INTO extDBTables (TableName,ExternalDB,Query) VALUES
           ('LineSegment','Fawg','
            (
             SELECT
                    Lines.Lines_Id,
	                Lines.fromBusNumber,
	                Lines.ToBusNumber,
	                Buses.VoltageValue,
	                Lines.LengthMiles,
	                Lines.PosSeqResistance,
	                Lines.PosSeqReactance,
	                Lines.ZeroSeqResistance,
	                Lines.ZeroSeqReactance,
	                Lines.ConductorSummerContRating,
	                Lines.ConductorWinterContRating,
                    (SELECT CONCAT(''L'', Lines.TransLineNumber)) AS LNumber
                FROM
                    Lines JOIN
                    Buses ON Lines.fromBuses_Id = Buses.Buses_Id JOIN
                    Branches ON Lines.Branches_Id = Branches.Branches_Id
                WHERE
                    Branches.Description = ''Fawg One''
            ) T1')
GO

/* MAximo Queries for Substation and Meters */
INSERT INTO extDBTables (TableName,ExternalDB,Query) VALUES
           ('Meter','Maximo','
            (
             SELECT 
	            A.UNID AS UNID,
	            A.UNIT_CD AS UNIT,
	            A.Function_CD AS Function,
	            A.Location_Name AS Location_Name,
	            A.TVA_ALIS AS TVA_ALIAS,
	            B.Description AS Description,
	            B.MeterSector AS MeterSector,
	            B.MSCO AS MSCO,
	            B.StationLine AS StationLine,
	            C.Asset_Desc AS Asset_Desc,
	            C.Serial_No AS Serial_No,
	            C.TVA_Model_No AS TVA_Model_No,
	            C.ASSET_STATUS_CD AS Status,
	            D.Company_Name AS Manufacturer,
	            E.Company_Name AS Supplier
            FROM 
	            EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
	            EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key LEFT JOIN
	            EAMDM.EAM_OD_ASSET_MV C ON A.Location_Key = C.Location_Key LEFT JOIN 
	            EAMDM.EAM_OD_COMPANY_MV D ON C.MANUFACTURER_CD = D.COMPANY_CD LEFT JOIN
	            EAMDM.EAM_OD_COMPANY_MV E ON C.SUPPLIER_CD = E.COMPANY_CD
            )')
GO

INSERT INTO extDBTables (TableName,ExternalDB,Query) VALUES
           ('Location','Maximo','
            (
            SELECT 
	            A.UNID AS UNID,
	            B.City AS City,
	            B.County AS County,
	            B.Customer1 AS Customer1,
	            B.Customer2 AS Customer2,
	            B.Customer3 AS Customer3,
	            B.Description AS Description,
	            B.MeterSector AS MeterSector,
	            B.State AS State,
	            B.StationLine AS StationLine,
	            B.Stationowner AS Stationowner,
	            B.StreetAddress AS StreetAddress,
	            B.TomArea AS TomArea,
	            B.Unit AS Unit,
	            B.ZipCode AS ZipCode,
	            B.ADCC AS Adcc
            FROM 
	            EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
	            EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key	
            )')
GO

/* MAximo Queries for Breakers, Lines, CapBanks */
INSERT INTO extDBTables (TableName,ExternalDB,Query) VALUES
           ('Breaker','Maximo','
            (
            SELECT 
	            A.UNID AS UNID,
	            A.UNIT_CD AS UNIT,
	            A.Function_CD AS Function,
	            A.Location_Name AS Location_Name,
	            B.Description AS Description,
				B.OperatingKVTrans AS OperatingKV,
	            B.StationLine AS StationLine,
	            C.Asset_Desc AS Asset_Desc,
	            C.TVA_Model_No AS TVA_Model_No,
	            C.ASSET_STATUS_CD AS Status,
	            D.Company_Name AS Manufacturer,
            FROM 
	            EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
	            EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key LEFT JOIN
	            EAMDM.EAM_OD_ASSET_MV C ON A.Location_Key = C.Location_Key LEFT JOIN 
	            EAMDM.EAM_OD_COMPANY_MV D ON C.MANUFACTURER_CD = D.COMPANY_CD 
			WHERE A.CLASSSTRUCTURE_ID = ''1009''
            )')
GO

INSERT INTO extDBTables (TableName,ExternalDB,Query) VALUES
           ('CapBank','Maximo','
            (
            SELECT 
	            A.UNID AS UNID,
	            A.UNIT_CD AS UNIT,
	            A.Function_CD AS Function,
	            A.Location_Name AS Location_Name,
	            B.Description AS Description,
				B.OperatingKVTrans AS OperatingKV,
	            B.StationLine AS StationLine,
				B.BankVAR AS BankVAR,
				B.CapacitorCount AS CapCount,
				B.CapacitorKV AS CapKV,
				B.CapacitorKVAR AS CapKVAR,
	            C.Asset_Desc AS Asset_Desc,
	            C.TVA_Model_No AS TVA_Model_No,
	            C.ASSET_STATUS_CD AS Status,
	            D.Company_Name AS Manufacturer,
            FROM 
	            EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
	            EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key LEFT JOIN
	            EAMDM.EAM_OD_ASSET_MV C ON A.Location_Key = C.Location_Key LEFT JOIN 
	            EAMDM.EAM_OD_COMPANY_MV D ON C.MANUFACTURER_CD = D.COMPANY_CD
            )')
GO

INSERT INTO extDBTables (TableName,ExternalDB,Query) VALUES
           ('Line','Maximo','
            (
           SELECT 
	            A.UNID AS UNID,
	            A.UNIT_CD AS UNIT,
	            A.Function_CD AS Function,
	            A.ADRESS_CD AS ADDRESS,
				A.TVA_AREA AS TVA_Area,
				A.TVA_DRAWING_NO AS DrawingNo
				B.Description AS Description,
				B.OperatingKVTrans AS OperatingKV,
	            B.StationLine AS StationLine,
				B.PhasingDWG AS PhasingDWG,
				B.Remarks AS Remarks,
				B.StructureListDWG AS StructureListDWG,
            FROM 
	            EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
	            EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key
            )')
GO

/* Maximo Tables For Transformers */
INSERT INTO extDBTables (TableName,ExternalDB,Query) VALUES
           ('Transformer_A','Maximo','
            (
           SELECT 
	            A.UNID AS UNID,
	            A.Location_Name AS Location_Name,
	            A.UNIT_CD AS UNIT,
	            A.Function_CD AS Function,
	            B.Description AS Description,
	            B.OperatingKVTrans AS OperatingKV,
	            B.StationLine AS StationLine,
	            B.PhasePosition AS Phase,
	            C.Asset_Desc AS Asset_Desc,
	            C.TVA_Model_No AS TVA_Model_No,
	            C.Serial_No AS Serial_No,
	            C.ASSET_LONG_DESC AS Long_Desc,
	            D.Company_Name AS Manufacturer,
            FROM 
	            EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
	            EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key LEFT JOIN
	            EAMDM.EAM_OD_ASSET_MV C ON A.Location_Key = C.Location_Key LEFT JOIN 
	            EAMDM.EAM_OD_COMPANY_MV D ON C.MANUFACTURER_CD = D.COMPANY_CD 
            WHERE
                B.PhasePosition = ''A'' AND A.Function_CD <> ''LTC''
            )')
GO

INSERT INTO extDBTables (TableName,ExternalDB,Query) VALUES
           ('Transformer_B','Maximo','
            (
           SELECT 
	            A.UNID AS UNID,
	            A.Location_Name AS Location_Name,
	            A.UNIT_CD AS UNIT,
	            A.Function_CD AS Function,
	            B.Description AS Description,
	            B.OperatingKVTrans AS OperatingKV,
	            B.StationLine AS StationLine,
	            B.PhasePosition AS Phase,
	            C.Asset_Desc AS Asset_Desc,
	            C.TVA_Model_No AS TVA_Model_No,
	            C.Serial_No AS Serial_No,
	            C.ASSET_LONG_DESC AS Long_Desc,
	            D.Company_Name AS Manufacturer,
            FROM 
	            EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
	            EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key LEFT JOIN
	            EAMDM.EAM_OD_ASSET_MV C ON A.Location_Key = C.Location_Key LEFT JOIN 
	            EAMDM.EAM_OD_COMPANY_MV D ON C.MANUFACTURER_CD = D.COMPANY_CD 
            WHERE
                B.PhasePosition = ''B'' AND A.Function_CD <> ''LTC''
            )')
GO

INSERT INTO extDBTables (TableName,ExternalDB,Query) VALUES
           ('Transformer_C','Maximo','
            (
           SELECT 
	            A.UNID AS UNID,
	            A.Location_Name AS Location_Name,
	            A.UNIT_CD AS UNIT,
	            A.Function_CD AS Function,
	            B.Description AS Description,
	            B.OperatingKVTrans AS OperatingKV,
	            B.StationLine AS StationLine,
	            B.PhasePosition AS Phase,
	            C.Asset_Desc AS Asset_Desc,
	            C.TVA_Model_No AS TVA_Model_No,
	            C.Serial_No AS Serial_No,
	            C.ASSET_LONG_DESC AS Long_Desc,
	            D.Company_Name AS Manufacturer,
            FROM 
	            EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
	            EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key LEFT JOIN
	            EAMDM.EAM_OD_ASSET_MV C ON A.Location_Key = C.Location_Key LEFT JOIN 
	            EAMDM.EAM_OD_COMPANY_MV D ON C.MANUFACTURER_CD = D.COMPANY_CD 
            WHERE
                B.PhasePosition = ''C'' AND A.Function_CD <> ''LTC''
            )')
GO

INSERT INTO extDBTables (TableName,ExternalDB,Query) VALUES
           ('LTC_A','Maximo','
            (
           SELECT 
	            A.UNID AS UNID,
	            A.Location_Name AS Location_Name,
	            A.UNIT_CD AS UNIT,
	            A.Function_CD AS Function,
	            B.Description AS Description,
	            B.OperatingKVTrans AS OperatingKV,
	            B.StationLine AS StationLine,
	            B.PhasePosition AS Phase,
	            C.Asset_Desc AS Asset_Desc,
	            C.Serial_No AS Serial_No,
            FROM 
	            EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
	            EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key LEFT JOIN
	            EAMDM.EAM_OD_ASSET_MV C ON A.Location_Key = C.Location_Key
            WHERE
                B.PhasePosition = ''A'' AND A.Function_CD = ''LTC''
            )')
GO

INSERT INTO extDBTables (TableName,ExternalDB,Query) VALUES
           ('LTC_B','Maximo','
            (
           SELECT 
	            A.UNID AS UNID,
	            A.Location_Name AS Location_Name,
	            A.UNIT_CD AS UNIT,
	            A.Function_CD AS Function,
	            B.Description AS Description,
	            B.OperatingKVTrans AS OperatingKV,
	            B.StationLine AS StationLine,
	            B.PhasePosition AS Phase,
	            C.Asset_Desc AS Asset_Desc,
	            C.Serial_No AS Serial_No,
            FROM 
	            EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
	            EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key LEFT JOIN
	            EAMDM.EAM_OD_ASSET_MV C ON A.Location_Key = C.Location_Key
            WHERE
                B.PhasePosition = ''B'' AND A.Function_CD = ''LTC''
            )')
GO

INSERT INTO extDBTables (TableName,ExternalDB,Query) VALUES
           ('LTC_C','Maximo','
            (
           SELECT 
	            A.UNID AS UNID,
	            A.Location_Name AS Location_Name,
	            A.UNIT_CD AS UNIT,
	            A.Function_CD AS Function,
	            B.Description AS Description,
	            B.OperatingKVTrans AS OperatingKV,
	            B.StationLine AS StationLine,
	            B.PhasePosition AS Phase,
	            C.Asset_Desc AS Asset_Desc,
	            C.Serial_No AS Serial_No,
            FROM 
	            EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
	            EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key LEFT JOIN
	            EAMDM.EAM_OD_ASSET_MV C ON A.Location_Key = C.Location_Key
            WHERE
                B.PhasePosition = ''C'' AND A.Function_CD = ''LTC''
            )')
GO




/* Maximo Table for Trip Coils */
INSERT INTO extDBTables (TableName,ExternalDB,Query) VALUES
           ('TripCoil','Maximo','
            (
            SELECT 
	            A.UNID AS UNID,
	            A.UNIT_CD AS UNIT,
	            A.Function_CD AS Function,
	            A.Location_Name AS Location_Name,
	            B.Description AS Description,
	            B.StationLine AS StationLine,
	            C.Asset_Desc AS Asset_Desc,
            FROM 
	            EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
	            EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key LEFT JOIN
	            EAMDM.EAM_OD_ASSET_MV C ON A.Location_Key = C.Location_Key 
			WHERE A.CLASSSTRUCTURE_ID <> ''1009''
            )')
GO


INSERT INTO TSC (Name, Description, DepartmentNumber) VALUES ('Columbia', 'Also covers Nashville', 'D17311')
GO
INSERT INTO TSC (Name, Description, DepartmentNumber) VALUES ('Bowling Green', NULL, 'D17312')
GO
INSERT INTO TSC (Name, Description, DepartmentNumber) VALUES ('Mayfield', 'Also covers Jackson', 'D17313')
GO
INSERT INTO TSC (Name, Description, DepartmentNumber) VALUES ('Murfreesboro', 'Also covers Nashville', 'D17314')
GO
INSERT INTO TSC (Name, Description, DepartmentNumber) VALUES ('Johnson City', NULL, 'D17321')
GO
INSERT INTO TSC (Name, Description, DepartmentNumber) VALUES ('Knoxville', NULL, 'D17322')
GO
INSERT INTO TSC (Name, Description, DepartmentNumber) VALUES ('Chattanooga', 'Also covers Cleveland', 'D17323')
GO
INSERT INTO TSC (Name, Description, DepartmentNumber) VALUES ('Huntsville', NULL, 'D17325')
GO
INSERT INTO TSC (Name, Description, DepartmentNumber) VALUES ('Memphis', 'Also covers Jackson', 'D17332')
GO
INSERT INTO TSC (Name, Description, DepartmentNumber) VALUES ('Tupelo', NULL, 'D17333')
GO
INSERT INTO TSC (Name, Description, DepartmentNumber) VALUES ('Starkville', NULL, 'D17334')
GO
INSERT INTO TSC (Name, Description, DepartmentNumber) VALUES ('Muscle Shoals', NULL, 'D17335')
GO
INSERT INTO TSC (Name, Description, DepartmentNumber) VALUES ('Browns Ferry', NULL, 'D17341')
GO
INSERT INTO TSC (Name, Description, DepartmentNumber) VALUES ('Sequoyah', NULL, 'D17342')
GO
INSERT INTO TSC (Name, Description, DepartmentNumber) VALUES ('Watts Bar', NULL, 'D17343')
GO

INSERT INTO Role (Name, Description) VALUES ('TSM (Transmission Service Manager)', 'Mgr, Transmission Service Cntr')
GO
INSERT INTO Role (Name, Description) VALUES ('PMTM (Program Manager, Transmission Maintenance)', 'Prog Mgr, Trans Maint')
GO
INSERT INTO Role (Name, Description) VALUES ('SE (System Engineer)', 'SY ENGR, TRANSM (PSO) A;SY ENGR, TRANSM (PSO) B;SY ENGR, TRANSM (PSO) C;SYSTEM ENGR TRANS, (REST USE);ELEC ENG-TRANS SERV;ELECT ENGR, TRANS SVS (PSO) B')
GO
INSERT INTO Role (Name, Description) VALUES ('PMS (Power Maintenance Specialist)', 'Maint Spec, Trans System (C)')
GO
INSERT INTO Role (Name, Description) VALUES ('PMT (Power Maintenance Technician)', 'TECH, PWR MAINT (PSO) A;TECH, POWER MAINT (PSO) B')
GO
INSERT INTO Role (Name, Description) VALUES ('TCE (Telecom Engineer)', 'ELECT ENGR, POWR CN SY (PSO) A;ELECT ENGR, POWR CN SY (PSO) B')
GO
INSERT INTO Role (Name, Description) VALUES ('TCS (Telecom Specialist)', 'MAINT SPEC, TRANS COMM (PSO) C')
GO
INSERT INTO Role (Name, Description) VALUES ('TCT (Telecom Technician)', 'Technician, Telecom (PSO) A;Technician, Telecom (PSO) B')
GO

