import { useQuery } from '@tanstack/react-query';

import { getAllDocRequest } from '../../api/doc';
import { useAuthStore } from '../../context/auth/store';
import { Link } from 'react-router-dom';

const DocList = () => {

    const user = useAuthStore((state) => state.profile)
    const userId = user.id

    const { data, isLoading } = useQuery<any, Error>({
    queryKey: ['docId', userId],
    queryFn: () => getAllDocRequest(userId)
});




if(isLoading){
    return <div>Cargando..</div>
}

if(data)
  return (
    <div className='grid grid-cols-3 gap-10'>
      {data.map((item: any, index: number) => (
        <div key={index} className='border rounded-md shadow-xl h-64 w-48 flex flex-col justify-between'>
          <Link to={`/docId/${userId}/${item.id}`}>Ver</Link>
          <div className='mt-auto text-center border p-2'>
                <p className='text-black font-medium '> {item.title}</p> 
                <p className='text-sm mt-4'>Fecha</p>

          </div>
       
        </div>
    ))}</div>
  )
}

export default DocList