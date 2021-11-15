INSERT INTO AdditionalField (ParentTable, FieldName) VALUES ('Meter', 'Maximo Asset Number (UID)')
GO

INSERT INTO AdditionalField (ParentTable, FieldName) VALUES ('Location', 'Maximo Asset Number (UID)')
GO

INSERT INTO AdditionalField (ParentTable, FieldName) VALUES 
('Breaker', 'Maximo Breaker Asset Number (UID)'),
('Breaker', 'Maximo TripCoil Asset Number (UID)')
GO


INSERT INTO AdditionalField (ParentTable, FieldName) VALUES ('Line', 'Maximo Asset Number (UID)')
GO


INSERT INTO AdditionalField (ParentTable, FieldName) VALUES ('CapBank', 'Maximo Asset Number (UID)')
GO

INSERT INTO AdditionalField (ParentTable, FieldName) VALUES
('Transformer', 'FAWG High Side Bus'),
('Transformer', 'FAWG Low Side Bus'),
('Transformer', 'Maximo Phase A Asset Number (UID)'),
('Transformer', 'Maximo Phase B Asset Number (UID)'),
('Transformer', 'Maximo Phase C Asset Number (UID)'),
('Transformer', 'Phase A LTC Asset Number (UID)'),
('Transformer', 'Phase B LTC Asset Number (UID)'),
('Transformer', 'Phase C LTC Asset Number (UID)')
GO

INSERT INTO AdditionalField (ParentTable, FieldName) VALUES
('Transformer', 'Phase A Inst. XFR Asset Number (UID)'),
('Transformer', 'Phase B Inst. XFR Asset Number (UID)'),
('Transformer', 'Phase C Inst. XFR Asset Number (UID)'),
('Line', 'Phase A Inst. XFR Asset Number (UID)'),
('Line', 'Phase B Inst. XFR Asset Number (UID)'),
('Line', 'Phase C Inst. XFR Asset Number (UID)'),
('Breaker', 'Phase A Inst. XFR Asset Number (UID)'),
('Breaker', 'Phase B Inst. XFR Asset Number (UID)'),
('Breaker', 'Phase C Inst. XFR Asset Number (UID)'),
('CapBank', 'Phase A Inst. XFR Asset Number (UID)'),
('CapBank', 'Phase B Inst. XFR Asset Number (UID)'),
('CapBank', 'Phase C Inst. XFR Asset Number (UID)'),
('Bus', 'Phase A Inst. XFR Asset Number (UID)'),
('Bus', 'Phase B Inst. XFR Asset Number (UID)'),
('Bus', 'Phase C Inst. XFR Asset Number (UID)')
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

/* Fields From Maximo for Meter */
INSERT INTO AdditionalField (ParentTable, FieldName, ExternalDB, ExternalDBTable, ExternalDBTableKey) VALUES 
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
INSERT INTO ExternalOpenXDAField (ParentTable, FieldName, ExternalDB, ExternalDBTable, ExternalDBTableKey) VALUES
('Meter','Description','Maximo','Meter','DESCRIPTION')
GO

/* Fields From Maximo for Substations */
INSERT INTO AdditionalField (ParentTable, FieldName, ExternalDB, ExternalDBTable, ExternalDBTableKey) VALUES 
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
INSERT INTO ExternalOpenXDAField (ParentTable, FieldName, ExternalDB, ExternalDBTable, ExternalDBTableKey) VALUES
('Location','Description','Maximo','Location','DESCRIPTION')
GO

/* Fields From Maximo for Breakers */
INSERT INTO AdditionalField (ParentTable, FieldName, ExternalDB, ExternalDBTable, ExternalDBTableKey) VALUES 
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

INSERT INTO ExternalOpenXDAField (ParentTable, FieldName, ExternalDB, ExternalDBTable, ExternalDBTableKey) VALUES
('Breaker','Description','Maximo','Breaker','DESCRIPTION'),
('Breaker','VoltageKV','Maximo','Breaker','OperatingKV')
GO

/* Fields From Maximo for CapBank */
INSERT INTO AdditionalField (ParentTable, FieldName, ExternalDB, ExternalDBTable, ExternalDBTableKey) VALUES 
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

INSERT INTO ExternalOpenXDAField (ParentTable, FieldName, ExternalDB, ExternalDBTable, ExternalDBTableKey) VALUES
('CapBank','Description','Maximo','CapBank','DESCRIPTION'),
('CapBank','VoltageKV','Maximo','CapBank','OperatingKV'),
('CapBank','CapacitancePerBank','Maximo','CapBank','CapKVAR'),
('CapBank','NumberOfBanks','Maximo','CapBank','CapCount')
GO

