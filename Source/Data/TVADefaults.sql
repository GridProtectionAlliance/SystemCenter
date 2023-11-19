INSERT INTO AdditionalField (ParentTable, FieldName) VALUES
('Transformer', 'FAWG High Side Bus'),
('Transformer', 'FAWG Low Side Bus')
GO

/* Alias will hold the Name Field Matching PQView*/

INSERT INTO AdditionalField (ParentTable, FieldName, ExternalDB, ExternalDBTable, ExternalDBTableKey) VALUES 
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
INSERT INTO ExternalOpenXDAField (ParentTable, FieldName, ExternalDB, ExternalDBTable, ExternalDBTableKey) VALUES
('Meter','Make','PQView','Vendor','Value'),
('Meter','Model','PQView','Equipment','Value')
GO

/* Transformer Fawg Fields */
INSERT INTO ExternalOpenXDAField (ParentTable, FieldName, ExternalDB, ExternalDBTable, ExternalDBTableKey) VALUES
('Transformer','R1','Fawg','Transformer','PosSeqResistance'),
('Transformer','X1','Fawg','Transformer','PosSeqReactance'),
('Transformer','R0','Fawg','Transformer','ZeroSeqResistance'),
('Transformer','X0','Fawg','Transformer','ZeroSeqReactance'),
('Transformer','PrimaryVoltageKV','Fawg','Transformer','Vhigh'),
('Transformer','SecondaryVoltageKV','Fawg','Transformer','Vlow')
GO

INSERT INTO AdditionalField (ParentTable, FieldName, ExternalDB, ExternalDBTable, ExternalDBTableKey) VALUES 
('Transformer', 'XFR Type','Fawg','Transformer','Type')
GO

/* LineSegment Fawg Fields */
INSERT INTO AdditionalField (ParentTable, FieldName, ExternalDB, ExternalDBTable, ExternalDBTableKey) VALUES 
('LineSegment', 'FromBusNumber','Fawg','LineSegment','FromBusName'),
('LineSegment', 'ToBusNumber','Fawg','LineSegment','ToBusName')
GO

/* Connections to external databases */
/* TODO: PQView needs updating, so do some fawg addl fields */
INSERT INTO dbo.[ExternalDatabases] (Name, ConnectionString, Encrypt) VALUES ('FAWG', 'dbFawg', 'true')
GO

