// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import { useForm } from 'react-hook-form';
// import { wordAdmin } from './AdminWords';
// import { useEffect, useMemo, useState } from 'react';
// import { category } from './Categories';

// const validationSchema = yup.object().shape({
//   name: yup.string().required('Name is required'),
//   translation: yup.string().required('Translation is required'),
//   category: yup.string().required('category is required'),
// });

// const AdminWordUpdate = ({ categories }: { categories: category[] }) => {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<wordAdmin>({
//     mode: 'onBlur',
//     resolver: yupResolver(validationSchema),
//   });

//   return (
//     <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
//       <td className="px-6 py-4">
//         <input type="name" {...register('name')} />
//       </td>
//       <td className="px-6 py-4">
//         <input type="text" {...register('translation')} />
//       </td>
//       <td className="px-6 py-4">
//         <select id="" {...register('translation')}>
//           {categoriesOption}
//         </select>
//       </td>
//     </tr>
//   );
// };

// export default AdminWordUpdate;
