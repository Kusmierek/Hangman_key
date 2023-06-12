import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { wordAdmin } from './AdminWords';
import { category } from './Categories';
import { Dispatch, SetStateAction } from 'react';
import { useEditWord } from '../server/editWord';
import { useEditCat } from '../server/editCat';

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  translation: yup.string().required('Translation is required'),
});

const AdminCategoryEdit = ({
  isOpen,
  modalData,
  setModal,
  fetchEdit,
}: {
  modalData: Record<string, any>;
  isOpen: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  fetchEdit: (name?: string) => void;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<category>({
    defaultValues: {
      _id: modalData._id,
      name: modalData.name,
      translation: modalData.translation,
    },
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
  });
  const { editCat } = useEditCat();

  // useEffect(() => {
  //   reset({
  //     _id:mo
  //     name: modalData.name,
  //     translation: modalData.translation,
  //     category: modalData.category[0],
  //   });
  // }, [reset, modalData]);

  const onSubmit = async (data: category, errors: unknown) => {
    console.log(data);
    await editCat(data._id, data.name, data.translation);
    await setModal(false);
    await fetchEdit;
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x overflow-y-auto md:inset-0 h-modal md:h-full">
      <div className="relative w-full h-full max-w-md md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            data-modal-hide="authentication-modal"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900">
              Edit Word
            </h3>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Name
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                  type="name"
                  {...register('name')}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Translation
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                  type="translation"
                  {...register('translation')}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Category
                </label>
                <button type="submit">submit </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCategoryEdit;
