/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getServiceRequest = /* GraphQL */ `
  query GetServiceRequest($id: ID!) {
    getServiceRequest(id: $id) {
      id
      caseNumber
      serviceRequestName
      serviceRequestDescription
      creationDate
      severity
      resolutionDate
      reporterName
      contactInformation
      location
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listServiceRequests = /* GraphQL */ `
  query ListServiceRequests(
    $filter: ModelServiceRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listServiceRequests(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        caseNumber
        serviceRequestName
        serviceRequestDescription
        creationDate
        severity
        resolutionDate
        reporterName
        contactInformation
        location
        owner
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
