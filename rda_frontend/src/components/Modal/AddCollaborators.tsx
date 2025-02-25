import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Spinner,
} from '@chakra-ui/react';
import { addCollaborators } from '../../api/doc';
import { toast } from 'react-toastify';
import { getUsers } from '../../api/auth';
import { useQuery } from '@tanstack/react-query';
import { User } from '../../interface/notas';
import { useAuthStore } from '../../context/auth/store';
import { useState } from 'react';

const AddCollaborators = ({ documentId }: { documentId: string }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const profile = useAuthStore((state) => state.profile);
    const [userId, setUserId] = useState<number | undefined>(undefined);

    const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (userId === undefined) {
            toast.error('Selecciona un usuario.');
            return;
        }

        try {
            const dataJson = {
                userId: userId,
                documentId: documentId,
            };
            const res = await addCollaborators(dataJson);
            toast.info(res.info);
        } catch (error) {
            console.log(error);
            toast.error('An error occurred.');
        }
    };

    const { data, isLoading } = useQuery<User[], Error>({
        queryKey: ['users'],
        queryFn: getUsers
    });

    if(data)
    return (
        <>
            <button
                onClick={onOpen}
                className='w-full py-1 dark:text-white dark:hover:bg-neutral-800 dark:border-neutral-800 font-semibold flex items-center justify-center text-center gap-5 dark:bg-neutral-900'>
                Agregar colaborador
            </button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent className='h-64'>
                    <ModalHeader className='text-center text-sm mt-6'>
                        Selecciona el nombre del usuario que desea agregar al documento
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody className='flex justify-center items-center'>
                        <form onSubmit={handleForm} className='flex flex-col'>
                            {isLoading && (
                                <div>
                                    <Spinner />
                                </div>
                            )}
                            <select
                                name="userId"
                                className='px-3 w-full py-2 rounded-md shadow-xl'
                                onChange={(e) => setUserId(Number(e.target.value))}
                                value={userId || ''}
                            >
                                <option value="" disabled>Seleccionar usuario</option>
                                {data.map((item) => (
                                    profile.name === item.name ? null : (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    )
                                ))}
                            </select>

                            <button
                                type='submit'
                                className='w-40 m-auto hover:bg-neutral-800 px-3 py-1 bg-neutral-900 rounded-md text-white font-thin text-xl mt-10'>
                                Agregar
                            </button>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AddCollaborators;