/* Fields From Maximo for Lines */
INSERT INTO AdditionalField (ParentTable, FieldName, ExternalDB, ExternalDBTable, ExternalDBTableKey) VALUES 
('Line', 'Function','Maximo','Line','Function'),
('Line', 'Unit','Maximo','Line','Unit'),
('Line', 'Address','Maximo','Line','Address'),
('Line', 'TVA Area','Maximo','Line','TVA_Area'),
('Line', 'Drawing No','Maximo','Line','DrawingNo'),
('Line', 'Station/Line','Maximo','Line','StationLine'),
('Line', 'Phasing Drawing','Maximo','Line','PhasingDWG'),
('Line', 'Structure List Drawing','Maximo','Line','StructureListDWG')
GO
INSERT INTO ExternalOpenXDAField (ParentTable, FieldName, ExternalDB, ExternalDBTable, ExternalDBTableKey) VALUES
('Line','Description','Maximo','Line','DESCRIPTION'),
('Line','VoltageKV','Maximo','Line','OperatingKV')
GO

/* Fields from Maximo for Transformer */
INSERT INTO AdditionalField (ParentTable, FieldName, ExternalDB, ExternalDBTable, ExternalDBTableKey) VALUES 
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
INSERT INTO AdditionalField (ParentTable, FieldName, ExternalDB, ExternalDBTable, ExternalDBTableKey) VALUES 
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

/* Fields From Maximo for Instrument Transformers */
INSERT INTO AdditionalField (ParentTable, FieldName, ExternalDB, ExternalDBTable, ExternalDBTableKey) VALUES 
('Breaker', 'INST. XFR A Function','Maximo','INSTXFR_A','Function'),
('Breaker', 'INST. XFR A Location Name','Maximo','INSTXFR_A','Location_Name'),
('Breaker', 'INST. XFR A  Model No','Maximo','INSTXFR_A','TVA_MODEL_NO'),
('Breaker', 'INST. XFR A Unit','Maximo','INSTXFR_A','Unit'),
('Breaker', 'INST. XFR A Asset Desc','Maximo','INSTXFR_A','Asset_Desc'),
('Breaker', 'INST. XFR A Station/Line','Maximo','INSTXFR_A','STATIONLINE'),
('Breaker', 'INST. XFR A Manufacturer','Maximo','INSTXFR_A','MANUFACTURER'),
('Breaker', 'INST. XFR A Class','Maximo','INSTXFR_A','LocationSubClass'),
('Breaker', 'INST. XFR A Desc','Maximo','INSTXFR_A','Description'),
('Breaker', 'INST. XFR A KV','Maximo','INSTXFR_A','OperatingKV'),
('Breaker', 'INST. XFR A Phase','Maximo','INSTXFR_A','Phase'),
('Breaker', 'INST. XFR A Serial No.','Maximo','INSTXFR_A','Serial_No'),

('Breaker', 'INST. XFR B Function','Maximo','INSTXFR_B','Function'),
('Breaker', 'INST. XFR B Location Name','Maximo','INSTXFR_B','Location_Name'),
('Breaker', 'INST. XFR B  Model No','Maximo','INSTXFR_B','TVA_MODEL_NO'),
('Breaker', 'INST. XFR B Unit','Maximo','INSTXFR_B','Unit'),
('Breaker', 'INST. XFR B Asset Desc','Maximo','INSTXFR_B','Asset_Desc'),
('Breaker', 'INST. XFR B Station/Line','Maximo','INSTXFR_B','STATIONLINE'),
('Breaker', 'INST. XFR B Manufacturer','Maximo','INSTXFR_B','MANUFACTURER'),
('Breaker', 'INST. XFR B Class','Maximo','INSTXFR_B','LocationSubClass'),
('Breaker', 'INST. XFR B Desc','Maximo','INSTXFR_B','Description'),
('Breaker', 'INST. XFR B KV','Maximo','INSTXFR_B','OperatingKV'),
('Breaker', 'INST. XFR B Phase','Maximo','INSTXFR_B','Phase'),
('Breaker', 'INST. XFR B Serial No.','Maximo','INSTXFR_B','Serial_No'),