--/* PQView Query for Meter */
--INSERT INTO extDBTables (TableName,ExternalDB,Query) VALUES
--           ('ConnectionType','PQView','
--            (
--             SELECT
--                    Site.name As name,
--	               ConnectionType.name AS connectiontype
--                FROM
--                    SITE JOIN
--                    ConnectionType ON ConnectionType.ID = Site.ConnectionTypeID
--            ) T1')
--GO

--INSERT INTO extDBTables (TableName,ExternalDB,Query) VALUES
--           ('Vendor','PQView','
--            (
--             SELECT 
--                site.name as name,
--                SitePropertyValue.valueText AS Value 
--                FROM 
--                    Site JOIN 
--                    SitePropertyValue ON Site.id = SitePropertyValue.siteID JOIN 
--                    SiteProperty On SiteProperty.ID = SitePropertyValue.sitePropertyID 
--                WHERE 
--                    SiteProperty.name = ''Vendor''

--            ) T1')
--GO

--INSERT INTO extDBTables (TableName,ExternalDB,Query) VALUES
--           ('Equipment','PQView','
--            (
--             SELECT 
--                site.name as name,
--                SitePropertyValue.valueText AS Value 
--                FROM 
--                    Site JOIN 
--                    SitePropertyValue ON Site.id = SitePropertyValue.siteID JOIN 
--                    SiteProperty On SiteProperty.ID = SitePropertyValue.sitePropertyID 
--                WHERE 
--                    SiteProperty.name = ''Equipment''

--            ) T1')
--GO

--INSERT INTO extDBTables (TableName,ExternalDB,Query) VALUES
--           ('SerialNumber','PQView','
--            (
--             SELECT 
--                site.name as name,
--                SitePropertyValue.valueText AS Value 
--                FROM 
--                    Site JOIN 
--                    SitePropertyValue ON Site.id = SitePropertyValue.siteID JOIN 
--                    SiteProperty On SiteProperty.ID = SitePropertyValue.sitePropertyID 
--                WHERE 
--                    SiteProperty.name = ''Serial Number''

--            ) T1')
--GO

--INSERT INTO extDBTables (TableName,ExternalDB,Query) VALUES
--           ('Version','PQView','
--            (
--             SELECT 
--                site.name as name,
--                SitePropertyValue.valueText AS Value 
--                FROM 
--                    Site JOIN 
--                    SitePropertyValue ON Site.id = SitePropertyValue.siteID JOIN 
--                    SiteProperty On SiteProperty.ID = SitePropertyValue.sitePropertyID 
--                WHERE 
--                    SiteProperty.name = ''Version''

--            ) T1')
--GO

--INSERT INTO extDBTables (TableName,ExternalDB,Query) VALUES
--           ('WebAlias','PQView','
--            (
--             SELECT 
--                site.name as name,
--                SitePropertyValue.valueText AS Value 
--                FROM 
--                    Site JOIN 
--                    SitePropertyValue ON Site.id = SitePropertyValue.siteID JOIN 
--                    SiteProperty On SiteProperty.ID = SitePropertyValue.sitePropertyID 
--                WHERE 
--                    SiteProperty.name = ''Web Alias''

--            ) T1')
--GO

--INSERT INTO extDBTables (TableName,ExternalDB,Query) VALUES
--           ('InstrumentLocation','PQView','
--            (
--             SELECT 
--                site.name as name,
--                SitePropertyValue.valueText AS Value 
--                FROM 
--                    Site JOIN 
--                    SitePropertyValue ON Site.id = SitePropertyValue.siteID JOIN 
--                    SiteProperty On SiteProperty.ID = SitePropertyValue.sitePropertyID 
--                WHERE 
--                    SiteProperty.name = ''Instrument Location''

--            ) T1')
--GO
/* FAWG Query for LineSegments */

Update dbo.[SystemCenter.Setting]
Set Value = 'True'
Where Name = 'FAWG.Enabled'
GO

/* FAWG Query for Line Segments */
INSERT INTO [SystemCenter.Setting](Name, Value, DefaultValue) VALUES('FAWG.LineSegmentQuery', '
			 (
             SELECT
                    Lines.Lines_Id,
	                Lines.fromBusNumber,
	                Lines.ToBusNumber,
	                fromBus.VoltageValue,
	                Lines.LengthMiles,
					fromBus.ShortName as fromBusName,
					toBus.ShortName as toBusName,
	                ((Lines.PosSeqResistance / 100.0) * fromBus.VoltageValue * fromBus.VoltageValue / 100.0) AS PosSeqResistance,
					((Lines.PosSeqReactance / 100.0) * fromBus.VoltageValue * fromBus.VoltageValue / 100.0) AS PosSeqReactance,
					((Lines.ZeroSeqResistance / 100.0) * fromBus.VoltageValue * fromBus.VoltageValue / 100.0) AS ZeroSeqResistance,
					((Lines.ZeroSeqReactance / 100.0) * fromBus.VoltageValue * fromBus.VoltageValue / 100.0) AS ZeroSeqReactance,	               
	                Lines.ConductorSummerContRating,
	                Lines.ConductorWinterContRating,
                    (SELECT CONCAT(''L'', Lines.TransLineNumber)) AS LNumber
                FROM
                    Lines JOIN
                    Buses fromBus ON Lines.fromBuses_Id = fromBus.Buses_Id JOIN
                    Buses toBus ON Lines.toBuses_Id = toBus.Buses_Id JOIN
                    Branches ON Lines.Branches_Id = Branches.Branches_Id
                WHERE
                    Branches.Description = ''Fawg One'' AND
					Lines.ISD < (SELECT YEAR((SELECT GetDate()))*100 + Month((SELECT GetDate()))) AND
					Lines.OSD > (SELECT YEAR((SELECT GetDate()))*100 + Month((SELECT GetDate())))
            ) T1', '')
GO

/* FAWG Query for Transformers */
INSERT INTO [SystemCenter.Setting](Name, Value, DefaultValue) VALUES('FAWG.TransformerQuery', '
            (
            SELECT
				XFR.PosSeqResistanceHigh,
				XFR.PosSeqReactanceHigh,
				XFR.ZeroSeqResistanceHigh,
				XFR.ZeroSeqReactanceHigh,
				XFR.PosSeqResistanceLow,
				XFR.PosSeqReactanceLow,
				XFR.ZeroSeqResistanceLow,
				XFR.ZeroSeqReactanceLow,
				Bh.ShortName AS BusHigh,
				Bl.SHortName AS BusLow,
				((XFR.PosSeqResistanceHigh * Bh.VoltageValue * Bh.VoltageValue / 100.0) + (XFR.PosSeqResistanceLow * Bl.VoltageValue * Bl.VoltageValue / 100.0))  AS PosSeqResistance,
                ((XFR.PosSeqReactanceHigh * Bh.VoltageValue * Bh.VoltageValue / 100.0) + (XFR.PosSeqReactanceLow * Bl.VoltageValue * Bl.VoltageValue / 100.0))  AS PosSeqReactance,
				((XFR.ZeroSeqResistanceHigh * Bh.VoltageValue * Bh.VoltageValue / 100.0) + (XFR.ZeroSeqResistanceLow * Bl.VoltageValue * Bl.VoltageValue / 100.0))  AS ZeroSeqResistance,
				((XFR.ZeroSeqReactanceHigh * Bh.VoltageValue * Bh.VoltageValue / 100.0) + (XFR.ZeroSeqReactanceLow * Bl.VoltageValue * Bl.VoltageValue / 100.0))  AS ZeroSeqReactance,
				Bh.VoltageValue AS Vhigh,
				Bl.VoltageValue AS Vlow,
				TransformerGroupTypeName AS Type
			FROM
				Transformers XFR JOIN
				Buses Bh ON XFR.HighSideBus = Bh.Buses_Id JOIN
				Buses Bl ON XFR.LowSideBus = Bl.Buses_Id JOIN
				Branches ON XFR.Branches_Id = Branches.Branches_Id
			WHERE
				Branches.Description = ''Fawg One'' AND XFR.isInService = 1
            ) T1', '')
GO

--/* MAXIMO DATABASE ENTRY */
INSERT INTO dbo.[ExternalDatabases] (Name, ConnectionString,Encrypt) VALUES
    ('Maximo','dbMaximo', 1)
GO

--/* MAximo Queries for Meters */
INSERT INTO extDBTables (TableName,ExtDBID,Query) VALUES
    ('Meter',(Select ID FROM dbo.[ExternalDatabases] WHERE Name = 'Maximo'),'
    (
        SELECT 
	    A.UNID AS Maximo_Asset_Number_(UID),
	    A.UNIT_CD AS Unit,
	    A.Function_CD AS Function,
	    A.Location_Name AS Location_Name,
	    A.TVA_ALIS AS TVA_Alias,
	    B.Description AS Description,
	    B.MeterSector AS METERSECTOR,
	    B.MSCO AS MSCO,
	    B.StationLine AS STATIONLINE,
	    C.Asset_Desc AS Asset_Desc,
	    C.Serial_No AS SERIAL_NO,
	    C.TVA_Model_No AS TVA_MODEL_NO,
	    C.ASSET_STATUS_CD AS Status,
	    D.Company_Name AS MANUFACTURER,
	    E.Company_Name AS Supplier
    FROM 
	    EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
	    EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key LEFT JOIN
	    EAMDM.EAM_OD_ASSET_MV C ON A.Location_Key = C.Location_Key LEFT JOIN 
	    EAMDM.EAM_OD_COMPANY_MV D ON C.MANUFACTURER_CD = D.COMPANY_CD LEFT JOIN
	    EAMDM.EAM_OD_COMPANY_MV E ON C.SUPPLIER_CD = E.COMPANY_CD
	WHERE Maximo_Asset_Number_(UID) LIKE {key} OR {key} IS NULL)
    )')
GO
/* Fields From Maximo for Meter */
INSERT INTO AdditionalField (ParentTable, ExternalDBTableID, IsKey, FieldName) VALUES 
('Meter', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Meter'), 1, 'Maximo_Asset_Number_(UID)')
GO
INSERT INTO AdditionalField (ParentTable, ExternalDBTableID, FieldName) VALUES 
('Meter', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Meter'), 'Function'),
('Meter', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Meter'), 'Location_Name'),
('Meter', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Meter'), 'METERSECTOR'),
('Meter', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Meter'), 'TVA_MODEL_NO'),
('Meter', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Meter'), 'Unit'),
('Meter', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Meter'), 'Asset_Desc'),
('Meter', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Meter'), 'SERIAL_NO'),
('Meter', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Meter'), 'STATIONLINE'),
('Meter', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Meter'), 'MSCO'),
('Meter', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Meter'), 'Supplier'),
('Meter', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Meter'), 'MANUFACTURER'),
('Meter', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Meter'), 'Status'),
('Meter', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Meter'), 'TVA_Alias')
GO

/* XDA Fields */
INSERT INTO ExternalOpenXDAField (ParentTable, FieldName, ExternalDBTableID) VALUES
('Meter','Description',(SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Meter'))
GO

--/* MAximo Queries for Substations */
INSERT INTO extDBTables (TableName,ExtDBID,Query) VALUES
    ('Location',(Select ID FROM dbo.[ExternalDatabases] WHERE Name = 'Maximo'),'
    (
    SELECT 
	    A.UNID AS Maximo_Asset_Number_(UID),
	    B.City AS City,
	    B.County AS County,
	    B.Customer1 AS Customer1,
	    B.Customer2 AS Customer2,
	    B.Customer3 AS Customer3,
	    B.Description AS Description,
	    B.MeterSector AS METERSECTOR,
	    B.State AS State,
	    B.StationLine AS STATIONLINE,
	    B.Stationowner AS Stationowner,
	    B.StreetAddress AS StreetAddress,
	    B.TomArea AS TomArea,
	    B.Unit AS Unit,
	    B.ZipCode AS ZipCode,
	    B.ADCC AS Adcc
    FROM 
	    EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
	    EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key	
	WHERE Maximo_Asset_Number_(UID) LIKE {key} OR {key} IS NULL)
    )')
GO

/* Fields From Maximo for Substations */
INSERT INTO AdditionalField (ParentTable, ExternalDBTableID, IsKey, FieldName) VALUES 
('Location', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Location'), 1, 'Maximo_Asset_Number_(UID)')
GO

INSERT INTO AdditionalField (ParentTable, ExternalDBTableID, FieldName) VALUES 
('Location',(SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Location'),'City'),
('Location',(SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Location'),'County'),
('Location',(SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Location'),'State'),
('Location',(SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Location'),'StreetAddress'),
('Location',(SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Location'),'ZipCode'),
('Location',(SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Location'),'Customer1'),
('Location',(SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Location'),'Customer2'),
('Location',(SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Location'),'Customer3'),
('Location',(SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Location'),'METERSECTOR'),
('Location',(SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Location'),'Unit'),
('Location',(SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Location'),'STATIONLINE'),
('Location',(SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Location'),'Adcc')
GO

/* XDA Fields */
INSERT INTO ExternalOpenXDAField (ParentTable, FieldName, ExternalDBTableID) VALUES
('Location','Description',(SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Location'))
GO

/* Maximo Table for Breakers */
INSERT INTO extDBTables (TableName,ExtDBID,Query) VALUES
    ('Breaker',(Select ID FROM dbo.[ExternalDatabases] WHERE Name = 'Maximo'),'
    (
    SELECT 
	    A.UNID AS Maximo_Asset_Number_(UID),
	    A.UNIT_CD AS Unit,
	    A.Function_CD AS Function,
	    A.Location_Name AS Location_Name,
	    B.Description AS Description,
		B.OperatingKVTrans AS VoltageKV,
	    B.StationLine AS STATIONLINE,
	    C.Asset_Desc AS Asset_Desc,
	    C.TVA_Model_No AS TVA_MODEL_NO,
	    C.ASSET_STATUS_CD AS Status,
	    D.Company_Name AS MANUFACTURER
    FROM 
	    EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
	    EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key LEFT JOIN
	    EAMDM.EAM_OD_ASSET_MV C ON A.Location_Key = C.Location_Key LEFT JOIN 
	    EAMDM.EAM_OD_COMPANY_MV D ON C.MANUFACTURER_CD = D.COMPANY_CD 
	WHERE A.CLASSSTRUCTURE_ID IN (''1009'', ''1010'')
	AND (Maximo_Asset_Number_(UID) LIKE {key} OR {key} IS NULL))
    )')
GO

/* Fields From Maximo for Breakers */
INSERT INTO AdditionalField (ParentTable, ExternalDBTableID, IsKey, FieldName) VALUES 
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Breaker'), 1, 'Maximo_Asset_Number_(UID)')
GO
INSERT INTO AdditionalField (ParentTable, ExternalDBTableID, FieldName) VALUES 
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Breaker'),'Function'),
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Breaker'),'Location_Name'),
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Breaker'),'TVA_MODEL_NO'),
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Breaker'),'Unit'),
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Breaker'),'Asset_Desc'),
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Breaker'),'STATIONLINE'),
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Breaker'),'MANUFACTURER'),
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Breaker'),'Status')

GO

INSERT INTO ExternalOpenXDAField (ParentTable, FieldName, ExternalDBTableID) VALUES
('Breaker','Description',(SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Breaker')),
('Breaker','VoltageKV',(SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Breaker'))
GO

/* Maximo Table for Trip Coils */
INSERT INTO extDBTables (TableName,ExtDBID,Query) VALUES
    ('TripCoil',(Select ID FROM dbo.[ExternalDatabases] WHERE Name = 'Maximo'),'
    (
    SELECT 
	    A.UNID AS Maximo_Asset_Number_(UID),
	    A.UNIT_CD AS Unit,
	    A.Function_CD AS Function,
	    A.Location_Name AS Location_Name,
	    B.Description AS Description,
	    B.StationLine AS STATIONLINE,
	    C.Asset_Desc AS Asset_Desc
    FROM 
	    EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
	    EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key LEFT JOIN
	    EAMDM.EAM_OD_ASSET_MV C ON A.Location_Key = C.Location_Key 
	WHERE A.CLASSSTRUCTURE_ID = ''1128''
	AND (Maximo_Asset_Number_(UID) LIKE {key} OR {key} IS NULL))
    )')
GO

/* Fields From Maximo for TripCoils */
INSERT INTO AdditionalField (ParentTable, ExternalDBTableID, IsKey, FieldName) VALUES 
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'TripCoil'), 1, 'Maximo_Asset_Number_(UID)')
GO
INSERT INTO AdditionalField (ParentTable, ExternalDBTableID, FieldName) VALUES 
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'TripCoil'),'Function'),
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'TripCoil'),'Location_Name'),
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'TripCoil'),'Unit'),
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'TripCoil'),'STATIONLINE'),
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'TripCoil'),'Asset_Desc'),
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'TripCoil'),'Description')
GO

/* Maximo Table For Instrument Transformers A */
INSERT INTO extDBTables (TableName,ExtDBID,Query) VALUES
    ('INSTXFR_A',(Select ID FROM dbo.[ExternalDatabases] WHERE Name = 'Maximo'),'
    (
    SELECT 
	    A.UNID AS Maximo_Asset_Number_(UID),
	    A.UNIT_CD AS Unit,
	    A.Function_CD AS Function,
	    A.Location_Name AS Location_Name,
		A.LOCATION_SUB_CLASS_NAME AS LocationSubClass,
	    B.Description AS Description,
		B.OperatingKVTrans AS OperatingKV,
	    B.StationLine AS STATIONLINE,
		B.PhasePosition AS Phase,
	    C.Asset_Desc AS Asset_Desc,
	    C.TVA_Model_No AS TVA_MODEL_NO,
		C.Serial_No AS Serial_No,
	    D.Company_Name AS MANUFACTURER
    FROM 
	    EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
	    EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key LEFT JOIN
	    EAMDM.EAM_OD_ASSET_MV C ON A.Location_Key = C.Location_Key LEFT JOIN 
	    EAMDM.EAM_OD_COMPANY_MV D ON C.MANUFACTURER_CD = D.COMPANY_CD 
	WHERE A.CLASSSTRUCTURE_ID IN (''1070'', ''1071'',''1072'',''1073'') 
	AND (Maximo_Asset_Number_(UID) LIKE {key} OR {key} IS NULL))
    )')
GO

/* XDA Fields */
INSERT INTO AdditionalField (ParentTable, ExternalDBTableID, IsKey, FieldName) VALUES 
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'), 1, 'Maximo_Asset_Number_(UID)'),
('Line', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'), 1, 'Maximo_Asset_Number_(UID)'),
('Bus', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'), 1, 'Maximo_Asset_Number_(UID)'),
('CapBank', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'), 1, 'Maximo_Asset_Number_(UID)'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'), 1, 'Maximo_Asset_Number_(UID)')
GO
INSERT INTO AdditionalField (ParentTable, ExternalDBTableID, FieldName) VALUES 
/* Breaker Fields */
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'Function'),
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'Location_Name'),
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'TVA_MODEL_NO'),
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'Unit'),
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'Asset_Desc'),
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'STATIONLINE'),
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'MANUFACTURER'),
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'LocationSubClass'),
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'Description'),
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'OperatingKV'),
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'Phase'),
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'Serial_No'),
/* Line Fields */
('Line', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'Function'),
('Line', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'Location_Name'),
('Line', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'TVA_MODEL_NO'),
('Line', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'Unit'),
('Line', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'Asset_Desc'),
('Line', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'STATIONLINE'),
('Line', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'MANUFACTURER'),
('Line', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'LocationSubClass'),
('Line', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'Description'),
('Line', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'OperatingKV'),
('Line', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'Phase'),
('Line', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'Serial_No'),
/* Bus Fields */
('Bus', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'Function'),
('Bus', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'Location_Name'),
('Bus', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'TVA_MODEL_NO'),
('Bus', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'Unit'),
('Bus', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'Asset_Desc'),
('Bus', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'STATIONLINE'),
('Bus', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'MANUFACTURER'),
('Bus', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'LocationSubClass'),
('Bus', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'Description'),
('Bus', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'OperatingKV'),
('Bus', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'Phase'),
('Bus', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'Serial_No'),
/* CapBank Fields */
('CapBank', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'Function'),
('CapBank', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'Location_Name'),
('CapBank', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'TVA_MODEL_NO'),
('CapBank', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'Unit'),
('CapBank', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'Asset_Desc'),
('CapBank', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'STATIONLINE'),
('CapBank', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'MANUFACTURER'),
('CapBank', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'LocationSubClass'),
('CapBank', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'Description'),
('CapBank', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'OperatingKV'),
('CapBank', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'Phase'),
('CapBank', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'Serial_No'),
/* Transformer Fields */
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'Function'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'Location_Name'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'TVA_MODEL_NO'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'Unit'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'Asset_Desc'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'STATIONLINE'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'MANUFACTURER'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'LocationSubClass'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'Description'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'OperatingKV'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'Phase'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_A'),'Serial_No')
GO

/* Maximo Table For Instrument Transformers B */
INSERT INTO extDBTables (TableName,ExtDBID,Query) VALUES
    ('INSTXFR_B',(Select ID FROM dbo.[ExternalDatabases] WHERE Name = 'Maximo'),'
    (
    SELECT 
	    A.UNID AS Maximo_Asset_Number_(UID),
	    A.UNIT_CD AS Unit,
	    A.Function_CD AS Function,
	    A.Location_Name AS Location_Name,
		A.LOCATION_SUB_CLASS_NAME AS LocationSubClass,
	    B.Description AS Description,
		B.OperatingKVTrans AS OperatingKV,
	    B.StationLine AS STATIONLINE,
		B.PhasePosition AS Phase,
	    C.Asset_Desc AS Asset_Desc,
	    C.TVA_Model_No AS TVA_MODEL_NO,
		C.Serial_No AS Serial_No,
	    D.Company_Name AS MANUFACTURER
    FROM 
	    EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
	    EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key LEFT JOIN
	    EAMDM.EAM_OD_ASSET_MV C ON A.Location_Key = C.Location_Key LEFT JOIN 
	    EAMDM.EAM_OD_COMPANY_MV D ON C.MANUFACTURER_CD = D.COMPANY_CD 
	WHERE A.CLASSSTRUCTURE_ID IN (''1070'', ''1071'',''1072'',''1073'')
	AND (Maximo_Asset_Number_(UID) LIKE {key} OR {key} IS NULL))
    )')
GO

INSERT INTO AdditionalField (ParentTable, ExternalDBTableID, IsKey, FieldName) VALUES 
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'), 1, 'Maximo_Asset_Number_(UID)'),
('Line', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'), 1, 'Maximo_Asset_Number_(UID)'),
('Bus', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'), 1, 'Maximo_Asset_Number_(UID)'),
('CapBank', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'), 1, 'Maximo_Asset_Number_(UID)'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'), 1, 'Maximo_Asset_Number_(UID)')
GO

INSERT INTO AdditionalField (ParentTable, ExternalDBTableID, FieldName) VALUES 
/* Breaker Fields */
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'Function'),
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'Location_Name'),
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'TVA_MODEL_NO'),
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'Unit'),
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'Asset_Desc'),
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'STATIONLINE'),
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'MANUFACTURER'),
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'LocationSubClass'),
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'Description'),
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'OperatingKV'),
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'Phase'),
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'Serial_No'),
/* Line Fields */
('Line', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'Function'),
('Line', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'Location_Name'),
('Line', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'TVA_MODEL_NO'),
('Line', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'Unit'),
('Line', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'Asset_Desc'),
('Line', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'STATIONLINE'),
('Line', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'MANUFACTURER'),
('Line', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'LocationSubClass'),
('Line', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'Description'),
('Line', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'OperatingKV'),
('Line', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'Phase'),
('Line', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'Serial_No'),
/* Bus Fields */
('Bus', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'Function'),
('Bus', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'Location_Name'),
('Bus', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'TVA_MODEL_NO'),
('Bus', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'Unit'),
('Bus', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'Asset_Desc'),
('Bus', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'STATIONLINE'),
('Bus', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'MANUFACTURER'),
('Bus', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'LocationSubClass'),
('Bus', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'Description'),
('Bus', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'OperatingKV'),
('Bus', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'Phase'),
('Bus', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'Serial_No'),
/* CapBank Fields */
('CapBank', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'Function'),
('CapBank', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'Location_Name'),
('CapBank', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'TVA_MODEL_NO'),
('CapBank', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'Unit'),
('CapBank', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'Asset_Desc'),
('CapBank', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'STATIONLINE'),
('CapBank', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'MANUFACTURER'),
('CapBank', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'LocationSubClass'),
('CapBank', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'Description'),
('CapBank', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'OperatingKV'),
('CapBank', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'Phase'),
('CapBank', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'Serial_No'),
/* Transformer Fields */
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'Function'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'Location_Name'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'TVA_MODEL_NO'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'Unit'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'Asset_Desc'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'STATIONLINE'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'MANUFACTURER'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'LocationSubClass'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'Description'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'OperatingKV'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'Phase'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_B'),'Serial_No')
GO

/* Maximo Table For Instrument Transformers C */
INSERT INTO extDBTables (TableName,ExtDBID,Query) VALUES
    ('INSTXFR_C',(Select ID FROM dbo.[ExternalDatabases] WHERE Name = 'Maximo'),'
    (
    SELECT 
	    A.UNID AS Maximo_Asset_Number_(UID),
	    A.UNIT_CD AS Unit,
	    A.Function_CD AS Function,
	    A.Location_Name AS Location_Name,
		A.LOCATION_SUB_CLASS_NAME AS LocationSubCLass,
	    B.Description AS Description,
		B.OperatingKVTrans AS OperatingKV,
	    B.StationLine AS STATIONLINE,
		B.PhasePosition AS Phase,
	    C.Asset_Desc AS Asset_Desc,
	    C.TVA_Model_No AS TVA_MODEL_NO,
		C.Serial_No AS Serial_No,
	    D.Company_Name AS MANUFACTURER
    FROM 
	    EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
	    EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key LEFT JOIN
	    EAMDM.EAM_OD_ASSET_MV C ON A.Location_Key = C.Location_Key LEFT JOIN 
	    EAMDM.EAM_OD_COMPANY_MV D ON C.MANUFACTURER_CD = D.COMPANY_CD 
	WHERE A.CLASSSTRUCTURE_ID IN (''1070'', ''1071'',''1072'',''1073'')
	AND (Maximo_Asset_Number_(UID) LIKE {key} OR {key} IS NULL))
    )')
GO
/* XDA Fields */
INSERT INTO AdditionalField (ParentTable, ExternalDBTableID, IsKey, FieldName) VALUES 
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'), 1, 'Maximo_Asset_Number_(UID)'),
('Line', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'), 1, 'Maximo_Asset_Number_(UID)'),
('Bus', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'), 1, 'Maximo_Asset_Number_(UID)'),
('CapBank', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'), 1, 'Maximo_Asset_Number_(UID)'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'), 1, 'Maximo_Asset_Number_(UID)')
GO
INSERT INTO AdditionalField (ParentTable, ExternalDBTableID, FieldName) VALUES 
/* Breaker Fields */
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'Function'),
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'Location_Name'),
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'TVA_MODEL_NO'),
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'Unit'),
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'Asset_Desc'),
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'STATIONLINE'),
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'MANUFACTURER'),
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'LocationSubClass'),
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'Description'),
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'OperatingKV'),
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'Phase'),
('Breaker', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'Serial_No'),
/* Line Fields */
('Line', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'Function'),
('Line', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'Location_Name'),
('Line', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'TVA_MODEL_NO'),
('Line', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'Unit'),
('Line', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'Asset_Desc'),
('Line', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'STATIONLINE'),
('Line', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'MANUFACTURER'),
('Line', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'LocationSubClass'),
('Line', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'Description'),
('Line', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'OperatingKV'),
('Line', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'Phase'),
('Line', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'Serial_No'),
/* Bus Fields */
('Bus', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'Function'),
('Bus', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'Location_Name'),
('Bus', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'TVA_MODEL_NO'),
('Bus', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'Unit'),
('Bus', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'Asset_Desc'),
('Bus', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'STATIONLINE'),
('Bus', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'MANUFACTURER'),
('Bus', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'LocationSubClass'),
('Bus', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'Description'),
('Bus', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'OperatingKV'),
('Bus', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'Phase'),
('Bus', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'Serial_No'),
/* CapBank Fields */
('CapBank', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'Function'),
('CapBank', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'Location_Name'),
('CapBank', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'TVA_MODEL_NO'),
('CapBank', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'Unit'),
('CapBank', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'Asset_Desc'),
('CapBank', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'STATIONLINE'),
('CapBank', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'MANUFACTURER'),
('CapBank', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'LocationSubClass'),
('CapBank', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'Description'),
('CapBank', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'OperatingKV'),
('CapBank', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'Phase'),
('CapBank', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'Serial_No'),
/* Transformer Fields */
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'Function'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'Location_Name'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'TVA_MODEL_NO'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'Unit'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'Asset_Desc'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'STATIONLINE'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'MANUFACTURER'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'LocationSubClass'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'Description'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'OperatingKV'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'Phase'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'INSTXFR_C'),'Serial_No')
GO

/* Maximo Table For Cap Banks */
INSERT INTO extDBTables (TableName,ExtDBID,Query) VALUES
    ('CapBank',(Select ID FROM dbo.[ExternalDatabases] WHERE Name = 'Maximo'),'
    (
    SELECT 
	    A.UNID AS Maximo_Asset_Number_(UID),
	    A.UNIT_CD AS Unit,
	    A.Function_CD AS Function,
	    A.Location_Name AS Location_Name,
	    B.Description AS Description,
		B.OperatingKVTrans AS VoltageKV,
	    B.StationLine AS STATIONLINE,
		B.BankKVAR AS BankVAR,
		B.CapacitorCount AS NumberOfBanks,
		B.CapacitorKV AS CapKV,
		B.CapacitorKVAR AS CapacitancePerBank,
	    C.Asset_Desc AS Asset_Desc,
	    C.TVA_Model_No AS TVA_MODEL_NO,
	    C.ASSET_STATUS_CD AS Status,
	    D.Company_Name AS MANUFACTURER
    FROM 
	    EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
	    EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key LEFT JOIN
	    EAMDM.EAM_OD_ASSET_MV C ON A.Location_Key = C.Location_Key LEFT JOIN 
	    EAMDM.EAM_OD_COMPANY_MV D ON C.MANUFACTURER_CD = D.COMPANY_CD
	WHERE
		A.CLASSSTRUCTURE_ID  = ''1012''
		AND (Maximo_Asset_Number_(UID) LIKE {key} OR {key} IS NULL))
    )')
GO

/* Fields From Maximo for CapBank */
INSERT INTO AdditionalField (ParentTable, ExternalDBTableID, IsKey, FieldName) VALUES 
('CapBank', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'CapBank'), 1, 'Maximo_Asset_Number_(UID)')
GO
INSERT INTO AdditionalField (ParentTable, ExternalDBTableID, FieldName) VALUES 
('CapBank', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'CapBank'),'Function'),
('CapBank', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'CapBank'),'Location_Name'),
('CapBank', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'CapBank'),'TVA_MODEL_NO'),
('CapBank', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'CapBank'),'Unit'),
('CapBank', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'CapBank'),'Asset_Desc'),
('CapBank', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'CapBank'),'STATIONLINE'),
('CapBank', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'CapBank'),'MANUFACTURER'),
('CapBank', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'CapBank'),'Status'),
('CapBank', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'CapBank'),'CapKV'),
('CapBank', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'CapBank'),'BankVAR')
GO

