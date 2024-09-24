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
      <Link href="/">Geri Dön</Link>
      {usersData.map(x => (
        <div className="detailContainer">
          <div className="usersDetail">
            <h1>Kişisel Özellikleri</h1>
            <div className="usersPhysics">
              <div className="detailItem">
                <h3>Kan Grubu</h3>
                <p>{x.bloodGroup}</p>
              </div>
              <div className="detailItem">
                <h3>Göz Rengi</h3>
                <p>{x.eyeColor}</p>
              </div>
              <div className="detailItem">
                <h3>Saç Rengi ve Tipi</h3>
                <p>{x.hair.color} - {x.hair.type}</p>
              </div>
            </div>
            <h1>Şirket Bilgileri</h1>
            <div className="userAdress">

              <div className="detailItem">
                <h3>Sektör</h3>
                <p>{x.company.department}</p>
              </div>
              <div className="detailItem">
                <h3>Şirket Adı</h3>
                <p>{x.company.name}</p>
              </div>
              <div className="detailItem">
                <h3>Unvan</h3>
                <p>{x.company.title}</p>
              </div>
              <div className="detailItem">
                <h3>Şirket Adresi</h3>
                <div>
                  <p>Adres: {x.company.address.address}</p>
                  <p>Şehir: {x.company.address.city}</p>
                  <p>Cadde: {x.company.address.state}</p>
                  <p>Posta Kodu: {x.company.address.postalCode}</p>
                  <p>Ülke: {x.company.address.country}</p>
                </div>
              </div>
            </div>
            <h1>Kullanıcı Görevleri</h1>
            {
              usersTodo.length !== 0 ?
                <>
                  {usersTodo.map(a => (
                    <div className="todoItem">
                      <p>{a.todo}</p>
                      <p>{`${a.completed ? "Yapıldı" : "Yapılmadı"}`}</p>
                    </div>
                  ))}
                  </>: "Görev Yok"

            }

          </div>
          <div className="userDetailInfo">
            <div className="logo">
              <img src={x.image} />
              <h1>{x.firstName} {x.lastName}</h1>
            </div>
            <div className="userInfos">
              <p><span>Cinsiyet: </span>{x.gender}</p>
              <p><span>Yaş:</span> {x.age}</p>
              <p><span>Eposta:</span> {x.email}</p>
              <p><span>Telefon Numarası:</span> {x.phone}</p>
              <p><span>Doğum Tarihi:</span> {x.birthDate}</p>
            </div>
          </div>
        </div>
      ))
      }
    </div>
  )
}