('Breaker', 'INST. XFR C Function','Maximo','INSTXFR_C','Function'),
('Breaker', 'INST. XFR C Location Name','Maximo','INSTXFR_C','Location_Name'),
('Breaker', 'INST. XFR C  Model No','Maximo','INSTXFR_C','TVA_MODEL_NO'),
('Breaker', 'INST. XFR C Unit','Maximo','INSTXFR_C','Unit'),
('Breaker', 'INST. XFR C Asset Desc','Maximo','INSTXFR_C','Asset_Desc'),
('Breaker', 'INST. XFR C Station/Line','Maximo','INSTXFR_C','STATIONLINE'),
('Breaker', 'INST. XFR C Manufacturer','Maximo','INSTXFR_C','MANUFACTURER'),
('Breaker', 'INST. XFR C Class','Maximo','INSTXFR_C','LocationSubClass'),
('Breaker', 'INST. XFR C Desc','Maximo','INSTXFR_C','Description'),
('Breaker', 'INST. XFR C KV','Maximo','INSTXFR_C','OperatingKV'),
('Breaker', 'INST. XFR C Phase','Maximo','INSTXFR_C','Phase'),
('Breaker', 'INST. XFR C Serial No.','Maximo','INSTXFR_C','Serial_No')
GO

INSERT INTO AdditionalField (ParentTable, FieldName, ExternalDB, ExternalDBTable, ExternalDBTableKey) VALUES 
('Line', 'INST. XFR A Function','Maximo','INSTXFR_A','Function'),
('Line', 'INST. XFR A Location Name','Maximo','INSTXFR_A','Location_Name'),
('Line', 'INST. XFR A  Model No','Maximo','INSTXFR_A','TVA_MODEL_NO'),
('Line', 'INST. XFR A Unit','Maximo','INSTXFR_A','Unit'),
('Line', 'INST. XFR A Asset Desc','Maximo','INSTXFR_A','Asset_Desc'),
('Line', 'INST. XFR A Station/Line','Maximo','INSTXFR_A','STATIONLINE'),
('Line', 'INST. XFR A Manufacturer','Maximo','INSTXFR_A','MANUFACTURER'),
('Line', 'INST. XFR A Class','Maximo','INSTXFR_A','LocationSubClass'),
('Line', 'INST. XFR A Desc','Maximo','INSTXFR_A','Description'),
('Line', 'INST. XFR A KV','Maximo','INSTXFR_A','OperatingKV'),
('Line', 'INST. XFR A Phase','Maximo','INSTXFR_A','Phase'),
('Line', 'INST. XFR A Serial No.','Maximo','INSTXFR_A','Serial_No'),

('Line', 'INST. XFR B Function','Maximo','INSTXFR_B','Function'),
('Line', 'INST. XFR B Location Name','Maximo','INSTXFR_B','Location_Name'),
('Line', 'INST. XFR B  Model No','Maximo','INSTXFR_B','TVA_MODEL_NO'),
('Line', 'INST. XFR B Unit','Maximo','INSTXFR_B','Unit'),
('Line', 'INST. XFR B Asset Desc','Maximo','INSTXFR_B','Asset_Desc'),
('Line', 'INST. XFR B Station/Line','Maximo','INSTXFR_B','STATIONLINE'),
('Line', 'INST. XFR B Manufacturer','Maximo','INSTXFR_B','MANUFACTURER'),
('Line', 'INST. XFR B Class','Maximo','INSTXFR_B','LocationSubClass'),
('Line', 'INST. XFR B Desc','Maximo','INSTXFR_B','Description'),
('Line', 'INST. XFR B KV','Maximo','INSTXFR_B','OperatingKV'),
('Line', 'INST. XFR B Phase','Maximo','INSTXFR_B','Phase'),
('Line', 'INST. XFR B Serial No.','Maximo','INSTXFR_B','Serial_No'),

('Line', 'INST. XFR C Function','Maximo','INSTXFR_C','Function'),
('Line', 'INST. XFR C Location Name','Maximo','INSTXFR_C','Location_Name'),
('Line', 'INST. XFR C  Model No','Maximo','INSTXFR_C','TVA_MODEL_NO'),
('Line', 'INST. XFR C Unit','Maximo','INSTXFR_C','Unit'),
('Line', 'INST. XFR C Asset Desc','Maximo','INSTXFR_C','Asset_Desc'),
('Line', 'INST. XFR C Station/Line','Maximo','INSTXFR_C','STATIONLINE'),
('Line', 'INST. XFR C Manufacturer','Maximo','INSTXFR_C','MANUFACTURER'),
('Line', 'INST. XFR C Class','Maximo','INSTXFR_C','LocationSubClass'),
('Line', 'INST. XFR C Desc','Maximo','INSTXFR_C','Description'),
('Line', 'INST. XFR C KV','Maximo','INSTXFR_C','OperatingKV'),
('Line', 'INST. XFR C Phase','Maximo','INSTXFR_C','Phase'),
('Line', 'INST. XFR C Serial No.','Maximo','INSTXFR_C','Serial_No')
GO

