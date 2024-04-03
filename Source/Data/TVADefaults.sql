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


Update dbo.[SystemCenter.Setting]
Set Value = 'True'
Where Name = 'FAWG.Enabled'
GO

/* FAWG Query for LineSegments */
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

/* LineSegment Fawg Fields */
INSERT INTO AdditionalField (ParentTable, FieldName) VALUES 
('LineSegment', 'FromBusNumber'),
('LineSegment', 'ToBusNumber')
GO

/* Connections to external databases */
INSERT INTO ExternalDatabases (Name, ConnectionString, Encrypt) VALUES ('FAWG', 'dbFawg', 'true')
GO

/* FAWG Query for Transformers */
INSERT INTO extDBTables (TableName,ExtDBID,Query) VALUES('Transformer', (SELECT ID FROM ExternalDatabases WHERE Name='FAWG'), '
		SELECT
				XFR.PosSeqResistanceHigh,
				XFR.PosSeqReactanceHigh,
				XFR.ZeroSeqResistanceHigh,
				XFR.ZeroSeqReactanceHigh,
				XFR.PosSeqResistanceLow,
				XFR.PosSeqReactanceLow,
				XFR.ZeroSeqResistanceLow,
				XFR.ZeroSeqReactanceLow,
				Bh.ShortName AS "FAWG High Side Bus",
				Bl.SHortName AS "FAWG Low Side Bus",
				((XFR.PosSeqResistanceHigh * Bh.VoltageValue * Bh.VoltageValue / 100.0) + (XFR.PosSeqResistanceLow * Bl.VoltageValue * Bl.VoltageValue / 100.0))  AS R1,
                ((XFR.PosSeqReactanceHigh * Bh.VoltageValue * Bh.VoltageValue / 100.0) + (XFR.PosSeqReactanceLow * Bl.VoltageValue * Bl.VoltageValue / 100.0))  AS X1,
				((XFR.ZeroSeqResistanceHigh * Bh.VoltageValue * Bh.VoltageValue / 100.0) + (XFR.ZeroSeqResistanceLow * Bl.VoltageValue * Bl.VoltageValue / 100.0))  AS R0,
				((XFR.ZeroSeqReactanceHigh * Bh.VoltageValue * Bh.VoltageValue / 100.0) + (XFR.ZeroSeqReactanceLow * Bl.VoltageValue * Bl.VoltageValue / 100.0))  AS X0,
				Bh.VoltageValue AS PrimaryVoltageKV,
				Bl.VoltageValue AS SecondaryVoltageKV,
				TransformerGroupTypeName AS "XFR Type"
			FROM
				Transformers XFR JOIN
				Buses Bh ON XFR.HighSideBus = Bh.Buses_Id JOIN
				Buses Bl ON XFR.LowSideBus = Bl.Buses_Id JOIN
				Branches ON XFR.Branches_Id = Branches.Branches_Id
			WHERE
				(Branches.Description = ''Fawg One'' AND XFR.isInService = 1) AND
				(
					(Bh.ShortName = {Transformer.Field.FAWG High Side Bus} AND Bl.ShortName = {Transformer.Field.FAWG Low Side Bus}) OR
					({Transformer.Field.FAWG High Side Bus} is NULL AND {Transformer.Field.FAWG Low Side Bus} is NULL)
				)')
GO

/* Transformer Fawg Fields */
INSERT INTO AdditionalField (ParentTable, FieldName, ExternalDBTableID) VALUES
('Transformer', 'FAWG High Side Bus', (SELECT ID FROM extDBTables WHERE TableName = 'Transformer' AND ExtDBID = (SELECT ID FROM ExternalDatabases WHERE Name='FAWG'))),
('Transformer', 'FAWG Low Side Bus', (SELECT ID FROM extDBTables WHERE TableName = 'Transformer' AND ExtDBID = (SELECT ID FROM ExternalDatabases WHERE Name='FAWG'))),
('Transformer', 'XFR Type', (SELECT ID FROM extDBTables WHERE TableName = 'Transformer' AND ExtDBID = (SELECT ID FROM ExternalDatabases WHERE Name='FAWG')))
GO

INSERT INTO ExternalOpenXDAField (ParentTable, FieldName, ExternalDBTableID) VALUES
('Transformer','R1', (SELECT ID FROM extDBTables WHERE TableName = 'Transformer' AND ExtDBID = (SELECT ID FROM ExternalDatabases WHERE Name='FAWG'))),
('Transformer','X1', (SELECT ID FROM extDBTables WHERE TableName = 'Transformer' AND ExtDBID = (SELECT ID FROM ExternalDatabases WHERE Name='FAWG'))),
('Transformer','R0', (SELECT ID FROM extDBTables WHERE TableName = 'Transformer' AND ExtDBID = (SELECT ID FROM ExternalDatabases WHERE Name='FAWG'))),
('Transformer','X0', (SELECT ID FROM extDBTables WHERE TableName = 'Transformer' AND ExtDBID = (SELECT ID FROM ExternalDatabases WHERE Name='FAWG'))),
('Transformer','PrimaryVoltageKV', (SELECT ID FROM extDBTables WHERE TableName = 'Transformer' AND ExtDBID = (SELECT ID FROM ExternalDatabases WHERE Name='FAWG'))),
('Transformer','SecondaryVoltageKV', (SELECT ID FROM extDBTables WHERE TableName = 'Transformer' AND ExtDBID = (SELECT ID FROM ExternalDatabases WHERE Name='FAWG')))
GO

INSERT INTO dbo.[ExternalDatabases] (Name, ConnectionString,Encrypt) VALUES
    ('Maximo','dbMaximo', 1)
GO

/* Maximo Query for Meters */
INSERT INTO extDBTables (TableName,ExternalDB,Query) VALUES
           ('Meter','Maximo','
            (
             SELECT 
	            A.UNID AS "Maximo Asset Number (UID)",
	            A.UNIT_CD AS "Unit",
	            A.Function_CD AS "Function",
	            A.Location_Name AS "Location Name",
	            A.TVA_ALIS AS "TVA Alias",
	            B.Description AS "Description",
	            B.MeterSector AS "Meter Sector",
	            B.MSCO AS "MSCO",
	            B.StationLine AS "Station/Line",
	            C.Asset_Desc AS "Asset Desc",
	            C.Serial_No AS "Serial No (Maximo)",
	            C.TVA_Model_No AS "TVA Model No",
	            C.ASSET_STATUS_CD AS "Status",
	            D.Company_Name AS "Manufacturer",
	            E.Company_Name AS "Supplier"
            FROM 
	            EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
	            EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key LEFT JOIN
	            EAMDM.EAM_OD_ASSET_MV C ON A.Location_Key = C.Location_Key LEFT JOIN 
	            EAMDM.EAM_OD_COMPANY_MV D ON C.MANUFACTURER_CD = D.COMPANY_CD LEFT JOIN
	            EAMDM.EAM_OD_COMPANY_MV E ON C.SUPPLIER_CD = E.COMPANY_CD
			WHERE
				"Maximo Asset Number (UID)" LIKE {key} OR {key} IS NULL)
            )')
GO

/* Maximo Fields for Meters */
INSERT INTO AdditionalField (ParentTable,ExternalDBTableID,IsKey,FieldName) VALUES
('Meter',(SELECT ID FROM extDBTables WHERE TableName = 'Meter'),1,'Maximo Asset Number (UID)')
GO

INSERT INTO AdditionalField (ParentTable,ExternalDBTableID,FieldName) VALUES 
('Meter',(SELECT ID FROM extDBTables WHERE TableName = 'Meter'),'Function'),
('Meter',(SELECT ID FROM extDBTables WHERE TableName = 'Meter'),'Location Name'),
('Meter',(SELECT ID FROM extDBTables WHERE TableName = 'Meter'),'Meter Sector'),
('Meter',(SELECT ID FROM extDBTables WHERE TableName = 'Meter'),'TVA Model No'),
('Meter',(SELECT ID FROM extDBTables WHERE TableName = 'Meter'),'Unit'),
('Meter',(SELECT ID FROM extDBTables WHERE TableName = 'Meter'),'Asset Desc'),
('Meter',(SELECT ID FROM extDBTables WHERE TableName = 'Meter'),'Serial No (Maximo)'),
('Meter',(SELECT ID FROM extDBTables WHERE TableName = 'Meter'),'Station/Line'),
('Meter',(SELECT ID FROM extDBTables WHERE TableName = 'Meter'),'MSCO'),
('Meter',(SELECT ID FROM extDBTables WHERE TableName = 'Meter'),'Supplier'),
('Meter',(SELECT ID FROM extDBTables WHERE TableName = 'Meter'),'Manufacturer'),
('Meter',(SELECT ID FROM extDBTables WHERE TableName = 'Meter'),'Status'),
('Meter',(SELECT ID FROM extDBTables WHERE TableName = 'Meter'),'TVA Alias')
GO

INSERT INTO ExternalOpenXDAField (ParentTable,ExternalDBTableID,FieldName) VALUES
('Meter',(SELECT ID FROM extDBTables WHERE TableName = 'Meter'),'Description')
GO

/* Maximo Query for Substations */
INSERT INTO extDBTables (TableName,ExternalDB,Query) VALUES
           ('Location','Maximo','
            (
            SELECT 
	            A.UNID AS "Maximo Asset Number (UID)",
				B.City AS "City",
				B.County AS "County",
				B.Customer1 AS "Customer 1",
				B.Customer2 AS "Customer 2",
				B.Customer3 AS "Customer 3",
				B.Description AS "Description",
				B.MeterSector AS "Meter Sector",
				B.State AS "State",
				B.StationLine AS "Station/Line",
				B.Stationowner AS "Stationowner",
				B.StreetAddress AS "Street Address",
			    B.TomArea AS "TomArea",
			    B.Unit AS "Unit",
			    B.ZipCode AS "Zip Code",
			    B.ADCC AS "ADCC"
		    FROM 
			    EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
			    EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key	
			WHERE
				"Maximo Asset Number (UID)" LIKE {key} OR {key} IS NULL)	
            )')
GO

/* Maximo Fields for Substations */
INSERT INTO AdditionalField (ParentTable, ExternalDBTableID, IsKey, FieldName) VALUES
('Location', (SELECT ID FROM extDBTables WHERE TableName = 'Location'), 1, 'Maximo Asset Number (UID)')
GO

INSERT INTO AdditionalField (ParentTable, ExternalDBTableID, FieldName) VALUES 
('Location', (SELECT ID FROM extDBTables WHERE TableName = 'Location'), 'City'),
('Location', (SELECT ID FROM extDBTables WHERE TableName = 'Location'), 'County'),
('Location', (SELECT ID FROM extDBTables WHERE TableName = 'Location'), 'State'),
('Location', (SELECT ID FROM extDBTables WHERE TableName = 'Location'), 'Street Address'),
('Location', (SELECT ID FROM extDBTables WHERE TableName = 'Location'), 'ZIP Code'),
('Location', (SELECT ID FROM extDBTables WHERE TableName = 'Location'), 'Customer 1'),
('Location', (SELECT ID FROM extDBTables WHERE TableName = 'Location'), 'Customer 2'),
('Location', (SELECT ID FROM extDBTables WHERE TableName = 'Location'), 'Customer 3'),
('Location', (SELECT ID FROM extDBTables WHERE TableName = 'Location'), 'Meter Sector'),
('Location', (SELECT ID FROM extDBTables WHERE TableName = 'Location'), 'Unit'),
('Location', (SELECT ID FROM extDBTables WHERE TableName = 'Location'), 'Station/Line'),
('Location', (SELECT ID FROM extDBTables WHERE TableName = 'Location'), 'ADCC')
GO

INSERT INTO ExternalOpenXDAField (ParentTable, ExternalDBTableID, FieldName) VALUES
('Location', (SELECT ID FROM extDBTables WHERE TableName = 'Location'), 'Description')
GO

/* Maximo Query for Breakers */
INSERT INTO extDBTables (TableName,ExternalDB,Query) VALUES
           ('Breaker','Maximo','
            (
            SELECT 
	            A.UNID AS "Maximo Breaker Asset Number (UID)",
			    A.UNIT_CD AS "Unit",
			    A.Function_CD AS "Function",
			    A.Location_Name AS "Location Name",
			    B.Description AS "Description",
				B.OperatingKVTrans AS "VoltageKV",
			    B.StationLine AS "Station/Line",
			    C.Asset_Desc AS "Asset Desc",
			    C.TVA_Model_No AS "TVA Model No",
			    C.ASSET_STATUS_CD AS "Status",
			    D.Company_Name AS "Manufacturer"
		    FROM 
			    EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
			    EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key LEFT JOIN
			    EAMDM.EAM_OD_ASSET_MV C ON A.Location_Key = C.Location_Key LEFT JOIN 
			    EAMDM.EAM_OD_COMPANY_MV D ON C.MANUFACTURER_CD = D.COMPANY_CD 
			WHERE
				A.CLASSSTRUCTURE_ID IN (''1009'', ''1010'')
				AND ("Maximo Breaker Asset Number (UID)" LIKE {key} OR {key} IS NULL))
            )')
GO

/* Maximo Fields for Breakers */
INSERT INTO AdditionalField (ParentTable, ExternalDBTableID, IsKey, FieldName) VALUES 
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'Breaker'), 1, 'Maximo Breaker Asset Number (UID)')
GO

