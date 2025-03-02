/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateServiceRequest = /* GraphQL */ `
  subscription OnCreateServiceRequest(
    $filter: ModelSubscriptionServiceRequestFilterInput
    $owner: String
  ) {
    onCreateServiceRequest(filter: $filter, owner: $owner) {
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
export const onUpdateServiceRequest = /* GraphQL */ `
  subscription OnUpdateServiceRequest(
    $filter: ModelSubscriptionServiceRequestFilterInput
    $owner: String
  ) {
    onUpdateServiceRequest(filter: $filter, owner: $owner) {
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
export const onDeleteServiceRequest = /* GraphQL */ `
  subscription OnDeleteServiceRequest(
    $filter: ModelSubscriptionServiceRequestFilterInput
    $owner: String
  ) {
    onDeleteServiceRequest(filter: $filter, owner: $owner) {
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
