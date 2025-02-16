const mockS3SuccssResponse = {
  $metadata: {
    attempts: 1,
    httpStatusCode: 200,
    requestId: 'gzurple123',
  }
};

const mockGenericS3Error = new Error('Exception: Some Indeterminite Dynamo Error');

mockGenericS3Error.$metadata = {
  httpStatusCode: 403,
  requestId: 'CLUJ5E6ERJ69OOUPSTVDDIALHVVV4KQNSO5AEMVJF66Q9ASUAAJG',
  attempts: 1,
  totalRetryDelay: 0
}

const mockListObjectsVSCommandResponse = {
  $metadata: {
    httpStatusCode: 200,
    requestId: '7RHM5N5WW4M4QQJ8',
    extendedRequestId: 'pFsGQ2LeVljgxafPLPqANeMaQ3Yf+SvKzhsHlZBE7diOotI9JtjVuICK/T0fynWz3UNUe3fhKLM=',
    cfId: undefined,
    attempts: 1,
    totalRetryDelay: 0
  },
  IsTruncated: true,
  KeyCount: 1,
  MaxKeys: 1,
  Name: 'brunchinator-review-images',
  NextContinuationToken: '1Mp+0d58VeRhMR9qpIoQ8Me2UAXPdm5zUp7pSmdWq95kEJ2kBH/Z3vUo9ep4fOCw0jkjvDWCDzpwpSpQwk8ipwg==',
  Prefix: 'gzurple123/'
}


module.exports = {
  mockS3SuccssResponse,
  mockGenericS3Error,
  mockListObjectsVSCommandResponse
}