INSERT INTO ExternalOpenXDAField (ParentTable, FieldName, ExternalDBTableID) VALUES
('CapBank','Description',(SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'CapBank')),
('CapBank','VoltageKV',(SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'CapBank')),
('CapBank','CapacitancePerBank',(SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'CapBank')),
('CapBank','NumberOfBanks',(SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'CapBank'))
GO

/* Maximo Table For Lines */
INSERT INTO extDBTables (TableName,ExtDBID,Query) VALUES
    ('Line',(Select ID FROM dbo.[ExternalDatabases] WHERE Name = 'Maximo'),'
    (
    SELECT 
	    A.UNID AS Maximo_Asset_Number_(UID),
	    A.UNIT_CD AS Unit,
	    A.Function_CD AS Function,
	    A.ADDRESS_CD AS ADDRESS,
		A.TVA_AREA AS TVA_Area,
		A.TVA_DRAWING_NO AS DrawingNo,
		B.Description AS Description,
		B.OperatingKVTrans AS VoltageKV,
	    B.StationLine AS StationLine,
		B.PhasingDWG AS PhasingDWG,
		B.Remarks AS Remarks,
		B.StructureListDWG AS StructureListDWG
    FROM 
	    EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
	    EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key
	WHERE
		A.CLASSSTRUCTURE_ID  = ''1034''
		AND (Maximo_Asset_Number_(UID) LIKE {key} OR {key} IS NULL))
    )')