INSERT INTO AdditionalField (ParentTable, ExternalDBTableID, FieldName) VALUES 
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'Breaker'), 'Function'),
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'Breaker'), 'Location Name'),
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'Breaker'), 'TVA Model No'),
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'Breaker'), 'Unit'),
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'Breaker'), 'Asset Desc'),
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'Breaker'), 'Station/Line'),
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'Breaker'), 'Manufacturer'),
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'Breaker'), 'Status')
GO

INSERT INTO ExternalOpenXDAField (ParentTable, ExternalDBTableID, FieldName) VALUES
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'Breaker'), 'Description'),
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'Breaker'), 'VoltageKV')
GO

/* Maximo Query for CapBanks */
INSERT INTO extDBTables (TableName,ExternalDB,Query) VALUES
           ('CapBank','Maximo','
            (
            SELECT 
	            A.UNID AS "Cap Bank Maximo Asset Number (UID)",
			    A.UNIT_CD AS "Unit",
			    A.Function_CD AS "Function",
			    A.Location_Name AS "Location Name",
			    B.Description AS "Description",
				B.OperatingKVTrans AS "VoltageKV",
			    B.StationLine AS "Station/Line",
				B.BankKVAR AS "Bank KVAR",
				B.CapacitorCount AS "NumberOfBanks",
				B.CapacitorKV AS "Capacitor KV",
				B.CapacitorKVAR AS "CapacitancePerBank",
			    C.Asset_Desc AS "Asset Desc",
			    C.TVA_Model_No AS "TVA Model No",
			    C.ASSET_STATUS_CD AS "Status",
			    D.Company_Name AS "Manufacturer"
		    FROM 
			    EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
			    EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key LEFT JOIN
			    EAMDM.EAM_OD_ASSET_MV C ON A.Location_Key = C.Location_Key LEFT JOIN 
			    EAMDM.EAM_OD_COMPANY_MV D ON C.MANUFACTURER_CD = D.COMPANY_CD
			WHERE
				A.CLASSSTRUCTURE_ID  = ''1012''
				AND ("Cap Bank 1 Maximo Asset Number (UID)" LIKE {key} OR {key} IS NULL))
            )')
