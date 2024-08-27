import useFetchResponseData from "../../../hooks/useFetchResponseData";



const useBloodTestResult = (id: string, bloodTestId: string, resultId: string) => {
  const endpoint = `patients/${id}/blood-tests/${bloodTestId}/results/${resultId}/generate-report/`;
  return useFetchResponseData<BlobPart>(endpoint, {resultId}, true, true);
};

export default useBloodTestResult;
