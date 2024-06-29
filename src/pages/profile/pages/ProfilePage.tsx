// pages/profile/pages/ProfilePage.tsx
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import ProfileGrid from '../components/ProfileGrid';
import ProfileDetailPage from './ProfileDetailPage';
import HospitalDetailPage from './HospitalDetailPage';
import UsersDetailPage from './UsersDetailPage';
import PatientsPage from './PatientsPages';

const ProfilePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab') || 'overview';

  let TabComponent;
  switch (tab) {
    case 'hospitals':
      TabComponent = HospitalDetailPage;
      break;
    case 'users':
      TabComponent = UsersDetailPage;
      break;
    case 'patients':
      TabComponent = PatientsPage;
      break;
    case '':
    default:
      TabComponent = ProfileDetailPage;
      break;
  }

  return <ProfileGrid TabComponent={TabComponent} />;
};

export default ProfilePage;
