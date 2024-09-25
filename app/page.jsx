import Link from "next/link";

export default async function Home() {
  const { users } = await fetch("https://dummyjson.com/users").then(res => res.json());
  console.log(users);
  return (
    <div className="container">
      <h1>Users</h1>
      <div className="userList">
        {users.map(x =>
          <div className="userItem">
            <img src={x.image} alt="" />
            <div className="userInfo">
              <h2>{x.firstName + x.lastName}</h2>
              <h4>{x.role}</h4>
            </div>
            <Link href={"/" + x.id}>View Profile</Link>
          </div>
        )}
      </div>
    </div>
  );
}


// {pageCount > 0 && (
//   <ul className="pagination">
//     <li>
//       <a href="#" onClick={handlePrevPage}>
//         &lt;
//       </a>
//     </li>
//     {Array.from({ length: pageCount }, (v, i) => i + 1).map((x) => (
//       <li key={x}>
//         <a
//           href="#"
//           className={page === x ? "activePage" : ""}
//           onClick={(e) => {
//             e.preventDefault();
//             changePage(x);
//           }}
//         >
//           {x}
//         </a>
//       </li>
//     ))}
//     <li>
//       <a href="#" onClick={handleNextPage}>
//         &gt;
//       </a>
//     </li>
//   </ul>
// )}

// function changePage(pageNumber) {
//   setPage(pageNumber);
//   setSelected("");
//   setSearch("");
// }

// const pageCount = Math.ceil(total / limit);

// function handlePrevPage(e) {
//   e.preventDefault();
//   if (page - 1 > 0) {
//     setPage(page - 1);
//   }
// }

// function handleNextPage(e) {
//   e.preventDefault();
//   if (page + 1 <= pageCount) {
//     setPage(page + 1);
//   }
// }