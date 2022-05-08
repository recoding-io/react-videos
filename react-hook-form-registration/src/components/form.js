import React from "react";
import { useForm } from "react-hook-form";
export default function Form() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h1>Registration</h1>
        </div>
        <div>
          <label>Name</label>
          <input
            placeholder="Enter person name"
            {...register("name", { required: true })}
          />
          <error>
            {errors.name?.type === "required" && "Name is required"}
          </error>
        </div>
        <div>
          <label>Email</label>
          <input
            placeholder="Enter primary email"
            {...register("email", {
              required: true,
              pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
            })}
          />
          <error>
            {errors.email?.type === "required" && "Email is required"}
            {errors.email?.type === "pattern" &&
              "Entered email is in wrong format"}
          </error>
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="number"
            {...register("number", {
              minLength: 6,
              maxLength: 12,
            })}
          />
          <error>
            {errors.number?.type === "minLength" &&
              "Entered number is less than 6 digits"}
            {errors.number?.type === "maxLength" &&
              "Entered number is more than 12 digits"}
          </error>
        </div>
        <div>
          <label>Password</label>
          <input
            placeholder="Enter password"
            {...register("password", {
              required: true,
              minLength: 5,
              maxLength: 20,
            })}
          />
          <error>
            {errors.password?.type === "minLength" &&
              "Entered password is less than 5 characters"}
            {errors.password?.type === "maxLength" &&
              "Entered password is more than 20 characters"}
          </error>
        </div>
        <div>
          <input className="button" type="submit" />
        </div>
      </form>
    </div>
  );
}
