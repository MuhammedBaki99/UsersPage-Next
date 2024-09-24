
export default async function Home() {
  const { users } = await fetch("https://dummyjson.com/users").then(res => res.json());
  console.log(users);
  return (
    <div className="container">
      {users.map(x =>
        <div>
          <img src={x.image} alt="" />
          <div className="userInfo">
            <h2>{x.firstName + x.lastName}</h2>
          </div>
        </div>
      )}
    </div>
  );
}