GO

/* Fields From Maximo for Lines */
INSERT INTO AdditionalField (ParentTable, ExternalDBTableID, IsKey, FieldName) VALUES 
('Line', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Line'), 1, 'Maximo_Asset_Number_(UID)')
GO
INSERT INTO AdditionalField (ParentTable, ExternalDBTableID, FieldName) VALUES 
('Line', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Line'),'Function'),
('Line', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Line'),'Unit'),
('Line', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Line'),'Address'),
('Line', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Line'),'TVA_Area'),
('Line', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Line'),'DrawingNo'),
('Line', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Line'),'StationLine'),
('Line', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Line'),'PhasingDWG'),
('Line', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Line'),'StructureListDWG')
GO
INSERT INTO ExternalOpenXDAField (ParentTable, FieldName, ExternalDBTableID) VALUES
('Line','Description',(SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Line')),
('Line','VoltageKV',(SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Line'))
GO

/* Maximo Tables For Transformer A*/
INSERT INTO extDBTables (TableName,ExtDBID,Query) VALUES
    ('Transformer_A',(Select ID FROM dbo.[ExternalDatabases] WHERE Name = 'Maximo'),'
    (
    SELECT 
	    A.UNID AS Maximo_Asset_Number_(UID),
	    A.Location_Name AS Location_Name,
	    A.UNIT_CD AS Unit,
	    A.Function_CD AS Function,
	    B.Description AS Description,
	    B.OperatingKVTrans AS VoltageKV,
	    B.StationLine AS STATIONLINE,
	    B.PhasePosition AS Phase,
	    C.Asset_Desc AS Asset_Desc,
	    C.TVA_Model_No AS TVA_MODEL_NO,
	    C.Serial_No AS Serial_No,
	    C.ASSET_LONG_DESC AS Long_Desc,
	    D.Company_Name AS MANUFACTURER
    FROM 
	    EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
	    EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key LEFT JOIN
	    EAMDM.EAM_OD_ASSET_MV C ON A.Location_Key = C.Location_Key LEFT JOIN 
	    EAMDM.EAM_OD_COMPANY_MV D ON C.MANUFACTURER_CD = D.COMPANY_CD 
    WHERE
        A.CLASSSTRUCTURE_ID  = ''1069''
		AND (Maximo_Asset_Number_(UID) LIKE {key} OR {key} IS NULL))
    )')
GO

INSERT INTO AdditionalField (ParentTable, ExternalDBTableID, IsKey, FieldName) VALUES 
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Transformer_A'), 1, 'Maximo_Asset_Number_(UID)')
GO
INSERT INTO AdditionalField (ParentTable, ExternalDBTableID, FieldName) VALUES 
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Transformer_A'),'Function'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Transformer_A'),'Location_Name'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Transformer_A'),'Unit'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Transformer_A'),'STATIONLINE'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Transformer_A'),'Asset_Desc'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Transformer_A'),'TVA_MODEL_NO'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Transformer_A'),'Serial_No'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Transformer_A'),'MANUFACTURER'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Transformer_A'),'Long_Desc')
GO

INSERT INTO ExternalOpenXDAField (ParentTable, ExternalDBTableID, FieldName) VALUES
('Transformer',(SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Transformer_A'),'Description'),
('Transformer',(SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Transformer_A'),'VoltageKV')
GO

/* Maximo Tables For Transformer B */
INSERT INTO extDBTables (TableName,ExtDBID,Query) VALUES
           ('Transformer_B',(Select ID FROM dbo.[ExternalDatabases] WHERE Name = 'Maximo'),'
            (
           SELECT 
	            A.UNID AS Maximo_Asset_Number_(UID),
	            A.Location_Name AS Location_Name,
	            A.UNIT_CD AS Unit,
	            A.Function_CD AS Function,
	            B.Description AS Description,
	            B.OperatingKVTrans AS OperatingKV,
	            B.StationLine AS STATIONLINE,
	            B.PhasePosition AS Phase,
	            C.Asset_Desc AS Asset_Desc,
	            C.TVA_Model_No AS TVA_Model_No,
	            C.Serial_No AS Serial_No,
	            C.ASSET_LONG_DESC AS Long_Desc,
	            D.Company_Name AS MANUFACTURER
            FROM 
	            EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
	            EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key LEFT JOIN
	            EAMDM.EAM_OD_ASSET_MV C ON A.Location_Key = C.Location_Key LEFT JOIN 
	            EAMDM.EAM_OD_COMPANY_MV D ON C.MANUFACTURER_CD = D.COMPANY_CD 
            WHERE
                A.CLASSSTRUCTURE_ID  = ''1069''
				AND (Maximo_Asset_Number_(UID) LIKE {key} OR {key} IS NULL))
            )')
GO

INSERT INTO AdditionalField (ParentTable, ExternalDBTableID, IsKey, FieldName) VALUES 
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Transformer_B'), 1, 'Maximo_Asset_Number_(UID)')
GO
INSERT INTO AdditionalField (ParentTable, ExternalDBTableID, FieldName) VALUES 
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Transformer_B'),'Function'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Transformer_B'),'Location_Name'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Transformer_B'),'Unit'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Transformer_B'),'STATIONLINE'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Transformer_B'),'Asset_Desc'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Transformer_B'),'TVA_MODEL_NO'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Transformer_B'),'Serial_No'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Transformer_B'),'MANUFACTURER'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Transformer_B'),'Long_Desc')
GO

/* Maximo Tables For Transformer C */
INSERT INTO extDBTables (TableName,ExtDBID,Query) VALUES
           ('Transformer_C',(Select ID FROM dbo.[ExternalDatabases] WHERE Name = 'Maximo'),'
            (
           SELECT 
	            A.UNID AS Maximo_Asset_Number_(UID),
	            A.Location_Name AS Location_Name,
	            A.UNIT_CD AS Unit,
	            A.Function_CD AS Function,
	            B.Description AS Description,
	            B.OperatingKVTrans AS OperatingKV,
	            B.StationLine AS STATIONLINE,
	            B.PhasePosition AS Phase,
	            C.Asset_Desc AS Asset_Desc,
	            C.TVA_Model_No AS TVA_MODEL_NO,
	            C.Serial_No AS Serial_No,
	            C.ASSET_LONG_DESC AS Long_Desc,
	            D.Company_Name AS MANUFACTURER
            FROM 
	            EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
	            EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key LEFT JOIN
	            EAMDM.EAM_OD_ASSET_MV C ON A.Location_Key = C.Location_Key LEFT JOIN 
	            EAMDM.EAM_OD_COMPANY_MV D ON C.MANUFACTURER_CD = D.COMPANY_CD 
            WHERE
                A.CLASSSTRUCTURE_ID  = ''1069''
				AND (Maximo_Asset_Number_(UID) LIKE {key} OR {key} IS NULL))
            )')
GO

INSERT INTO AdditionalField (ParentTable, ExternalDBTableID, IsKey, FieldName) VALUES 
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Transformer_C'), 1, 'Maximo_Asset_Number_(UID)')
GO
INSERT INTO AdditionalField (ParentTable, ExternalDBTableID, FieldName) VALUES 
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Transformer_C'),'Function'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Transformer_C'),'Location_Name'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Transformer_C'),'Unit'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Transformer_C'),'STATIONLINE'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Transformer_C'),'Asset_Desc'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Transformer_C'),'TVA_MODEL_NO'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Transformer_C'),'Serial_No'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Transformer_C'),'MANUFACTURER'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'Transformer_C'),'Long_Desc')
GO

/* Maximo Tables For LTC A */
INSERT INTO extDBTables (TableName,ExtDBID,Query) VALUES
    ('LTC_A',(Select ID FROM dbo.[ExternalDatabases] WHERE Name = 'Maximo'),'
    (
    SELECT 
	    A.UNID AS Maximo_Asset_Number_(UID),
	    A.Location_Name AS Location_Name,
	    A.UNIT_CD AS Unit,
	    A.Function_CD AS Function,
	    B.Description AS Description,
	    B.OperatingKVTrans AS OperatingKV,
	    B.StationLine AS STATIONLINE,
	    B.PhasePosition AS Phase,
	    C.Asset_Desc AS Asset_Desc,
	    C.Serial_No AS Serial_No
    FROM 
	    EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
	    EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key LEFT JOIN
	    EAMDM.EAM_OD_ASSET_MV C ON A.Location_Key = C.Location_Key
    WHERE
        A.CLASSSTRUCTURE_ID  IN (''2304'',''2310'')
		AND (Maximo_Asset_Number_(UID) LIKE {key} OR {key} IS NULL))
    )')
GO

INSERT INTO AdditionalField (ParentTable, ExternalDBTableID, IsKey, FieldName) VALUES 
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'LTC_A'), 1, 'Maximo_Asset_Number_(UID)')
GO
INSERT INTO AdditionalField (ParentTable, ExternalDBTableID, FieldName) VALUES 
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'LTC_A'),'Function'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'LTC_A'),'Location_Name'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'LTC_A'),'Unit'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'LTC_A'),'STATIONLINE'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'LTC_A'),'Asset_Desc'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'LTC_A'),'Serial_No'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'LTC_A'),'Description'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'LTC_A'),'OperatingKV')
GO

