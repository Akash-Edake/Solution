/* eslint-disable @typescript-eslint/ban-types */
const url = `https://acs-lnk-compsapp-ncus-uat-01.search.windows.net/indexes/azi-lnk-leaseunified-ncus-uat-01/docs/search?api-version=2020-06-30-preview`;
const data = {
  select: '*',
  top: 10000,
  count: true,
  skip: 0,
  filter: '',
  orderby: 'ModifiedDate desc',
};
const headers = {
  'Content-Type': 'application/json',
   'api-key': '5366A78BCA896EAA1F6F9E9114D05864',
};

export const downloadCSV = (data: any) => {
  const link = document.createElement('a');
  let csv = convertArrayOfObjectsToCSV(data);
  if (csv == null) return;

  const filename = 'export.csv';

  if (!csv.match(/^data:text\/csv/i)) {
    csv = `data:text/csv;charset=utf-8,${csv}`;
  }

  link.setAttribute('href', encodeURI(csv));
  link.setAttribute('download', filename);
  link.click();
};

function convertArrayOfObjectsToCSV(array: any) {
  let result: any;

  const columnDelimiter = ',';
  const lineDelimiter = '\n';
  const keys = Object.keys(array[0]);

  result = '';
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  array.forEach((item: any) => {
    let ctr = 0;
    keys.forEach((key) => {
      if (ctr > 0) result += columnDelimiter;

      result += item[key];

      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
}

export const searchLease = (setData: Function, setPending: Function) => {
  fetch(url, {body: JSON.stringify(data), method: 'POST', headers, mode: 'cors'})
    .then((response) => response.json())
    .then((data) => {
      setData(data?.value ?? []);
      setPending(false);
    });
};

const rooturl = 'https://web-lnk-compsappapi-ncus-dv-01.azurewebsites.net/api/v1/';
export const getGenerations = (setGenerations: Function) => {
  const headers = {'Content-Type': 'application/json'};

  fetch(`${rooturl}LeaseGenerations`, {headers})
    .then((response) => response.json())
    .then((data) => {
      setGenerations(data?.data?.results);
    });
};
export const getLeaseStructures = (setLeaseStructures: Function) => {
  const headers = {'Content-Type': 'application/json'};

  fetch(`${rooturl}LeaseStructures`, {headers})
    .then((response) => response.json())
    .then((data) => {
      setLeaseStructures(data?.data?.results);
    });
};

export const getLeaseTypes = (setLeaseTypes: Function) => {
  const headers = {'Content-Type': 'application/json'};

  fetch(`${rooturl}LeaseTypes`, {headers})
    .then((response) => response.json())
    .then((data) => {
      setLeaseTypes(data?.data?.results);
    });
};

export const getTenantTypes = (setTenantTypes: Function) => {
  const headers = {'Content-Type': 'application/json'};

  fetch(`${rooturl}TenantTypes`, {headers})
    .then((response) => response.json())
    .then((data) => {
      setTenantTypes(data?.data?.results);
    });
};

export const getGeneric = (setter: Function, endpoint: String) => {
  const headers = {'Content-Type': 'application/json'};

  fetch(`${rooturl}${endpoint}`, {headers})
    .then((response) => response.json())
    .then((data) => {
      setter(data?.data?.results);
    });
};

export const getSearchFiltersData = (
  setLeaseSourceTypes: Function,
  setMarkets: Function,
  setSubMarkets: Function
) => {
  const headers = {'Content-Type': 'application/json'};

  fetch(`${rooturl}LeaseSourceTypes`, {headers})
    .then((response) => response.json())
    .then((data) => {
      setLeaseSourceTypes(data?.data?.results);
    });

  fetch(`${rooturl}Markets`, {headers})
    .then((response) => response.json())
    .then((data) => {
      setMarkets(data?.data?.results);
    });

  fetch(`${rooturl}SubMarkets`, {headers})
    .then((response) => response.json())
    .then((data) => {
      setSubMarkets(data?.data?.results);
    });
};
