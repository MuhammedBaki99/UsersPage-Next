import Link from "next/link";

export default async function Home() {
  const { users } = await fetch("https://dummyjson.com/users").then(res => res.json());
  console.log(users);
  return (
    <div className="container">
      <h1>Kullanıcılar</h1>
      <div className="userList">
        {users.map(x =>
          <div className="userItem">
            <img src={x.image} alt="" />
            <div className="userInfo">
              <h2>{x.firstName + x.lastName}</h2>
              <h4>{x.role}</h4>
            </div>
            <Link href={"/" + x.id}>Profili İncele</Link>
          </div>
        )}
      </div>
    </div>
  );
}