/* Maximo Tables For LTC B */
INSERT INTO extDBTables (TableName,ExtDBID,Query) VALUES
    ('LTC_B',(Select ID FROM dbo.[ExternalDatabases] WHERE Name = 'Maximo'),'
    (
    SELECT 
	    A.UNID AS Maximo_Asset_Number_(UID),
	    A.Location_Name AS Location_Name,
	    A.UNIT_CD AS Unit,
	    A.Function_CD AS Function,
	    B.Description AS DESCRIPTION,
	    B.OperatingKVTrans AS OperatingKV,
	    B.StationLine AS STATIONLINE,
	    B.PhasePosition AS Phase,
	    C.Asset_Desc AS Asset_Desc,
	    C.Serial_No AS Serial_No
    FROM 
	    EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
	    EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key LEFT JOIN
	    EAMDM.EAM_OD_ASSET_MV C ON A.Location_Key = C.Location_Key
    WHERE
        A.CLASSSTRUCTURE_ID  IN (''2304'',''2310'')
		AND (Maximo_Asset_Number_(UID) LIKE {key} OR {key} IS NULL))
    )')
GO

INSERT INTO AdditionalField (ParentTable, ExternalDBTableID, IsKey, FieldName) VALUES 
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'LTC_B'), 1, 'Maximo_Asset_Number_(UID)')
GO
INSERT INTO AdditionalField (ParentTable, ExternalDBTableID, FieldName) VALUES 
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'LTC_B'),'Function'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'LTC_B'),'Location_Name'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'LTC_B'),'Unit'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'LTC_B'),'STATIONLINE'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'LTC_B'),'Asset_Desc'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'LTC_B'),'Serial_No'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'LTC_B'),'DESCRIPTION'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'LTC_B'),'OperatingKV')
GO

