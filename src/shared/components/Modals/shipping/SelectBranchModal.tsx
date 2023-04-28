import { BsFillBookmarkCheckFill } from 'react-icons/bs';
import useAuthStore from '../../../../store/auth.store';
import { useShippingStore } from '../../../../store/shipping/shipping.store';
import usePaginate from '../../../hooks/usePaginate';
import { useGetSubsidiariesQuery } from '../../../hooks/subsidiaries/useSubsidiariesQuery';
import PaginateComponent from '../../usePaginateComponent';
import Loader from '../../loader/Loader';
import Button from '../../ContainerButton';

interface Props {
  handleAccept: () => void;
}

const SelectBranchModal = ({ handleAccept }: Props) => {
  const { isAuth } = useAuthStore();

  const { setIdSubsidiary, id_subsidiary } = useShippingStore();

  const { statePaginate, SetNumPages, handleNextAndPreviewsPage } =
    usePaginate();

  const { data: subsidiariesList, isLoading: subsidiariesIsLoading } =
    useGetSubsidiariesQuery(
      {
        id_company: isAuth?.id_company!,
        offset: statePaginate.offset,
      },
      SetNumPages
    );

  return (
    <div className='w-full min-h-[30vh] h-[30vh] max-h-[80vh] overflow-y-auto flex flex-col justify-between space-y-3 py-5'>
      {<Loader isOpen={subsidiariesIsLoading} />}

      {subsidiariesList?.rows?.length! > 0 && (
        <article className='h-full grid gap-5'>
          {subsidiariesList?.rows.map((branch) => (
            <div
              key={branch.id}
              onClick={() => setIdSubsidiary(branch.id!)}
              className='flex justify-between items-center px-5'
            >
              <label htmlFor=''>{branch.name}</label>
              <BsFillBookmarkCheckFill
                color={id_subsidiary === branch.id ? '#646cff' : ''}
              />
            </div>
          ))}

          <PaginateComponent
            pageCount={statePaginate.pageCount}
            actualPage={statePaginate.actualPage}
            handleChangePage={handleNextAndPreviewsPage}
          />
        </article>
      )}

      <div className='flex justify-end items-center space-x-2'>
        <Button handleClick={handleAccept} positionContentContainer='w-[40%]'>
          Aceptar
        </Button>
      </div>
    </div>
  );
};

export default SelectBranchModal;
