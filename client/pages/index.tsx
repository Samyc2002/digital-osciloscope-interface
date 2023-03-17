import React from "react";
import axios from "axios";
import Head from "next/head";
import { Inter } from "next/font/google";

import styles from "@/styles/Home.module.css";
import { apiendpoint } from "@/components/utils/apiendpoint";
import Login from "@/components/Login";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false
});

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [user, setUser] = React.useState<any>({});
  const [auth, setAuth] = React.useState(false);
  const [data, setData] = React.useState([10, 20, 30, 40, 50, 60]);

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
          Authorization: `Bearer ${jwt}`
        }
      })
        .then(({ data }) => {
          console.log(data);
          setUser(data?.data.user);
        })
        .catch(console.log);
    }
  }, [auth]);

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    setInterval(() => {
      axios({
        method: "GET",
        url: `${apiendpoint}/heartData`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${jwt}`
        }
      })
        .then(({ data }) => {
          console.log(data);
          setData(data?.data);
        })
        .catch(console.log);
    }, 2000);
  }, []);

  const options = {
    //data on the x-axis
    chart: { id: "bar-chart" },
    xaxis: {
      categories: []
    }
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
        <h2 className={inter.className}>
          Welcome{user ? ` Back, ${user?.name?.split(" ")[0]}` : ""}!
        </h2>
        <ReactApexChart
          options={options}
          series={[
            {
              name: "Heart Data",
              data
            }
          ]}
          type="area"
          className={styles.chart}
        />
      </main>
    </>
  );
}
