//******************************************************************************************************
//  LineSegmentWizardController.cs - Gbtc
//
//  Copyright © 2023, Grid Protection Alliance.  All Rights Reserved.
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
//  01/30/2023 - C Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

using GSF.Collections;
using GSF.Data;
using GSF.Data.Model;
using GSF.Web.Model;
using Newtonsoft.Json.Linq;
using openXDA.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Web.Http;
using SystemCenter.Controllers;
using SystemCenter.Model;

[RoutePrefix("api/LineSegmentWizard")]
public class LineSegmentWizardController : ApiController
{
    #region [ Members ]
    private bool useFawg => false;

    public class LineConfiguration
    {
        public List<Tap> Taps { get; set; }
        public List<Section> Sections { get; set; }
        public bool UsedFAWG { get; set; }
    }

    public class Tap
    {
        public string Bus { get; set; }
        public int? StationID { get; set; }
        public bool IsExternal { get; set; }
        public bool IsXDA { get; set; }

    }


    public class Section
    {
        public string StartBus { get; set; }
        public string EndBus { get; set; }
        public int? StartStationID { get; set; }
        public int? EndStationID { get; set; }
        public List<Segment> Segments { get; set; }
    }

    public class Segment
    {
        public double R0 { get; set; }
        public double R1 { get; set; }
        public double X0 { get; set; }
        public double X1 { get; set; }
        public double ThermalRating { get; set; }
        public double Length { get; set; }
        public bool IsEnd { get; set; }
        public string FromBus { get; set; }
        public string ToBus { get; set; }
        public int ID { get; set; }
        public string AssetKey { get; set; }
        public string Description { get; set; }
        public string AssetName { get; set; }
    }

    class SegmentComparer : IEqualityComparer<LineSegment>
    {
        public bool Equals(LineSegment x, LineSegment y)
        {

            if (Object.ReferenceEquals(x, y)) return true;

            if (Object.ReferenceEquals(x, null) || Object.ReferenceEquals(y, null))
                return false;

            return x.ID == y.ID;
        }

        public int GetHashCode(LineSegment segment)
        {
            if (Object.ReferenceEquals(segment, null)) return 0;

            return segment.ID.GetHashCode();
        }
    }

    struct TmpTap
    {
        public List<int> SegmentID;
        public string Name;
        public bool IsEnd;
        public List<int> StationID;
    };

    #endregion

    #region [ Statics ]

    private const string GetRoles = "Administrator,Transmission SME";
    private const string PostRoles = "Administrator,Transmission SME";
    private static string Connection = typeof(Line).GetCustomAttribute<SettingsCategoryAttribute>()?.SettingsCategory ?? "systemSettings";

    #endregion


    #region [ HttpFunctions ]

