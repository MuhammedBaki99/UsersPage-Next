"use client"
import Link from "next/link";
import "./userdetail.css"
import { useEffect, useState } from "react";

export default function Student({ params }) {
  const { id } = params;

  const [usersData, setUsersData] = useState([]);
  const [usersTodo, setUsersTodo] = useState([]);

  useEffect(() => {
    async function getData() {
      const users = await fetch("https://dummyjson.com/users/" + id).then(res => res.json());
      console.log(users);
      setUsersData([users]);
    }
    getData();
    async function getTodo() {
      const { todos } = await fetch("https://dummyjson.com/users/" + id + "/todos").then(res => res.json());

      setUsersTodo(todos);
    }
    getTodo();
  }, []);
  console.log(usersTodo);


  return (
    <div className="userDetailContainer">
      <div className="detailHeader">
        <Link href="/">Go Back</Link>
        <h1>User Profil</h1>
      </div>
      {usersData.map(x => (
        <div className="userProfileContainer">
          <div className="photoName">
            <img src={x.image} alt="" />
            <div className="photoName-text">
              <h1>{x.firstName} {x.lastName}</h1>
              <p>#{x.role}</p>
            </div>
          </div>
          <div className="personalEducation">
            <div className="personalInfo">
              <h3>Personal Information</h3>
              <div className="email">
                <img src="/email.png" alt="email icon" />
                {x.email}
              </div>
              <div className="phone">
                <img src="/phone.png" alt="email icon" />
                {x.phone}
              </div>
            </div>

            <div className="Education">
              <h3>Education Information </h3>
              <div className="universty">
                <img src="/university.png" alt="email icon" />
                <p>{x.university}</p>
              </div>
            </div>
          </div>

          <div className="companyAddresInfo">
            <div className="companyCont">
              <h3>Company Address</h3>
              <div className="addressCont">
                <p><span>Address:</span> {x.company.address.address}</p>
                <p><span>State:</span> {x.company.address.state}</p>
                <p><span>City:</span> {x.company.address.city}</p>
                <p><span>Country:</span> {x.company.address.country}</p>
              </div>
            </div>
            <div className="companyInformation">
              <h3>Company Information</h3>
              <p><span>Department:</span> {x.company.department}</p>
              <p><span>Title:</span> {x.company.title}</p>
              <p><span>Name:</span> {x.company.name}</p>
            </div>
          </div>


          <ul className="usersTodos">
            <h1>Todos</h1>
            {
              usersTodo.length !== 0 ? <> {
                usersTodo.map(x =>
                  <li>
                    <h4>{x.todo}</h4>
                    <h4 style={{
                      backgroundColor: `${x.completed ? "darkgreen" : "darkred"}`
                    }}>{x.completed ? "Done" : "Not Done"}</h4>
                  </li>
                )
              }</>
              : <>
              <p className="notasks">No Tasks</p>
              </>
            }

          </ul>
        </div>))
      }
    </div>
  )
}