INSERT INTO AdditionalField (ParentTable, FieldName, ExternalDB, ExternalDBTable, ExternalDBTableKey) VALUES 
('Bus', 'INST. XFR A Function','Maximo','INSTXFR_A','Function'),
('Bus', 'INST. XFR A Location Name','Maximo','INSTXFR_A','Location_Name'),
('Bus', 'INST. XFR A  Model No','Maximo','INSTXFR_A','TVA_MODEL_NO'),
('Bus', 'INST. XFR A Unit','Maximo','INSTXFR_A','Unit'),
('Bus', 'INST. XFR A Asset Desc','Maximo','INSTXFR_A','Asset_Desc'),
('Bus', 'INST. XFR A Station/Line','Maximo','INSTXFR_A','STATIONLINE'),
('Bus', 'INST. XFR A Manufacturer','Maximo','INSTXFR_A','MANUFACTURER'),
('Bus', 'INST. XFR A Class','Maximo','INSTXFR_A','LocationSubClass'),
('Bus', 'INST. XFR A Desc','Maximo','INSTXFR_A','Description'),
('Bus', 'INST. XFR A KV','Maximo','INSTXFR_A','OperatingKV'),
('Bus', 'INST. XFR A Phase','Maximo','INSTXFR_A','Phase'),
('Bus', 'INST. XFR A Serial No.','Maximo','INSTXFR_A','Serial_No'),

('Bus', 'INST. XFR B Function','Maximo','INSTXFR_B','Function'),
('Bus', 'INST. XFR B Location Name','Maximo','INSTXFR_B','Location_Name'),
('Bus', 'INST. XFR B  Model No','Maximo','INSTXFR_B','TVA_MODEL_NO'),
('Bus', 'INST. XFR B Unit','Maximo','INSTXFR_B','Unit'),
('Bus', 'INST. XFR B Asset Desc','Maximo','INSTXFR_B','Asset_Desc'),
('Bus', 'INST. XFR B Station/Line','Maximo','INSTXFR_B','STATIONLINE'),
('Bus', 'INST. XFR B Manufacturer','Maximo','INSTXFR_B','MANUFACTURER'),
('Bus', 'INST. XFR B Class','Maximo','INSTXFR_B','LocationSubClass'),
('Bus', 'INST. XFR B Desc','Maximo','INSTXFR_B','Description'),
('Bus', 'INST. XFR B KV','Maximo','INSTXFR_B','OperatingKV'),
('Bus', 'INST. XFR B Phase','Maximo','INSTXFR_B','Phase'),
('Bus', 'INST. XFR B Serial No.','Maximo','INSTXFR_B','Serial_No'),

('Bus', 'INST. XFR C Function','Maximo','INSTXFR_C','Function'),
('Bus', 'INST. XFR C Location Name','Maximo','INSTXFR_C','Location_Name'),
('Bus', 'INST. XFR C  Model No','Maximo','INSTXFR_C','TVA_MODEL_NO'),
('Bus', 'INST. XFR C Unit','Maximo','INSTXFR_C','Unit'),
('Bus', 'INST. XFR C Asset Desc','Maximo','INSTXFR_C','Asset_Desc'),
('Bus', 'INST. XFR C Station/Line','Maximo','INSTXFR_C','STATIONLINE'),
('Bus', 'INST. XFR C Manufacturer','Maximo','INSTXFR_C','MANUFACTURER'),
('Bus', 'INST. XFR C Class','Maximo','INSTXFR_C','LocationSubClass'),
('Bus', 'INST. XFR C Desc','Maximo','INSTXFR_C','Description'),
('Bus', 'INST. XFR C KV','Maximo','INSTXFR_C','OperatingKV'),
('Bus', 'INST. XFR C Phase','Maximo','INSTXFR_C','Phase'),
('Bus', 'INST. XFR C Serial No.','Maximo','INSTXFR_C','Serial_No')
GO

