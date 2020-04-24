INSERT INTO AdditionalField (OpenXDAParentTable, FieldName) VALUES ('Meter', 'Maximo Asset Number')
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


INSERT INTO AdditionalField (OpenXDAParentTable, FieldName) VALUES ('Meter', 'Template Version')
GO


INSERT INTO AdditionalField (OpenXDAParentTable, FieldName) VALUES ('Meter', 'Download Host')
GO


INSERT INTO AdditionalField (OpenXDAParentTable, FieldName) VALUES ('Meter', 'Unit ID')
GO

INSERT INTO AdditionalField (OpenXDAParentTable, FieldName) VALUES ('Meter', 'Aux CT')
GO

INSERT INTO AdditionalField (OpenXDAParentTable, FieldName) VALUES ('Meter', 'Total Effective CT Ratio')
GO

INSERT INTO AdditionalField (OpenXDAParentTable, FieldName) VALUES ('Meter', 'Status (Active, In-Progress, Retired, etc)')
GO

INSERT INTO AdditionalField (OpenXDAParentTable, FieldName) VALUES ('Meter', 'MSCO (link to ECM)')
GO

INSERT INTO AdditionalField (OpenXDAParentTable, FieldName) VALUES ('Meter', 'MSS (link to ECM)')
GO

INSERT INTO AdditionalField (OpenXDAParentTable, FieldName) VALUES ('Meter', 'RSS (link to ECM)')
GO

INSERT INTO AdditionalField (OpenXDAParentTable, FieldName) VALUES ('Meter', 'Drawings (DSL, Elementary, Wiring, etc) (link to ECM)')
GO

INSERT INTO AdditionalField (OpenXDAParentTable, FieldName) VALUES ('Meter', 'Pictures')
GO


INSERT INTO AdditionalField (OpenXDAParentTable, FieldName,IsSecure) VALUES ('Meter', 'GPS Location (link to eGIS and Google Maps)', 1)
GO

INSERT INTO AdditionalField (OpenXDAParentTable, FieldName,IsSecure) VALUES ('Meter', 'Physical 911 Address (link to eGIS and Google Maps)', 1)
GO

INSERT INTO AdditionalField (OpenXDAParentTable, FieldName,IsSecure) VALUES ('Meter', 'Login User Name', 1)
GO

INSERT INTO AdditionalField (OpenXDAParentTable, FieldName,IsSecure) VALUES ('Meter', 'Login Password', 1)
GO

INSERT INTO AdditionalField (OpenXDAParentTable, FieldName,IsSecure) VALUES ('Meter', 'Download Connection IP & Port', 1)
GO

INSERT INTO AdditionalField (OpenXDAParentTable, FieldName,IsSecure) VALUES ('Meter', 'Webpage IP & Port', 1)
GO

INSERT INTO AdditionalField (OpenXDAParentTable, FieldName,IsSecure) VALUES ('Meter', 'Internal IP (links to IPAM)', 1)
GO

INSERT INTO AdditionalField (OpenXDAParentTable, FieldName,IsSecure) VALUES ('Meter', 'Gateway IP', 1)
GO

INSERT INTO AdditionalField (OpenXDAParentTable, FieldName,IsSecure) VALUES ('Meter', 'Subnet Mask IP', 1)
GO

INSERT INTO AdditionalField (OpenXDAParentTable, FieldName,IsSecure) VALUES ('Meter', 'NTP Host IP', 1)
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

