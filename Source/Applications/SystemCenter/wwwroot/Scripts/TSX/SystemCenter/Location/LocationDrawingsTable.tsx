import { OpenXDA, SystemCenter } from "@gpa-gemstone/application-typings";
import { Pencil, TrashCan } from "@gpa-gemstone/gpa-symbols";
import { GenericController, LoadingScreen, ServerErrorIcon } from "@gpa-gemstone/react-interactive";
import { ReactTable, Paging } from "@gpa-gemstone/react-table";
import React from "react";
import { useAppSelector } from "../hooks";
import { SelectRoles } from "../Store/UserSettings";
import { Input, Select } from '@gpa-gemstone/react-forms';

const LocationDrawingsTable = (props: { Location: OpenXDA.Types.Location }) => {
    const [links, setLinks] = React.useState<SystemCenter.Types.LocationDrawing[]>([]);
    const [sortKey, setSortKey] = React.useState<keyof SystemCenter.Types.LocationDrawing>('Name');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [pageInfo, setPageInfo] = React.useState<{ RecordsPerPage: number, NumberOfPages: number, TotalRecords: number }>({ RecordsPerPage: 0, NumberOfPages: 0, TotalRecords: 0 });
    const [pageState, setPageState] = React.useState<'error' | 'idle' | 'loading'>('idle');
    const [page, setPage] = React.useState<number>(0);
    const [category, setCategory] = React.useState<Array<SystemCenter.Types.ValueListItem>>([]);
    const emptyRecord: SystemCenter.Types.LocationDrawing = { ID: 0, LocationID: 0, Name: '', Link: '', Description: '', Number: '', Category: '' };
    const [record, setRecord] = React.useState<SystemCenter.Types.LocationDrawing>(emptyRecord);

    const roles = useAppSelector(SelectRoles); // Deprecated
    const LocationDrawingController = new GenericController<SystemCenter.Types.LocationDrawing>(`${homePath}api/LocationDrawing`, "Name", true);
    const PagingID = 'LocationDrawingPage'

    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0 && roles.indexOf('Engineer') < 0)
            return false;
        return true;
    }

    const fetchDrawings = (sortKey: keyof SystemCenter.Types.LocationDrawing, ascending: boolean, page: number, locationID: number) => {
        setPageState('loading');
        const handle = LocationDrawingController.PagedSearch([], sortKey, ascending, page, locationID)
            .done((result) => {
                setLinks(JSON.parse(result.Data as unknown as string));
                if (result.NumberOfPages === 0) result.NumberOfPages = 1;
                setPageInfo(result);
                setPageState('idle');
            })
            .fail(() => setPageState('error'));
        return handle;
    }
    const handleDelete = (item: SystemCenter.Types.LocationDrawing) => {
        setPageState('loading');
        LocationDrawingController.DBAction('DELETE', item)
            .then(() => {
                fetchDrawings(sortKey, ascending, page, props.Location.ID);
            })
            .catch(() => {
                setPageState('error');
            });
    };

    const handleSave = () => {
        setPageState('loading');
        LocationDrawingController.DBAction('PATCH', record)
            .then(() => {
                fetchDrawings(sortKey, ascending, page, props.Location.ID);
            })
            .catch(() => {
                setPageState('error');
            });
    };

    function getValueList(listName: string, setter: (value: Array<SystemCenter.Types.ValueListItem>) => void): JQuery.jqXHR<Array<SystemCenter.Types.ValueListItem>> {
        let h = $.ajax({
            type: "GET",
            url: `${homePath}api/ValueList/Group/${listName}`,
            contentType: "application/json; charset=utf-8",
            dataType: `json`,
            cache: false,
            async: true
        });
        h.done((dCat: Array<SystemCenter.Types.ValueListItem>) => {
            setter(dCat);

        });
        return h;
    }

    function valid(field: keyof (SystemCenter.Types.LocationDrawing)): boolean {
        if (field == 'Name')
            return record.Name != null && record.Name.length > 0 && record.Name.length <= 200;
        else if (field == 'Link')
            return record.Link != null && record.Link.length > 0;
        else if (field == 'Number')
            return record.Number == null || record.Number.length <= 50;
        return true;
    }

    React.useEffect(() => {
        let categoryHandle = getValueList("Category", setCategory);

        return () => {
            if (categoryHandle != null && categoryHandle.abort != null) categoryHandle.abort();
        }
    }, [])

    React.useEffect(() => {
        const storedInfo = JSON.parse(localStorage.getItem(PagingID) as string);
        if (storedInfo != null) setPage(storedInfo);
    }, []);

    React.useEffect(() => {
        localStorage.setItem(PagingID, JSON.stringify(page));
    }, [page]);

    React.useEffect(() => {
        const handle = fetchDrawings(sortKey, ascending, page, props.Location.ID);
        return () => { if (handle != null && handle?.abort != null) handle.abort(); }
    }, [sortKey, ascending, page, props.Location.ID]);

    return (<>
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <ReactTable.Table<SystemCenter.Types.LocationDrawing>
                TableClass="table table-hover"
                Data={links}
                SortKey={sortKey}
                Ascending={ascending}
                OnSort={(d) => {
                    if (d.colKey === 'EditDelete')
                        return;
                    if (d.colKey == sortKey)
                        setAscending(!ascending);
                    else {
                        setAscending(true);
                        setSortKey(d.colKey as keyof SystemCenter.Types.LocationDrawing);
                    }
                }}
                TableStyle={{ padding: 0, width: '100%', tableLayout: 'fixed', display: 'flex', flexDirection: 'column', overflow: 'hidden', flex: 1 }}
                TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                TbodyStyle={{ display: 'block', width: '100%', overflowY: 'auto', flex: 1 }}
                RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                Selected={(item) => false}
                KeySelector={(item) => item.ID}
            >
                <ReactTable.Column<SystemCenter.Types.LocationDrawing>
                    Key={'Name'}
                    AllowSort={true}
                    Field={'Name'}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                > Name
                </ReactTable.Column>
                <ReactTable.Column<SystemCenter.Types.LocationDrawing>
                    Key={'Link'}
                    AllowSort={true}
                    Field={'Link'}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                    Content={({ item, key }) => <a href={item[key] as string} target='_blank'>{item[key]}</a>}
                > Link
                </ReactTable.Column>
                <ReactTable.Column<SystemCenter.Types.LocationDrawing>
                    Key={'Description'}
                    AllowSort={true}
                    Field={'Description'}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                > Description
                </ReactTable.Column>
                <ReactTable.Column<SystemCenter.Types.LocationDrawing>
                    Key={'Number'}
                    AllowSort={true}
                    Field={'Number'}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                > Number
                </ReactTable.Column>
                <ReactTable.Column<SystemCenter.Types.LocationDrawing>
                    Key={'Category'}
                    AllowSort={true}
                    Field={'Category'}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                > Category
                </ReactTable.Column>
                <ReactTable.Column<SystemCenter.Types.LocationDrawing>
                    Key={'EditDelete'}
                    AllowSort={false}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                    Content={({ item }) =>
                        <span>
                            <button title='Edit Link' className={"btn" + (!hasPermissions() ? ' disabled' : '')} data-toggle={"modal" + (!hasPermissions() ? ' disabled' : '')} data-target="#exampleModal" onClick={(e) => { setRecord(item) }}>{Pencil}</button>
                            <button title='Delete Link' className={"btn" + (!hasPermissions() ? ' disabled' : '')} onClick={(e) => { if (hasPermissions()) handleDelete(item); }}>{TrashCan}</button>
                        </span>
                    }
                > <p></p>
                </ReactTable.Column>
            </ReactTable.Table>
            <LoadingScreen Show={pageState == 'loading'} />
            <ServerErrorIcon Show={pageState == 'error'} Size={40} Label={'A Server Error Occurred. Please Reload the Application.'} />
            <div className="row">
                <div className="col">
                    <Paging Current={page + 1} Total={pageInfo.NumberOfPages} SetPage={(p) => setPage(p - 1)} />
                </div>
            </div>
        </div>
        <div className="modal" id="exampleModal" role="dialog"> // pull this modal out so both the drawing table and the drawing page has access
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add New Drawing</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                        <div className="modal-body">
                            <Input<SystemCenter.Types.LocationDrawing>  Record={record} Field={'Name'} Feedback={'A Name of less than 200 characters is required.'} Valid={valid} Setter={(r) => setRecord(r)} />
                            <Input<SystemCenter.Types.LocationDrawing>  Record={record} Field={'Link'} Feedback={'A Link is required.'} Valid={valid} Setter={(r) => setRecord(r)} />
                            <Input<SystemCenter.Types.LocationDrawing>  Record={record} Field={'Description'} Valid={valid} Setter={(r) => setRecord(r)} />
                            <Select<SystemCenter.Types.LocationDrawing> Record={record} Field={'Category'} Options={category.map(item => { return { Value: item.Value, Label: item.AltValue ?? item.Value } })} Label={'Category'} Setter={(r) => setRecord(r)} />
                            <Input<SystemCenter.Types.LocationDrawing>  Record={record} Field={'Number'} Feedback={'Number must be less than 50 characters.'} Valid={valid} AllowNull={true} Setter={(r) => setRecord(r)} />
                        </div>
                        <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => handleSave()}>Save changes</button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default LocationDrawingsTable;