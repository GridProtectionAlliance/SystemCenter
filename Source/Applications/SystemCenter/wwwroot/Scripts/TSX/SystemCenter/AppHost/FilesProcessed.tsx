//******************************************************************************************************
//  FilesProcessed.tsx - Gbtc
//
//  Copyright © 2026, Grid Protection Alliance.  All Rights Reserved.
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
//  04/09/2026 - Natalie Beatty
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react'
import { Modal } from '@gpa-gemstone/react-interactive';
import { useGetContainerPosition } from '@gpa-gemstone/helper-functions'
import FilesProcessedGraph from './FilesProcessedGraph'
import FilesProcessedTable from './FilesProcessedTable'
import DataOperationFailures from './DataOperationFailures'

const FilesProcessed = () => {
    const rowRef = React.useRef<HTMLDivElement>(null);
    const [detailModalContent, setDetailModalContent] = React.useState<string>('')
    const [showDetailModal, setShowDetailModal] = React.useState<boolean>(false)
    const [selectedFile, setSelectedFile] = React.useState<number | null>(null)
    const [filteredHour, setFilteredHour] = React.useState<string | null>(null)
    const [selectedTime, setSelectedTime] = React.useState<string | null>(null)
    const { offsetWidth, offsetHeight } = useGetContainerPosition(rowRef)

    function handleViewMoreClick(info: string, event: React.MouseEvent) {
        setDetailModalContent(info)
        setShowDetailModal(true)
    }

    function handleOnTableClick(data, event: React.MouseEvent) {
        if (data.row.FileGroupID === selectedFile) {
            setSelectedFile(null)
            setSelectedTime(null)
            return
        }
        setSelectedFile(data.row.FileGroupID)
        setSelectedTime(data.row.ProcessingStartTime)
    }

    return (
        <div className="row h-100">
                <div className="col-6 h-100">
                <div className="row h-50" ref={rowRef} style={{ justifyContent: 'center' }}>
                        <FilesProcessedGraph
                            OffsetHeight={offsetHeight}
                            OffsetWidth={offsetWidth}
                            SelectedTime={selectedTime}
                            FilteredHour={filteredHour}
                            SetFilteredHour={setFilteredHour}
                        />
                    </div>
                    <div className="row d-flex flex-column h-50" style={{ flex: '1, 1, 0%' }}>
                        <FilesProcessedTable
                            FilteredHour={filteredHour}
                            SelectedFile={selectedFile}
                            HandleOnTableClick={handleOnTableClick}
                        />
                    </div>
                </div>
                <div className="col-6 h-100">
                    <DataOperationFailures
                        FilteredHour={filteredHour}
                        SelectedFile={selectedFile}
                        HandleViewMoreClick={handleViewMoreClick}
                    />
                </div>
            <Modal
                Title={'Details'}
                CallBack={() => { setShowDetailModal(false) }}
                Show={showDetailModal}
                ShowCancel={false}
                ShowX={true}
                ShowConfirm={false}
                Size={'lg'}
            >
                {detailModalContent}
            </Modal>
        </div>
    )
}

export default FilesProcessed