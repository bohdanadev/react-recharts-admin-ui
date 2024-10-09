import { useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../../firebase';

import DataTable from '../../components/dataTable/DataTable';
// import { userRows } from '../../data';
import Add from '../../components/add/Add';

import './users.scss';

interface IUser {
  id: string;
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  createdAt: string;
  verified?: boolean;
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'img',
    headerName: 'Avatar',
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || '/noavatar.png'} alt='' />;
    },
  },
  {
    field: 'firstName',
    type: 'string',
    headerName: 'First name',
    width: 150,
  },
  {
    field: 'lastName',
    type: 'string',
    headerName: 'Last name',
    width: 150,
  },
  {
    field: 'email',
    type: 'string',
    headerName: 'Email',
    width: 200,
  },
  {
    field: 'phone',
    type: 'string',
    headerName: 'Phone',
    width: 150,
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    width: 100,
    type: 'string',
  },
  {
    field: 'verified',
    headerName: 'Verified',
    width: 100,
    type: 'boolean',
  },
];

const Users = () => {
  const [open, setOpen] = useState(false);

  const fetchCollectionData = async () => {
    const q = query(collection(db, 'users'), orderBy('lastName', 'asc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as IUser)
    );
  };

  const { isLoading, data } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetchCollectionData(),
  });

  return (
    <div className='users'>
      <div className='info'>
        <h1>Users</h1>
        <button onClick={() => setOpen(true)}>Add New User</button>
      </div>
      {/* <DataTable slug='users' columns={columns} rows={userRows} /> */}

      {isLoading
        ? 'Loading...'
        : data && <DataTable slug='users' columns={columns} rows={data} />}

      {open && (
        <Add
          slug='user'
          columns={columns}
          setOpen={setOpen}
          id={data && data.length > 0 ? (data.length + 1).toString() : '1'}
          collectionName='users'
        />
      )}
    </div>
  );
};

export default Users;