GO

/* Maximo Fields for CapBanks */
INSERT INTO AdditionalField (ParentTable, ExternalDBTableID, IsKey, FieldName) VALUES
('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'CapBank'), 1, 'Cap Bank Maximo Asset Number (UID)')
GO

INSERT INTO AdditionalField (ParentTable, ExternalDBTableID, FieldName) VALUES 
('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'CapBank'), 'Function'),
('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'CapBank'), 'Location Name'),
('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'CapBank'), 'TVA Model No'),
('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'CapBank'), 'Unit'),
('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'CapBank'), 'Asset Desc'),
('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'CapBank'), 'Station/Line'),
('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'CapBank'), 'Manufacturer'),
('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'CapBank'), 'Status'),
('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'CapBank'), 'Capacitor KV'),
('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'CapBank'), 'Bank KVAR')
GO

INSERT INTO ExternalOpenXDAField (ParentTable, ExternalDBTableID, FieldName) VALUES
('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'CapBank'), 'Description'),
('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'CapBank'), 'VoltageKV'),
('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'CapBank'), 'CapacitancePerBank'),
('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'CapBank'), 'NumberOfBanks')
GO

/* Maximo Query for Lines */
INSERT INTO extDBTables (TableName,ExternalDB,Query) VALUES
           ('Line','Maximo','
            (
           SELECT 
	            A.UNID AS "Maximo Asset Number (UID)",
			    A.UNIT_CD AS "Unit",
			    A.Function_CD AS "Function",
			    A.ADDRESS_CD AS "Address",
				A.TVA_AREA AS "TVA Area",
				A.TVA_DRAWING_NO AS "Drawing No",
				B.Description AS "Description",
				B.OperatingKVTrans AS "VoltageKV",
			    B.StationLine AS "Station/Line",
				B.PhasingDWG AS "Phasing Drawing",
				B.Remarks AS "Remarks",
				B.StructureListDWG AS "Structure List Drawing"
		    FROM 
			    EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
			    EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key
			WHERE
				A.CLASSSTRUCTURE_ID = ''1034''
				AND ("Maximo Asset Number (UID)" LIKE {key} OR {key} IS NULL))
            )')
GO

/* Maximo Fields for Lines */
INSERT INTO AdditionalField (ParentTable, ExternalDBTableID, IsKey, FieldName) VALUES
('Line', (SELECT ID FROM extDBTables WHERE TableName = 'Line'), 1, 'Maximo Asset Number (UID)')
GO

INSERT INTO AdditionalField (ParentTable, ExternalDBTableID, FieldName) VALUES 
('Line', (SELECT ID FROM extDBTables WHERE TableName = 'Line'), 'Function'),
('Line', (SELECT ID FROM extDBTables WHERE TableName = 'Line'), 'Unit'),
('Line', (SELECT ID FROM extDBTables WHERE TableName = 'Line'), 'Address'),
('Line', (SELECT ID FROM extDBTables WHERE TableName = 'Line'), 'TVA Area'),
('Line', (SELECT ID FROM extDBTables WHERE TableName = 'Line'), 'Drawing No'),
('Line', (SELECT ID FROM extDBTables WHERE TableName = 'Line'), 'Station/Line'),
('Line', (SELECT ID FROM extDBTables WHERE TableName = 'Line'), 'Phasing Drawing'),
('Line', (SELECT ID FROM extDBTables WHERE TableName = 'Line'), 'Structure List Drawing')
GO

INSERT INTO ExternalOpenXDAField (ParentTable, ExternalDBTableID, FieldName) VALUES
('Line', (SELECT ID FROM extDBTables WHERE TableName = 'Line'), 'Description'),
('Line', (SELECT ID FROM extDBTables WHERE TableName = 'Line'), 'VoltageKV')
GO

/* Maximo Queries for Transformers */
INSERT INTO extDBTables (TableName,ExternalDB,Query) VALUES
           ('Transformer_A','Maximo','
            (
           SELECT 
	            A.UNID AS "Maximo Phase A Asset Number (UID)",
			    A.Location_Name AS "Location Name Phase A",
			    A.UNIT_CD AS "Unit Phase A",
			    A.Function_CD AS "Function Phase A",
			    B.Description AS "Description",
			    B.OperatingKVTrans AS "VoltageKV",
			    B.StationLine AS "Station/Line Phase A",
			    B.PhasePosition AS "Phase",
			    C.Asset_Desc AS "Asset Desc Phase A",
			    C.TVA_Model_No AS "TVA Model No Phase A",
			    C.Serial_No AS "Serial No Phase A",
			    C.ASSET_LONG_DESC AS "Long Description Phase A",
			    D.Company_Name AS "Manufacturer Phase A"
		    FROM 
			    EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
			    EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key LEFT JOIN
			    EAMDM.EAM_OD_ASSET_MV C ON A.Location_Key = C.Location_Key LEFT JOIN 
			    EAMDM.EAM_OD_COMPANY_MV D ON C.MANUFACTURER_CD = D.COMPANY_CD 
		    WHERE
		        A.CLASSSTRUCTURE_ID = ''1069''
				AND ("Maximo Phase A Asset Number (UID)" LIKE {key} OR {key} IS NULL))
            )')
GO

INSERT INTO extDBTables (TableName,ExternalDB,Query) VALUES
           ('Transformer_B','Maximo','
            (
           SELECT 
	            A.UNID AS "Maximo Phase B Asset Number (UID)",
			    A.Location_Name AS "Location Name Phase B",
			    A.UNIT_CD AS "Unit Phase B",
			    A.Function_CD AS "Function Phase B",
			    B.Description AS "Description",
			    B.OperatingKVTrans AS "OperatingKV",
			    B.StationLine AS "Station/Line Phase B",
			    B.PhasePosition AS "Phase",
			    C.Asset_Desc AS "Asset Desc Phase B",
			    C.TVA_Model_No AS "TVA Model No Phase B",
		        C.Serial_No AS "Serial No Phase B",
		        C.ASSET_LONG_DESC AS "Long Description Phase B",
		        D.Company_Name AS "Manufacturer Phase B"
		    FROM 
		        EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
		        EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key LEFT JOIN
		        EAMDM.EAM_OD_ASSET_MV C ON A.Location_Key = C.Location_Key LEFT JOIN 
		        EAMDM.EAM_OD_COMPANY_MV D ON C.MANUFACTURER_CD = D.COMPANY_CD 
		    WHERE
		        A.CLASSSTRUCTURE_ID = ''1069''
				AND ("Maximo Phase B Asset Number (UID)" LIKE {key} OR {key} IS NULL))
            )')
GO

INSERT INTO extDBTables (TableName,ExternalDB,Query) VALUES
           ('Transformer_C','Maximo','
            (
           SELECT 
	            A.UNID AS "Maximo Phase C Asset Number (UID)",
			    A.Location_Name AS "Location Name Phase C",
			    A.UNIT_CD AS "Unit Phase C",
			    A.Function_CD AS "Function Phase C",
			    B.Description AS "Description",
			    B.OperatingKVTrans AS "OperatingKV",
			    B.StationLine AS "Station/Line Phase C",
			    B.PhasePosition AS "Phase",
			    C.Asset_Desc AS "Asset Desc Phase C",
			    C.TVA_Model_No AS "TVA Model No Phase C",
			    C.Serial_No AS "Serial No Phase C",
			    C.ASSET_LONG_DESC AS "Long Description Phase C",
			    D.Company_Name AS "Manufacturer Phase C"
		    FROM 
			    EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
			    EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key LEFT JOIN
			    EAMDM.EAM_OD_ASSET_MV C ON A.Location_Key = C.Location_Key LEFT JOIN 
			    EAMDM.EAM_OD_COMPANY_MV D ON C.MANUFACTURER_CD = D.COMPANY_CD 
		    WHERE
		        A.CLASSSTRUCTURE_ID = ''1069''
				AND ("Maximo Phase C Asset Number (UID)" LIKE {key} OR {key} IS NULL))
            )')
GO

/* Maximo Fields for Transformers */
INSERT INTO AdditionalField (ParentTable, ExternalDBTableID, IsKey, FieldName) VALUES
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'Transformer_A'), 1, 'Maximo Phase A Asset Number (UID)'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'Transformer_B'), 1, 'Maximo Phase B Asset Number (UID)'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'Transformer_C'), 1, 'Maximo Phase C Asset Number (UID)')
GO

INSERT INTO AdditionalField (ParentTable, ExternalDBTableID, FieldName) VALUES 
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'Transformer_A'), 'Function Phase A'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'Transformer_A'), 'Location Name Phase A'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'Transformer_A'), 'Unit Phase A'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'Transformer_A'), 'Station/Line Phase A'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'Transformer_A'), 'Asset Desc Phase A'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'Transformer_A'), 'TVA Model No Phase A'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'Transformer_A'), 'Serial No Phase A'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'Transformer_A'), 'Manufacturer Phase A'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'Transformer_A'), 'Long Description Phase A'),

('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'Transformer_B'), 'Function Phase B'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'Transformer_B'), 'Location Name Phase B'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'Transformer_B'), 'Unit Phase B'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'Transformer_B'), 'Station/Line Phase B'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'Transformer_B'), 'Asset Desc Phase B'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'Transformer_B'), 'TVA Model No Phase B'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'Transformer_B'), 'Serial No Phase B'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'Transformer_B'), 'Manufacturer Phase B'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'Transformer_B'), 'Long Description Phase B'),

('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'Transformer_C'), 'Function Phase C'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'Transformer_C'), 'Location Name Phase C'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'Transformer_C'), 'Unit Phase C'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'Transformer_C'), 'Station/Line Phase C'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'Transformer_C'), 'Asset Desc Phase C'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'Transformer_C'), 'TVA Model No Phase C'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'Transformer_C'), 'Serial No Phase C'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'Transformer_C'), 'Manufacturer Phase C'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'Transformer_C'), 'Long Description Phase C')
GO

INSERT INTO ExternalOpenXDAField (ParentTable, ExternalDBTableID, FieldName) VALUES
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'Transformer_A'), 'Description'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'Transformer_A'), 'VoltageKV')
GO