INSERT INTO AdditionalField (ParentTable, FieldName, ExternalDB, ExternalDBTable, ExternalDBTableKey) VALUES 
('CapBank', 'INST. XFR A Function','Maximo','INSTXFR_A','Function'),
('CapBank', 'INST. XFR A Location Name','Maximo','INSTXFR_A','Location_Name'),
('CapBank', 'INST. XFR A  Model No','Maximo','INSTXFR_A','TVA_MODEL_NO'),
('CapBank', 'INST. XFR A Unit','Maximo','INSTXFR_A','Unit'),
('CapBank', 'INST. XFR A Asset Desc','Maximo','INSTXFR_A','Asset_Desc'),
('CapBank', 'INST. XFR A Station/Line','Maximo','INSTXFR_A','STATIONLINE'),
('CapBank', 'INST. XFR A Manufacturer','Maximo','INSTXFR_A','MANUFACTURER'),
('CapBank', 'INST. XFR A Class','Maximo','INSTXFR_A','LocationSubClass'),
('CapBank', 'INST. XFR A Desc','Maximo','INSTXFR_A','Description'),
('CapBank', 'INST. XFR A KV','Maximo','INSTXFR_A','OperatingKV'),
('CapBank', 'INST. XFR A Phase','Maximo','INSTXFR_A','Phase'),
('CapBank', 'INST. XFR A Serial No.','Maximo','INSTXFR_A','Serial_No'),

('CapBank', 'INST. XFR B Function','Maximo','INSTXFR_B','Function'),
('CapBank', 'INST. XFR B Location Name','Maximo','INSTXFR_B','Location_Name'),
('CapBank', 'INST. XFR B  Model No','Maximo','INSTXFR_B','TVA_MODEL_NO'),
('CapBank', 'INST. XFR B Unit','Maximo','INSTXFR_B','Unit'),
('CapBank', 'INST. XFR B Asset Desc','Maximo','INSTXFR_B','Asset_Desc'),
('CapBank', 'INST. XFR B Station/Line','Maximo','INSTXFR_B','STATIONLINE'),
('CapBank', 'INST. XFR B Manufacturer','Maximo','INSTXFR_B','MANUFACTURER'),
('CapBank', 'INST. XFR B Class','Maximo','INSTXFR_B','LocationSubClass'),
('CapBank', 'INST. XFR B Desc','Maximo','INSTXFR_B','Description'),
('CapBank', 'INST. XFR B KV','Maximo','INSTXFR_B','OperatingKV'),
('CapBank', 'INST. XFR B Phase','Maximo','INSTXFR_B','Phase'),
('CapBank', 'INST. XFR B Serial No.','Maximo','INSTXFR_B','Serial_No'),

('CapBank', 'INST. XFR C Function','Maximo','INSTXFR_C','Function'),
('CapBank', 'INST. XFR C Location Name','Maximo','INSTXFR_C','Location_Name'),
('CapBank', 'INST. XFR C  Model No','Maximo','INSTXFR_C','TVA_MODEL_NO'),
('CapBank', 'INST. XFR C Unit','Maximo','INSTXFR_C','Unit'),
('CapBank', 'INST. XFR C Asset Desc','Maximo','INSTXFR_C','Asset_Desc'),
('CapBank', 'INST. XFR C Station/Line','Maximo','INSTXFR_C','STATIONLINE'),
('CapBank', 'INST. XFR C Manufacturer','Maximo','INSTXFR_C','MANUFACTURER'),
('CapBank', 'INST. XFR C Class','Maximo','INSTXFR_C','LocationSubClass'),
('CapBank', 'INST. XFR C Desc','Maximo','INSTXFR_C','Description'),
('CapBank', 'INST. XFR C KV','Maximo','INSTXFR_C','OperatingKV'),
('CapBank', 'INST. XFR C Phase','Maximo','INSTXFR_C','Phase'),
('CapBank', 'INST. XFR C Serial No.','Maximo','INSTXFR_C','Serial_No')
GO


INSERT INTO AdditionalField (ParentTable, FieldName, ExternalDB, ExternalDBTable, ExternalDBTableKey) VALUES 
('Transformer', 'INST. XFR A Function','Maximo','INSTXFR_A','Function'),
('Transformer', 'INST. XFR A Location Name','Maximo','INSTXFR_A','Location_Name'),
('Transformer', 'INST. XFR A  Model No','Maximo','INSTXFR_A','TVA_MODEL_NO'),
('Transformer', 'INST. XFR A Unit','Maximo','INSTXFR_A','Unit'),
('Transformer', 'INST. XFR A Asset Desc','Maximo','INSTXFR_A','Asset_Desc'),
('Transformer', 'INST. XFR A Station/Line','Maximo','INSTXFR_A','STATIONLINE'),
('Transformer', 'INST. XFR A Manufacturer','Maximo','INSTXFR_A','MANUFACTURER'),
('Transformer', 'INST. XFR A Class','Maximo','INSTXFR_A','LocationSubClass'),
('Transformer', 'INST. XFR A Desc','Maximo','INSTXFR_A','Description'),
('Transformer', 'INST. XFR A KV','Maximo','INSTXFR_A','OperatingKV'),
('Transformer', 'INST. XFR A Phase','Maximo','INSTXFR_A','Phase'),
('Transformer', 'INST. XFR A Serial No.','Maximo','INSTXFR_A','Serial_No'),

