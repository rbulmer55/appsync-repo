//const { resolve } = require('path');
module.exports = [
    {
        name: 'validateGenerateScreenshot',
        dataSource: 'none',
        request: 'screenshot/functions/Function.validateGenerateScreenshot.req.vtl',
        response: 'shared/functions/Function.sharedResponse.res.vtl',
    },
    {
        name: 'recordScreenshotJob',
        dataSource: 'dynamodbDS',
        request: 'screenshot/functions/Function.recordScreenshotJob.req.vtl',
        response: 'screenshot/functions/Function.recordScreenshotJob.res.vtl',
    },
    {
        name: 'getScreenshotStatus',
        dataSource: 'dynamodbDS',
        request: 'screenshot/functions/Function.getScreenshotStatus.req.vtl',
        response: 'screenshot/functions/Function.getScreenshotStatus.res.vtl',
    },
    {
        name: 'downloadAsyncSQS',
        dataSource: 'sqsDSHTTP',
        request: 'screenshot/functions/Function.downloadAsyncSQS.req.vtl',
        response: 'screenshot/functions/Function.downloadAsyncSQS.res.vtl',
    },
    {
        name: 'downloadLambda',
        dataSource: 'receiverLambdaDS',
        request: 'screenshot/functions/Function.downloadLambda.req.vtl',
        response: 'screenshot/functions/Function.downloadLambda.res.vtl',
    },
];