/* Maximo Queries for LTC */
INSERT INTO extDBTables (TableName,ExternalDB,Query) VALUES
           ('LTC_A','Maximo','
            (
           SELECT 
	            A.UNID AS "Phase A LTC Asset Number (UID)",
			    A.Location_Name AS "Location Name Phase A LTC",
			    A.UNIT_CD AS "Unit Phase A LTC",
			    A.Function_CD AS "Function Phase A LTC",
			    B.Description AS "Desc. Phase A LTC",
			    B.OperatingKVTrans AS "Operating KV Phase A LTC",
			    B.StationLine AS "Station/Line Phase A LTC",
			    B.PhasePosition AS "Phase",
			    C.Asset_Desc AS "Asset Desc Phase A LTC",
			    C.Serial_No AS "Serial No Phase A LTC"
		    FROM 
			    EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
			    EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key LEFT JOIN
			    EAMDM.EAM_OD_ASSET_MV C ON A.Location_Key = C.Location_Key
		    WHERE
		        A.CLASSSTRUCTURE_ID  IN (''2304'',''2310'')
				AND ("Phase A LTC Asset Number (UID)" LIKE {key} OR {key} IS NULL))
            )')
GO

INSERT INTO extDBTables (TableName,ExternalDB,Query) VALUES
           ('LTC_B','Maximo','
            (
           SELECT 
	            A.UNID AS "Phase B LTC Asset Number (UID)",
			    A.Location_Name AS "Location Name Phase B LTC",
			    A.UNIT_CD AS "Unit Phase B LTC",
			    A.Function_CD AS "Function Phase B LTC",
			    B.Description AS "Desc. Phase B LTC",
			    B.OperatingKVTrans AS "Operating KV Phase B LTC",
			    B.StationLine AS "Station/Line Phase B LTC",
			    B.PhasePosition AS "Phase",
			    C.Asset_Desc AS "Asset Desc Phase B LTC",
			    C.Serial_No AS "Serial No Phase B LTC"
		    FROM 
			    EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
			    EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key LEFT JOIN
			    EAMDM.EAM_OD_ASSET_MV C ON A.Location_Key = C.Location_Key
		    WHERE
		        A.CLASSSTRUCTURE_ID  IN (''2304'',''2310'')
				AND ("Phase B LTC Asset Number (UID)" LIKE {key} OR {key} IS NULL))
            )')
