import { useState } from 'react';

const RequestItemPerPage = 2;

const usePaginate = () => {
  const [statePaginate, setStatePaginate] = useState({
    // * numbero total de resultados
    totalItems: 0,
    // * numero de paginas
    pageCount: 0,
    // * actual page
    actualPage: 0,
    // * offset actual
    offset: 0,
  });

  const SetNumPages = (count: number) => {
    setStatePaginate({
      ...statePaginate,
      pageCount: Math.ceil(count / RequestItemPerPage),
      totalItems: count,
    });
  };

  const handleChangePage = (indexPage: number) => {
    const newOffset =
      (indexPage * RequestItemPerPage) % statePaginate.totalItems;
    setStatePaginate({
      ...statePaginate,
      offset: newOffset,
    });
  };

  const handleNextAndPreviewsPage = (type: boolean) => {
    if (type === false && statePaginate.actualPage === 0) {
      return;
    }

    if (
      type === true &&
      statePaginate.actualPage === statePaginate.pageCount - 1
    ) {
      return;
    }

    setStatePaginate({
      ...statePaginate,
      actualPage: type
        ? statePaginate.actualPage + 1
        : statePaginate.actualPage - 1,
      offset: type
        ? statePaginate.offset + RequestItemPerPage
        : statePaginate.offset - RequestItemPerPage,
    });
  };

  return {
    statePaginate,
    SetNumPages,
    handleChangePage,
    handleNextAndPreviewsPage,
  };
};

export default usePaginate;
