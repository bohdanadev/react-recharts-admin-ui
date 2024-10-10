import { useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../../firebase';

import DataTable from '../../components/dataTable/DataTable';
import Add from '../../components/add/Add';
// import { products } from '../../data';

import './products.scss';
import { useQuery } from '@tanstack/react-query';

interface IProduct {
  id: number;
  img: string;
  title: string;
  color: string;
  producer: string;
  price: string;
  createdAt: string;
  inStock: boolean;
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'img',
    headerName: 'Image',
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || '/noavatar.png'} alt='' />;
    },
  },
  {
    field: 'title',
    type: 'string',
    headerName: 'Title',
    width: 200,
  },
  {
    field: 'color',
    type: 'string',
    headerName: 'Color',
    width: 100,
  },
  {
    field: 'price',
    type: 'string',
    headerName: 'Price',
    width: 100,
  },
  {
    field: 'producer',
    headerName: 'Producer',
    type: 'string',
    width: 150,
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    width: 150,
    type: 'string',
  },
  {
    field: 'inStock',
    headerName: 'In Stock',
    width: 150,
    type: 'boolean',
  },
];

const Products = () => {
  const [open, setOpen] = useState(false);

  const fetchCollectionData = async () => {
    const q = query(collection(db, 'products'), orderBy('title', 'asc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(
      (doc) =>
        ({ id: doc.id, ...(doc.data() as Partial<IProduct>) } as IProduct)
    );
  };

  const { isLoading, data } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchCollectionData(),
  });

  return (
    <div className='products'>
      <div className='info'>
        <h1>Products</h1>
        <button onClick={() => setOpen(true)}>Add New Products</button>
      </div>
      {/* <DataTable slug='products' columns={columns} rows={products} /> */}

      {isLoading
        ? 'Loading...'
        : data && <DataTable slug='products' columns={columns} rows={data} />}

      {open && (
        <Add
          slug='product'
          columns={columns}
          setOpen={setOpen}
          id={data && data.length > 0 ? (data.length + 1).toString() : '1'}
          collectionName='products'
        />
      )}
    </div>
  );
};

export default Products;