GO

INSERT INTO extDBTables (TableName,ExternalDB,Query) VALUES
           ('LTC_C','Maximo','
            (
           SELECT 
	            A.UNID AS "Phase C LTC Asset Number (UID)",
			    A.Location_Name AS "Location Name Phase C LTC",
			    A.UNIT_CD AS "Unit Phase C LTC",
			    A.Function_CD AS "Function Phase C LTC",
			    B.Description AS "Desc. Phase C LTC",
			    B.OperatingKVTrans AS "Operating KV Phase C LTC",
			    B.StationLine AS "Station/Line Phase C LTC",
			    B.PhasePosition AS "Phase",
			    C.Asset_Desc AS "Asset Desc Phase C LTC",
			    C.Serial_No AS "Serial No Phase C LTC"
		    FROM 
			    EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
			    EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key LEFT JOIN
			    EAMDM.EAM_OD_ASSET_MV C ON A.Location_Key = C.Location_Key
		    WHERE
		        A.CLASSSTRUCTURE_ID  IN (''2304'',''2310'')
				AND ("Phase C LTC Asset Number (UID)" LIKE {key} OR {key} IS NULL))
            )')
GO

/* Maximo Fields for LTC */
INSERT INTO AdditionalField (ParentTable, ExternalDBTableID, IsKey, FieldName) VALUES
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'LTC_A'), 1, 'Phase A LTC Asset Number (UID)'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'LTC_B'), 1, 'Phase B LTC Asset Number (UID)'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'LTC_C'), 1, 'Phase C LTC Asset Number (UID)')
GO

