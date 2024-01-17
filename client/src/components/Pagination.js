import React, { useState } from "react";

function Pagination({ total, limit, page, setPage }) {
  const numPages = Math.ceil(total / limit);

  const [currPage, setCurrPage] = useState(page);
  let firstNum = currPage - (currPage % 5) + 1;
  let lastNum = currPage - (currPage % 5) + 5;

  return (
    <div className="Pagination">
      <nav>
        <button
          onClick={() => {
            setPage(page - 1);
            setCurrPage(page - 2);
          }}
          disabled={page === 1}
        >
          &lt;
        </button>
        {/* <button
          onClick={() => setPage(firstNum)}
          className={page === firstNum ? 'page' : null}
        >
          {firstNum}
        </button> */}
        {Array(numPages)
          .fill()
          .map((_, i) => {
            return (
              <button
                border="true"
                key={i + 1}
                onClick={() => {
                  setPage(1 + i);
                }}
                className={page === 1 + i ? "page" : null}
              >
                {1 + i}
              </button>
            );
            // if (i <= 2) {
            //   return (
            //     <button
            //       border='true'
            //       key={i + 1}
            //       onClick={() => {
            //         setPage(firstNum + 1 + i);
            //       }}
            //       className={page === firstNum + 1 + i ? 'page' : null}
            //     >
            //       {firstNum + 1 + i}
            //     </button>
            //   );
            // } else if (i >= 3) {
            //   return (
            //     <button
            //       border='true'
            //       key={i + 1}
            //       onClick={() => setPage(lastNum)}
            //       className={page === lastNum ? 'page' : null}
            //     >
            //       {i + 1}
            //     </button>
            //   );
            // }
          })}

        <button
          onClick={() => {
            setPage(page + 1);
            setCurrPage(page);
          }}
          disabled={page === numPages}
        >
          &gt;
        </button>
      </nav>
    </div>
  );
}

export default Pagination;
