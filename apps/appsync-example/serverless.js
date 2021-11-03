const { generateRegexList, regexes } = require('regex-validation');

const mappingTemplates = require('./src/mapping-templates');
const functionConfigs = require('./src/function-configurations');
const dataSources = require('./src/data-sources');

module.exports = {
    service: 'appsync-example',
    frameworkVersion: '2',
    useDotenv: true,
    provider: {
        name: 'aws',
        runtime: 'nodejs14.x',
        lambdaHashingVersion: 20201221,
        versionFunctions: false,
        stage: "${opt:stage, 'local'}",
        region: "${opt:region, 'eu-west-1'}",
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: 1,
        },
        deploymentBucket: {
            name: 'rb-021121',
            serverSideEncryption: 'AES256',
        },
    },
    plugins: [
        'serverless-appsync-plugin', //'serverless-webpack',
        'serverless-deployment-bucket',
    ],
    package: {
        individually: true,
        exclude: ['node_modules/**'],
    },
    functions: {},
    resources: {
        Resources: {
            appsyncExampletable: {
                Type: 'AWS::DynamoDB::Table',
                Properties: {
                    AttributeDefinitions: [
                        {
                            AttributeName: 'pk',
                            AttributeType: 'S',
                        },
                        {
                            AttributeName: 'sk',
                            AttributeType: 'S',
                        },
                        {
                            AttributeName: 'attr1',
                            AttributeType: 'S',
                        },
                        {
                            AttributeName: 'attr2',
                            AttributeType: 'S',
                        },
                    ],
                    KeySchema: [
                        {
                            AttributeName: 'pk',
                            KeyType: 'HASH',
                        },
                        {
                            AttributeName: 'sk',
                            KeyType: 'RANGE',
                        },
                    ],
                    BillingMode: 'PAY_PER_REQUEST',
                    TableName: 'robAppsyncExampleDB',
                    GlobalSecondaryIndexes: [
                        {
                            IndexName: 'GSI1',
                            KeySchema: [
                                {
                                    AttributeName: 'attr1',
                                    KeyType: 'HASH',
                                },
                                {
                                    AttributeName: 'pk',
                                    KeyType: 'RANGE',
                                },
                            ],
                            Projection: {
                                ProjectionType: 'ALL',
                            },
                        },
                        {
                            IndexName: 'GSI2',
                            KeySchema: [
                                {
                                    AttributeName: 'attr2',
                                    KeyType: 'HASH',
                                },
                                {
                                    AttributeName: 'pk',
                                    KeyType: 'RANGE',
                                },
                            ],
                            Projection: {
                                ProjectionType: 'ALL',
                            },
                        },
                    ],
                },
            },
        },
    },
    custom: {
        appSync: {
            name: 'robsAPI',
            authenticationType: 'API_KEY',
            schema: './src/schemas/screenshot.graphql',
            apiKeys: [{ name: 'robsKey', description: 'My api key', expiresAfter: '30d' }],
            ...mappingTemplates,
            ...functionConfigs,
            ...dataSources,
            substitutions: { ...generateRegexList(regexes) },
        },
        defaultStage: 'local',
        stages: ['local', 'development', 'staging', 'production'],
        // webpack: {
        //     webpackConfig: 'webpack.config.js',
        //     excludeFiles: 'src/**/*.spec.ts',
        //     includeModules: {
        //         forceExclude: ['aws-sdk'],
        //     },
        // },
    },
};