INSERT INTO AdditionalField (ParentTable, ExternalDBTableID, FieldName) VALUES 
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'LTC_A'), 'Function Phase A LTC'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'LTC_A'), 'Location Name Phase A LTC'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'LTC_A'), 'Unit Phase A LTC'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'LTC_A'), 'Station/Line Phase A LTC'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'LTC_A'), 'Asset Desc Phase A LTC'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'LTC_A'), 'Serial No Phase A LTC'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'LTC_A'), 'Desc. Phase A LTC'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'LTC_A'), 'Operating KV Phase A LTC'),

('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'LTC_B'), 'Function Phase B LTC'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'LTC_B'), 'Location Name Phase B LTC'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'LTC_B'), 'Unit Phase B LTC'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'LTC_B'), 'Station/Line Phase B LTC'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'LTC_B'), 'Asset Desc Phase B LTC'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'LTC_B'), 'Serial No Phase B LTC'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'LTC_B'), 'Desc. Phase B LTC'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'LTC_B'), 'Operating KV Phase B LTC'),

('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'LTC_C'), 'Function Phase C LTC'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'LTC_C'), 'Location Name Phase C LTC'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'LTC_C'), 'Unit Phase C LTC'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'LTC_C'), 'Station/Line Phase C LTC'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'LTC_C'), 'Asset Desc Phase C LTC'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'LTC_C'), 'Serial No Phase C LTC'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'LTC_C'), 'Desc. Phase C LTC'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'LTC_C'), 'Operating KV Phase C LTC')
GO

/* Maximo Query for Trip Coils */
INSERT INTO extDBTables (TableName,ExternalDB,Query) VALUES
           ('TripCoil','Maximo','
            (
            SELECT 
	            A.UNID AS "Maximo TripCoil Asset Number (UID)",
			    A.UNIT_CD AS "Unit TripCoil",
			    A.Function_CD AS "Function TripCoil",
			    A.Location_Name AS "Location Name TripCoil",
			    B.Description AS "Description TripCoil",
			    B.StationLine AS "Station/Line TripCoil",
			    C.Asset_Desc AS "Asset Desc TripCoil"
		    FROM 
			    EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
			    EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key LEFT JOIN
			    EAMDM.EAM_OD_ASSET_MV C ON A.Location_Key = C.Location_Key 
			WHERE
				A.CLASSSTRUCTURE_ID = ''1128''
				AND ("Maximo TripCoil 1 Asset Number (UID)" LIKE {key} OR {key} IS NULL))
            )')
GO

/* Maximo Fields for Trip Coils */
INSERT INTO AdditionalField (ParentTable, ExternalDBTableID, IsKey, FieldName) VALUES 
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'TripCoil'), 1, 'Maximo TripCoil Asset Number (UID)')
GO

INSERT INTO AdditionalField (ParentTable, ExternalDBTableID, FieldName) VALUES 
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'TripCoil'), 'Function TripCoil'),
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'TripCoil'), 'Location Name TripCoil'),
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'TripCoil'), 'Unit TripCoil'),
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'TripCoil'), 'Station/Line TripCoil'),
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'TripCoil'), 'Asset Desc TripCoil'),
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'TripCoil'), 'Desc TripCoil')
GO

