import { FC } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GridColDef } from '@mui/x-data-grid';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { SubmitHandler, useForm } from 'react-hook-form';
import './add.scss';

type FormData = {
  [key: string]: any;
};

type Props = {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  collectionName: string;
};

const Add: FC<Props> = ({ slug, columns, setOpen, id, collectionName }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const addItem = async (data: FormData) => {
    await setDoc(doc(db, collectionName, id), {
      ...data,
      createdAt: new Date().toISOString(),
    });
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: FormData) => addItem(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${slug}s`] });
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    mutation.mutate(data);
    setOpen(false);
  };

  return (
    <div className='add'>
      <div className='modal'>
        <span className='close' onClick={() => setOpen(false)}>
          X
        </span>
        <h1>Add new {slug}</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Dynamically generate form fields based on provided columns */}
          {columns
            .filter((item) => item.field !== 'id' && item.field !== 'img')
            .map((column) => (
              <div className='item' key={column.field}>
                <label>{column.headerName}</label>
                <input
                  type={column.type}
                  placeholder={column.field}
                  {...register(column.field, { required: true })}
                />
                {errors[column.field] && <span>This field is required</span>}
              </div>
            ))}
          <button type='submit' disabled={mutation.isPending}>
            {mutation.isPending ? 'Submitting...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