('Transformer', 'INST. XFR B Function','Maximo','INSTXFR_B','Function'),
('Transformer', 'INST. XFR B Location Name','Maximo','INSTXFR_B','Location_Name'),
('Transformer', 'INST. XFR B  Model No','Maximo','INSTXFR_B','TVA_MODEL_NO'),
('Transformer', 'INST. XFR B Unit','Maximo','INSTXFR_B','Unit'),
('Transformer', 'INST. XFR B Asset Desc','Maximo','INSTXFR_B','Asset_Desc'),
('Transformer', 'INST. XFR B Station/Line','Maximo','INSTXFR_B','STATIONLINE'),
('Transformer', 'INST. XFR B Manufacturer','Maximo','INSTXFR_B','MANUFACTURER'),
('Transformer', 'INST. XFR B Class','Maximo','INSTXFR_B','LocationSubClass'),
('Transformer', 'INST. XFR B Desc','Maximo','INSTXFR_B','Description'),
('Transformer', 'INST. XFR B KV','Maximo','INSTXFR_B','OperatingKV'),
('Transformer', 'INST. XFR B Phase','Maximo','INSTXFR_B','Phase'),
('Transformer', 'INST. XFR B Serial No.','Maximo','INSTXFR_B','Serial_No'),

('Transformer', 'INST. XFR C Function','Maximo','INSTXFR_C','Function'),
('Transformer', 'INST. XFR C Location Name','Maximo','INSTXFR_C','Location_Name'),
('Transformer', 'INST. XFR C  Model No','Maximo','INSTXFR_C','TVA_MODEL_NO'),
('Transformer', 'INST. XFR C Unit','Maximo','INSTXFR_C','Unit'),
('Transformer', 'INST. XFR C Asset Desc','Maximo','INSTXFR_C','Asset_Desc'),
('Transformer', 'INST. XFR C Station/Line','Maximo','INSTXFR_C','STATIONLINE'),
('Transformer', 'INST. XFR C Manufacturer','Maximo','INSTXFR_C','MANUFACTURER'),
('Transformer', 'INST. XFR C Class','Maximo','INSTXFR_C','LocationSubClass'),
('Transformer', 'INST. XFR C Desc','Maximo','INSTXFR_C','Description'),
('Transformer', 'INST. XFR C KV','Maximo','INSTXFR_C','OperatingKV'),
('Transformer', 'INST. XFR C Phase','Maximo','INSTXFR_C','Phase'),
('Transformer', 'INST. XFR C Serial No.','Maximo','INSTXFR_C','Serial_No')
GO

INSERT INTO ExternalOpenXDAField (ParentTable, FieldName, ExternalDB, ExternalDBTable, ExternalDBTableKey) VALUES
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
	                (Lines.PosSeqResistance * Buses.VoltageValue * Buses.VoltageValue / 100.0) AS PosSeqResistance,
					(Lines.PosSeqReactance * Buses.VoltageValue * Buses.VoltageValue / 100.0) AS PosSeqReactance,
					(Lines.ZeroSeqResistance * Buses.VoltageValue * Buses.VoltageValue / 100.0) AS ZeroSeqResistance,
					(Lines.ZeroSeqReactance * Buses.VoltageValue * Buses.VoltageValue / 100.0) AS ZeroSeqReactance,	               
	                Lines.ConductorSummerContRating,
	                Lines.ConductorWinterContRating,
                    (SELECT CONCAT(''L'', Lines.TransLineNumber)) AS LNumber
                FROM
                    Lines JOIN
                    Buses ON Lines.fromBuses_Id = Buses.Buses_Id JOIN
                    Branches ON Lines.Branches_Id = Branches.Branches_Id
                WHERE
                    Branches.Description = ''Fawg One'' AND
					Lines.ISD < (SELECT YEAR((SELECT GetDate()))*100 + Month((SELECT GetDate()))) AND
					Lines.OSD > (SELECT YEAR((SELECT GetDate()))*100 + Month((SELECT GetDate())))
            ) T1')
GO

