import React, {useEffect, useState} from 'react';
import {post} from "@features/api-connect"
import { ApiConnectCallback } from "@features/api-connect"
import {Box, Container, Paper} from '@mui/material';
import {LLCustomizedDialogs,LLFullScreenDialog,} from '@features/ui-components';
import {useMediaQuery} from 'react-responsive';
import EditLease from './actions/EditLease';
import ViewLease from './actions/ViewLease';
import {MobileScreenSearchFilters} from '@features/lease-management';
import {SearchLeaseFilters,AddLease,EditCompstackLease} from '@features/lease-management';
import {getSearchFiltersData, searchLease} from './SearchLeaseFunctions';
import {LeaseList} from '@features/lease-management';
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import { getMetaData } from './data';
import { check_if_zero_empty_null_undefined_NaN_false } from '@features/ui-components/components/functions';


const columns = (isBigScreen: any) => [
    {
      name: 'S no',
      selector: (row: any, index: any) => row['leaseId'],
      sortable: true,
      omit: !isBigScreen,
      compact: true,
      width: '10px',
      sortField: 'leaseId',
      id: 'leaseId',
    },
    
    {
      name: 'Market',
      selector: (row: any, index: any) => row['market'],
      sortable: true,
      omit: !isBigScreen,
      compact: true,
      sortField: 'market',
      id: 'market',
      width: '10px',
    },
    {
      name: 'SubMarket',
      selector: (row: any, index: any) => row['subMarket'],
      sortable: true,
      omit: !isBigScreen,
      compact: true,
      sortField: 'subMarket',
      id: 'subMarket',
      width: '10px',
    },
    {
      name: 'Tenant Name',
      selector: (row: any, index: any) => row['tenant'],
      sortable: true,
      compact: true,
      sortField: 'tenant',
      id: 'tenant',
      width: '10px',
    },
    // {
    //   name: 'Address',
    //   selector: (row: any, index: any) => row['address1'],
    //   sortable: false,
    //   omit: !isBigScreen,
    //   compact: true,
    //   sortField: 'address1',
    //   id: 'address1',
    //   width: '10px',
    // },
    {
      name: 'Lease sq ft',
      selector: (row: any, index: any) => row['leaseSqFt'],
      sortable: true,
      compact: true,
      sortField: 'leaseSqFt',
      id: 'leaseSqFt',
      width: '10px',
    },
    {
      name: 'Rent/Sq Ft',
      selector: (row: any, index: any) => row['rentPerSqFt'],
      sortable: true,
      compact: true,
      sortField: 'rentPerSqFt',
      id: 'rentPerSqFt',
      width: '10px',
    },
    {
      name: 'Execution Date',
      selector: (row: any, index: any) => row['leaseExecutionDate'],
      sortable: true,
      omit: !isBigScreen,
      format: (row: any, index: any) => new Date(row['leaseExecutionDate']).toLocaleDateString(),
      compact: true,
      sortField: 'leaseExecutionDate',
      id: 'leaseExecutionDate',
      width: '10px',
    },
    // {
    //   name: 'Lease Type',
    //   selector: (row: any, index: any) => row['leaseTypeId'],
    //   sortable: true,
    //   omit: !isBigScreen,
    //   compact: true,
    //   sortField: 'leaseTypeId',
    //   id: 'leaseTypeId',
    //   width: '10px',
    // },
    {
      name: 'Actions',
      selector: (row: any, index: any) => row['actions'],
      sortable: false,
      //omit: !isBigScreen,
      width: '10px',
      cell: (row: any) =>
        !isBigScreen ? (
          <>
            <LLFullScreenDialog actions={'preview'} >
              <ViewLease row={row} />
            </LLFullScreenDialog>
            <LLFullScreenDialog actions={'edit'} >
              <EditLease row={row} />
            </LLFullScreenDialog>
          </>
        ) : (
          <>
            <LLCustomizedDialogs actions={'preview'} title="View Lease" icon={<PreviewIcon/>}>
              {/* <ViewLease row={row} /> */}
              {row.row.original.compStakLeaseId!=undefined?
            <EditCompstackLease varient={"VIEW"} test={row} id={row.row.original.compStakLeaseId}/>:
              <AddLease varient={"VIEW"} test={row} id={row.row.original.leaseId}/>
        }
        </LLCustomizedDialogs>
            <LLCustomizedDialogs actions={'edit'} title="Edit Lease" icon={<EditIcon/>}>
              {/* <EditLease row={row} /> */}
              {row.row.original.compStakLeaseId!=undefined?
            <EditCompstackLease varient={"EDIT"} id={row.row.original.compStakLeaseId}/>:
              <AddLease varient={"EDIT"} id={row.row.original.leaseId}/>}
            </LLCustomizedDialogs>
          </>
        ),
      compact: true,
      sortField: 'actions',
    },
  ];