/* Maximo Tables For LTC C */
INSERT INTO extDBTables (TableName,ExtDBID,Query) VALUES
    ('LTC_C',(Select ID FROM dbo.[ExternalDatabases] WHERE Name = 'Maximo'),'
    (
    SELECT 
	    A.UNID AS Maximo_Asset_Number_(UID),
	    A.Location_Name AS Location_Name,
	    A.UNIT_CD AS Unit,
	    A.Function_CD AS Function,
	    B.Description AS DESCRIPTION,
	    B.OperatingKVTrans AS OperatingKV,
	    B.StationLine AS STATIONLINE,
	    B.PhasePosition AS Phase,
	    C.Asset_Desc AS Asset_Desc,
	    C.Serial_No AS Serial_No
    FROM 
	    EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
	    EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key LEFT JOIN
	    EAMDM.EAM_OD_ASSET_MV C ON A.Location_Key = C.Location_Key
    WHERE
        A.CLASSSTRUCTURE_ID  IN (''2304'',''2310'')
		AND (Maximo_Asset_Number_(UID) LIKE {key} OR {key} IS NULL))
    )')
GO

INSERT INTO AdditionalField (ParentTable, ExternalDBTableID, IsKey, FieldName) VALUES 
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'LTC_C'), 1, 'Maximo_Asset_Number_(UID)')
GO
INSERT INTO AdditionalField (ParentTable, ExternalDBTableID, FieldName) VALUES 
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'LTC_C'),'Function'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'LTC_C'),'Location_Name'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'LTC_C'),'Unit'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'LTC_C'),'STATIONLINE'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'LTC_C'),'Asset_Desc'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'LTC_C'),'Serial_No'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'LTC_C'),'DESCRIPTION'),
('Transformer', (SELECT ID FROM dbo.[extDBTables] WHERE TableName = 'LTC_C'),'OperatingKV')
GO


