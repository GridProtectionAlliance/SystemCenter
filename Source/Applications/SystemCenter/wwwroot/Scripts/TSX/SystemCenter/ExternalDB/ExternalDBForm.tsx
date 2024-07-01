import * as React from 'react';
import { Application, SystemCenter } from '@gpa-gemstone/application-typings';
import { Input, TextArea, CheckBox } from '@gpa-gemstone/react-forms';
import { IsCron } from '@gpa-gemstone/helper-functions';
import { LoadingScreen, Modal } from '@gpa-gemstone/react-interactive';

export default function ExternalDBForm(props: {
    Record: SystemCenter.Types.ExternalDatabases,
    Setter: (record: SystemCenter.Types.ExternalDatabases) => void,
    setErrors?: (e: string[]) => void,
    ShowTestButton?: boolean
}) {

    const [requestStatus, setRequestStatus] = React.useState<Application.Types.Status>('unintiated');

    function Valid(field: keyof (SystemCenter.Types.ExternalDatabases)): boolean {
        if (field == 'Name')
            return props.Record.Name != null && props.Record.Name.length > 0 && props.Record.Name.length <= 200;
        else if (field == 'Schedule')
            return (props.Record.Schedule == null || props.Record.Schedule.length == 0) || (props.Record.Schedule != null && IsCron(props.Record.Schedule));
        else if (field == 'ConnectionString' || field == 'DataProviderString')
            return true;
        return false;
    }

    const TestExternal = React.useCallback(() => {
        setRequestStatus('loading');
        let handle = $.ajax({
            type: "POST",
            url: `api/SystemCenter/ExternalDatabases/TestConnection`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(props.Record),
            dataType: 'json',
            cache: false,
            async: true
        });
        handle.done(() => {
            setRequestStatus('idle');
        });
        handle.fail(() => {
            setRequestStatus('error');
        });
        return () => {
            if (handle != null && handle.abort != null) handle.abort();
        };
    }, [props.Record, setRequestStatus]);

    return (
        <>
            <Input<SystemCenter.Types.ExternalDatabases> Record={props.Record} Field={'Name'} Feedback={'A Name of less than 200 characters is required.'} Valid={Valid} Setter={props.Setter} />
            <Input<SystemCenter.Types.ExternalDatabases> Record={props.Record} Field={'Schedule'} Feedback={'Schedule must be in cron format.'} Valid={Valid} Setter={props.Setter} Help={'In order of minutes, hours, day of the month, month, weekday. For example, a Schedule of every midnight would be * 0 * * *'} />
            <TextArea<SystemCenter.Types.ExternalDatabases> Rows={3} Record={props.Record} Field={'ConnectionString'} Label={'Connection String'} Valid={Valid} Setter={props.Setter} />
            <CheckBox<SystemCenter.Types.ExternalDatabases> Record={props.Record} Field={'Encrypt'} Label={'Encrypted'} Setter={props.Setter} />
            <br />
            {(props.Record.Encrypt) ? null :
                <TextArea<SystemCenter.Types.ExternalDatabases> Rows={3} Record={props.Record} Field={'DataProviderString'} Label={'Data Provider String'} Valid={Valid} Setter={props.Setter} />
            }
            <button className="btn btn-primary pull-left" hidden={!(props.ShowTestButton ?? false)}
                onClick={TestExternal}>Test DB Connection</button>
            <Modal Title="Connection Test Results" Show={requestStatus === 'error' || requestStatus === 'idle'}
                ConfirmBtnClass={requestStatus === 'idle' ? 'btn-success' : 'btn-danger'} ConfirmText={'Close'}
                ShowX={true} ShowCancel={false} Size={'sm'} CallBack={() => setRequestStatus('unintiated')}>
                <p>{requestStatus === 'idle' ? "Connection to database successful." : "Unable to connect to external database. Check connection settings."}</p>
            </Modal>
            <LoadingScreen Show={requestStatus === 'loading'} />
        </>
    );
}