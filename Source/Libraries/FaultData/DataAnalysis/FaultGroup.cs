//******************************************************************************************************
//  FaultGroup.cs - Gbtc
//
//  Copyright © 2016, Grid Protection Alliance.  All Rights Reserved.
//
//  Licensed to the Grid Protection Alliance (GPA) under one or more contributor license agreements. See
//  the NOTICE file distributed with this work for additional information regarding copyright ownership.
//  The GPA licenses this file to you under the MIT License (MIT), the "License"; you may
//  not use this file except in compliance with the License. You may obtain a copy of the License at:
//
//      http://opensource.org/licenses/MIT
//
//  Unless agreed to in writing, the subject software distributed under the License is distributed on an
//  "AS-IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. Refer to the
//  License for the specific language governing permissions and limitations.
//
//  Code Modification History:
//  ----------------------------------------------------------------------------------------------------
//  02/18/2016 - Stephen C. Wills
//       Generated original version of source code.
//
//******************************************************************************************************

using System.Collections.Generic;

namespace FaultData.DataAnalysis
{
    public class FaultGroup
    {
        #region [ Members ]

        // Fields
        private bool? m_faultDetectionLogicResult;
        private bool m_defaultFaultDetectionLogicResult;
        private bool m_faultValidationLogicResult;
        private List<Fault> m_faults;

        #endregion

        #region [ Constructors ]

        public FaultGroup(List<Fault> faults, bool? faultDetectionLogicResult, bool defaultFaultDetectionLogicResult, bool faultValidationLogicResult)
        {
            m_faults = faults;
            m_faultDetectionLogicResult = faultDetectionLogicResult;
            m_defaultFaultDetectionLogicResult = defaultFaultDetectionLogicResult;
            m_faultValidationLogicResult = faultValidationLogicResult;
        }

        #endregion

        #region [ Properties ]

        public bool? FaultDetectionLogicResult
        {
            get
            {
                return m_faultDetectionLogicResult;
            }
        }

        public bool DefaultFaultDetectionLogicResult
        {
            get
            {
                return m_defaultFaultDetectionLogicResult;
            }
        }

        public bool FaultValidationLogicResult
        {
            get
            {
                return m_faultValidationLogicResult;
            }
        }

        public List<Fault> Faults
        {
            get
            {
                return m_faults;
            }
        }

        #endregion
    }
}
