import { Pagination } from "react-bootstrap";

const MyPagination = ({ total, current, onChagepage }) => {
  let items = [];
  if (current > 0) {
    items.push(
      <Pagination.Prev key="prev" onClick={() => onChagepage(current - 1)} />
    );
  }

  for (let page = 0; page < total; page++) {
    items.push(
      <Pagination.Item
        key={page}
        data-page={page}
        active={page === current}
        onClick={() => onChagepage(page)}
      >
        {page + 1}
      </Pagination.Item>
    );
  }

  if (current + 1 < total) {
    items.push(
      <Pagination.Next key="next" onClick={() => onChagepage(current + 1)} />
    );
  }
  return <Pagination>{items}</Pagination>;
};
export default MyPagination;
