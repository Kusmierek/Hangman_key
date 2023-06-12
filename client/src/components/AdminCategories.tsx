import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDeleteWord } from '../server/deleteWord';
import AdminWordEdit from './AdminWordEdit';
import { category } from './Categories';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { wordType } from '../slices/wordSlice';
import { useDeleteCat } from '../server/deleteCat';
import AdminCategoryEdit from './AdminCategoryEdit';

const AdminCategories = () => {
  const [categories, setCategories] = useState<category[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const { register, watch } = useForm({
    defaultValues: {
      name: '',
    },
  });
  const watchName = watch('name');
  const { deleteCat } = useDeleteCat();
  const fetchRequest = useCallback(
    (name: string = '') => {
      console.log(name);
      console.log({ name: `${name}` });

      axios
        .get('http://127.0.0.1:3000/api/cat/find/reg', {
          params: { name },
        })
        .then((response) => {
          console.log(response);

          console.log(response.data.getCatReg);
          setCategories(response.data.getCatReg);
          response;
        })
        .catch((err) => {
          console.log(err);
        });

      // fetch('http://127.0.0.1:3000/api/cat')
      //   .then((res) => res.json())
      //   .then((data) => {
      //     setCategories(data.Category);
      //     console.log(data);
      //     console.log(categories);
      //   })
      //   .catch((err) => {
      //     console.log(err.message);
      //   });
    },
    [modalIsOpen, setModalIsOpen]
  );

  useEffect(() => {
    console.log('klik');
    console.log(watchName);

    fetchRequest(watchName);
  }, [modalIsOpen, setModalIsOpen, watchName]);

  const handleChangeModal = useCallback(
    (x: Record<string, any>) => {
      setModalData(x);
      console.log(x);
      setModalIsOpen(true);
      console.log(modalIsOpen);
    },
    [modalIsOpen, modalData, fetchRequest]
  );

  const wordsRow = useMemo(() => {
    return categories.map((x) => {
      return (
        <tr className="bg-white border-b" key={x._id}>
          <td className="px-6 py-4">{x.name}</td>
          <td className="px-6 py-4">{x.translation}</td>
          <td className="px-6 py-4 flex justify-start">
            <button
              type="button"
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
              onClick={async () => {
                await deleteCat(x._id);
                await fetchRequest('');
              }}
            >
              Delete
            </button>
            <button
              type="button"
              className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
              onClick={() => {
                fetchRequest('');
                handleChangeModal(x);
              }}
              data-modal-target="defaultModal"
              data-modal-toggle="defaultModal"
            >
              Update
            </button>
          </td>
        </tr>
      );
    });
  }, [categories]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg flex flex-col items-center  ">
      <div className="p-6 bg-white w-9/12 rounded mt-4">
        <label className="sr-only">Search</label>
        <div className="relative mt-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"></path>
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for items"
            {...register('name')}
          />
        </div>
      </div>
      <table className="w-9/12 text-sm text-left rounded">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Translation
            </th>
            <th scope="col" className="px-6 py-3">
              actions
            </th>
          </tr>
        </thead>
        <tbody>{wordsRow}</tbody>
      </table>
      {modalIsOpen && (
        <AdminCategoryEdit
          isOpen={modalIsOpen}
          modalData={modalData}
          setModal={setModalIsOpen}
          fetchEdit={fetchRequest}
        />
      )}
    </div>
  );
};

export default AdminCategories;
