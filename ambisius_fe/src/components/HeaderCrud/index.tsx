import Image from 'next/image';
import  IcSave from '@/assets/IcSave.svg'
import  IcAdd from '@/assets/IcAdd.svg'
import  IcTrash from '@/assets/IcTrash.svg'
type Props = {
  onAddBtn?: ()=> void
  onSaveBtn?: ()=> void
  onDeleteBtn?: ()=> void
}
export const HeaderCrud = ({onAddBtn, onSaveBtn, onDeleteBtn}:Props) =>{
  return(
    <div className={'w-full flex items-start justify-end p-2 bg-slate-100 pr-16 gap-4'}>
      <div onClick={onAddBtn} className={'hover:cursor-pointer'}>
        <Image width={24} height={24} src={IcAdd} alt={'icon add'} />
      </div>
      <div onClick={onSaveBtn} className={'hover:cursor-pointer'}>
        <Image width={24} height={24} src={IcSave} alt={'icon save'} />
      </div>
      <div onClick={onDeleteBtn} className={'hover:cursor-pointer'}>
        <Image width={24} height={24} src={IcTrash} alt={'icon delete'} />
      </div>
    </div>
  )
}