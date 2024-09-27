import Link from "next/link";

export default async function Home() {
  const { users } = await fetch("https://dummyjson.com/users").then(res => res.json());
  console.log(users);
  return (
    <div className="container">
      <h1>Users</h1>
      <div className="userList">
        {users.map(x =>
          <div key={x.id} className="userItem">
            <img src={x.image} alt="" />
            <div key={x.id} className="userInfo">
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

 