/* FAWG Query for Transformers */
INSERT INTO extDBTables (TableName,ExternalDB,Query) VALUES
           ('Transformer','Fawg','
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
	            D.Company_Name AS Manufacturer
            FROM 
	            EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
	            EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key LEFT JOIN
	            EAMDM.EAM_OD_ASSET_MV C ON A.Location_Key = C.Location_Key LEFT JOIN 
	            EAMDM.EAM_OD_COMPANY_MV D ON C.MANUFACTURER_CD = D.COMPANY_CD 
			WHERE A.CLASSSTRUCTURE_ID IN (''1009'', ''1010'')
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
				B.BankKVAR AS BankVAR,
				B.CapacitorCount AS CapCount,
				B.CapacitorKV AS CapKV,
				B.CapacitorKVAR AS CapKVAR,
	            C.Asset_Desc AS Asset_Desc,
	            C.TVA_Model_No AS TVA_Model_No,
	            C.ASSET_STATUS_CD AS Status,
	            D.Company_Name AS Manufacturer
            FROM 
	            EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
	            EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key LEFT JOIN
	            EAMDM.EAM_OD_ASSET_MV C ON A.Location_Key = C.Location_Key LEFT JOIN 
	            EAMDM.EAM_OD_COMPANY_MV D ON C.MANUFACTURER_CD = D.COMPANY_CD
			WHERE
				A.CLASSSTRUCTURE_ID  = ''1012''
            )')
GO