/* Maximo Queries for Instrument Transformers */
INSERT INTO extDBTables (TableName,ExternalDB,Query) VALUES
           ('INSTXFR_A','Maximo','
            (
           SELECT 
	            A.UNID AS "Phase A Inst. XFR Asset Number (UID)",
			    A.UNIT_CD AS "INST. XFR A Unit",
			    A.Function_CD AS "INST. XFR A Function",
			    A.Location_Name AS "INST. XFR A Location Name",
				A.LOCATION_SUB_CLASS_NAME AS "INST. XFR A Class",
			    B.Description AS "INST. XFR A Desc",
				B.OperatingKVTrans AS "INST. XFR A KV",
			    B.StationLine AS "INST. XFR A Station/Line",
				B.PhasePosition AS "INST. XFR A Phase",
			    C.Asset_Desc AS "INST. XFR A Asset Desc",
			    C.TVA_Model_No AS "INST. XFR A Model No",
				C.Serial_No AS "INST. XFR A Serial No.",
			    D.Company_Name AS "INST. XFR A Manufacturer"
		    FROM 
			    EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
			    EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key LEFT JOIN
			    EAMDM.EAM_OD_ASSET_MV C ON A.Location_Key = C.Location_Key LEFT JOIN 
			    EAMDM.EAM_OD_COMPANY_MV D ON C.MANUFACTURER_CD = D.COMPANY_CD 
			WHERE
				A.CLASSSTRUCTURE_ID IN (''1070'', ''1071'',''1072'',''1073'') 
				AND ("Phase A Inst. XFR Asset Number (UID)" LIKE {key} OR {key} IS NULL)) 
            )')
GO

INSERT INTO extDBTables (TableName,ExternalDB,Query) VALUES
           ('INSTXFR_B','Maximo','
            (
           SELECT 
	            A.UNID AS "Phase B Inst. XFR Asset Number (UID)",
			    A.UNIT_CD AS "INST. XFR B Unit",
			    A.Function_CD AS "INST. XFR B Function",
			    A.Location_Name AS "INST. XFR B Location Name",
				A.LOCATION_SUB_CLASS_NAME AS "INST. XFR B Class",
			    B.Description AS "INST. XFR B Desc",
				B.OperatingKVTrans AS "INST. XFR B KV",
			    B.StationLine AS "INST. XFR B Station/Line",
				B.PhasePosition AS "INST. XFR B Phase",
			    C.Asset_Desc AS "INST. XFR B Asset Desc",
			    C.TVA_Model_No AS "INST. XFR B Model No",
				C.Serial_No AS "INST. XFR B Serial No.",
			    D.Company_Name AS "INST. XFR B Manufacturer"
		    FROM 
			    EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
			    EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key LEFT JOIN
			    EAMDM.EAM_OD_ASSET_MV C ON A.Location_Key = C.Location_Key LEFT JOIN 
			    EAMDM.EAM_OD_COMPANY_MV D ON C.MANUFACTURER_CD = D.COMPANY_CD 
			WHERE
				A.CLASSSTRUCTURE_ID IN (''1070'', ''1071'',''1072'',''1073'')
				AND ("Phase B Inst. XFR Asset Number (UID)" LIKE {key} OR {key} IS NULL))
            )')
GO

INSERT INTO extDBTables (TableName,ExternalDB,Query) VALUES
           ('INSTXFR_C','Maximo','
            (
           SELECT 
	            A.UNID AS "Phase C Inst. XFR Asset Number (UID)",
			    A.UNIT_CD AS "INST. XFR C Unit",
			    A.Function_CD AS "INST. XFR C Function",
			    A.Location_Name AS "INST. XFR C Location Name",
				A.LOCATION_SUB_CLASS_NAME AS "INST. XFR C Class",
			    B.Description AS "INST. XFR C Desc",
				B.OperatingKVTrans AS "INST. XFR C KV",
			    B.StationLine AS "INST. XFR C Station/Line",
				B.PhasePosition AS "INST. XFR C Phase",
			    C.Asset_Desc AS "INST. XFR C Asset Desc",
			    C.TVA_Model_No AS "INST. XFR C  Model No",
				C.Serial_No AS "INST. XFR B Serial No.",
			    D.Company_Name AS "INST. XFR C Manufacturer"
		    FROM 
			    EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
			    EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key LEFT JOIN
			    EAMDM.EAM_OD_ASSET_MV C ON A.Location_Key = C.Location_Key LEFT JOIN 
			    EAMDM.EAM_OD_COMPANY_MV D ON C.MANUFACTURER_CD = D.COMPANY_CD 
			WHERE
				A.CLASSSTRUCTURE_ID IN (''1070'', ''1071'',''1072'',''1073'')
				AND ("Phase C Inst. XFR Asset Number (UID)" LIKE {key} OR {key} IS NULL))
            )')
GO

/* Maximo Fields for Instrument Transformers */
INSERT INTO AdditionalField (ParentTable, ExternalDBTableID, IsKey, FieldName) VALUES
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 1, 'Phase A Inst. XFR Asset Number (UID)'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 1, 'Phase B Inst. XFR Asset Number (UID)'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 1, 'Phase C Inst. XFR Asset Number (UID)'),

('Line', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 1, 'Phase A Inst. XFR Asset Number (UID)'),
('Line', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 1, 'Phase B Inst. XFR Asset Number (UID)'),
('Line', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 1, 'Phase C Inst. XFR Asset Number (UID)'),

('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 1, 'Phase A Inst. XFR Asset Number (UID)'),
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 1, 'Phase B Inst. XFR Asset Number (UID)'),
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 1, 'Phase C Inst. XFR Asset Number (UID)'),

