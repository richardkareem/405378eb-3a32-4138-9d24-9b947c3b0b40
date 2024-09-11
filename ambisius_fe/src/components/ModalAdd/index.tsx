import Modal from 'react-modal';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import IcClose from '@/assets/IcClose.svg';
import Image from 'next/image';
import { WorkerType } from '@/types/Worker.type';
import IconDelete from '@/assets/IcTrash.svg';
import { validateEmail } from '@/utils/helper';
import { fetchCreateWorker } from '@/utils/fetch';

type  ModalProps = {
  isOpen: boolean
  setModalAdd: Dispatch<SetStateAction<boolean>>,
  data: WorkerType[],
  setData: Dispatch<SetStateAction<WorkerType[]>>
  setDataWorker: Dispatch<SetStateAction<WorkerType[]>>
}
export const ModalAdd = ({ isOpen, setModalAdd, data, setData, setDataWorker }: ModalProps) => {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '80%',
      height: 'auto',
      maxHeight: '90%',
      backgroundColor: 'white',
    },
  };

  Modal.setAppElement('#main-content');

  const handleAdd = () => {

    setData(prevState => {
      const curr = [...prevState];
      const newData: WorkerType = {
        email: '', first_name: '', id: 0, last_name: '', position: '',
      };
      // curr.unshift(newData);
      return [...curr,newData]
    });
  };

  const handleClose = () => {
    setData([{
      email: '', first_name: '', id: 0, last_name: '', position: '',
    }]);
    setModalAdd(false);
  };

  const onChange = (index: number, key: keyof WorkerType) => (e: ChangeEvent<HTMLInputElement>) => {
    setData(prevState => {
      const newArray = [...prevState];
      newArray[index] = {
        ...newArray[index],
        [key]: e.target.value,
      };
      return newArray;
    });
  };

  const onDelete = (index: number) => {
    setData(prevState => {
      return prevState.filter((item, i) => {
        if (index !== i) {
          return item;
        }
      });
    });
  };

  const onCHangeEmail = () => {

  };


  const handleSave = async () => {
    const isEmptyInput = data.some(item =>
      Object.values(item).some(value =>
        value === '' || value === null || value === undefined
      )
    );
    if(isEmptyInput){
      alert('Some data is empty')
      return
    }

    const emailInvalid = data.some((item) => {
      if (validateEmail(item.email) === null) {
        return item;
      }
    });

    if (emailInvalid) {
      alert('Email invalid')
      return;
    }
    const handleSuccess = () =>{
      setData([])
      setModalAdd(false)
    }
    fetchCreateWorker('http://localhost:3000/api/worker?page=1', data, setDataWorker, handleSuccess)

  };

  return (
    <Modal
      isOpen={isOpen}
      // onAfterOpen={afterOpenModal}
      // onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div onClick={handleClose} className={'flex justify-end'}>
        <Image className={'hover:cursor-pointer'} width={24} height={24} src={IcClose} alt={'Ic Close'} />
      </div>
      {data?.map((item, index) => {
        return  (
          <div key={index} className={'grid grid-cols-4 gap-4 my-4'}>
            <input
              onChange={onChange(index, 'first_name')}
              value={item.first_name}
              type={'text'} placeholder={'first name'} />
            <input
              onChange={onChange(index, 'last_name')}
              value={item.last_name}
              type={'text'} placeholder={'last name'} />
            <input
              onChange={onChange(index, 'position')}
              value={item.position}
              type={'text'} placeholder={'position'} />
            <div className={'flex flex-row items-center'}>
              <input
                onChange={onChange(index, 'email')}
                value={item.email}
                type={'text'} placeholder={'email'} />
              <Image onClick={() => {
                onDelete(index);
              }}
                     className={'hover:cursor-pointer text-white'} width={24} height={24} src={IconDelete}
                     alt={'icon delete'} />
            </div>

          </div>
        )})
      }

      <div className={'flex justify-center gap-4'}>
        <div onClick={handleAdd}
             className={'hover:cursor-pointer hover:bg-slate-300 w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center font-bold text-xl mt-8'}>
          +
        </div>
        <div onClick={handleSave}
             className={'hover:cursor-pointer hover:bg-green-100 w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center font-bold text-xl mt-8'}>
          {'\u2713'}
        </div>
      </div>


    </Modal>
  );
};