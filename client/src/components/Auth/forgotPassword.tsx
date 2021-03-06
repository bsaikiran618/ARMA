import React, { useEffect, useState } from "react";
import { InputField } from "../InputField/InputField";
import lottie from "lottie-web";
import animation from "../animations/emailVerfication.json";
import axios from "axios";

interface forgotPasswordProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}
const ForgotPassword = () => {
  const [email, setEmail] = useState<String>("");
  const [emailError, setEmailError] = useState<string>();
  const [Submitted, setSubmitted] = useState<boolean>(false);

  const validateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);
    if (email.length === 0) {
      setEmailError("Email field is empty");
    } else {
      var validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!validRegex.test(email)) {
        setEmailError("Enter valid Email!");
      } else {
        setEmailError("");
      }
    }
  };
  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: document.getElementById(
        "animationEmailContainer"
      ) as HTMLInputElement,
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: animation,
    });
    return () => anim.destroy();
  }, []);
  const onSubmit = () => {
    if (email.length === 0) {
      setEmailError("Email field is empty");
    } else {
      var validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!validRegex.test(email.toString())) {
        setEmailError("Enter valid Email!");
      } else {
        setEmailError("");
        axios
          .post(`${process.env.REACT_APP_SERVER_URL}forgotPassword`, {
            email: email,
          })
          .then(async (response) => {
            console.log(response);
            await setSubmitted(true);
            const anim = lottie.loadAnimation({
              container: document.getElementById(
                "animationEmailContainer"
              ) as HTMLInputElement,
              renderer: "svg",
              loop: false,
              autoplay: false,
              animationData: animation,
            });
            await lottie.play();
          })
          .catch(() => {
            setEmailError("Error email not found.");
          });
      }
    }
  };
  if (Submitted)
    return (
      <div className="flex flex-col h-screen justify-center items-center svg-background">
        <div className="flex flex-col h-screen justify-center items-center">
          <div
            className="text-arma-title text-2xl font-medium mx-5 text-justify mb-3"
            style={{ color: "rgb(19,155,235)" }}
          >
            Reset password link was sent
          </div>
          <div className="text-gray-500 font-light mx-5 text-justify">
            Check your email for a link to reset your password.
          </div>
          <div className="text-gray-500 font-light mx-5 text-justify">
            Did not receive the email?{" "}
            <button
              className="hover:text-black"
              style={{ color: "rgb(19,155,235)" }}
              onClick={onSubmit}
            >
              click here to resend it.
            </button>
          </div>
          <div className="w-50 md:w-1/3" id="animationEmailContainer"></div>
        </div>
      </div>
    );
  else
    return (
      <div className="flex flex-col h-screen justify-center items-center svg-background">
        <div className="flex flex-col h-screen justify-center items-center">
          <div
            className="text-arma-title text-2xl font-medium mx-5 text-justify mb-3"
            style={{ color: "rgb(19,155,235)" }}
          >
            Did someone forget their password?
          </div>
          <div className="text-gray-500 font-light mx-5 text-justify mb-8">
            It is alright, enter your registered email ID and we will send you a
            reset mail.
          </div>
          <div className="flex flex-col items-center">
            <InputField
              className="mb-1"
              name="Email"
              onChange={(e) => {
                validateEmail(e);
              }}
            />
            <span className="text-arma-red h-8">{emailError}</span>
            <button
              className="outlineBtn text-arma-blue border-[1px] rounded-[8px] mb-2 px-[110px] py-[0.5rem]"
              onClick={onSubmit}
            >
              Submit{" "}
            </button>
          </div>
        </div>
      </div>
    );
};

export { ForgotPassword };