    [HttpPost, Route("Save/{id:int}")]
    public IHttpActionResult PostData(int id, [FromBody] LineConfiguration record)
    {
        if (!base.User.IsInRole(PostRoles))
            return Unauthorized();

        using (AdoDataConnection connection = new AdoDataConnection(Connection))
        {
            Line line = (new TableOperations<Line>(connection)).QueryRecordWhere("ID = {0}", id);
            line.ConnectionFactory = () => new AdoDataConnection(Connection);
            if (line is null)
                throw new InvalidOperationException($"Line with ID {id} does not exist");

            int lineToSegmentConnectionID = new TableOperations<AssetConnectionType>(connection).QueryRecordWhere("Name = {0}", "Line-LineSegment").ID;
            List<Segment> updatedSegments = record.Sections.SelectMany(s => s.Segments).Where(s => s.ID > 0).ToList();
            TableOperations<LineSegment> segmentTbl = new TableOperations<LineSegment>(connection);
            TableOperations<LineSegmentConnections> segmentCxnTbl = new TableOperations<LineSegmentConnections>(connection);
            TableOperations<AssetLocation> assetLocationTbl = new TableOperations<AssetLocation>(connection);

            // Remove any segments that are no longer there, and update existing Segments
            foreach (LineSegment oldSegment in line.Segments)
            {
                Segment updatedSeg = updatedSegments.Find(item => item.ID == oldSegment.ID);
                if (updatedSeg is null)
                    connection.ExecuteNonQuery($"EXEC UniversalCascadeDelete 'Asset', 'ID = {oldSegment.ID}'");
                else
                {
                    oldSegment.R0 = updatedSeg.R0;
                    oldSegment.R1 = updatedSeg.R1;
                    oldSegment.X1 = updatedSeg.X1;
                    oldSegment.X0 = updatedSeg.X0;
                    oldSegment.Length = updatedSeg.Length;
                    oldSegment.AssetKey = updatedSeg.AssetKey;
                    oldSegment.AssetName = updatedSeg.AssetName;
                    oldSegment.FromBus= updatedSeg.FromBus;
                    oldSegment.ToBus= updatedSeg.ToBus;
                    oldSegment.Description= updatedSeg.Description;
                    oldSegment.ThermalRating= updatedSeg.ThermalRating;

                    segmentTbl.UpdateRecord(oldSegment);
                    oldSegment.connectedSegments.ForEach(cxn => segmentCxnTbl.DeleteRecord(cxn));
                    oldSegment.AssetLocations.ForEach(loc => assetLocationTbl.DeleteRecord(loc));
                }
            }

            // Add any new Segments
            List<Segment> newSegments = record.Sections.SelectMany(s => s.Segments).Where(s => s.ID == 0).ToList();
            foreach (Segment newSegment in newSegments)
            {
                LineSegment segment = new LineSegment()
                {
                    R0 = newSegment.R0,
                    R1 = newSegment.R1,
                    X1 = newSegment.X1,
                    X0 = newSegment.X0,
                    Length = newSegment.Length,
                    AssetKey = newSegment.AssetKey,
                    AssetName = newSegment.AssetName,
                    FromBus = newSegment.FromBus,
                    ToBus = newSegment.ToBus,
                    Description = newSegment.Description,
                    ThermalRating = newSegment.ThermalRating,
                    Spare = false,
                };

                segmentTbl.AddNewRecord(segment);
                newSegment.ID = segmentTbl.QueryRecordWhere("AssetKey = {0}", segment.AssetKey).ID;

                new TableOperations<AssetConnection>(connection).AddNewRecord(new AssetConnection()
                {
                    ChildID = newSegment.ID,
                    ParentID = line.ID,
                    AssetRelationshipTypeID = lineToSegmentConnectionID
                });
            }


            // Walk through Sections to set up connections
            foreach (Section section in record.Sections)
            {
                if (section.Segments.Count < 2) continue;
                int i = 1;
                while (i < section.Segments.Count)
                {
                    int previousID = section.Segments[i - 1].ID;
                    if (previousID == 0)
                        previousID = newSegments.Find(s => s.AssetKey == section.Segments[i - 1].AssetKey).ID;

                    int nextID = section.Segments[i].ID;
                    if (nextID == 0)
                        nextID = newSegments.Find(s => s.AssetKey == section.Segments[i].AssetKey).ID;

                    segmentCxnTbl.AddNewRecord(new LineSegmentConnections() { 
                        ChildSegment = previousID,
                        ParentSegment = nextID
                    });
                    i++;
                }
            }

            // Walk through Taps to set up connections and FROMBus ends
            foreach (Tap tap in record.Taps)
            {
                List<LineSegment> segments = record.Sections.Where(s => s.StartBus == tap.Bus)
                    .Select(s => s.Segments.First())
                    .Select(s => segmentTbl.QueryRecordWhere("Assetkey = {0}", s.AssetKey)).ToList();

               
                if (!(tap.StationID is null) && segments.Count > 0)
                {
                    segments.ForEach(s =>
                    {
                        s.IsEnd = true;
                        segmentTbl.UpdateRecord(s);
                        assetLocationTbl.AddNewRecord(new AssetLocation()
                        {
                            AssetID = s.ID,
                            LocationID = tap.StationID ?? -1
                        });
                    });
                }

                segments.AddRange(record.Sections.Where(s => s.EndBus == tap.Bus)
                   .Select(s => s.Segments.Last())
                   .Select(s => segmentTbl.QueryRecordWhere("Assetkey = {0}", s.AssetKey)).ToList());


                for (int j = 0; j < segments.Count; j++)
                    for (int k = 0; k < segments.Count; k++)
                    {
                        if (k >= j) break;
 
                        int previousID = segments[j].ID;
                        if (previousID == 0)
                            previousID = newSegments.Find(s => s.AssetKey == segments[j].AssetKey).ID;

                        int nextID = segments[k].ID;
                        if (nextID == 0)
                            nextID = newSegments.Find(s => s.AssetKey == segments[k].AssetKey).ID;

                        segmentCxnTbl.AddNewRecord(new LineSegmentConnections()
                        {
                            ChildSegment = previousID,
                            ParentSegment = nextID
                        });
                    }
                
            }

            // Walk through Taps to set up ToBus ends
            foreach (Tap tap in record.Taps)
            {
                List<LineSegment> segments = record.Sections.Where(s => s.EndBus == tap.Bus)
                  .Select(s => s.Segments.Last())
                  .Select(s => segmentTbl.QueryRecordWhere("Assetkey = {0}", s.AssetKey)).ToList();

                if ((tap.StationID is null) || segments.Count == 0)
                    continue;
                
                segments.ForEach(s =>
                {
                    s.IsEnd = true;
                    segmentTbl.UpdateRecord(s);
                    assetLocationTbl.AddNewRecord(new AssetLocation()
                    {
                        AssetID = s.ID,
                        LocationID = tap.StationID ?? -1
                    });
                });
            }
        }

        return Ok(1);
    }