INSERT INTO ValueListGroup (Name, Description) VALUES ('TSC', 'List of TSCs - Value is TSC name, AltValue is department number') 
GO
INSERT INTO ValueList (GroupID, Value, AltValue, SortOrder) VALUES ((SELECT ID FROM ValueListGroup WHERE Name = 'TSC'), 'Bowling Green', 'D17312', 1)
GO
INSERT INTO ValueList (GroupID, Value, AltValue, SortOrder) VALUES ((SELECT ID FROM ValueListGroup WHERE Name = 'TSC'), 'Browns Ferry', 'D17341', 2)
GO
INSERT INTO ValueList (GroupID, Value, AltValue, SortOrder) VALUES ((SELECT ID FROM ValueListGroup WHERE Name = 'TSC'), 'Chattanooga', 'D17323',3)
GO
INSERT INTO ValueList (GroupID, Value, AltValue, SortOrder) VALUES ((SELECT ID FROM ValueListGroup WHERE Name = 'TSC'), 'Columbia', 'D17311', 4)
GO
INSERT INTO ValueList (GroupID, Value, AltValue, SortOrder) VALUES ((SELECT ID FROM ValueListGroup WHERE Name = 'TSC'), 'Huntsville', 'D17325', 5)
GO
INSERT INTO ValueList (GroupID, Value, AltValue, SortOrder) VALUES ((SELECT ID FROM ValueListGroup WHERE Name = 'TSC'), 'Johnson City', 'D17321', 6)
GO
INSERT INTO ValueList (GroupID, Value, AltValue, SortOrder) VALUES ((SELECT ID FROM ValueListGroup WHERE Name = 'TSC'), 'Knoxville', 'D17322', 7)
GO
INSERT INTO ValueList (GroupID, Value, AltValue, SortOrder) VALUES ((SELECT ID FROM ValueListGroup WHERE Name = 'TSC'), 'Mayfield', 'D17313', 8)
GO
INSERT INTO ValueList (GroupID, Value, AltValue, SortOrder) VALUES ((SELECT ID FROM ValueListGroup WHERE Name = 'TSC'), 'Memphis', 'D17332', 9)
GO
INSERT INTO ValueList (GroupID, Value, AltValue, SortOrder) VALUES ((SELECT ID FROM ValueListGroup WHERE Name = 'TSC'), 'Murfreesboro', 'D17314', 10)
GO
INSERT INTO ValueList (GroupID, Value, AltValue, SortOrder) VALUES ((SELECT ID FROM ValueListGroup WHERE Name = 'TSC'), 'Muscle Shoals', 'D17335', 11)
GO
INSERT INTO ValueList (GroupID, Value, AltValue, SortOrder) VALUES ((SELECT ID FROM ValueListGroup WHERE Name = 'TSC'), 'Sequoyah', 'D17342', 12)
GO
INSERT INTO ValueList (GroupID, Value, AltValue, SortOrder) VALUES ((SELECT ID FROM ValueListGroup WHERE Name = 'TSC'), 'Starkville', 'D17334', 13)
GO
INSERT INTO ValueList (GroupID, Value, AltValue, SortOrder) VALUES ((SELECT ID FROM ValueListGroup WHERE Name = 'TSC'), 'Tupelo', 'D17333',14)
GO
INSERT INTO ValueList (GroupID, Value, AltValue, SortOrder) VALUES ((SELECT ID FROM ValueListGroup WHERE Name = 'TSC'), 'Watts Bar', 'D17343', 15)
GO

INSERT INTO ValueListGroup (Name, Description) VALUES ('Role', 'List of Roles - Value is Category, AltValue is list of roles that fall underneath it') 
GO
INSERT INTO ValueList (GroupID, Value, AltValue, SortOrder) VALUES ((SELECT ID FROM ValueListGroup WHERE Name = 'Role'), 'TSM (Transmission Service Manager)', 'Mgr, Transmission Service Cntr', 1)
GO
INSERT INTO ValueList (GroupID, Value, AltValue, SortOrder) VALUES ((SELECT ID FROM ValueListGroup WHERE Name = 'Role'), 'PMTM (Program Manager, Transmission Maintenance)', 'Prog Mgr, Trans Maint', 2)
GO
INSERT INTO ValueList (GroupID, Value, AltValue, SortOrder) VALUES ((SELECT ID FROM ValueListGroup WHERE Name = 'Role'), 'SE (System Engineer)', 'SY ENGR, TRANSM (PSO) A;SY ENGR, TRANSM (PSO) B;SY ENGR, TRANSM (PSO) C;SYSTEM ENGR TRANS, (REST USE);ELEC ENG-TRANS SERV;ELECT ENGR, TRANS SVS (PSO) B', 3)
GO
INSERT INTO ValueList (GroupID, Value, AltValue, SortOrder) VALUES ((SELECT ID FROM ValueListGroup WHERE Name = 'Role'), 'PMS (Power Maintenance Specialist)', 'Maint Spec, Trans System (C)', 4)
GO
INSERT INTO ValueList (GroupID, Value, AltValue, SortOrder) VALUES ((SELECT ID FROM ValueListGroup WHERE Name = 'Role'), 'PMT (Power Maintenance Technician)', 'TECH, PWR MAINT (PSO) A;TECH, POWER MAINT (PSO) B', 5)
GO
INSERT INTO ValueList (GroupID, Value, AltValue, SortOrder) VALUES ((SELECT ID FROM ValueListGroup WHERE Name = 'Role'), 'TCE (Telecom Engineer)', 'ELECT ENGR, POWR CN SY (PSO) A;ELECT ENGR, POWR CN SY (PSO) B', 6)
GO
INSERT INTO ValueList (GroupID, Value, AltValue, SortOrder) VALUES ((SELECT ID FROM ValueListGroup WHERE Name = 'Role'), 'TCS (Telecom Specialist)', 'MAINT SPEC, TRANS COMM (PSO) C', 7)
GO
INSERT INTO ValueList (GroupID, Value, AltValue, SortOrder) VALUES ((SELECT ID FROM ValueListGroup WHERE Name = 'Role'), 'TCT (Telecom Technician)', 'Technician, Telecom (PSO) A;Technician, Telecom (PSO) B', 8)
GO


INSERT INTO CompanyType (Name,Description) VALUES ('Industrial (Directly Served)','C - Industrial (Directly Served)')
GO
INSERT INTO CompanyType (Name,Description) VALUES ('Distributors (Local Power Companies)','D - Distributors (Local Power Companies)')
GO
INSERT INTO CompanyType (Name,Description) VALUES ('Federal Government (Directly Served)','G - Federal Government (Directly Served)')
GO
INSERT INTO CompanyType (Name,Description) VALUES ('Distributor Served Customers (LPC Served)','V - Distributor Served Customers (LPC Served)')
GO
INSERT INTO CompanyType (Name,Description) VALUES ('Interchange and Transmission','X - Interchange and Transmission')
GO

