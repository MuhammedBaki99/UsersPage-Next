"use client"
import Link from "next/link";
import "./userdetail.css"
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";

export default function Student({ params }) {

  const { id } = params;

  const [usersData, setUsersData] = useState([]);
  const [usersTodo, setUsersTodo] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await fetch("https://dummyjson.com/users/" + id);

      if (!response.ok) {
        return notFound();
      }
      const users = await response.json();
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
        <div key={x.id} className="userProfileContainer">
          <div className="photoName">
            <Image width={200} height={200} src={x.image} alt="" />
            <div className="photoName-text">
              <h1>{x.firstName} {x.lastName}</h1>
              <p>#{x.role}</p>
            </div>
          </div>
          <div className="personalEducation">
            <div className="personalInfo">
              <h3>Personal Information</h3>
              <div className="email">
                <Image width={40} height={40} src="/email.png" alt="email icon" />
                {x.email}
              </div>
              <div className="phone">
                <Image width={40} height={40} src="/phone.png" alt="email icon" />
                {x.phone}
              </div>
            </div>

            <div className="Education">
              <h3>Education Information </h3>
              <div className="universty">
                <Image width={40} height={40} src="/university.png" alt="email icon" />
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
                usersTodo.map((x, i) =>
                  <li key={i}>
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