//******************************************************************************************************
//  ControllerActivator.cs
//
//  Copyright © 2025, Grid Protection Alliance.  All Rights Reserved.
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
//  07/30/2025 - Stephen C. Wills
//       Generated original version of source code.
//
//******************************************************************************************************

using System;
using System.Collections.Concurrent;
using System.Linq;
using System.Linq.Expressions;
using System.Net.Http;
using System.Reflection;
using System.Web.Http.Controllers;
using System.Web.Http.Dispatcher;
using GSF.Data;
using GSF.Data.Model;
using log4net;
using SystemCenter;

namespace openXDA.WebHosting
{
    public class ControllerActivator : IHttpControllerActivator
    {
        #region [ Constructors ]

        public ControllerActivator()
        {
            FactoryLookup = new ConcurrentDictionary<Type, Func<IHttpController>>();
        }

        #endregion

        #region [ Properties ]

        private ConcurrentDictionary<Type, Func<IHttpController>> FactoryLookup { get; }

        #endregion

        #region [ Methods ]

        public IHttpController Create(HttpRequestMessage request, HttpControllerDescriptor controllerDescriptor, Type controllerType)
        {
            Func<IHttpController> factory =
                LookUpFactory(controllerType) ??
                BuildFactory(controllerType) ??
                GetDefaultFactory(request, controllerDescriptor, controllerType);

            FactoryLookup.TryAdd(controllerType, factory);
            return factory();
        }

        private Func<IHttpController> LookUpFactory(Type controllerType) =>
            FactoryLookup.TryGetValue(controllerType, out Func<IHttpController> factory)
                ? factory
                : null;

        private Func<IHttpController> BuildFactory(Type controllerType)
        {
            // Look for category on controller type
            string connection = controllerType.GetCustomAttribute<SettingsCategoryAttribute>()?.SettingsCategory;
            // Look for category on first model type, this should support settings categories on models for model controllers
            if (connection is null)
            {
                Type[] genericArguments = controllerType.BaseType.GetGenericArguments();
                if (genericArguments.Any())
                    connection = genericArguments.First().GetCustomAttribute<SettingsCategoryAttribute>()?.SettingsCategory;
            }
            Func<AdoDataConnection> connectionFactory = () => Program.Host.CreateDbConnection(connection);

            // Get connection factory constructor, failing that, try to create the default constructor and then allow us to set connection factory in the object
            ConstructorInfo constructor = controllerType.GetConstructor([typeof(Func<AdoDataConnection>)]);
            Expression constantExpression = Expression.Constant(connectionFactory);
            BlockExpression blockExpression;
            if (constructor is null)
            {
                constructor = controllerType.GetConstructor([]);
                PropertyInfo connectionFactoryProperty = controllerType.GetProperty("ConnectionFactory", typeof(Func<AdoDataConnection>));
                if (constructor is null || connectionFactoryProperty is null || !connectionFactoryProperty.CanWrite)
                    return null;

                //Create controller variable, construct, and assign property
                ParameterExpression controller = Expression.Variable(controllerType);
                BinaryExpression constructedController = Expression.Assign(controller, Expression.New(constructor));
                BinaryExpression setExpression = Expression.Assign(Expression.Property(controller, connectionFactoryProperty), constantExpression);

                // Cast to IHttpControlller and return from block
                UnaryExpression typeAsExpression = Expression.TypeAs(controller, typeof(IHttpController));
                blockExpression = Expression.Block([controller], constructedController, setExpression, typeAsExpression);
            }
            else
            {
                NewExpression newExpression = Expression.New(constructor, constantExpression);
                UnaryExpression typeAsExpression = Expression.TypeAs(newExpression, typeof(IHttpController));
                blockExpression = Expression.Block(typeAsExpression);
            }
            LambdaExpression lambdaExpression = Expression.Lambda(blockExpression);


            return (Func<IHttpController>)lambdaExpression.Compile();
        }

        private Func<IHttpController> GetDefaultFactory(HttpRequestMessage request, HttpControllerDescriptor controllerDescriptor, Type controllerType) =>
            () => DefaultControllerActivator.Create(request, controllerDescriptor, controllerType);

        #endregion

        #region [ Static ]

        // Static Properties
        private static DefaultHttpControllerActivator DefaultControllerActivator { get; }
            = new DefaultHttpControllerActivator();

        private static readonly ILog Log = LogManager.GetLogger(typeof(ControllerActivator));

        #endregion
    }
}