INSERT INTO ValueListGroup ([Name],[Description]) VALUES
	('TimeZones','TimeZones'),
	('Status','Status')
GO

INSERT INTO ValueList ([GroupID], [Value],[AltValue],[SortOrder]) VALUES
((SELECT ID FROM ValueListGroup WHERE Name = 'TimeZones'),'Hawaiian Standard Time','(UTC-10:00) Hawaii', 9),
((SELECT ID FROM ValueListGroup WHERE Name = 'TimeZones'),'UTC-08','(UTC-08:00) Coordinated Universal Time-08',8),
((SELECT ID FROM ValueListGroup WHERE Name = 'TimeZones'),'Pacific Standard Time','(UTC-08:00) Pacific Time (US & Canada)',7),
((SELECT ID FROM ValueListGroup WHERE Name = 'TimeZones'),'US Mountain Standard Time','(UTC-07:00) Arizona',6),
((SELECT ID FROM ValueListGroup WHERE Name = 'TimeZones'),'Mountain Standard Time','(UTC-07:00) Mountain Time (US & Canada)',5),
((SELECT ID FROM ValueListGroup WHERE Name = 'TimeZones'),'Central Standard Time','(UTC-06:00) Central Time (US & Canada)',4),
((SELECT ID FROM ValueListGroup WHERE Name = 'TimeZones'),'Eastern Standard Time','(UTC-05:00) Eastern Time (US & Canada)',3),
((SELECT ID FROM ValueListGroup WHERE Name = 'TimeZones'),'US Eastern Standard Time','(UTC-05:00) Indiana (East)',2),
((SELECT ID FROM ValueListGroup WHERE Name = 'TimeZones'),'UTC','(UTC) Coordinated Universal Time',1),
((SELECT ID FROM ValueListGroup WHERE Name = 'Status'),'Active',NULL,1),
((SELECT ID FROM ValueListGroup WHERE Name = 'Status'),'Retired',NULL,1),
((SELECT ID FROM ValueListGroup WHERE Name = 'Status'),'Planned',NULL,1),
((SELECT ID FROM ValueListGroup WHERE Name = 'Status'),'Repair',NULL,1)
GO

DROP VIEW [dbo].[SEBrowser.EventSearchEventView]
GO

DROP VIEW [dbo].[SEBrowser.EventSearchWorstDisturbanceView]
GO

CREATE VIEW [dbo].[SEBrowser.EventSearchEventView] AS
	SELECT
		Event.ID AS EventID,
		FORMAT(Event.StartTime,'MM/dd/yyyy <br> HH:mm:ss.fffffff') AS Time,
		Meter.AssetKey AS [Meter Key],
		Meter.Name AS [Meter],
		Meter.Alias AS [Meter Alias],
		Meter.ShortName AS [Meter ShortName],
		Meter.Make AS [Meter Make],
		Meter.Model AS [Meter Model],
		Meter.TimeZone AS [Meter TimeZone],
		Meter.Description AS [Meter Desc],
		(
			SELECT TOP 1 Value 
			FROM AdditionalFieldValue 
			WHERE ParentTableID = Meter.ID AND 
			AdditionalFieldID = (SELECT ID FROM AdditionalField WHERE FieldName = 'Meter Sector' AND ParentTable = 'Meter')
		) AS [Meter Sector],
		(
			SELECT TOP 1 Value 
			FROM AdditionalFieldValue 
			WHERE ParentTableID = Meter.ID AND 
			AdditionalFieldID = (SELECT ID FROM AdditionalField WHERE FieldName = 'Firmware Version' AND ParentTable = 'Meter')
		) AS [Meter Firmware],
		(
			SELECT TOP 1 Value 
			FROM AdditionalFieldValue 
			WHERE ParentTableID = Meter.ID AND 
			AdditionalFieldID = (SELECT ID FROM AdditionalField WHERE FieldName = 'Connection Type' AND ParentTable = 'Meter')
		) AS [Meter Con Type],
		Location.Name AS [Station],
		Location.LocationKey AS [Station Key],
		Location.ShortName AS [Station ShortName],
		Location.Alias AS [Station Alias],
		Location.Description AS [Station Desc],
		(
			SELECT TOP 1 Value 
			FROM AdditionalFieldValue 
			WHERE ParentTableID = Meter.ID AND 
			AdditionalFieldID = (SELECT ID FROM AdditionalField WHERE FieldName = 'TSC' AND ParentTable = 'Meter')
		) AS [Meter TSC],
		Asset.AssetName AS [Asset],
		AssetType.Name AS [Asset Type],
		Asset.VoltageKV AS [Nom Voltage (kV)],
		Asset.Description AS [Asset Desc],
		COALESCE((
			SELECT TOP 1 Value 
				FROM AdditionalFieldValue 
				WHERE ParentTableID = Asset.ID AND 
				AdditionalFieldID IN (SELECT ID FROM AdditionalField WHERE 
				(FieldName = 'TVA Model No' AND ParentTable = 'Breaker') OR
				(FieldName = 'TVA Model No' AND ParentTable = 'CapBank') OR
				(FieldName = 'TVA Model No Phase A' AND ParentTable = 'Transformer') OR
				(FieldName = 'TVA Model No Phase B' AND ParentTable = 'Transformer') OR
				(FieldName = 'TVA Model No Phase C' AND ParentTable = 'Transformer')
				)
		), '') AS [Asset Model],
		COALESCE(
		(
			SELECT TOP 1 Value 
				FROM AdditionalFieldValue 
				WHERE ParentTableID = Asset.ID AND 
				AdditionalFieldID IN (SELECT ID FROM AdditionalField WHERE 
				(FieldName = 'Manufacturer' AND ParentTable = 'Breaker') OR
				(FieldName = 'Manufacturer' AND ParentTable = 'CapBank') OR
				(FieldName = 'Manufacturer Phase A' AND ParentTable = 'Transformer') OR
				(FieldName = 'Manufacturer Phase B' AND ParentTable = 'Transformer') OR
				(FieldName = 'Manufacturer Phase C' AND ParentTable = 'Transformer')
				)
		), '') AS [Asset Manuf],

		EventType.Name AS [Event Type]
	FROM Event LEFT JOIN 
		EventType ON Event.EventTypeID = EventType.ID LEFT JOIN
		Meter ON Meter.ID = Event.MeterID LEFT JOIN 
		Location ON Meter.LocationID = Location.ID LEFT JOIN
		Asset ON Asset.ID = Event.AssetID LEFT JOIN
		AssetType ON Asset.AssetTypeID = AssetType.ID
GO

CREATE VIEW [dbo].[SEBrowser.EventSearchWorstDisturbanceView] AS
	SELECT
		Disturbance.ID AS DisturbanceID,
		Phase.Name AS [Phase],
		Disturbance.DurationCycles AS [Duration (cycles)],
		Disturbance.DurationSeconds AS [Duration (sec)],
		Disturbance.PerUnitMagnitude AS [MagDurMagnitude],
		Disturbance.DurationSeconds AS [MagDurDuration]
	FROM Disturbance LEFT JOIN
		Phase ON Disturbance.PhaseID = Phase.ID
GO
-- The Following Needs to be run on openXDA for now until integration into openXDA DB is complete --
--CREATE VIEW [SystemCenter.AdditionalField] AS
--	SELECT
--	ID,
--	OpenXDAParentTable AS ParentTable,
--	FieldName,
--	Type,
--	ExternalDB,
--	ExternalDBTable,
--	ExternalDBTableKey,
--	IsSecure
--FROM SystemCenter.dbo.AdditionalField
--GO

--CREATE VIEW [SystemCenter.AdditionalFieldValue] AS
--	SELECT
--	ID,
--	OpenXDaParentTableID AS ParentTableID,
--	AdditionalFieldID,
--	Value,
 --   UpdatedOn
--FROM SystemCenter.dbo.AdditionalFieldValue
--GO