INSERT INTO extDBTables (TableName,ExternalDB,Query) VALUES
           ('Line','Maximo','
            (
           SELECT 
	            A.UNID AS UNID,
	            A.UNIT_CD AS UNIT,
	            A.Function_CD AS Function,
	            A.ADDRESS_CD AS ADDRESS,
				A.TVA_AREA AS TVA_Area,
				A.TVA_DRAWING_NO AS DrawingNo,
				B.Description AS Description,
				B.OperatingKVTrans AS OperatingKV,
	            B.StationLine AS StationLine,
				B.PhasingDWG AS PhasingDWG,
				B.Remarks AS Remarks,
				B.StructureListDWG AS StructureListDWG
            FROM 
	            EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
	            EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key
			WHERE
				A.CLASSSTRUCTURE_ID  = ''1034''
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
	            D.Company_Name AS Manufacturer
            FROM 
	            EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
	            EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key LEFT JOIN
	            EAMDM.EAM_OD_ASSET_MV C ON A.Location_Key = C.Location_Key LEFT JOIN 
	            EAMDM.EAM_OD_COMPANY_MV D ON C.MANUFACTURER_CD = D.COMPANY_CD 
            WHERE
                A.CLASSSTRUCTURE_ID  = ''1069''
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
	            D.Company_Name AS Manufacturer
            FROM 
	            EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
	            EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key LEFT JOIN
	            EAMDM.EAM_OD_ASSET_MV C ON A.Location_Key = C.Location_Key LEFT JOIN 
	            EAMDM.EAM_OD_COMPANY_MV D ON C.MANUFACTURER_CD = D.COMPANY_CD 
            WHERE
                A.CLASSSTRUCTURE_ID  = ''1069''
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
	            D.Company_Name AS Manufacturer
            FROM 
	            EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
	            EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key LEFT JOIN
	            EAMDM.EAM_OD_ASSET_MV C ON A.Location_Key = C.Location_Key LEFT JOIN 
	            EAMDM.EAM_OD_COMPANY_MV D ON C.MANUFACTURER_CD = D.COMPANY_CD 
            WHERE
                A.CLASSSTRUCTURE_ID  = ''1069''
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
	            C.Serial_No AS Serial_No
            FROM 
	            EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
	            EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key LEFT JOIN
	            EAMDM.EAM_OD_ASSET_MV C ON A.Location_Key = C.Location_Key
            WHERE
               A.CLASSSTRUCTURE_ID  IN (''2304'',''2310'')
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
	            C.Serial_No AS Serial_No
            FROM 
	            EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
	            EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key LEFT JOIN
	            EAMDM.EAM_OD_ASSET_MV C ON A.Location_Key = C.Location_Key
            WHERE
                A.CLASSSTRUCTURE_ID  IN (''2304'',''2310'')
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
	            C.Serial_No AS Serial_No
            FROM 
	            EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
	            EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key LEFT JOIN
	            EAMDM.EAM_OD_ASSET_MV C ON A.Location_Key = C.Location_Key
            WHERE
                A.CLASSSTRUCTURE_ID  IN (''2304'',''2310'')
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
	            C.Asset_Desc AS Asset_Desc
            FROM 
	            EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
	            EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key LEFT JOIN
	            EAMDM.EAM_OD_ASSET_MV C ON A.Location_Key = C.Location_Key 
			WHERE A.CLASSSTRUCTURE_ID = ''1128''
            )')
GO

/* Maximo Table For Instrument Transformers */
INSERT INTO extDBTables (TableName,ExternalDB,Query) VALUES
           ('INSTXFR_A','Maximo','
            (
           SELECT 
	            A.UNID AS UNID,
	            A.UNIT_CD AS UNIT,
	            A.Function_CD AS Function,
	            A.Location_Name AS Location_Name,
				A.LOCATION_SUB_CLASS_NAME AS LocationSubCLass,
	            B.Description AS Description,
				B.OperatingKVTrans AS OperatingKV,
	            B.StationLine AS StationLine,
				B.PhasePosition AS Phase,
	            C.Asset_Desc AS Asset_Desc,
	            C.TVA_Model_No AS TVA_Model_No,
				C.Serial_No AS Serial_No,
	            D.Company_Name AS Manufacturer
            FROM 
	            EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
	            EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key LEFT JOIN
	            EAMDM.EAM_OD_ASSET_MV C ON A.Location_Key = C.Location_Key LEFT JOIN 
	            EAMDM.EAM_OD_COMPANY_MV D ON C.MANUFACTURER_CD = D.COMPANY_CD 
			WHERE A.CLASSSTRUCTURE_ID IN (''1070'', ''1071'',''1072'',''1073'') 
            )')
GO

INSERT INTO extDBTables (TableName,ExternalDB,Query) VALUES
           ('INSTXFR_B','Maximo','
            (
           SELECT 
	            A.UNID AS UNID,
	            A.UNIT_CD AS UNIT,
	            A.Function_CD AS Function,
	            A.Location_Name AS Location_Name,
				A.LOCATION_SUB_CLASS_NAME AS LocationSubCLass,
	            B.Description AS Description,
				B.OperatingKVTrans AS OperatingKV,
	            B.StationLine AS StationLine,
				B.PhasePosition AS Phase,
	            C.Asset_Desc AS Asset_Desc,
	            C.TVA_Model_No AS TVA_Model_No,
				C.Serial_No AS Serial_No,
	            D.Company_Name AS Manufacturer
            FROM 
	            EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
	            EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key LEFT JOIN
	            EAMDM.EAM_OD_ASSET_MV C ON A.Location_Key = C.Location_Key LEFT JOIN 
	            EAMDM.EAM_OD_COMPANY_MV D ON C.MANUFACTURER_CD = D.COMPANY_CD 
			WHERE A.CLASSSTRUCTURE_ID IN (''1070'', ''1071'',''1072'',''1073'')
            )')
GO

INSERT INTO extDBTables (TableName,ExternalDB,Query) VALUES
           ('INSTXFR_C','Maximo','
            (
           SELECT 
	            A.UNID AS UNID,
	            A.UNIT_CD AS UNIT,
	            A.Function_CD AS Function,
	            A.Location_Name AS Location_Name,
				A.LOCATION_SUB_CLASS_NAME AS LocationSubCLass,
	            B.Description AS Description,
				B.OperatingKVTrans AS OperatingKV,
	            B.StationLine AS StationLine,
				B.PhasePosition AS Phase,
	            C.Asset_Desc AS Asset_Desc,
	            C.TVA_Model_No AS TVA_Model_No,
				C.Serial_No AS Serial_No,
	            D.Company_Name AS Manufacturer
            FROM 
	            EAMDM.EAM_OD_LOCATION_MV A LEFT JOIN
	            EAMDM.EAM_OD_LOCATION_SPEC_COL_MV B ON A.Location_Key = B.Location_Key LEFT JOIN
	            EAMDM.EAM_OD_ASSET_MV C ON A.Location_Key = C.Location_Key LEFT JOIN 
	            EAMDM.EAM_OD_COMPANY_MV D ON C.MANUFACTURER_CD = D.COMPANY_CD 
			WHERE A.CLASSSTRUCTURE_ID IN (''1070'', ''1071'',''1072'',''1073'')
            )')
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

/* Fields for Line segments to identify changes compared to FAWG - also needed for possible email Alerts against changes in FAWG */
INSERT INTO AdditionalField (ParentTable, FieldName, ExternalDB, ExternalDBTable, ExternalDBTableKey) VALUES 
('LineSegment', 'FromBus','','',''),
('LineSegment', 'ToBus','','','')
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
