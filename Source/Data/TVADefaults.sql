INSERT INTO AdditionalField (OpenXDAParentTable, FieldName) VALUES ('Meter', 'Maximo Asset Number (UID)')
GO

INSERT INTO AdditionalField (OpenXDAParentTable, FieldName) VALUES ('Location', 'Maximo Asset Number (UID)')
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

