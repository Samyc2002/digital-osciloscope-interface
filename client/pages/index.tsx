import React from "react";
import axios from "axios";
import Head from "next/head";
import { Inter } from "next/font/google";

import styles from "@/styles/Home.module.css";
import { apiendpoint } from "@/components/utils/apiendpoint";
import Login from "@/components/Login";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [user, setUser] = React.useState<any>({});
  const [auth, setAuth] = React.useState(false);
  const [xData, setXData] = React.useState<number[]>([]);
  const [yData, setYData] = React.useState<number[]>([]);

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) setAuth(true);
  }, []);

  React.useEffect(() => {
    if (auth) {
      const jwt = localStorage.getItem("jwt");
      axios({
        method: "GET",
        url: `${apiendpoint}/auth/getUser`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      })
        .then(({ data }) => {
          console.log(data);
          setUser(data?.data.user);
        })
        .catch(console.log);
    }
  }, [auth]);

  React.useEffect(() => {
    if (!auth) {
      const jwt = localStorage.getItem("jwt");
      setInterval(() => {
        axios({
          method: "GET",
          url: `${apiendpoint}/heartData`,
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        })
          .then(({ data }) => {
            console.log(data);
            let x: number[] = [], y: number[] = [];
            data?.data.forEach((element: number, id: number) => {
              // if (id % 2 === 0) 
                y.push(element);
              // else x.push(element);
            });
            setXData(x);
            setYData(y);
          })
          .catch(console.log);
      }, 1000);
    }
  }, [auth]);

  const options = {
    //data on the x-axis
    chart: { id: "bar-chart" },
    xaxis: {
      categories: [],
    },
    dataLabels: {
      enabled: false,
    },
    /* stroke: { */
    /*   curve: "smooth" */
    /* } */
  };

  const deleteData = () => {
    const jwt = localStorage.getItem("jwt");
    axios({
      method: "DELETE",
      url: `${apiendpoint}/heartData`,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      data: JSON.stringify([]),
    })
      .then(({ data }) => {
        console.log(data);
        window.location.reload();
      })
      .catch(console.log);
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    window.location.reload();
  };

  return (
    <>
      <Head>
        <title>Heart Monitor</title>
        <meta name="description" content="See through your heart" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!auth && <Login />}
      <main className={styles.main}>
        <div className={styles.header}>
          <h2 className={inter.className}>
            Welcome{user ? ` Back, ${user?.name?.split(" ")[0]}` : ""}!
          </h2>
          <div className={styles.btns}>
            <div className={styles.pass} onClick={deleteData}>
              Delete Previous Data
            </div>
            <div className={styles.button} onClick={logout}>
              Logout
            </div>
          </div>
        </div>
        <ReactApexChart
          options={options}
          series={[
            {
              name: "Heart Data",
              data: yData,
            },
          ]}
          type="area"
          className={styles.chart}
        />
      </main>
    </>
  );
}