    [Route("Update/{id:int}"), HttpGet]
    public IHttpActionResult GetData(int id)
    {
        if (!base.User.IsInRole(GetRoles))
            return Unauthorized();

        using (AdoDataConnection connection = new AdoDataConnection(Connection))
        {
            Line line = (new TableOperations<Line>(connection)).QueryRecordWhere("ID = {0}", id);
            line.ConnectionFactory = () => new AdoDataConnection(Connection);
            if (line is null)
                throw new InvalidOperationException($"Line with ID {id} does not exist");

            LineConfiguration fawgConfig = new LineConfiguration()
            {
                Sections = new List<Section>() { },
                Taps = new List<Tap>(),
                UsedFAWG = false,
            };

            LineConfiguration xdaConfig = GetXDAConfiguration(line);
            line.ConnectionFactory = () => new AdoDataConnection(Connection);
            return Ok(xdaConfig);
        }
    }

    #endregion

    #region [ Methods ]
    private LineConfiguration GetXDAConfiguration(Line line)
    {
        LineConfiguration configuration = new LineConfiguration()
        {
            Sections = new List<Section>() { },
            Taps = new List<Tap>(),
            UsedFAWG = false,
        };

        // Pick an End and start there
        List<LineSegment> segments = line.Segments;

        List<LineSegment> sectionEnds = segments.Where(s => s.IsEnd || s.connectedSegments.Count != 2).ToList();

        while (sectionEnds.Count > 0)
        {
            Section section = new Section()
            {
                Segments = new List<Segment>(),
            };

            LineSegment start = sectionEnds.First();

            while (true)
            {
                section.Segments.Add(ProcessSegment(start));
                Tuple<IEnumerable<LineSegment>, IEnumerable<LineSegment>> connections = SplitConnections(start);

                if (connections.Item1.Count() > 1 && connections.Item2.Count() > 1)
                    break;
                if (connections.Item1.Count() == 0 && connections.Item2.Count() == 0)
                    break;

                if (connections.Item1.Count() == 0 && connections.Item2.Count() > 1)
                    break;
                if (connections.Item2.Count() == 0 && connections.Item1.Count() > 1)
                    break;

                LineSegment nextSegment = null;

                if (connections.Item1.Count() == 1)
                    nextSegment = connections.Item1.First();
                else if (connections.Item2.Count() == 1)
                    nextSegment = connections.Item2.First();

                if (section.Segments.Find(s => s.ID == nextSegment.ID) is null)
                {
                    start = nextSegment;
                    continue;
                }

                //Special case if both ends have 1 segment connected to them
                if (connections.Item1.Count() == 1 && connections.Item2.Count() == 1)
                    nextSegment = connections.Item2.First();

                if (section.Segments.Find(s => s.ID == nextSegment.ID) is null)
                {
                    start = nextSegment;
                    continue;
                }


                break;
            }

            IEnumerable<string> tapBuses = start.connectedSegments.Select(s => s.ChildSegment == start.ID ? s.Parent : s.Child).SelectMany(s => new List<string>() { s.ToBus, s.FromBus });
            tapBuses = tapBuses.Concat(sectionEnds.First().connectedSegments.Select(s => s.ChildSegment == start.ID ? s.Parent : s.Child).SelectMany(s => new List<string>() { s.ToBus, s.FromBus }));
            tapBuses = tapBuses.Distinct();

            sectionEnds.RemoveWhere(item => item.ID == section.Segments.Last().ID || item.ID == section.Segments.First().ID);

            //Process Section to flip segments to go fromBus to ToBus. start with lower ID for consistency
            if (section.Segments.Last().ID < section.Segments.First().ID)
                section.Segments.Reverse();

            int i = -1;
            while (i < section.Segments.Count())
            {
                i++;
                //if next Segment exists try to match
                if (i < section.Segments.Count() - 1)
                {
                    if (section.Segments[i].ToBus == section.Segments[i + 1].ToBus || section.Segments[i].ToBus == section.Segments[i + 1].FromBus)
                        continue;
                    if (section.Segments[i].FromBus == section.Segments[i + 1].ToBus || section.Segments[i].FromBus == section.Segments[i + 1].FromBus)
                    {
                        string swap = section.Segments[i].ToBus;
                        section.Segments[i].ToBus = section.Segments[i].FromBus;
                        section.Segments[i].FromBus = swap;
                        continue;
                    }
                    //If first Section we check connected Taps
                    if (i == 0)
                    {
                        if (tapBuses.Contains(section.Segments[i].FromBus))
                            continue;
                        if (tapBuses.Contains(section.Segments[i].ToBus))
                        {
                            string swap = section.Segments[i].ToBus;
                            section.Segments[i].ToBus = section.Segments[i].FromBus;
                            section.Segments[i].FromBus = swap;
                        }
                        else if (section.Segments[i].ToBus.CompareTo(section.Segments[i].FromBus) > 0)
                        {
                            string swap = section.Segments[i].ToBus;
                            section.Segments[i].ToBus = section.Segments[i].FromBus;
                            section.Segments[i].FromBus = swap;
                        }
                        continue;
                    }
                    else
                    {
                        section.Segments[i].FromBus = section.Segments[i - 1].ToBus;
                        continue;
                    }
                }

                //Last Segment is treated sepperatedly since we want to look backwards on this one.
                if (i == section.Segments.Count() - 1 && i > 0)
                {
                    if (section.Segments[i].FromBus == section.Segments[i - 1].ToBus)
                        continue;

                    if (section.Segments[i].ToBus == section.Segments[i - 1].ToBus)
                    {
                        string swap = section.Segments[i].ToBus;
                        section.Segments[i].ToBus = section.Segments[i].FromBus;
                        section.Segments[i].FromBus = swap;
                        continue;
                    }

                    if (tapBuses.Contains(section.Segments[i].ToBus))
                        continue;
                    if (tapBuses.Contains(section.Segments[i].FromBus))
                    {
                        string swap = section.Segments[i].ToBus;
                        section.Segments[i].ToBus = section.Segments[i].FromBus;
                        section.Segments[i].FromBus = swap;
                    }
                    else if (section.Segments[i].ToBus.CompareTo(section.Segments[i].FromBus) > 0)
                    {
                        string swap = section.Segments[i].ToBus;
                        section.Segments[i].ToBus = section.Segments[i].FromBus;
                        section.Segments[i].FromBus = swap;
                    }
                    continue;

                }


            }
            configuration.Sections.Add(section);
        }

        // Determine Buses....
        List<TmpTap> taps = new List<TmpTap>();

        foreach (Section section in configuration.Sections)
        {
            if (taps.FindIndex((t) => t.Name == section.Segments.First().FromBus) >= 0)
                taps.Find((t) => t.Name == section.Segments.First().FromBus).SegmentID.Add(section.Segments.First().ID);
            else
                taps.Add(new TmpTap()
                {
                    SegmentID = new List<int>() { section.Segments.First().ID },
                    StationID = new List<int>() { },
                    IsEnd = false,
                    Name = section.Segments.First().FromBus
                });
            if (taps.FindIndex((t) => t.Name == section.Segments.Last().ToBus) >= 0)
                taps.Find((t) => t.Name == section.Segments.First().ToBus).SegmentID.Add(section.Segments.First().ID);
            else
                taps.Add(new TmpTap()
                {
                    SegmentID = new List<int>() { section.Segments.Last().ID },
                    StationID = new List<int>() { },
                    IsEnd = false,
                    Name = section.Segments.Last().ToBus
                });

            section.StartBus = section.Segments.First().FromBus;
            section.EndBus = section.Segments.Last().ToBus;
        }

        // Check if any Taps have single Segement that is end...
        foreach(TmpTap tap in taps.Where(t => t.SegmentID.Count == 1))
        {
            LineSegment segment = segments.Find(s => s.ID == tap.SegmentID[0]);
            if (!segment.IsEnd)
                continue;

            if (segment.AssetLocations.Count == 1)
                tap.StationID.Add(segment.AssetLocations[0].LocationID);

            // If there are 2 assetLoctions assign lower ID to FROM Bus Tap this is reverse of saving them, this means we avoid Lines swapping directions on every pull
            if (tap.Name == segment.FromBus)
                tap.StationID.Add(segment.AssetLocations.MinBy(item => item.ID).LocationID);
            else
                tap.StationID.Add(segment.AssetLocations.MaxBy(item => item.ID).LocationID);
        }

        configuration.Taps = taps.Select(t => {
            Tap tap = new Tap()
            {
                StationID = null,
                Bus = t.Name,
                IsXDA = true,
                IsExternal = false
            };
            if (t.StationID.Count > 0)
                tap.StationID = t.StationID.First();
            return tap;
        }).ToList();

        return configuration;
    }

