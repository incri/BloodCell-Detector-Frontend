import useFetchResponseResult from "../../../hooks/useUserFetchResponseResult";



const useBloodTestResult = (id: string, bloodTestId: string, resultId: string) => {
  const endpoint = `patients/${id}/blood-tests/${bloodTestId}/results/${resultId}/generate-report/`;
  return useFetchResponseResult<BlobPart>(endpoint, resultId);
};

export default useBloodTestResult;