const SearchLease=()=>{

    const [data, setData] = useState([]);
    const [leaseSourceTypes, setLeaseSourceTypes] = useState([]);
    const [markets, setMarkets] = useState([]);
    const [subMarkets, setSubMarkets] = useState([]);
    const [pending, setPending] = React.useState(true);
    const [isServerSide, setIsServerSide] = React.useState(true);
    const [isDense, setIsDense] = React.useState(true);
    const [hasMore,setHasMore]= React.useState(true);
    const [filters, setFilters] = React.useState({  selectedmarketId:0,
      selectedsubMarketId:0,
      minLeaseSqft:0,
      maxLeaseSqft:0,
      searchText:"",
      executionStartDate:null,
      executionEndDate:null,
      selectedSource:"",
      isMyCompsOnly:false,});
    const onSearch = (
        selectedmarketId: number,
        selectedsubMarketId: number,
        minLeaseSqft: number,
        maxLeaseSqft: number,
        searchText: string,
        executionStartDate: Date,
        executionEndDate: Date,
        selectedSource: string,
        isMyCompsOnly: boolean
      ) => {
          
        setFilters({
          selectedmarketId,
          selectedsubMarketId,
          minLeaseSqft,
          maxLeaseSqft,
          searchText,
          executionStartDate,
          executionEndDate,
          selectedSource,
          isMyCompsOnly,
        }); 
      };
      const onClear = () => {
        setFilters({selectedmarketId:0,
          selectedsubMarketId:0,
          minLeaseSqft:0,
          maxLeaseSqft:0,
          searchText:"",
          executionStartDate:null,
          executionEndDate:null,
          selectedSource:"",
          isMyCompsOnly:false});
      };
    const metaDataSetter=(response)=>{
      
setMarkets(response.markets);
setSubMarkets(response.subMarkets);
setLeaseSourceTypes(response.sources)
    }
 
    const handleInfiniteScroll = (page: any) => {
      fetchData(page, 'LeaseExecutionDate', 'desc', "", true);
    };
useEffect(()=>{
  getMetaData(metaDataSetter); 
  fetchData(1)
},[]);
   useEffect(() => {
    fetchData(1)
     }, [filters]);

  const [totalRows, setTotalRows] = useState(0);
  const [filterText, setFilterText] = React.useState('');

  const fetchData = (
    page: number,
    orderby = 'LeaseExecutionDate',
    sortDirection = 'desc',
    search = '',
    isForInfiniteSearch = false
  ) => {
  let _url=filters.selectedSource=="2"?"CompStakLease/getall":"Lease/getall"
      const  ApiConnectCallback:ApiConnectCallback={
        url:_url,
        data:{
                "select": [
                  "*"
                ],
                "top": 10,
                "skip": page === 1 ? 0 : (page - 1) * 10,
                "filter":buildFilterQuery(),
                "search": filters?.searchText,
                "orderBy":  `${orderby} ${sortDirection}`
              
          },
    successsCallback:(response:any):void=>{
        setTotalRows(response.totalCount)
        response = filters.selectedSource=="2" ? response.compStakLeases : response.leases
        
        let mappedResponse=response=responseMapper(response)
        if(mappedResponse.length<10){
          setHasMore(false)
        }
        else{ setHasMore(true)}
        if (isForInfiniteSearch) {
            const _response = data.concat(mappedResponse);
            setData(_response);
          } else {
            setData(mappedResponse);
          }
        },
    failureCallback:(response:any):void=>{}
    }
    post(ApiConnectCallback);
      
   
  };
   

const responseMapper=(object:any)=>{
let response=[...object]
response.forEach((item:any)=>{
  if(item.compStakLeaseId!=undefined){
    item.leaseId=item.compStakLeaseId;
    item.subMarket=item.subMarketName
    item.market=item.marketName
    item.leaseSqFt=item.leaseSqft
    item.rentPerSqFt=item.rentPerSqft
  }
});
  return response

}
      const isBigScreen = useMediaQuery({query: '(min-width: 768px)'});
      const buildFilterQuery = () => {
        
        let filter = '';
        if (
          !check_if_zero_empty_null_undefined_NaN_false(filters?.selectedmarketId)
          //  &&
          // filters?.LeaseSourceTypeName !== 'All'
        ) {
          const name =
            markets.filter((x: any) => x.id === filters?.selectedmarketId)[0]
              ?.name ?? '';
          filter += `Market eq '${name}' and `;
        }
        if (
          !check_if_zero_empty_null_undefined_NaN_false(filters?.selectedsubMarketId) 
          // &&
          // filters?.selectedsubMarketId !== 'All'
        ) {
          const subMarketName =
            subMarkets.filter(
              (x: any) => x.id === filters?.selectedsubMarketId
            )[0]?.name ?? '';
          filter += `SubMarket eq '${subMarketName}' and `;
        }
        if (
          !check_if_zero_empty_null_undefined_NaN_false(filters?.selectedSource) &&
          filters?.selectedSource !== 'All'&&filters?.selectedSource != '2'
        ) {
          
          filter += `LeaseSourceTypeId eq ${filters?.selectedSource} and `;
        }
        if (!check_if_zero_empty_null_undefined_NaN_false(filters?.minLeaseSqft)) {
          
          filter += `LeaseSqFt gt ${filters?.minLeaseSqft} and `;
        }
        if (!check_if_zero_empty_null_undefined_NaN_false(filters?.maxLeaseSqft)) {
          
          filter += `LeaseSqFt lt ${filters?.maxLeaseSqft} and `;
        }
        if (!check_if_zero_empty_null_undefined_NaN_false(filters?.executionStartDate)) {
          filter += `LeaseExecutionDate gt ${filters?.executionStartDate.toISOString()} and `;
        }
        if (!check_if_zero_empty_null_undefined_NaN_false(filters?.executionEndDate)) {
          filter += `LeaseExecutionDate lt ${filters?.executionEndDate.toISOString()} and `;
        }
        if (filters?.isMyCompsOnly) {
          
          filter += `CreatedBy eq \'Dwayn Jhonson\' and`;
          // filter += `CreatedBy eq '${authCon?.state?.user?.username}' and`;
        }
        filter.substring(0, filter.lastIndexOf('and') - 1);
        //selectedmarketId,
        //selectedsubMarketId,
        //searchText,
    
        return filter.substring(0, filter.lastIndexOf('and') - 1);
      };
    
return (<>
    {isBigScreen ? (
      <SearchLeaseFilters
        markets={markets}
        subMarkets={subMarkets}
        leaseSourceTypes={leaseSourceTypes}
        onSearch={onSearch}
        onClear={onClear}
        isBigScreen={isBigScreen}
        data={data}
      />
    ) : (
    <MobileScreenSearchFilters
        markets={markets}
        subMarkets={subMarkets}
        leaseSourceTypes={leaseSourceTypes}
        onSearch={onSearch}
        onClear={onClear}
        isBigScreen={isBigScreen}
      />
    )}
    <Container
   id="scrollableDiv" 
      maxWidth="xl"
      sx={{flex: '1', pb: '60px',height: 300, overflow: "auto"}}
      //style={{overflowY: 'scroll', overflowX: 'hidden'}}
      disableGutters
    >
      <Paper sx={{mb: 3, p: 2}}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            bgcolor: 'background.paper',
            borderRadius: 1,
          }}
        >
        </Box>
          <LeaseList
            totalRows={totalRows}
            columns={columns(isBigScreen)}
            markets={markets}
            subMarkets={subMarkets}
            isDense={isDense}
            filters={filters}
            isBigScreen={isBigScreen}
            data={data}
            handleInfiniteScroll={handleInfiniteScroll}
            hasMore={hasMore}
          />
      </Paper>
    </Container>
  </>)
}
export  {SearchLease}