('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 1, 'Phase A Inst. XFR Asset Number (UID)'),
('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 1, 'Phase B Inst. XFR Asset Number (UID)'),
('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 1, 'Phase C Inst. XFR Asset Number (UID)'),

('Bus', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 1, 'Phase A Inst. XFR Asset Number (UID)'),
('Bus', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 1, 'Phase B Inst. XFR Asset Number (UID)'),
('Bus', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 1, 'Phase C Inst. XFR Asset Number (UID)')
GO

INSERT INTO AdditionalField (ParentTable, ExternalDBTableID, FieldName) VALUES 
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Function'),
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Location Name'),
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Model No'),
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Unit'),
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Asset Desc'),
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Station/Line'),
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Manufacturer'),
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Class'),
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Desc'),
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A KV'),
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Phase'),
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Serial No.'),

('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Function'),
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Location Name'),
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Model No'),
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Unit'),
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Asset Desc'),
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Station/Line'),
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Manufacturer'),
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Class'),
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Desc'),
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B KV'),
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Phase'),
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Serial No.'),

('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Function'),
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Location Name'),
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Model No'),
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Unit'),
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Asset Desc'),
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Station/Line'),
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Manufacturer'),
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Class'),
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Desc'),
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C KV'),
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Phase'),
('Breaker', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Serial No.')
GO

INSERT INTO AdditionalField (ParentTable, ExternalDBTableID, FieldName) VALUES 
('Line', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Function'),
('Line', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Location Name'),
('Line', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Model No'),
('Line', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Unit'),
('Line', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Asset Desc'),
('Line', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Station/Line'),
('Line', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Manufacturer'),
('Line', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Class'),
('Line', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Desc'),
('Line', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A KV'),
('Line', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Phase'),
('Line', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Serial No.'),

('Line', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Function'),
('Line', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Location Name'),
('Line', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Model No'),
('Line', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Unit'),
('Line', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Asset Desc'),
('Line', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Station/Line'),
('Line', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Manufacturer'),
('Line', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Class'),
('Line', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Desc'),
('Line', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B KV'),
('Line', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Phase'),
('Line', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Serial No.'),

('Line', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Function'),
('Line', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Location Name'),
('Line', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Model No'),
('Line', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Unit'),
('Line', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Asset Desc'),
('Line', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Station/Line'),
('Line', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Manufacturer'),
('Line', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Class'),
('Line', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Desc'),
('Line', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C KV'),
('Line', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Phase'),
('Line', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Serial No.')
GO

INSERT INTO AdditionalField (ParentTable, ExternalDBTableID, FieldName) VALUES 
('Bus', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Function'),
('Bus', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Location Name'),
('Bus', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Model No'),
('Bus', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Unit'),
('Bus', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Asset Desc'),
('Bus', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Station/Line'),
('Bus', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Manufacturer'),
('Bus', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Class'),
('Bus', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Desc'),
('Bus', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A KV'),
('Bus', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Phase'),
('Bus', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Serial No.'),

('Bus', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Function'),
('Bus', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Location Name'),
('Bus', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Model No'),
('Bus', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Unit'),
('Bus', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Asset Desc'),
('Bus', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Station/Line'),
('Bus', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Manufacturer'),
('Bus', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Class'),
('Bus', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Desc'),
('Bus', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B KV'),
('Bus', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Phase'),
('Bus', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Serial No.'),

('Bus', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Function'),
('Bus', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Location Name'),
('Bus', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Model No'),
('Bus', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Unit'),
('Bus', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Asset Desc'),
('Bus', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Station/Line'),
('Bus', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Manufacturer'),
('Bus', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Class'),
('Bus', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Desc'),
('Bus', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C KV'),
('Bus', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Phase'),
('Bus', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Serial No.')
GO

INSERT INTO AdditionalField (ParentTable, ExternalDBTableID, FieldName) VALUES 
('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Function'),
('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Location Name'),
('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Model No'),
('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Unit'),
('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Asset Desc'),
('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Station/Line'),
('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Manufacturer'),
('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Class'),
('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Desc'),
('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A KV'),
('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Phase'),
('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Serial No.'),

('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Function'),
('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Location Name'),
('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Model No'),
('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Unit'),
('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Asset Desc'),
('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Station/Line'),
('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Manufacturer'),
('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Class'),
('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Desc'),
('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B KV'),
('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Phase'),
('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Serial No.'),

('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Function'),
('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Location Name'),
('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Model No'),
('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Unit'),
('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Asset Desc'),
('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Station/Line'),
('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Manufacturer'),
('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Class'),
('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Desc'),
('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C KV'),
('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Phase'),
('CapBank', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Serial No.')
GO

INSERT INTO AdditionalField (ParentTable, ExternalDBTableID, FieldName) VALUES 
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Function'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Location Name'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Model No'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Unit'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Asset Desc'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Station/Line'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Manufacturer'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Class'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Desc'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A KV'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Phase'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_A'), 'INST. XFR A Serial No.'),

('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Function'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Location Name'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Model No'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Unit'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Asset Desc'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Station/Line'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Manufacturer'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Class'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Desc'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B KV'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Phase'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_B'), 'INST. XFR B Serial No.'),

('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Function'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Location Name'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Model No'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Unit'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Asset Desc'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Station/Line'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Manufacturer'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Class'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Desc'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C KV'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Phase'),
('Transformer', (SELECT ID FROM extDBTables WHERE TableName = 'INSTXFR_C'), 'INST. XFR C Serial No.')
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
	('TimeZones','Time Zones'),
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
		Event.ID AS [Event ID],
        FORMAT(Event.StartTime,'dddd MM/dd/yyyy <br> HH:mm:ss.fff') AS Time,
        Event.StartTime AS [Sort.Time],
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
