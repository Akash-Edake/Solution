import { get, post, put } from "@features/api-connect";
import { ApiConnectCallback } from "@features/api-connect";
import { useNavigate } from "react-router-dom";

export const getMetaData = (setter: any) => {
  debugger;
  const ApiConnectCallback: ApiConnectCallback = {
    url: "Metadatas/metadata/property/createproperty",
    data: {},
    successsCallback: (response: any): void => {
      setter(response);
    },
    failureCallback: (response: any): void => {},
  };
  get(ApiConnectCallback);
};