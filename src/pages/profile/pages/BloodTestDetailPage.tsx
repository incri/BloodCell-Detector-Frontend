import React from 'react';
import { useLocation } from 'react-router-dom';
import { BloodTest } from '../hooks/usePatients';

interface BloodTestDetailPageProps {
  test?: BloodTest;
}

const BloodTestDetailPage: React.FC<BloodTestDetailPageProps> = () => {
  const location = useLocation();

  const { patientId, bloodTest } = location.state || {};

  return (
    <div>
      <div>Patient ID: {patientId}</div>
      {bloodTest && (
        <div>
          <div>Blood Test Title: {bloodTest.title}</div>
          <div>Blood Test Description: {bloodTest.description}</div>
          <div>Blood Test Results Length: {bloodTest.results.length}</div>
        </div>
      )}
    </div>
  );
};

export default BloodTestDetailPage;