    private Segment ProcessSegment(LineSegment lineSegment)
    {
        return new Segment()
        {
            R0 = lineSegment.R0,
            R1 = lineSegment.R1,
            X0 = lineSegment.X0,
            X1 = lineSegment.X1,
            ThermalRating = lineSegment.ThermalRating,
            Length = lineSegment.Length,
            IsEnd = lineSegment.IsEnd,
            FromBus = lineSegment.FromBus,
            ToBus = lineSegment.ToBus,
            ID = lineSegment.ID,
            AssetKey = lineSegment.AssetKey,
            AssetName = lineSegment.AssetName,
            Description = lineSegment.Description,
        };

    }

    /// <summary>
    /// This will split the connections for a LineSegment into two sets based on mutual cuping (e.g. at a tap with 1,2,3 1-2 1-3 and 2-3 have to be connected)
    /// </summary>
    /// <param name="segment">The original semgment with the connections to be split</param>
    /// <returns> 2 sets of connected Segments </returns>
    private Tuple<IEnumerable<LineSegment>, IEnumerable<LineSegment>> SplitConnections(LineSegment segment)
    {
        Func<LineSegment, IEnumerable<LineSegment>> getConnected = (s) => s.connectedSegments.Select(a => a.ParentSegment == s.ID ? a.Child : a.Parent);

        IEnumerable<LineSegment> connectedSegments = getConnected(segment);

        if (connectedSegments.Count() == 0)
            return new Tuple<IEnumerable<LineSegment>, IEnumerable<LineSegment>>(new List<LineSegment>(), new List<LineSegment>()); ;

        LineSegment start = connectedSegments.First();
        IEnumerable<LineSegment> startConnected = getConnected(start);
        IEnumerable<LineSegment> item1 = startConnected.Intersect(connectedSegments, new SegmentComparer()).Append(start);
        IEnumerable<LineSegment> item2 = connectedSegments.Except(item1);

        return new Tuple<IEnumerable<LineSegment>, IEnumerable<LineSegment>>(item1, item2);
    }

    #endregion
}