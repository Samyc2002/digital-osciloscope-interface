import React from "react";

import styles from "./styles.module.css";
import axios from "axios";
import { apiendpoint } from "../utils/apiendpoint";

const Login = () => {
  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [showPass, setShowPass] = React.useState(false);

  const login = () => {
    const body = {
      query: {
        work_mail: email
      },
      user: {
        name: name,
        avatar: "",
        work_mail: email,
        phone: phone,
        password: pass
      }
    };
    axios({
      method: "POST",
      url: `${apiendpoint}/auth/login`,
      headers: {
        "Content-type": "application/json"
      },
      data: JSON.stringify(body)
    })
      .then(({ data }) => {
        console.log(data);
        localStorage.setItem("jwt", data?.data.token);
        window.location.reload();
      })
      .catch(console.log);
  };

  return (
    <>
      <div className={styles.backdrop}>
        <div className={styles.card}>
          <input
            type="text"
            placeholder={"Enter your Name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
          />
          <input
            type="number"
            placeholder={"Enter your Age"}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className={styles.input}
          />
          <input
            type="text"
            placeholder={"Enter your Email ID"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          <input
            type="number"
            placeholder={"Enter your Phone Number"}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={styles.input}
          />
          <input
            type={showPass ? "text" : "password"}
            placeholder={"Enter your Password"}
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className={styles.input}
          />
          <div className={styles.btns}>
            <div className={styles.pass} onClick={() => setShowPass(!showPass)}>
              Show Password
            </div>
            <div className={styles.button} onClick={login}>
              Login
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
